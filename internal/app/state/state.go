package state

import (
	"encoding/json"
	"time"
)

// State of the game
type State struct {
	Stage                      Stage               `json:"stage" yaml:"stage"`
	Command                    RefCommand          `json:"command" yaml:"command"`
	CommandFor                 Team                `json:"commandForTeam" yaml:"commandForTeam"`
	StageTimeElapsed           time.Duration       `json:"stageTimeElapsed" yaml:"stageTimeElapsed"`
	StageTimeLeft              time.Duration       `json:"stageTimeLeft" yaml:"stageTimeLeft"`
	MatchTimeStart             time.Time           `json:"matchTimeStart" yaml:"matchTimeStart"`
	MatchDuration              time.Duration       `json:"matchDuration" yaml:"matchDuration"`
	TeamState                  map[Team]*TeamInfo  `json:"teamState" yaml:"teamState"`
	PlacementPos               *Location           `json:"placementPos" yaml:"placementPos"`
	NextCommand                RefCommand          `json:"nextCommand" yaml:"nextCommand"`
	NextCommandFor             Team                `json:"nextCommandFor" yaml:"nextCommandFor"`
	PrevCommands               []RefCommand        `json:"prevCommands" yaml:"prevCommands"`
	PrevCommandsFor            []Team              `json:"prevCommandsFor" yaml:"prevCommandsFor"`
	CurrentActionTimeRemaining time.Duration       `json:"currentActionTimeRemaining" yaml:"currentActionTimeRemaining"`
	ProposedGameEvents         []ProposedGameEvent `json:"proposedGameEvents" yaml:"proposedGameEvents"`
}

// NewState creates a new state, initialized for the start of a new game
func NewState() (s State) {
	s.Stage = StagePreGame
	s.Command = CommandHalt
	s.ProposedGameEvents = []ProposedGameEvent{}

	s.StageTimeLeft = 0
	s.StageTimeElapsed = 0
	s.MatchDuration = 0
	s.MatchTimeStart = time.Unix(0, 0)

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

	if s.ProposedGameEvents != nil {
		c.ProposedGameEvents = make([]ProposedGameEvent, len(s.ProposedGameEvents))
		copy(c.ProposedGameEvents, s.ProposedGameEvents)
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
	return s.Command.GameState()
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
