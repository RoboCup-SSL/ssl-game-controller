package controller

import (
	"github.com/pkg/errors"
	"time"
)

// Team is one of Yellow or Blue
type Team string

const (
	// TeamYellow is the yellow team
	TeamYellow Team = "Yellow"
	// TeamBlue is the blue team
	TeamBlue Team = "Blue"
)

// Opposite returns the other team
// if the team is not Yellow or Blue, return the same team
func (t Team) Opposite() Team {
	if t == TeamYellow {
		return TeamBlue
	} else if t == TeamBlue {
		return TeamYellow
	}
	return t
}

// Unknown returns true if the team is not blue or yellow
func (t Team) Unknown() bool {
	return t != "Yellow" && t != "Blue"
}

// Stage represents the different stages of a game
type Stage string

const (
	// StagePreGame before game has started
	StagePreGame Stage = "Pre-Game"
	// StageFirstHalf in first half
	StageFirstHalf Stage = "First Half"
	// StageHalfTime in half time
	StageHalfTime Stage = "Half Time"
	// StageSecondHalfPre before second half
	StageSecondHalfPre Stage = "Pre-Second Half"
	// StageSecondHalf in second half
	StageSecondHalf Stage = "Second Half"
	// StageOvertimeBreak in break to overtime
	StageOvertimeBreak Stage = "Overtime Break"
	// StageOvertimeFirstHalfPre before first overtime half
	StageOvertimeFirstHalfPre Stage = "Pre-Overtime First Half"
	// StageOvertimeFirstHalf in first overtime half
	StageOvertimeFirstHalf Stage = "Overtime First Half"
	// StageOvertimeHalfTime in overtime half time
	StageOvertimeHalfTime Stage = "Overtime Half Time"
	// StageOvertimeSecondHalfPre before second overtime half
	StageOvertimeSecondHalfPre Stage = "Pre-Overtime Second Half"
	// StageOvertimeSecondHalf in second overtime half
	StageOvertimeSecondHalf Stage = "Overtime Second Half"
	// StageShootoutBreak in break to shootout
	StageShootoutBreak Stage = "Shootout Break"
	// StageShootout in Shootout
	StageShootout Stage = "Shootout"
	// StagePostGame after game ended
	StagePostGame Stage = "End of Game"
)

// Stages include all available stages, ordered
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

func (s Stage) index() (int, error) {
	for i, v := range Stages {
		if v == s {
			return i, nil
		}
	}
	return 0, errors.Errorf("unknown stage: %v", s)
}

// GameState of a game
type GameState string

const (
	// GameStateHalted halted
	GameStateHalted GameState = "Halted"
	// GameStateStopped stopped
	GameStateStopped GameState = "Stopped"
	// GameStateRunning running
	GameStateRunning GameState = "Running"
	// GameStatePreKickoff kickoff
	GameStatePreKickoff GameState = "Prepare Kickoff"
	// GameStatePrePenalty penalty
	GameStatePrePenalty GameState = "Prepare Penalty"
	// GameStateTimeout timeout
	GameStateTimeout GameState = "Timeout"
	// GameStateBallPlacement ball placement
	GameStateBallPlacement GameState = "Ball Placement"
)

// TeamInfo about a team
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

// State of the game
type State struct {
	Stage            Stage              `json:"stage"`
	GameState        GameState          `json:"gameState"`
	GameStateFor     *Team              `json:"gameStateForTeam"`
	StageTimeElapsed time.Duration      `json:"gameTimeElapsed"`
	StageTimeLeft    time.Duration      `json:"gameTimeLeft"`
	MatchDuration    time.Duration      `json:"matchDuration"`
	TeamState        map[Team]*TeamInfo `json:"teamState"`
}

// NewState creates a new state, initialized for the start of a new game
func NewState(config Config) (refBoxState *State) {
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
	*refBoxState.TeamState[TeamYellow] = newTeamInfo(config)
	*refBoxState.TeamState[TeamBlue] = newTeamInfo(config)
	refBoxState.TeamState[TeamBlue].OnPositiveHalf = !refBoxState.TeamState[TeamYellow].OnPositiveHalf

	return
}

func newTeamInfo(config Config) (t TeamInfo) {
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
