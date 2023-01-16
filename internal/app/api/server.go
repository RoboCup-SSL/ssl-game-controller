package api

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/engine"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/statemachine"
	"github.com/google/uuid"
	"github.com/gorilla/websocket"
	"google.golang.org/protobuf/encoding/protojson"
	"google.golang.org/protobuf/proto"
	"google.golang.org/protobuf/types/known/durationpb"
	"log"
	"net/http"
	"reflect"
	"time"
)

type Server struct {
	connections []*ServerConnection
	gcEngine    *engine.Engine
}

type ServerConnection struct {
	quit               chan int
	conn               *websocket.Conn
	gcEngine           *engine.Engine
	lastPublishedState *state.State
	lastGcState        *engine.GcState
	lastProtocolId     int32
	lastConfig         *engine.Config
	marshaler          protojson.MarshalOptions
}

func NewServer(gcEngine *engine.Engine) (s *Server) {
	s = new(Server)
	s.connections = []*ServerConnection{}
	s.gcEngine = gcEngine
	return
}

func NewServerConnection(gcEngine *engine.Engine, conn *websocket.Conn) (s *ServerConnection) {
	s = new(ServerConnection)
	s.quit = make(chan int)
	s.conn = conn
	s.gcEngine = gcEngine
	s.lastProtocolId = -1
	s.marshaler.EmitUnpopulated = true
	return
}

// WsHandler handles incoming web socket connections
func (a *Server) WsHandler(w http.ResponseWriter, r *http.Request) {
	u := websocket.Upgrader{
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
		CheckOrigin:     func(*http.Request) bool { return true },
	}

	conn, err := u.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}
	serverConn := NewServerConnection(a.gcEngine, conn)
	a.connections = append(a.connections, serverConn)
	defer a.disconnect(serverConn)
	log.Println("UI Client connected")

	go serverConn.publish()
	a.listenForNewEvents(conn)
}

func (s *ServerConnection) publish() {
	hook := make(chan engine.HookOut, 10)
	hookId := "apiServer-" + uuid.NewString()
	s.gcEngine.RegisterHook(hookId, hook)
	defer func() {
		s.gcEngine.UnregisterHook(hookId)
		close(hook)
	}()

	s.publishGcState()
	s.publishConfig()
	s.publishState(s.gcEngine.CurrentState())
	s.publishProtocolFull()

	for {
		select {
		case <-s.quit:
			return
		case hookOut := <-hook:
			if hookOut.Change != nil {
				s.publishState(hookOut.State)
				s.publishProtocolDelta()
			} else if hookOut.State != nil {
				s.publishGcState()
				s.publishConfig()
				s.publishState(hookOut.State)
				if s.gcEngine.LatestChangeId() != s.lastProtocolId {
					s.publishProtocolFull()
				}
			}
		}
	}
}

func (s *ServerConnection) publishState(matchState *state.State) {

	adaptedState := roundDurations(matchState)

	if proto.Equal(s.lastPublishedState, adaptedState) {
		return
	}

	out := Output{MatchState: adaptedState}
	s.publishOutput(&out)

	s.lastPublishedState = &state.State{}
	proto.Merge(s.lastPublishedState, adaptedState)
}

func (s *ServerConnection) publishGcState() {
	gcState := s.gcEngine.CurrentGcState()

	if !reflect.DeepEqual(gcState, s.lastGcState) {
		out := Output{GcState: gcState}
		s.publishOutput(&out)
		s.lastGcState = &engine.GcState{}
		proto.Merge(s.lastGcState, gcState)
	}
}

func (s *ServerConnection) publishConfig() {
	cfg := s.gcEngine.GetConfig()

	if !reflect.DeepEqual(cfg, s.lastConfig) {
		out := Output{Config: cfg}
		s.publishOutput(&out)
		s.lastConfig = &engine.Config{}
		proto.Merge(s.lastConfig, cfg)
	}
}

func (s *ServerConnection) publishProtocolFull() {
	changes := s.gcEngine.LatestChangesUntil(-1)
	entries := s.changesToProtocolEntries(changes)
	delta := false
	protocol := Protocol{Delta: &delta, Entry: entries}
	out := Output{Protocol: &protocol}
	s.publishOutput(&out)
	if len(changes) > 0 {
		s.lastProtocolId = *changes[len(changes)-1].Id
	} else {
		s.lastProtocolId = -1
	}
}

