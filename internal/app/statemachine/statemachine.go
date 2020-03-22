package statemachine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/config"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"math/rand"
	"time"
)

const changeOriginStateMachine = "StateMachine"

type StateChange struct {
	Id     int
	State  *state.State
	Change Change
}

type StateMachine struct {
	gameConfig config.Game
	geometry   config.Geometry
	stageTimes map[state.Stage]time.Duration
	rand       *rand.Rand
}

func NewStateMachine(gameConfig config.Game, seed int64) (s *StateMachine) {
	s = new(StateMachine)
	s.gameConfig = gameConfig
	s.geometry = *gameConfig.DefaultGeometry[config.DivA]
	s.stageTimes = loadStageTimes(gameConfig)
	s.rand = rand.New(rand.NewSource(seed))
	return
}

func (s *StateMachine) UpdateGeometry(geometry config.Geometry) {
	s.geometry = geometry
}

func (s *StateMachine) UpdateDivision(division config.Division) {
	s.geometry = *s.gameConfig.DefaultGeometry[division]
}

// loadStageTimes loads the stage time durations from the game config into a map
func loadStageTimes(gameConfig config.Game) (s map[state.Stage]time.Duration) {
	s = map[state.Stage]time.Duration{}
	for _, stage := range state.Stages {
		s[stage] = 0
	}
	s[state.StageFirstHalf] = gameConfig.Normal.HalfDuration
	s[state.StageHalfTime] = gameConfig.Normal.HalfTimeDuration
	s[state.StageSecondHalf] = gameConfig.Normal.HalfDuration
	s[state.StageOvertimeBreak] = gameConfig.Normal.BreakAfter
	s[state.StageOvertimeFirstHalf] = gameConfig.Overtime.HalfDuration
	s[state.StageOvertimeHalfTime] = gameConfig.Overtime.HalfTimeDuration
	s[state.StageOvertimeSecondHalf] = gameConfig.Overtime.HalfDuration
	s[state.StageShootoutBreak] = gameConfig.Overtime.BreakAfter
	return
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
		newChanges = s.UpdateConfig(newState, change.UpdateConfig)
	case ChangeTypeUpdateTeamState:
		newChanges = s.UpdateTeamState(newState, change.UpdateTeamState)
	case ChangeTypeSwitchColor:
		newChanges = s.SwitchColor(newState)
	case ChangeTypeAddGameEvent:
		newChanges = s.AddGameEvent(newState, change.AddGameEvent)
	case ChangeTypeStartBallPlacement:
		newChanges = s.StartBallPlacement(newState)
	case ChangeTypeContinue:
		newChanges = s.Continue(newState)
	}
	return
}
