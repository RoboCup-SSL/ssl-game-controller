package main

import (
	"time"
)

type Team string

type RefBoxStage string
type RefBoxGameState string

const (
	TeamYellow Team = "YELLOW"
	TeamBlue   Team = "BLUE"

	StagePreGame     RefBoxStage     = "preGame"
	GameStateRunning RefBoxGameState = "running"
	GameStateStopped RefBoxGameState = "stopped"
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
	Stage           RefBoxStage               `json:"stage"`
	GameState       RefBoxGameState           `json:"gameState"`
	GameTimeElapsed time.Duration             `json:"gameTimeElapsed"`
	GameTimeLeft    time.Duration             `json:"gameTimeLeft"`
	TeamState       map[Team]*RefBoxTeamState `json:"teamState"`
}

type RefBox struct {
	State *RefBoxState
	timer Timer
}

func NewRefBoxState() (refBoxState *RefBoxState) {
	refBoxState = new(RefBoxState)
	refBoxState.Stage = "First half"
	refBoxState.GameState = "Running"
	refBoxState.GameTimeLeft = 2*time.Minute + 42*time.Second
	refBoxState.GameTimeElapsed = 2*time.Minute + 18*time.Second

	refBoxState.TeamState = map[Team]*RefBoxTeamState{}
	refBoxState.TeamState[TeamYellow] = new(RefBoxTeamState)
	refBoxState.TeamState[TeamYellow].Name = "Team Yellow"
	refBoxState.TeamState[TeamYellow].Score = 5
	refBoxState.TeamState[TeamYellow].Goalie = 2
	refBoxState.TeamState[TeamYellow].YellowCards = 1
	refBoxState.TeamState[TeamYellow].YellowCardTimes = []time.Duration{80 * time.Second}
	refBoxState.TeamState[TeamYellow].RedCards = 0
	refBoxState.TeamState[TeamYellow].TimeoutsLeft = 4
	refBoxState.TeamState[TeamYellow].TimeoutTimeLeft = 5 * time.Minute
	refBoxState.TeamState[TeamYellow].OnPositiveHalf = true

	refBoxState.TeamState[TeamBlue] = new(RefBoxTeamState)
	refBoxState.TeamState[TeamBlue].Name = "Team Blue"
	refBoxState.TeamState[TeamBlue].Score = 2
	refBoxState.TeamState[TeamBlue].Goalie = 5
	refBoxState.TeamState[TeamBlue].YellowCards = 3
	refBoxState.TeamState[TeamBlue].YellowCardTimes = []time.Duration{80 * time.Second, 10 * time.Second}
	refBoxState.TeamState[TeamBlue].RedCards = 0
	refBoxState.TeamState[TeamBlue].TimeoutsLeft = 2
	refBoxState.TeamState[TeamBlue].TimeoutTimeLeft = 2 * time.Minute
	refBoxState.TeamState[TeamBlue].OnPositiveHalf = false

	return
}

func NewRefBox() (refBox *RefBox) {
	refBox = new(RefBox)
	refBox.State = NewRefBoxState()
	refBox.timer = NewTimer()

	return
}

func (r *RefBox) Run() (err error) {
	err = r.timer.Start()
	if err != nil {
		return
	}

	go func() {
		for r.timer.Running() {
			r.timer.WaitTillNextFullSecond()
			r.Tick()
			newEventChannel <- RefBoxEvent{}
		}
	}()
	return nil
}

func (r *RefBox) Tick() {
	delta := r.timer.Delta()
	r.State.GameTimeElapsed += delta
	r.State.GameTimeLeft -= delta
	for _, teamState := range r.State.TeamState {
		teamState.TimeoutTimeLeft -= delta
		for i := range teamState.YellowCardTimes {
			teamState.YellowCardTimes[i] -= delta
		}
	}
}
