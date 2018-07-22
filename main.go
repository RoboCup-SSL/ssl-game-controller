package main

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/websocket"
	"log"
	"net/http"
	"time"
)

type RefBoxTeamState struct {
	Score       int `json:"score"`
	YellowCards int `json:"yellow_cards"`
}

type RefBoxState struct {
	GameStatus   string                    `json:"gameStatus"`
	GameTimeLeft time.Duration             `json:"gameTimeLeft"`
	TeamState    map[Team]*RefBoxTeamState `json:"team_state"`
}

type Team string

const (
	TEAM_YELLOW = "YELLOW"
	TEAM_BLUE   = "BLUE"
)

type RefBoxEventYellowCard struct {
	ForTeam Team `json:"for_team"`
}

type RefBoxEventRedCard struct {
	ForTeam Team `json:"for_team"`
}

type RefBoxEvent struct {
	YellowCard *RefBoxEventYellowCard `json:"yellow_card"`
	RedCard    *RefBoxEventRedCard    `json:"red_card"`
}

var refBoxState RefBoxState

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     func(*http.Request) bool { return true },
}

func main() {

	refBoxState.GameStatus = "Pre-Game"
	refBoxState.GameTimeLeft = 10 * time.Minute
	refBoxState.TeamState = map[Team]*RefBoxTeamState{}
	refBoxState.TeamState[TEAM_YELLOW] = new(RefBoxTeamState)
	refBoxState.TeamState[TEAM_YELLOW].YellowCards = 1
	refBoxState.TeamState[TEAM_YELLOW].Score = 5
	refBoxState.TeamState[TEAM_BLUE] = new(RefBoxTeamState)
	refBoxState.TeamState[TEAM_BLUE].YellowCards = 2
	refBoxState.TeamState[TEAM_BLUE].Score = 7

	http.Handle("/", http.FileServer(http.Dir(".")))
	http.HandleFunc("/ws", wsHandler)
	http.ListenAndServe(":8081", nil)
}

func wsHandler(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}
	defer conn.Close()
	defer log.Println("Client disconnected")

	log.Println("Client connected")

	for {
		b, err := json.Marshal(refBoxState)
		if err != nil {
			fmt.Println("Marshal error:", err)
		}
		conn.WriteMessage(websocket.TextMessage, b)

		messageType, b, err := conn.ReadMessage()
		if err == nil && messageType == websocket.TextMessage {

			event := RefBoxEvent{}
			err = json.Unmarshal(b, &event)
			if err != nil {
				log.Println("Could not read event:", string(b), err)
			} else {
				if event.YellowCard != nil {
					log.Println("yellow card for team", event.YellowCard.ForTeam)
					teamState := refBoxState.TeamState[event.YellowCard.ForTeam]
					teamState.YellowCards++
				}
				if event.RedCard != nil {
					log.Println("red card for team", event.RedCard.ForTeam)
				}
			}
		}

		time.Sleep(1 * time.Second)
	}
}
