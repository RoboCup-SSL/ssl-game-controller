package state

import (
	"encoding/json"
	"time"
)

// State of the game
type State struct {
	Stage                 Stage              `json:"stage" yaml:"stage"`
	Command               RefCommand         `json:"command" yaml:"command"`
	CommandFor            Team               `json:"commandForTeam" yaml:"commandForTeam"`
	StageTimeStart        time.Time          `json:"stageTimeElapsed" yaml:"stageTimeElapsed"`
	MatchTimeStart        time.Time          `json:"matchTimeStart" yaml:"matchTimeStart"`
	TeamState             map[Team]*TeamInfo `json:"teamState" yaml:"teamState"`
	PlacementPos          *Location          `json:"placementPos" yaml:"placementPos"`
	NextCommand           RefCommand         `json:"nextCommand" yaml:"nextCommand"`
	NextCommandFor        Team               `json:"nextCommandFor" yaml:"nextCommandFor"`
	PrevCommands          []RefCommand       `json:"prevCommands" yaml:"prevCommands"`
	PrevCommandsFor       []Team             `json:"prevCommandsFor" yaml:"prevCommandsFor"`
	CurrentActionDeadline time.Time          `json:"currentActionDeadline" yaml:"currentActionDeadline"`
	GameEvents            []GameEvent        `json:"gameEvents" yaml:"gameEvents"`
	GameEventsQueued      []GameEvent        `json:"gameEventsQueued" yaml:"gameEventsQueued"`
}

// NewState creates a new state, initialized for the start of a new game
func NewState() (s State) {
	s.Stage = StagePreGame
	s.Command = CommandHalt
	s.GameEvents = []GameEvent{}
	s.GameEventsQueued = []GameEvent{}

	s.StageTimeStart = time.Unix(0, 0)
	s.MatchTimeStart = time.Unix(0, 0)
	s.CurrentActionDeadline = time.Unix(0, 0)

	s.TeamState = map[Team]*TeamInfo{}
	s.TeamState[Team_YELLOW] = new(TeamInfo)
	s.TeamState[Team_BLUE] = new(TeamInfo)
	*s.TeamState[Team_YELLOW] = newTeamInfo()
	*s.TeamState[Team_BLUE] = newTeamInfo()
	s.TeamState[Team_BLUE].OnPositiveHalf = !s.TeamState[Team_YELLOW].OnPositiveHalf

	return
}

func (s *State) DeepCopy() (c *State) {
	c = new(State)
	*c = *s

	if s.GameEvents != nil {
		c.GameEvents = make([]GameEvent, len(s.GameEvents))
		copy(c.GameEvents, s.GameEvents)
	}
	if s.GameEventsQueued != nil {
		c.GameEventsQueued = make([]GameEvent, len(s.GameEventsQueued))
		copy(c.GameEventsQueued, s.GameEventsQueued)
	}
	if s.PlacementPos != nil {
		c.PlacementPos = new(Location)
		*c.PlacementPos = *s.PlacementPos
	}
	if s.TeamState != nil {
		c.TeamState = make(map[Team]*TeamInfo)
		for k, v := range s.TeamState {
			c.TeamState[k] = new(TeamInfo)
			*c.TeamState[k] = v.DeepCopy()
		}
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

func (s State) String() string {
	bytes, e := json.Marshal(s)
	if e != nil {
		return e.Error()
	}
	return string(bytes)
}

func (s *State) TeamByName(teamName string) Team {
	if s.TeamState[Team_BLUE].Name == teamName {
		return Team_BLUE
	}
	if s.TeamState[Team_YELLOW].Name == teamName {
		return Team_YELLOW
	}
	return Team_UNKNOWN
}
