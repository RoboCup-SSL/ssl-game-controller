package statemachine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/geom"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"google.golang.org/protobuf/types/known/durationpb"
	"time"
)

func (s *StateMachine) processChangeChangeStage(newState *state.State, change *Change_ChangeStage) (changes []*Change) {

	currentStage := *newState.Stage
	for stage := currentStage + 1; stage <= *change.NewStage; stage++ {
		changes = append(changes, s.proceedStage(newState, stage)...)
	}

	return
}

func (s *StateMachine) proceedStage(newState *state.State, newStage state.Referee_Stage) (changes []*Change) {

	// update stage time
	newState.StageTimeLeft = durationpb.New(s.stageTimes[newStage])
	newState.StageTimeElapsed = durationpb.New(time.Duration(0))

	// if not transiting from a pre stage
	if !newState.Stage.IsPreStage() {
		// reset ball placement failures
		for _, team := range state.BothTeams() {
			*newState.TeamInfo(team).BallPlacementFailuresReached = false
			*newState.TeamInfo(team).BallPlacementFailures = 0
		}

		// halt the game
		changes = append(changes, &Change{
			Change: &Change_NewCommandChange{
				NewCommandChange: &Change_NewCommand{
					Command: state.NewCommand(state.Command_HALT, state.Team_UNKNOWN),
				},
			},
		})
	}

	// update timeout times when transiting to overtime
	if newStage == state.Referee_EXTRA_FIRST_HALF_PRE {
		*newState.TeamInfo(state.Team_YELLOW).TimeoutsLeft = s.gameConfig.Overtime.Timeouts
		newState.TeamInfo(state.Team_YELLOW).TimeoutTimeLeft = durationpb.New(s.gameConfig.Overtime.TimeoutDuration)
		*newState.TeamInfo(state.Team_BLUE).TimeoutsLeft = s.gameConfig.Overtime.Timeouts
		newState.TeamInfo(state.Team_BLUE).TimeoutTimeLeft = durationpb.New(s.gameConfig.Overtime.TimeoutDuration)
	}

	// update next command based on new stage
	newState.NextCommand = s.getNextCommandForStage(newState, newStage)

	// update placement pos (assuming it is either kickoff or nothing)
	if newState.NextCommand == nil {
		newState.PlacementPos = nil
	} else {
		newState.PlacementPos = geom.NewVector2(0.0, 0.0)
	}

	if newStage == state.Referee_PENALTY_SHOOTOUT {
		newState.ShootoutState = &state.ShootoutState{
			NextTeam: newState.FirstKickoffTeam,
			NumberOfAttempts: map[string]int32{
				state.Team_BLUE.String():   0,
				state.Team_YELLOW.String(): 0,
			},
		}
	}

	// Reset game events and proposals
	newState.ProposalGroups = nil
	newState.GameEvents = nil

	// update new stage
	*newState.Stage = newStage

	return
}

func (s *StateMachine) getNextCommandForStage(newState *state.State, stage state.Referee_Stage) (command *state.Command) {
	switch stage {
	case state.Referee_NORMAL_FIRST_HALF_PRE, state.Referee_EXTRA_FIRST_HALF_PRE:
		return state.NewCommand(state.Command_KICKOFF, *newState.FirstKickoffTeam)
	case state.Referee_NORMAL_SECOND_HALF_PRE, state.Referee_EXTRA_SECOND_HALF_PRE:
		return state.NewCommand(state.Command_KICKOFF, newState.FirstKickoffTeam.Opposite())
	default:
		return nil
	}
}
