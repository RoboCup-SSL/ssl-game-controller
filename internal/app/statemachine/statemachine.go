package statemachine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/config"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"math/rand"
	"time"
)

const changeOriginStateMachine = "StateMachine"

// StateChange describes a change and its result together with a unique number
type StateChange struct {
	Id     int
	State  state.State
	Change Change
}

// StateMachine describes the state machine that translates changes into new states
type StateMachine struct {
	gameConfig config.Game
	geometry   config.Geometry
	stageTimes map[state.Referee_Stage]time.Duration
	rand       *rand.Rand
}

// NewStateMachine creates a new state machine
func NewStateMachine(gameConfig config.Game) (s *StateMachine) {
	s = new(StateMachine)
	s.gameConfig = gameConfig
	s.geometry = gameConfig.DefaultGeometry[config.DivA]
	s.stageTimes = loadStageTimes(gameConfig)
	s.rand = rand.New(rand.NewSource(time.Now().Unix()))
	return
}

// UpdateGeometry sets a new geometry
func (s *StateMachine) UpdateGeometry(geometry config.Geometry) {
	s.geometry = geometry
}

// loadStageTimes loads the stage time durations from the game config into a map
func loadStageTimes(gameConfig config.Game) (s map[state.Referee_Stage]time.Duration) {
	s = map[state.Referee_Stage]time.Duration{}
	for stage := range state.Referee_Stage_name {
		s[state.Referee_Stage(stage)] = 0
	}
	s[state.Referee_NORMAL_FIRST_HALF] = gameConfig.Normal.HalfDuration
	s[state.Referee_NORMAL_HALF_TIME] = gameConfig.Normal.HalfTimeDuration
	s[state.Referee_NORMAL_SECOND_HALF] = gameConfig.Normal.HalfDuration
	s[state.Referee_EXTRA_TIME_BREAK] = gameConfig.Normal.BreakAfter
	s[state.Referee_EXTRA_FIRST_HALF] = gameConfig.Overtime.HalfDuration
	s[state.Referee_EXTRA_HALF_TIME] = gameConfig.Overtime.HalfTimeDuration
	s[state.Referee_EXTRA_SECOND_HALF] = gameConfig.Overtime.HalfDuration
	s[state.Referee_PENALTY_SHOOTOUT_BREAK] = gameConfig.Overtime.BreakAfter
	return
}

// Process translates a state and a change into a new state and resulting new changes
func (s *StateMachine) Process(currentState state.State, change Change) (newState state.State, newChanges []Change) {
	newState = currentState
	switch change.ChangeType {
	case ChangeTypeNewCommand:
		newChanges = s.NewCommand(&newState, change.NewCommand)
	case ChangeTypeChangeStage:
		newChanges = s.ChangeStage(&newState, change.ChangeStage)
	case ChangeTypeSetBallPlacementPos:
		newChanges = s.SetBallPlacementPos(&newState, change.SetBallPlacementPos)
	case ChangeTypeAddYellowCard:
		newChanges = s.AddYellowCard(&newState, change.AddYellowCard)
	case ChangeTypeAddRedCard:
		newChanges = s.AddRedCard(&newState, change.AddRedCard)
	case ChangeTypeYellowCardOver:
		newChanges = s.YellowCardOver(&newState)
	case ChangeTypeUpdateConfig:
		newChanges = s.UpdateConfig(&newState, change.UpdateConfig)
	case ChangeTypeUpdateTeamState:
		newChanges = s.UpdateTeamState(&newState, change.UpdateTeamState)
	case ChangeTypeSwitchColors:
		newChanges = s.SwitchColors(&newState)
	case ChangeTypeAddGameEvent:
		newChanges = s.AddGameEvent(&newState, change.AddGameEvent)
	case ChangeTypeStartBallPlacement:
		newChanges = s.StartBallPlacement(&newState)
	case ChangeTypeContinue:
		newChanges = s.Continue(&newState)
	case ChangeTypeAddProposedGameEvent:
		newChanges = s.AddProposedGameEvent(&newState, change.AddProposedGameEvent)
	case ChangeTypeRevert:
		newChanges = s.Revert(&newState, change.Revert)
	}
	return
}
