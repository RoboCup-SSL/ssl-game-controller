package controller

import (
	"encoding/json"
	"github.com/gorilla/websocket"
	"log"
	"net/http"
)

type ApiServer struct {
	Consumer         EventConsumer
	connections      []*websocket.Conn
	latestState      GameControllerState
	latestUiProtocol []*ProtocolEntry
}

type EventConsumer interface {
	OnNewEvent(event Event)
}

type MessageWrapper struct {
	UiProtocol *[]*ProtocolEntry    `json:"protocol"`
	GcState    *GameControllerState `json:"gcState"`
}

// WsHandler handles incoming web socket connections
func (a *ApiServer) WsHandler(w http.ResponseWriter, r *http.Request) {
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
	defer a.disconnect(conn)

	log.Println("UI Client connected")

	a.connections = append(a.connections, conn)

	a.publishFullWrapper(conn)

	a.listenForNewEvents(conn)
}

func (a *ApiServer) publishWrapper(wrapper MessageWrapper) {
	b, err := json.Marshal(wrapper)
	if err != nil {
		log.Println("Marshal error:", err)
	}

	for _, conn := range a.connections {
		err = conn.WriteMessage(websocket.TextMessage, b)
		if err != nil {
			log.Println("Could not write message.", err)
		}
	}
}

func (a *ApiServer) publishFullWrapper(conn *websocket.Conn) {
	wrapper := MessageWrapper{UiProtocol: &a.latestUiProtocol, GcState: &a.latestState}
	a.publishWrapper(wrapper)
}

func (a *ApiServer) PublishState(gcState *GameControllerState) {
	a.latestState = *gcState
	wrapper := MessageWrapper{GcState: gcState}
	a.publishWrapper(wrapper)
}

func (a *ApiServer) PublishUiProtocol(protocol []*ProtocolEntry) {
	a.latestUiProtocol = protocol
	wrapper := MessageWrapper{UiProtocol: &protocol}
	a.publishWrapper(wrapper)
}

func (a *ApiServer) disconnect(conn *websocket.Conn) {
	err := conn.Close()
	if err != nil {
		log.Println("Could not disconnect from websocket conn: ", err)
	}
	for i, c := range a.connections {
		if c == conn {
			a.connections = append(a.connections[:i], a.connections[i+1:]...)
			break
		}
	}
	log.Println("Client disconnected")
}

func (a *ApiServer) listenForNewEvents(conn *websocket.Conn) {
	for {
		messageType, b, err := conn.ReadMessage()
		if err != nil || messageType != websocket.TextMessage {
			log.Println("Could not read message: ", err)
			return
		}

		a.handleNewEventMessage(b)
	}
}

func (a *ApiServer) handleNewEventMessage(b []byte) {
	event := Event{}
	err := json.Unmarshal(b, &event)
	if err != nil {
		log.Println("Could not read event:", string(b), err)
		return
	}

	if a.Consumer != nil {
		a.Consumer.OnNewEvent(event)
	}
}
