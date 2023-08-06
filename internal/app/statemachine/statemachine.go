package statemachine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/config"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/RoboCup-SSL/ssl-game-controller/pkg/timer"
	"google.golang.org/protobuf/proto"
	"log"
	"math/rand"
	"time"
)

var changeOriginStateMachine = "StateMachine"

// StateMachine describes the state machine that translates changes into new states
type StateMachine struct {
	gameConfig   config.Game
	Geometry     config.Geometry
	stageTimes   map[state.Referee_Stage]time.Duration
	rand         *rand.Rand
	timeProvider timer.TimeProvider
}

// NewStateMachine creates a new state machine
func NewStateMachine(gameConfig config.Game) (s *StateMachine) {
	s = new(StateMachine)
	s.gameConfig = gameConfig
	s.Geometry = gameConfig.DefaultGeometry[config.DivA]
	s.stageTimes = loadStageTimes(gameConfig)
	s.rand = rand.New(rand.NewSource(time.Now().Unix()))
	log.Printf("Loaded default geometry for DivA: %+v", s.Geometry)
	return
}

// SetTimeProvider sets a new time provider for this engine
func (s *StateMachine) SetTimeProvider(provider timer.TimeProvider) {
	s.timeProvider = provider
}

// loadStageTimes loads the stage time durations from the game config into a map
func loadStageTimes(gameConfig config.Game) (s map[state.Referee_Stage]time.Duration) {
	s = map[state.Referee_Stage]time.Duration{}
	for stage := range state.Referee_Stage_name {
		s[state.Referee_Stage(stage)] = 0
	}
	s[state.Referee_NORMAL_FIRST_HALF_PRE] = gameConfig.Normal.HalfDuration
	s[state.Referee_NORMAL_FIRST_HALF] = gameConfig.Normal.HalfDuration
	s[state.Referee_NORMAL_HALF_TIME] = gameConfig.Normal.HalfTimeDuration
	s[state.Referee_NORMAL_SECOND_HALF_PRE] = gameConfig.Normal.HalfDuration
	s[state.Referee_NORMAL_SECOND_HALF] = gameConfig.Normal.HalfDuration
	s[state.Referee_EXTRA_TIME_BREAK] = gameConfig.Normal.BreakAfter
	s[state.Referee_EXTRA_FIRST_HALF_PRE] = gameConfig.Overtime.HalfDuration
	s[state.Referee_EXTRA_FIRST_HALF] = gameConfig.Overtime.HalfDuration
	s[state.Referee_EXTRA_HALF_TIME] = gameConfig.Overtime.HalfTimeDuration
	s[state.Referee_EXTRA_SECOND_HALF_PRE] = gameConfig.Overtime.HalfDuration
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
	if change.GetNewCommandChange() != nil {
		newChanges = s.processChangeNewCommand(newState, change.GetNewCommandChange())
	} else if change.GetChangeStageChange() != nil {
		newChanges = s.processChangeChangeStage(newState, change.GetChangeStageChange())
	} else if change.GetSetBallPlacementPosChange() != nil {
		newChanges = s.processChangeSetBallPlacementPos(newState, change.GetSetBallPlacementPosChange())
	} else if change.GetAddYellowCardChange() != nil {
		newChanges = s.processChangeAddYellowCard(newState, change.GetAddYellowCardChange())
	} else if change.GetAddRedCardChange() != nil {
		newChanges = s.processChangeAddRedCard(newState, change.GetAddRedCardChange())
	} else if change.GetYellowCardOverChange() != nil {
		newChanges = s.processChangeYellowCardOver(newState)
	} else if change.GetUpdateConfigChange() != nil {
		newChanges = s.processChangeUpdateConfig(newState, change.GetUpdateConfigChange())
	} else if change.GetUpdateTeamStateChange() != nil {
		newChanges = s.processChangeUpdateTeamState(newState, change.GetUpdateTeamStateChange())
	} else if change.GetSwitchColorsChange() != nil {
		newChanges = s.processChangeSwitchColors(newState)
	} else if change.GetAddGameEventChange() != nil {
		newChanges = s.processChangeAddGameEvent(newState, change.GetAddGameEventChange())
	} else if change.GetAddPassiveGameEventChange() != nil {
		newChanges = s.processChangeAddPassiveGameEvent(change.GetAddPassiveGameEventChange())
	} else if change.GetAddProposalChange() != nil {
		newChanges = s.processChangeAddProposal(newState, change.GetAddProposalChange())
	} else if change.GetNewGameStateChange() != nil {
		newChanges = s.processNewGameState(newState, change.GetNewGameStateChange())
	} else if change.GetAcceptProposalGroupChange() != nil {
		newChanges = s.processChangeAcceptProposals(newState, change.GetAcceptProposalGroupChange())
	} else {
		log.Println("Unhandled change in state machine: ", change.StringJson())
	}

	for i := range newChanges {
		newChanges[i].Origin = new(string)
		*newChanges[i].Origin = changeOriginStateMachine
	}

	return
}
