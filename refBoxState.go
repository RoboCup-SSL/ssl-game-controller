package main

import (
	"time"
)

type Team string

type RefBoxStage string
type RefBoxGameState string

const (
	TeamYellow Team = "Yellow"
	TeamBlue   Team = "Blue"

	StagePreGame               RefBoxStage = "Pre-Game"
	StageFirstHalf             RefBoxStage = "First Half"
	StageHalfTime              RefBoxStage = "Half Time"
	StageSecondHalfPre         RefBoxStage = "Pre-Second Half"
	StageSecondHalf            RefBoxStage = "Second Half"
	StageOvertimeBreak         RefBoxStage = "Overtime Break"
	StageOvertimeFirstHalfPre  RefBoxStage = "Pre-Overtime First Half"
	StageOvertimeFirstHalf     RefBoxStage = "Overtime First Half"
	StageOvertimeHalfTime      RefBoxStage = "Overtime Half Time"
	StageOvertimeSecondHalfPre RefBoxStage = "Pre-Overtime Second Half"
	StageOvertimeSecondHalf    RefBoxStage = "Overtime Second Half"
	StageShootoutBreak         RefBoxStage = "Shootout Half Time"
	StageShootout              RefBoxStage = "Shootout"
	StagePostGame              RefBoxStage = "End of Game"

	GameStateHalted              RefBoxGameState = "Halted"
	GameStateStopped             RefBoxGameState = "Stopped"
	GameStateRunning             RefBoxGameState = "Running"
	GameStatePreKickoffYellow    RefBoxGameState = "Prepare Kickoff for Yellow"
	GameStatePreKickoffBlue      RefBoxGameState = "Prepare Kickoff for Blue"
	GameStatePrePenaltyYellow    RefBoxGameState = "Prepare Penalty for Yellow"
	GameStatePrePenaltyBlue      RefBoxGameState = "Prepare Penalty for Blue"
	GameStateTimeoutYellow       RefBoxGameState = "Timeout for Yellow"
	GameStateTimeoutBlue         RefBoxGameState = "Timeout for Blue"
	GameStateBallPlacementYellow RefBoxGameState = "Ball Placement for Yellow"
	GameStateBallPlacementBlue   RefBoxGameState = "Ball Placement for Blue"
)

var breakStages = map[RefBoxStage]struct{}{StageHalfTime: {}, StageOvertimeBreak: {}, StageOvertimeHalfTime: {}, StageShootoutBreak: {}}

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
	MatchDuration   time.Duration             `json:"matchDuration"`
	TeamState       map[Team]*RefBoxTeamState `json:"teamState"`
}

func NewRefBoxState() (refBoxState *RefBoxState) {
	refBoxState = new(RefBoxState)
	refBoxState.Stage = "First half"
	refBoxState.GameState = "Running"
	refBoxState.GameTimeLeft = 0
	refBoxState.GameTimeElapsed = 0

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
