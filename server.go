package main

import (
	"encoding/json"
	"github.com/gorilla/websocket"
	"log"
	"net/http"
)

func wsHandler(w http.ResponseWriter, r *http.Request) {
	upgrader := websocket.Upgrader{
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
		CheckOrigin:     func(*http.Request) bool { return true },
	}

	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}
	defer conn.Close()
	defer log.Println("Client disconnected")

	log.Println("Client connected")

	go checkForNewEvent(conn)

	for {
		b, err := json.Marshal(refBox.State)
		if err != nil {
			log.Println("Marshal error:", err)
		}

		err = conn.WriteMessage(websocket.TextMessage, b)
		if err != nil {
			log.Println("Could not write message.", err)
			return
		}

		// wait for a new event
		<-refBox.newEventChannel
	}
}

func checkForNewEvent(conn *websocket.Conn) {
	for {
		messageType, b, err := conn.ReadMessage()
		if err != nil || messageType != websocket.TextMessage {
			log.Println("Could not read message:", err)
			return
		}

		event := RefBoxEvent{}
		err = json.Unmarshal(b, &event)
		if err != nil {
			log.Println("Could not read event:", string(b), err)
		} else {
			err = processEvent(&event)
			if err != nil {
				log.Println("Could not process event:", string(b), err)
			} else {
				refBox.newEventChannel <- event
			}
		}
	}
}
