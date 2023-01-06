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

	if !stateChanged(s.lastPublishedState, matchState) {
		return
	}

	out := Output{MatchState: matchState}
	s.publishOutput(&out)

	s.lastPublishedState = &state.State{}
	proto.Merge(s.lastPublishedState, matchState)
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

func stateChanged(s1, s2 *state.State) bool {
	if s1 == nil || s2 == nil {
		return true
	}
	if s1.StageTimeElapsed.Seconds != s2.StageTimeElapsed.Seconds {
		return true
	}
	if s1.StageTimeLeft.Seconds != s2.StageTimeLeft.Seconds {
		return true
	}
	if s1.CurrentActionTimeRemaining.Seconds != s2.CurrentActionTimeRemaining.Seconds {
		return true
	}
	for _, team := range state.BothTeams() {
		if teamStateChanged(s1.TeamInfo(team), s2.TeamInfo(team)) {
			return true
		}
	}

	s1c := new(state.State)
	s2c := new(state.State)
	proto.Merge(s1c, s1)
	proto.Merge(s2c, s2)
	s1c.StageTimeElapsed = nil
	s2c.StageTimeElapsed = nil
	s1c.StageTimeLeft = nil
	s2c.StageTimeLeft = nil
	s1c.CurrentActionTimeRemaining = nil
	s2c.CurrentActionTimeRemaining = nil
	s1c.TeamState = nil
	s2c.TeamState = nil

	return !proto.Equal(s1c, s2c)
}

func teamStateChanged(s1, s2 *state.TeamInfo) bool {
	if s1 == nil || s2 == nil {
		return true
	}
	if len(s1.YellowCards) != len(s2.YellowCards) {
		return true
	}
	for i := range s1.YellowCards {
		if *s1.YellowCards[i].Id != *s2.YellowCards[i].Id {
			return true
		}
		if !reflect.DeepEqual(s1.YellowCards[i].CausedByGameEvent, s2.YellowCards[i].CausedByGameEvent) {
			return true
		}
		if s1.YellowCards[i].TimeRemaining.Seconds != s2.YellowCards[i].TimeRemaining.Seconds {
			return true
		}
	}
	if s1.TimeoutTimeLeft.Seconds != s2.TimeoutTimeLeft.Seconds {
		return true
	}

	s1c := new(state.TeamInfo)
	s2c := new(state.TeamInfo)
	proto.Merge(s1c, s1)
	proto.Merge(s2c, s2)
	s1c.YellowCards = []*state.YellowCard{}
	s2c.YellowCards = []*state.YellowCard{}
	s1c.TimeoutTimeLeft = nil
	s2c.TimeoutTimeLeft = nil

	return !proto.Equal(s1c, s2c)
}
