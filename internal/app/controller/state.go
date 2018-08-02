package controller

import (
	"time"
)

// a team, one of Yellow or Blue
type Team string

const (
	TeamYellow Team = "Yellow"
	TeamBlue   Team = "Blue"
)

// return the other team
// if the team is not Yellow or Blue, return the same team
func (t Team) Other() Team {
	if t == TeamYellow {
		return TeamBlue
	} else if t == TeamBlue {
		return TeamYellow
	}
	return t
}

// a stage of a match
type Stage string

const (
	StagePreGame               Stage = "Pre-Game"
	StageFirstHalf             Stage = "First Half"
	StageHalfTime              Stage = "Half Time"
	StageSecondHalfPre         Stage = "Pre-Second Half"
	StageSecondHalf            Stage = "Second Half"
	StageOvertimeBreak         Stage = "Overtime Break"
	StageOvertimeFirstHalfPre  Stage = "Pre-Overtime First Half"
	StageOvertimeFirstHalf     Stage = "Overtime First Half"
	StageOvertimeHalfTime      Stage = "Overtime Half Time"
	StageOvertimeSecondHalfPre Stage = "Pre-Overtime Second Half"
	StageOvertimeSecondHalf    Stage = "Overtime Second Half"
	StageShootoutBreak         Stage = "Shootout Half Time"
	StageShootout              Stage = "Shootout"
	StagePostGame              Stage = "End of Game"
)

// all available stages, ordered
var Stages = []Stage{
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

// a game state of a game
type GameState string

const (
	GameStateHalted        GameState = "Halted"
	GameStateStopped       GameState = "Stopped"
	GameStateRunning       GameState = "Running"
	GameStatePreKickoff    GameState = "Prepare Kickoff"
	GameStatePrePenalty    GameState = "Prepare Penalty"
	GameStateTimeout       GameState = "Timeout"
	GameStateBallPlacement GameState = "Ball Placement"
)

// team information
type TeamInfo struct {
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

// the state of the game
type State struct {
	Stage            Stage              `json:"stage"`
	GameState        GameState          `json:"gameState"`
	GameStateFor     *Team              `json:"gameStateForTeam"`
	StageTimeElapsed time.Duration      `json:"gameTimeElapsed"`
	StageTimeLeft    time.Duration      `json:"gameTimeLeft"`
	MatchDuration    time.Duration      `json:"matchDuration"`
	TeamState        map[Team]*TeamInfo `json:"teamState"`
}

// create a new state, initialized for the start of a new game
func NewRefBoxState(config Config) (refBoxState *State) {
	refBoxState = new(State)
	refBoxState.Stage = StagePreGame
	refBoxState.GameState = GameStateHalted

	// for some reason, the UI does not reset times correctly if duration is zero, so set it to 1ns
	refBoxState.StageTimeLeft = 1
	refBoxState.StageTimeElapsed = 1
	refBoxState.MatchDuration = 1

	refBoxState.TeamState = map[Team]*TeamInfo{}
	refBoxState.TeamState[TeamYellow] = new(TeamInfo)
	refBoxState.TeamState[TeamBlue] = new(TeamInfo)
	*refBoxState.TeamState[TeamYellow] = NewTeamInfo(config)
	*refBoxState.TeamState[TeamBlue] = NewTeamInfo(config)
	refBoxState.TeamState[TeamBlue].OnPositiveHalf = !refBoxState.TeamState[TeamYellow].OnPositiveHalf

	return
}

func NewTeamInfo(config Config) (t TeamInfo) {
	t.Name = ""
	t.Goals = 0
	t.Goalie = 0
	t.YellowCards = 0
	t.YellowCardTimes = []time.Duration{}
	t.RedCards = 0
	t.TimeoutsLeft = config.Normal.Timeouts
	t.TimeoutTimeLeft = config.Normal.TimeoutDuration
	t.OnPositiveHalf = true
	return
}
