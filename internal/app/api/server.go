package api

import (
	"encoding/json"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/engine"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/statemachine"
	"github.com/gorilla/websocket"
	"log"
	"net/http"
	"time"
)

type Server struct {
	connections []*ServerConnection
	gcEngine    *engine.Engine
}

type ServerConnection struct {
	quit     chan int
	conn     *websocket.Conn
	gcEngine *engine.Engine
}

type EventConsumer interface {
	OnNewEvent(event Event)
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

	for {
		select {
		case <-s.quit:
			return
		case change := <-hook:
			out := Output{MatchState: change.State}
			s.publishOutput(out)
		case <-time.After(100 * time.Millisecond):
			out := Output{MatchState: s.gcEngine.CurrentState()}
			s.publishOutput(out)
		}
	}
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
