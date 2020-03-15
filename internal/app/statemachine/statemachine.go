package statemachine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/config"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"time"
)

type StateChange struct {
	Id     int
	State  *state.State
	Change Change
}

type StateMachine struct {
	cfg         *Config
	cfgFilename string
	gameConfig  config.Game
	geometry    config.Geometry
	stageTimes  map[state.Stage]time.Duration
}

func NewStateMachine(gameConfig config.Game, cfgFilename string) (s *StateMachine) {
	s = new(StateMachine)
	s.cfg = DefaultConfig()
	s.cfgFilename = cfgFilename
	s.cfg.LoadFrom(s.cfgFilename)
	s.cfg.Division = gameConfig.DefaultDivision
	s.gameConfig = gameConfig
	s.geometry = *gameConfig.DefaultGeometry[s.cfg.Division]
	s.stageTimes = loadStageTimes(gameConfig)
	return
}

// Save saves the state machine config to a file
func (s *StateMachine) Save() error {
	return s.cfg.SaveTo(s.cfgFilename)
}

func (s *StateMachine) Process(currentState *state.State, change Change) (newState *state.State, newChanges []Change) {
	newState = currentState.DeepCopy()
	switch change.ChangeType {
	case ChangeTypeTick:

	case ChangeTypeNewCommand:
		newState.Command = change.NewCommand.Command
		newState.CommandFor = change.NewCommand.CommandFor
	case ChangeTypeAddGameEvent:
		newState.GameEvents = append(newState.GameEvents, change.AddGameEvent.GameEvent)
	}
	return
}