func (s *ServerConnection) publishProtocolDelta() {

	changes := s.gcEngine.LatestChangesUntil(s.lastProtocolId)

	if len(changes) == 0 {
		return
	}

	entries := s.changesToProtocolEntries(changes)
	delta := true
	protocol := Protocol{Delta: &delta, Entry: entries}
	out := Output{Protocol: &protocol}
	s.publishOutput(&out)
	s.lastProtocolId = *changes[len(changes)-1].Id
}

func (s *ServerConnection) changesToProtocolEntries(changes []*statemachine.StateChange) []*ProtocolEntry {
	entries := make([]*ProtocolEntry, len(changes))
	for i, change := range changes {
		var matchTimeElapsed time.Duration
		if change.State.MatchTimeStart.Seconds != 0 {
			tChange := change.Timestamp.AsTime()
			tStart := change.State.MatchTimeStart.AsTime()
			matchTimeElapsed = tChange.Sub(tStart)
		}

		entries[len(changes)-1-i] = &ProtocolEntry{
			Id:               change.Id,
			Change:           change.Change,
			MatchTimeElapsed: durationpb.New(matchTimeElapsed),
			StageTimeElapsed: change.State.StageTimeElapsed,
		}
	}
	return entries
}

func (s *ServerConnection) publishOutput(wrapper *Output) {
	b, err := s.marshaler.Marshal(wrapper)
	if err != nil {
		log.Println("Marshal error:", err)
	}

	err = s.conn.WriteMessage(websocket.TextMessage, b)
	if err != nil {
		log.Println("Could not write message to api client:", err)
	}
}

func (a *Server) disconnect(conn *ServerConnection) {
	conn.quit <- 0
	err := conn.conn.Close()
	if err != nil {
		log.Println("Could not disconnect from websocket conn: ", err)
	}
	for i, c := range a.connections {
		if c == conn {
			a.connections = append(a.connections[:i], a.connections[i+1:]...)
			break
		}
	}
	log.Println("UI Client disconnected")
}

func (a *Server) listenForNewEvents(conn *websocket.Conn) {
	for {
		messageType, b, err := conn.ReadMessage()
		if err != nil || messageType != websocket.TextMessage {
			log.Println("Could not read message: ", err)
			return
		}

		a.handleNewEventMessage(b)
	}
}

func (a *Server) handleNewEventMessage(b []byte) {
	in := Input{}
	err := protojson.Unmarshal(b, &in)
	if err != nil {
		log.Println("Could not read input:", string(b), err)
		return
	}

	if in.Change != nil {
		if in.Change.Origin == nil || len(*in.Change.Origin) == 0 {
			in.Change.Origin = proto.String("UI")
		}
		if in.Change.GetAddGameEventChange() != nil &&
			(in.Change.GetAddGameEventChange().GameEvent.Origin == nil ||
				len(in.Change.GetAddGameEventChange().GameEvent.Origin) == 0) {
			in.Change.GetAddGameEventChange().GameEvent.Origin = []string{"UI"}
		}
		a.gcEngine.Enqueue(in.Change)
	}
	if in.ResetMatch != nil && *in.ResetMatch {
		a.gcEngine.ResetMatch()
	}
	if in.ConfigDelta != nil {
		a.gcEngine.UpdateConfig(in.ConfigDelta)
	}
	if in.ContinueAction != nil {
		a.gcEngine.Continue(in.ContinueAction)
	}
}

func roundDuration(d *durationpb.Duration) {
	if d.Nanos >= 5e8 {
		d.Seconds++
	}
	d.Nanos = 0
}

func roundDurations(matchState *state.State) *state.State {
	newState := new(state.State)
	proto.Merge(newState, matchState)

	roundDuration(newState.StageTimeElapsed)
	roundDuration(newState.StageTimeLeft)
	roundDuration(newState.CurrentActionTimeRemaining)

	for _, team := range state.BothTeams() {
		teamInfo := newState.TeamInfo(team)
		roundDuration(teamInfo.TimeoutTimeLeft)
		for _, yc := range teamInfo.YellowCards {
			roundDuration(yc.TimeRemaining)
		}
	}

	return newState
}
