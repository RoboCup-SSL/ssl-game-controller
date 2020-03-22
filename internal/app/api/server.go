package api

import (
	"encoding/json"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/engine"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/statemachine"
	"github.com/gorilla/websocket"
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
	lastPublishedState state.State
}

func NewServer(gcEngine *engine.Engine) (s *Server) {
	s = new(Server)
	s.connections = []*ServerConnection{}
	s.gcEngine = gcEngine
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
	serverConn := &ServerConnection{conn: conn, gcEngine: a.gcEngine, quit: make(chan int)}
	a.connections = append(a.connections, serverConn)
	defer a.disconnect(serverConn)
	log.Println("UI Client connected")

	go serverConn.publish()
	a.listenForNewEvents(conn)
}

func (s *ServerConnection) publish() {
	var hook chan statemachine.StateChange
	s.gcEngine.RegisterHook(hook)
	defer s.gcEngine.UnregisterHook(hook)

	s.publishState(s.gcEngine.CurrentState())

	for {
		select {
		case <-s.quit:
			return
		case change := <-hook:
			s.publishState(change.State)
		case <-time.After(100 * time.Millisecond):
			s.publishState(s.gcEngine.CurrentState())
		}
	}
}

func (s *ServerConnection) publishState(matchState state.State) {

	if !stateChanged(s.lastPublishedState, matchState) {
		return
	}

	gcState := GameControllerState{
		AutoRefsConnected:      []string{},
		TeamConnected:          map[state.Team]bool{},
		TeamConnectionVerified: map[state.Team]bool{},
	}

	out := Output{MatchState: matchState, GcState: gcState}
	s.publishOutput(out)

	s.lastPublishedState = matchState
}

func (s *ServerConnection) publishOutput(wrapper Output) {
	b, err := json.Marshal(wrapper)
	if err != nil {
		log.Println("Marshal error:", err)
	}

	err = s.conn.WriteMessage(websocket.TextMessage, b)
	if err != nil {
		log.Println("Could not write message.", err)
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
	event := Event{}
	err := json.Unmarshal(b, &event)
	if err != nil {
		log.Println("Could not read event:", string(b), err)
		return
	}

	// TODO consume event
}

func stateChanged(s1, s2 state.State) bool {
	if s1.Stage != s2.Stage {
		return true
	}
	if s1.Command != s2.Command {
		return true
	}
	if s1.CommandFor != s2.CommandFor {
		return true
	}
	if s1.StageTimeElapsed.Seconds() != s2.StageTimeElapsed.Seconds() {
		return true
	}
	if s1.StageTimeLeft.Seconds() != s2.StageTimeLeft.Seconds() {
		return true
	}
	if s1.MatchTimeStart != s2.MatchTimeStart {
		return true
	}
	if s1.MatchDuration.Seconds() != s2.MatchDuration.Seconds() {
		return true
	}
	for _, team := range state.BothTeams() {
		if teamStateChanged(*s1.TeamState[team], *s2.TeamState[team]) {
			return true
		}
	}
	if s1.PlacementPos != s2.PlacementPos {
		return true
	}
	if s1.NextCommand != s2.NextCommand {
		return true
	}
	if s1.NextCommandFor != s2.NextCommandFor {
		return true
	}
	if s1.CurrentActionTimeRemaining.Seconds() != s2.CurrentActionTimeRemaining.Seconds() {
		return true
	}
	if !reflect.DeepEqual(s1.GameEvents, s2.GameEvents) {
		return true
	}
	if !reflect.DeepEqual(s1.ProposedGameEvents, s2.ProposedGameEvents) {
		return true
	}
	if s1.Division != s2.Division {
		return true
	}
	if s1.AutoContinue != s2.AutoContinue {
		return true
	}
	if s1.FirstKickoffTeam != s2.FirstKickoffTeam {
		return true
	}
	if !reflect.DeepEqual(s1.GameEventBehavior, s2.GameEventBehavior) {
		return true
	}
	return false
}

func teamStateChanged(s1, s2 state.TeamInfo) bool {
	if s1.Name != s2.Name {
		return true
	}
	if s1.Goals != s2.Goals {
		return true
	}
	if s1.Goalkeeper != s2.Goalkeeper {
		return true
	}
	if len(s1.YellowCards) != len(s2.YellowCards) {
		return true
	}
	for i := range s1.YellowCards {
		if s1.YellowCards[i].Id != s2.YellowCards[i].Id {
			return true
		}
		if s1.YellowCards[i].CausedByGameEvent != s2.YellowCards[i].CausedByGameEvent {
			return true
		}
		if s1.YellowCards[i].TimeRemaining.Seconds() != s2.YellowCards[i].TimeRemaining.Seconds() {
			return true
		}
	}
	if !reflect.DeepEqual(s1.RedCards, s2.RedCards) {
		return true
	}
	if s1.TimeoutsLeft != s2.TimeoutsLeft {
		return true
	}
	if s1.TimeoutTimeLeft != s2.TimeoutTimeLeft {
		return true
	}
	if s1.OnPositiveHalf != s2.OnPositiveHalf {
		return true
	}
	if !reflect.DeepEqual(s1.Fouls, s2.Fouls) {
		return true
	}
	if s1.BallPlacementFailures != s2.BallPlacementFailures {
		return true
	}
	if s1.BallPlacementFailuresReached != s2.BallPlacementFailuresReached {
		return true
	}
	if s1.CanPlaceBall != s2.CanPlaceBall {
		return true
	}
	if s1.MaxAllowedBots != s2.MaxAllowedBots {
		return true
	}
	if s1.BotSubstitutionIntend != s2.BotSubstitutionIntend {
		return true
	}
	return false
}
