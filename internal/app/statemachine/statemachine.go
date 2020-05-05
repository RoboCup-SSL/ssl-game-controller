package statemachine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/config"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/golang/protobuf/proto"
	"log"
	"math/rand"
	"time"
)

var changeOriginStateMachine = "StateMachine"

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
	log.Printf("Processing change '%v'", change)
	if change.GetNewCommand() != nil {
		newChanges = s.processChangeNewCommand(newState, change.GetNewCommand())
	} else if change.GetChangeStage() != nil {
		newChanges = s.processChangeChangeStage(newState, change.GetChangeStage())
	} else if change.GetSetBallPlacementPos() != nil {
		newChanges = s.processChangeSetBallPlacementPos(newState, change.GetSetBallPlacementPos())
	} else if change.GetAddYellowCard() != nil {
		newChanges = s.processChangeAddYellowCard(newState, change.GetAddYellowCard())
	} else if change.GetAddRedCard() != nil {
		newChanges = s.processChangeAddRedCard(newState, change.GetAddRedCard())
	} else if change.GetYellowCardOver() != nil {
		newChanges = s.processChangeYellowCardOver(newState)
	} else if change.GetUpdateConfig() != nil {
		newChanges = s.processChangeUpdateConfig(newState, change.GetUpdateConfig())
	} else if change.GetUpdateTeamState() != nil {
		newChanges = s.processChangeUpdateTeamState(newState, change.GetUpdateTeamState())
	} else if change.GetSwitchColors() != nil {
		newChanges = s.processChangeSwitchColors(newState)
	} else if change.GetAddGameEvent() != nil {
		newChanges = s.processChangeAddGameEvent(newState, change.GetAddGameEvent())
	} else if change.GetAddPassiveGameEvent() != nil {
		newChanges = s.processChangeAddPassiveGameEvent(change.GetAddPassiveGameEvent())
	} else if change.GetStartBallPlacement() != nil {
		newChanges = s.processChangeStartBallPlacement(newState)
	} else if change.GetContinue() != nil {
		newChanges = s.processChangeContinue(newState)
	} else if change.GetAddProposal() != nil {
		newChanges = s.processChangeAddProposal(newState, change.GetAddProposal())
	} else if change.GetNewGameState() != nil {
		newChanges = s.processNewGameState(newState, change.GetNewGameState())
	} else if change.GetAcceptProposalGroup() != nil {
		newChanges = s.processChangeAcceptProposals(newState, change.GetAcceptProposalGroup())
	} else {
		log.Println("Unhandled change in state machine: ", change)
	}

	for i := range newChanges {
		newChanges[i].Origin = new(string)
		*newChanges[i].Origin = changeOriginStateMachine
	}
	log.Printf("Change '%v' processed:\nfrom: %v\n  to: %v", change, currentState, newState)

	return
}
