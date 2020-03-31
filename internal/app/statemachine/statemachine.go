package statemachine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/config"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/golang/protobuf/proto"
	"log"
	"math/rand"
	"time"
)

const changeOriginStateMachine = "StateMachine"

// StateMachine describes the state machine that translates changes into new states
type StateMachine struct {
	gameConfig config.Game
	Geometry   config.Geometry
	stageTimes map[state.Referee_Stage]time.Duration
	rand       *rand.Rand
}

// NewStateMachine creates a new state machine
func NewStateMachine(gameConfig config.Game) (s *StateMachine) {
	s = new(StateMachine)
	s.gameConfig = gameConfig
	s.Geometry = gameConfig.DefaultGeometry[config.DivA]
	s.stageTimes = loadStageTimes(gameConfig)
	s.rand = rand.New(rand.NewSource(time.Now().Unix()))
	return
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
func (s *StateMachine) Process(currentState *state.State, change *Change) (newState *state.State, newChanges []*Change) {
	if change.Revertible == nil {
		change.Revertible = new(bool)
		// By default, changes are not revertible
		*change.Revertible = false
	}

	newState = new(state.State)
	proto.Merge(newState, currentState)
	log.Printf("Processing change: %v", change)
	if change.GetNewCommand() != nil {
		newChanges = s.NewCommand(newState, change.GetNewCommand())
	}
	if change.GetChangeStage() != nil {
		newChanges = s.ChangeStage(newState, change.GetChangeStage())
	}
	if change.GetSetBallPlacementPos() != nil {
		newChanges = s.SetBallPlacementPos(newState, change.GetSetBallPlacementPos())
	}
	if change.GetAddYellowCard() != nil {
		newChanges = s.AddYellowCard(newState, change.GetAddYellowCard())
	}
	if change.GetAddRedCard() != nil {
		newChanges = s.AddRedCard(newState, change.GetAddRedCard())
	}
	if change.GetYellowCardOver() != nil {
		newChanges = s.YellowCardOver(newState)
	}
	if change.GetUpdateConfig() != nil {
		newChanges = s.UpdateConfig(newState, change.GetUpdateConfig())
	}
	if change.GetUpdateTeamState() != nil {
		newChanges = s.UpdateTeamState(newState, change.GetUpdateTeamState())
	}
	if change.GetSwitchColors() != nil {
		newChanges = s.SwitchColors(newState)
	}
	if change.GetAddGameEvent() != nil {
		newChanges = s.AddGameEvent(newState, change.GetAddGameEvent())
	}
	if change.GetStartBallPlacement() != nil {
		newChanges = s.StartBallPlacement(newState)
	}
	if change.GetContinue() != nil {
		newChanges = s.Continue(newState)
	}
	if change.GetAddProposedGameEvent() != nil {
		newChanges = s.AddProposedGameEvent(newState, change.GetAddProposedGameEvent())
	}

	for i := range newChanges {
		newChanges[i].Origin = new(string)
		*newChanges[i].Origin = changeOriginStateMachine
	}

	return
}
