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

	GameStateHalted        RefBoxGameState = "Halted"
	GameStateStopped       RefBoxGameState = "Stopped"
	GameStateRunning       RefBoxGameState = "Running"
	GameStatePreKickoff    RefBoxGameState = "Prepare Kickoff"
	GameStatePrePenalty    RefBoxGameState = "Prepare Penalty"
	GameStateTimeout       RefBoxGameState = "Timeout"
	GameStateBallPlacement RefBoxGameState = "Ball Placement"
)

var Stages = []RefBoxStage{
	StagePreGame,
	StageFirstHalf,
	StageHalfTime,
	StageSecondHalfPre,
	StageSecondHalf,
	StageOvertimeBreak,
	StageOvertimeFirstHalfPre,
	StageOvertimeFirstHalf,
	StageOvertimeHalfTime,
	StageOvertimeSecondHalfPre,
	StageOvertimeSecondHalf,
	StageShootoutBreak,
	StageShootout,
	StagePostGame,
}
var StageTimes = map[RefBoxStage]time.Duration{
	StagePreGame:               0 * time.Minute,
	StageFirstHalf:             5 * time.Minute,
	StageHalfTime:              5 * time.Minute,
	StageSecondHalfPre:         0 * time.Minute,
	StageSecondHalf:            5 * time.Minute,
	StageOvertimeBreak:         5 * time.Minute,
	StageOvertimeFirstHalfPre:  0 * time.Minute,
	StageOvertimeFirstHalf:     2*time.Minute + 30*time.Second,
	StageOvertimeHalfTime:      2 * time.Minute,
	StageOvertimeSecondHalfPre: 0 * time.Minute,
	StageOvertimeSecondHalf:    2*time.Minute + 30*time.Second,
	StageShootoutBreak:         2 * time.Minute,
	StageShootout:              0 * time.Minute,
	StagePostGame:              0 * time.Minute,
}

type RefBoxTeamState struct {
	Name            string          `json:"name"`
	Goals           int             `json:"goals"`
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
	GameStateFor    *Team                     `json:"gameStateForTeam"`
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
	refBoxState.TeamState[TeamYellow].Goals = 5
	refBoxState.TeamState[TeamYellow].Goalie = 2
	refBoxState.TeamState[TeamYellow].YellowCards = 1
	refBoxState.TeamState[TeamYellow].YellowCardTimes = []time.Duration{80 * time.Second}
	refBoxState.TeamState[TeamYellow].RedCards = 0
	refBoxState.TeamState[TeamYellow].TimeoutsLeft = 4
	refBoxState.TeamState[TeamYellow].TimeoutTimeLeft = 5 * time.Minute
	refBoxState.TeamState[TeamYellow].OnPositiveHalf = true

	refBoxState.TeamState[TeamBlue] = new(RefBoxTeamState)
	refBoxState.TeamState[TeamBlue].Name = "Team Blue"
	refBoxState.TeamState[TeamBlue].Goals = 2
	refBoxState.TeamState[TeamBlue].Goalie = 5
	refBoxState.TeamState[TeamBlue].YellowCards = 3
	refBoxState.TeamState[TeamBlue].YellowCardTimes = []time.Duration{80 * time.Second, 10 * time.Second}
	refBoxState.TeamState[TeamBlue].RedCards = 0
	refBoxState.TeamState[TeamBlue].TimeoutsLeft = 2
	refBoxState.TeamState[TeamBlue].TimeoutTimeLeft = 2 * time.Minute
	refBoxState.TeamState[TeamBlue].OnPositiveHalf = false

	return
}
