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
	Name            string          `json:"name"`
	Score           int             `json:"score"`
	Goalie          int             `json:"goalie"`
	YellowCards     int             `json:"yellowCards"`
	YellowCardTimes []time.Duration `json:"yellowCardTimes"`
	RedCards        int             `json:"redCards"`
	TimeoutsLeft    int             `json:"timeoutsLeft"`
	TimeoutTimeLeft time.Duration   `json:"timeoutTimeLeft"`
	OnPositiveHalf  bool            `json:"onPositiveHalf"`
}

type RefBoxState struct {
	Stage           string                    `json:"stage"`
	GameState       string                    `json:"gameState"`
	GameTimeElapsed time.Duration             `json:"gameTimeElapsed"`
	GameTimeLeft    time.Duration             `json:"gameTimeLeft"`
	TeamState       map[Team]*RefBoxTeamState `json:"teamState"`
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

	refBoxState.Stage = "First half"
	refBoxState.GameState = "Running"
	refBoxState.GameTimeLeft = 2*time.Minute + 42*time.Second
	refBoxState.GameTimeElapsed = 2*time.Minute + 18*time.Second

	refBoxState.TeamState = map[Team]*RefBoxTeamState{}
	refBoxState.TeamState[TEAM_YELLOW] = new(RefBoxTeamState)
	refBoxState.TeamState[TEAM_YELLOW].Name = "Team Yellow"
	refBoxState.TeamState[TEAM_YELLOW].Score = 5
	refBoxState.TeamState[TEAM_YELLOW].Goalie = 2
	refBoxState.TeamState[TEAM_YELLOW].YellowCards = 1
	refBoxState.TeamState[TEAM_YELLOW].YellowCardTimes = []time.Duration{80 * time.Second}
	refBoxState.TeamState[TEAM_YELLOW].RedCards = 0
	refBoxState.TeamState[TEAM_YELLOW].TimeoutsLeft = 4
	refBoxState.TeamState[TEAM_YELLOW].TimeoutTimeLeft = 5 * time.Minute
	refBoxState.TeamState[TEAM_YELLOW].OnPositiveHalf = true

	refBoxState.TeamState[TEAM_BLUE] = new(RefBoxTeamState)
	refBoxState.TeamState[TEAM_BLUE].Name = "Team Blue"
	refBoxState.TeamState[TEAM_BLUE].Score = 2
	refBoxState.TeamState[TEAM_BLUE].Goalie = 5
	refBoxState.TeamState[TEAM_BLUE].YellowCards = 3
	refBoxState.TeamState[TEAM_BLUE].YellowCardTimes = []time.Duration{80 * time.Second, 10 * time.Second}
	refBoxState.TeamState[TEAM_BLUE].RedCards = 0
	refBoxState.TeamState[TEAM_BLUE].TimeoutsLeft = 2
	refBoxState.TeamState[TEAM_BLUE].TimeoutTimeLeft = 2 * time.Minute
	refBoxState.TeamState[TEAM_BLUE].OnPositiveHalf = false

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
