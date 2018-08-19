package controller

import (
	"encoding/json"
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

// Known returns true if the team is blue or yellow
func (t Team) Known() bool {
	return !t.Unknown()
}

// Stage represents the different stages of a game
type Stage string

const (
	// StagePreGame before game has started
	StagePreGame Stage = "Pre-First Half"
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

func (s Stage) Next() Stage {
	index, err := s.index()
	if err != nil {
		return s
	}
	nextIndex := index + 1
	if nextIndex >= len(Stages) {
		return s
	}
	return Stages[nextIndex]
}

func (s Stage) Previous() Stage {
	index, err := s.index()
	if err != nil {
		return s
	}
	nextIndex := index - 1
	if nextIndex < 0 {
		return s
	}
	return Stages[nextIndex]
}

func (s Stage) IsPreStage() bool {
	switch s {
	case StagePreGame, StageSecondHalfPre, StageOvertimeFirstHalfPre, StageOvertimeSecondHalfPre:
		return true
	}
	return false
}

// RefCommand is a command to be send to the teams
type RefCommand string

const (
	// CommandHalt HALT
	CommandHalt RefCommand = "halt"
	// CommandStop STOP
	CommandStop RefCommand = "stop"
	// CommandNormalStart NORMAL_START
	CommandNormalStart RefCommand = "normalStart"
	// CommandForceStart FORCE_START
	CommandForceStart RefCommand = "forceStart"
	// CommandDirect DIRECT
	CommandDirect RefCommand = "direct"
	// CommandIndirect INDIRECT
	CommandIndirect RefCommand = "indirect"
	// CommandKickoff KICKOFF
	CommandKickoff RefCommand = "kickoff"
	// CommandPenalty PENALTY
	CommandPenalty RefCommand = "penalty"
	// CommandTimeout TIMEOUT
	CommandTimeout RefCommand = "timeout"
	// CommandBallPlacement BALL_PLACEMENT
	CommandBallPlacement RefCommand = "ballPlacement"
)

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
	Name                  string          `json:"name"`
	Goals                 int             `json:"goals"`
	Goalie                int             `json:"goalie"`
	YellowCards           int             `json:"yellowCards"`
	YellowCardTimes       []time.Duration `json:"yellowCardTimes"`
	RedCards              int             `json:"redCards"`
	TimeoutsLeft          int             `json:"timeoutsLeft"`
	TimeoutTimeLeft       time.Duration   `json:"timeoutTimeLeft"`
	OnPositiveHalf        bool            `json:"onPositiveHalf"`
	BotCollisions         int             `json:"botCollisions"`
	BallPlacementFailures int             `json:"ballPlacementFailures"`
	BotSpeedInfringements int             `json:"botSpeedInfringements"`
}

// State of the game
type State struct {
	Stage            Stage              `json:"stage"`
	Command          RefCommand         `json:"command"`
	GameEvent        GameEventType      `json:"gameEvent"`
	GameEventFor     Team               `json:"gameEventForTeam"`
	CommandFor       Team               `json:"commandForTeam"`
	StageTimeElapsed time.Duration      `json:"stageTimeElapsed"`
	StageTimeLeft    time.Duration      `json:"stageTimeLeft"`
	MatchTimeStart   time.Time          `json:"matchTimeStart"`
	MatchDuration    time.Duration      `json:"matchDuration"`
	TeamState        map[Team]*TeamInfo `json:"teamState"`
}

// NewState creates a new state, initialized for the start of a new game
func NewState() (s *State) {
	s = new(State)
	s.Stage = StagePreGame
	s.Command = CommandHalt
	s.GameEvent = GameEventUnknown

	s.StageTimeLeft = 0
	s.StageTimeElapsed = 0
	s.MatchDuration = 0
	s.MatchTimeStart = time.Unix(0, 0)

	s.TeamState = map[Team]*TeamInfo{}
	s.TeamState[TeamYellow] = new(TeamInfo)
	s.TeamState[TeamBlue] = new(TeamInfo)
	*s.TeamState[TeamYellow] = newTeamInfo()
	*s.TeamState[TeamBlue] = newTeamInfo()
	s.TeamState[TeamBlue].OnPositiveHalf = !s.TeamState[TeamYellow].OnPositiveHalf

	return
}

func (s State) GameState() GameState {
	switch s.Command {
	case CommandHalt:
		return GameStateHalted
	case CommandStop:
		return GameStateStopped
	case CommandNormalStart, CommandForceStart, CommandDirect, CommandIndirect:
		return GameStateRunning
	case CommandKickoff:
		return GameStatePreKickoff
	case CommandPenalty:
		return GameStatePrePenalty
	case CommandTimeout:
		return GameStateTimeout
	case CommandBallPlacement:
		return GameStateBallPlacement
	}
	return ""
}

func newTeamInfo() (t TeamInfo) {
	t.Name = ""
	t.Goals = 0
	t.Goalie = 0
	t.YellowCards = 0
	t.YellowCardTimes = []time.Duration{}
	t.RedCards = 0
	t.TimeoutsLeft = 0
	t.TimeoutTimeLeft = 0
	t.OnPositiveHalf = true
	t.BotCollisions = 0
	t.BallPlacementFailures = 0
	t.BotSpeedInfringements = 0
	return
}

func (t TeamInfo) String() string {
	bytes, e := json.Marshal(t)
	if e != nil {
		return e.Error()
	}
	return string(bytes)
}

func (s State) String() string {
	bytes, e := json.Marshal(s)
	if e != nil {
		return e.Error()
	}
	return string(bytes)
}
