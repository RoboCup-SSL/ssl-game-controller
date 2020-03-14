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
	GameEvents            []*GameEvent       `json:"gameEvents" yaml:"gameEvents"`
	GameEventsQueued      []*GameEvent       `json:"gameEventsQueued" yaml:"gameEventsQueued"`
}

// NewState creates a new state, initialized for the start of a new game
func NewState() (s State) {
	s.Stage = StagePreGame
	s.Command = CommandHalt
	s.GameEvents = []*GameEvent{}
	s.GameEventsQueued = []*GameEvent{}

	s.StageTimeStart = time.Unix(0, 0)
	s.MatchTimeStart = time.Unix(0, 0)
	s.CurrentActionDeadline = time.Unix(0, 0)

	s.TeamState = map[Team]*TeamInfo{}
	s.TeamState[TeamYellow] = new(TeamInfo)
	s.TeamState[TeamBlue] = new(TeamInfo)
	*s.TeamState[TeamYellow] = newTeamInfo()
	*s.TeamState[TeamBlue] = newTeamInfo()
	s.TeamState[TeamBlue].OnPositiveHalf = !s.TeamState[TeamYellow].OnPositiveHalf

	return
}

func (s *State) DeepCopy() (c *State) {
	c = new(State)
	*c = *s
	c.GameEvents = make([]*GameEvent, len(s.GameEvents))
	copy(c.GameEvents, s.GameEvents)
	c.GameEventsQueued = make([]*GameEvent, len(s.GameEventsQueued))
	copy(c.GameEventsQueued, s.GameEventsQueued)
	if s.PlacementPos != nil {
		c.PlacementPos = new(Location)
		*c.PlacementPos = *s.PlacementPos
	}
	c.TeamState = make(map[Team]*TeamInfo)
	for k, v := range s.TeamState {
		c.TeamState[k] = new(TeamInfo)
		*c.TeamState[k] = v.DeepCopy()
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
		} else if event.Type == GameEventBotSubstitution {
			// reset after a sub substitution event
			blue = false
			yellow = false
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

func (s *State) PrimaryGameEvent() *GameEvent {
	if event := s.GetFirstGameEvent(GameEventMultipleCards); event != nil {
		// only this event causes a penalty kick and must be prioritized.
		return event
	}

	if event := s.GetFirstGameEvent(GameEventGoal); event != nil {
		// Goal overrides everything else
		return event
	}

	for i := len(s.GameEvents) - 1; i >= 0; i-- {
		gameEvent := s.GameEvents[i]
		if !gameEvent.IsSecondary() && gameEvent.Type != GameEventPlacementFailed {
			return gameEvent
		}
	}
	return nil
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

func (s *State) GetFirstGameEvent(gameEventType GameEventType) *GameEvent {
	for i := len(s.GameEvents) - 1; i >= 0; i-- {
		gameEvent := s.GameEvents[i]
		if gameEvent.Type == gameEventType {
			return gameEvent
		}
	}
	return nil
}
