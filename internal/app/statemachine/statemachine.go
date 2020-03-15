package statemachine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/config"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"time"
)

const changeOriginStateMachine = "StateMachine"

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
	case ChangeTypeNewCommand:
		newChanges = s.NewCommand(newState, change.NewCommand)
	case ChangeTypeChangeStage:
		newChanges = s.ChangeStage(newState, change.ChangeStage)
	case ChangeTypeSetBallPlacementPos:
		newChanges = s.SetBallPlacementPos(newState, change.SetBallPlacementPos)
	case ChangeTypeAddYellowCard:
		newChanges = s.AddYellowCard(newState, change.AddYellowCard)
	case ChangeTypeAddRedCard:
		newChanges = s.AddRedCard(newState, change.AddRedCard)
	case ChangeTypeYellowCardOver:
		newChanges = s.YellowCardOver(newState)
	case ChangeTypeUpdateConfig:
		newChanges = s.UpdateConfig(change.UpdateConfig)
	case ChangeTypeUpdateTeamState:
		newChanges = s.UpdateTeamState(newState, change.UpdateTeamState)
	case ChangeTypeSwitchColor:
		newChanges = s.SwitchColor(newState)
	}
	return
}
