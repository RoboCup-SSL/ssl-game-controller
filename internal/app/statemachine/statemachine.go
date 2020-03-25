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
func (s *StateMachine) Process(currentState *state.State, change *Change) (newState *state.State, newChanges []*Change) {
	newState = new(state.State)
	proto.Merge(newState, currentState)
	log.Printf("Processing change: %v", change)
	if change.NewCommand != nil {
		newChanges = s.NewCommand(newState, change.NewCommand)
	}
	if change.ChangeStage != nil {
		newChanges = s.ChangeStage(newState, change.ChangeStage)
	}
	if change.SetBallPlacementPos != nil {
		newChanges = s.SetBallPlacementPos(newState, change.SetBallPlacementPos)
	}
	if change.AddYellowCard != nil {
		newChanges = s.AddYellowCard(newState, change.AddYellowCard)
	}
	if change.AddRedCard != nil {
		newChanges = s.AddRedCard(newState, change.AddRedCard)
	}
	if change.YellowCardOver != nil {
		newChanges = s.YellowCardOver(newState)
	}
	if change.UpdateConfig != nil {
		newChanges = s.UpdateConfig(newState, change.UpdateConfig)
	}
	if change.UpdateTeamState != nil {
		newChanges = s.UpdateTeamState(newState, change.UpdateTeamState)
	}
	if change.SwitchColors != nil {
		newChanges = s.SwitchColors(newState)
	}
	if change.AddGameEvent != nil {
		newChanges = s.AddGameEvent(newState, change.AddGameEvent)
	}
	if change.StartBallPlacement != nil {
		newChanges = s.StartBallPlacement(newState)
	}
	if change.Continue != nil {
		newChanges = s.Continue(newState)
	}
	if change.AddProposedGameEvent != nil {
		newChanges = s.AddProposedGameEvent(newState, change.AddProposedGameEvent)
	}
	if change.Revert != nil {
		newChanges = s.Revert(newState, change.Revert)
	}

	for i := range newChanges {
		newChanges[i].Origin = new(string)
		*newChanges[i].Origin = changeOriginStateMachine
	}

	return
}
