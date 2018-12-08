package controller

import (
	"encoding/json"
	"fmt"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/config"
	"github.com/RoboCup-SSL/ssl-game-controller/pkg/refproto"
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
	// TeamUnknown is an unknown team
	TeamUnknown Team = ""
	// TeamBoth are both teams
	TeamBoth = "Both"
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

func (t Team) toProto() refproto.Team {
	if t == TeamYellow {
		return refproto.Team_YELLOW
	} else if t == TeamBlue {
		return refproto.Team_BLUE
	} else if t == TeamBoth {
		return refproto.Team_BOTH
	}
	return refproto.Team_UNKNOWN
}

// NewTeam creates a team from a protobuf team. Its either a single team or unknown. Not both.
func NewTeam(team refproto.Team) Team {
	if team == refproto.Team_YELLOW {
		return TeamYellow
	} else if team == refproto.Team_BLUE {
		return TeamBlue
	}
	return TeamUnknown
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

func (s Stage) IsPausedStage() bool {
	switch s {
	case StageHalfTime, StageOvertimeBreak, StageOvertimeHalfTime, StageShootoutBreak:
		return true
	}
	return false
}

// RefCommand is a command to be send to the teams
type RefCommand string

const (
	// CommandUnknown not set
	CommandUnknown RefCommand = ""
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

func (c RefCommand) ContinuesGame() bool {
	switch c {
	case CommandNormalStart,
		CommandForceStart,
		CommandDirect,
		CommandIndirect,
		CommandPenalty,
		CommandKickoff:
		return true
	default:
		return false
	}
}

func (c RefCommand) NeedsTeam() bool {
	switch c {
	case CommandUnknown, CommandHalt, CommandStop, CommandNormalStart, CommandForceStart:
		return false
	default:
		return true
	}
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
	Name                  string          `json:"name"`
	Goals                 int             `json:"goals"`
	Goalkeeper            int             `json:"goalkeeper"`
	YellowCards           int             `json:"yellowCards"`
	YellowCardTimes       []time.Duration `json:"yellowCardTimes"`
	RedCards              int             `json:"redCards"`
	TimeoutsLeft          int             `json:"timeoutsLeft"`
	TimeoutTimeLeft       time.Duration   `json:"timeoutTimeLeft"`
	OnPositiveHalf        bool            `json:"onPositiveHalf"`
	FoulCounter           int             `json:"foulCounter"`
	BallPlacementFailures int             `json:"ballPlacementFailures"`
	CanPlaceBall          bool            `json:"canPlaceBall"`
	MaxAllowedBots        int             `json:"maxAllowedBots"`
	Connected             bool            `json:"connected"`
	BotSubstitutionIntend bool            `json:"botSubstitutionIntend"`
}

func (t TeamInfo) DeepCopy() (c TeamInfo) {
	c = t
	copy(c.YellowCardTimes, t.YellowCardTimes)
	return
}

type GameEventBehavior string

const (
	GameEventBehaviorOn       GameEventBehavior = "on"
	GameEventBehaviorMajority GameEventBehavior = "majority"
	GameEventBehaviorOff      GameEventBehavior = "off"
)

// GameEventProposal holds a proposal for a game event from an autoRef
type GameEventProposal struct {
	ProposerId string    `json:"proposerId"`
	GameEvent  GameEvent `json:"gameEvent"`
	ValidUntil time.Time `json:"validUntil"`
}

// State of the game
type State struct {
	Stage                       Stage                               `json:"stage"`
	Command                     RefCommand                          `json:"command"`
	CommandFor                  Team                                `json:"commandForTeam"`
	GameEvents                  []*GameEvent                        `json:"gameEvents"`
	StageTimeElapsed            time.Duration                       `json:"stageTimeElapsed"`
	StageTimeLeft               time.Duration                       `json:"stageTimeLeft"`
	MatchTimeStart              time.Time                           `json:"matchTimeStart"`
	MatchDuration               time.Duration                       `json:"matchDuration"` // MatchDuration contains the updated match duration based on MatchTimeStart for the UI
	TeamState                   map[Team]*TeamInfo                  `json:"teamState"`
	Division                    config.Division                     `json:"division"`
	PlacementPos                *Location                           `json:"placementPos"`
	AutoContinue                bool                                `json:"autoContinue"`
	NextCommand                 RefCommand                          `json:"nextCommand"`
	NextCommandFor              Team                                `json:"nextCommandFor"`
	AutoRefsConnected           []string                            `json:"autoRefsConnected"`
	GameEventBehavior           map[GameEventType]GameEventBehavior `json:"gameEventBehavior"`
	GameEventProposals          []*GameEventProposal                `json:"gameEventProposals"`
	LackOfProgressDeadline      time.Time                           `json:"lackOfProgressDeadline"`
	LackOfProgressTimeRemaining time.Duration                       `json:"lackOfProgressTimeRemaining"` // LackOfProgressTimeRemaining contains the updated remaining lack of progress time for the UI
}

// NewState creates a new state, initialized for the start of a new game
func NewState() (s *State) {
	s = new(State)
	s.Stage = StagePreGame
	s.Command = CommandHalt
	s.GameEvents = []*GameEvent{}

	s.StageTimeLeft = 0
	s.StageTimeElapsed = 0
	s.MatchDuration = 0
	s.MatchTimeStart = time.Unix(0, 0)
	s.LackOfProgressDeadline = time.Unix(0, 0)

	s.TeamState = map[Team]*TeamInfo{}
	s.TeamState[TeamYellow] = new(TeamInfo)
	s.TeamState[TeamBlue] = new(TeamInfo)
	*s.TeamState[TeamYellow] = newTeamInfo()
	*s.TeamState[TeamBlue] = newTeamInfo()
	s.TeamState[TeamBlue].OnPositiveHalf = !s.TeamState[TeamYellow].OnPositiveHalf

	s.Division = config.DivA
	s.AutoContinue = true

	s.GameEventBehavior = map[GameEventType]GameEventBehavior{}
	for _, event := range AllGameEvents() {
		s.GameEventBehavior[event] = GameEventBehaviorOn
	}

	return
}

func (s State) DeepCopy() (c State) {
	c = s
	c.GameEvents = []*GameEvent{}
	copy(c.GameEvents, s.GameEvents)
	c.AutoRefsConnected = []string{}
	copy(c.AutoRefsConnected, s.AutoRefsConnected)
	c.GameEventProposals = []*GameEventProposal{}
	copy(c.GameEventProposals, s.GameEventProposals)
	if s.PlacementPos != nil {
		c.PlacementPos = new(Location)
		*c.PlacementPos = *s.PlacementPos
	}
	c.TeamState = make(map[Team]*TeamInfo)
	for k, v := range s.TeamState {
		c.TeamState[k] = new(TeamInfo)
		*c.TeamState[k] = v.DeepCopy()
	}
	c.GameEventBehavior = make(map[GameEventType]GameEventBehavior)
	for k, v := range s.GameEventBehavior {
		c.GameEventBehavior[k] = v
	}
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

func (s State) BotSubstitutionIntend() Team {
	blue := false
	yellow := false
	for _, event := range s.GameEvents {
		if event.Type == GameEventTooManyRobots {
			blue = blue || event.ByTeam() == TeamBlue
			yellow = yellow || event.ByTeam() == TeamYellow
			break
		}
	}

	yellow = yellow || s.TeamState[TeamYellow].BotSubstitutionIntend
	blue = blue || s.TeamState[TeamBlue].BotSubstitutionIntend

	if yellow && blue {
		return TeamBoth
	}
	if yellow {
		return TeamYellow
	}
	if blue {
		return TeamBlue
	}
	return TeamUnknown
}

func (s State) PrimaryGameEvent() (e *GameEvent) {
	e = nil
	for i := len(s.GameEvents) - 1; i >= 0; i-- {
		e = s.GameEvents[i]
		switch e.Type {
		case GameEventMultipleCards:
			// only this event causes a penalty kick and must be prioritized.
			return
		case GameEventGoal:
			// Goal overrides everything else
			return
		}
	}
	return
}

func newTeamInfo() (t TeamInfo) {
	t.Name = ""
	t.Goals = 0
	t.Goalkeeper = 0
	t.YellowCards = 0
	t.YellowCardTimes = []time.Duration{}
	t.RedCards = 0
	t.TimeoutsLeft = 0
	t.TimeoutTimeLeft = 0
	t.OnPositiveHalf = true
	t.FoulCounter = 0
	t.BallPlacementFailures = 0
	t.CanPlaceBall = true
	t.MaxAllowedBots = 0
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

func (s *State) TeamByName(teamName string) Team {
	if s.TeamState[TeamBlue].Name == teamName {
		return TeamBlue
	}
	if s.TeamState[TeamYellow].Name == teamName {
		return TeamYellow
	}
	return ""
}

// Location is a two-dimensional coordinate
type Location struct {
	X float64 `json:"x"`
	Y float64 `json:"y"`
}

func (l Location) toProto() (p *refproto.Location) {
	p = new(refproto.Location)
	p.X = new(float32)
	p.Y = new(float32)
	*p.X = float32(l.X)
	*p.Y = float32(l.Y)
	return
}

func (l Location) String() string {
	return fmt.Sprintf("%.3fm | %.3fm", l.X, l.Y)
}
