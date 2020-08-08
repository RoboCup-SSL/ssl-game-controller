package statemachine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/golang/protobuf/ptypes"
	"time"
)

func (s *StateMachine) processChangeChangeStage(newState *state.State, change *ChangeStage) (changes []*Change) {

	// update stage time
	newState.StageTimeLeft = ptypes.DurationProto(s.stageTimes[*change.NewStage])
	newState.StageTimeElapsed = ptypes.DurationProto(time.Duration(0))

	// if not transiting from a pre stage
	if !newState.Stage.IsPreStage() {
		// reset ball placement failures
		for _, team := range state.BothTeams() {
			*newState.TeamInfo(team).BallPlacementFailuresReached = false
			*newState.TeamInfo(team).BallPlacementFailures = 0
		}

		// halt the game
		changes = append(changes, &Change{
			Change: &Change_NewCommand{
				NewCommand: &NewCommand{
					Command: state.NewCommand(state.Command_HALT, state.SSL_Team_UNKNOWN),
				},
			},
		})
	}

	// update timeout times when transiting to overtime
	if *change.NewStage == state.Referee_EXTRA_FIRST_HALF_PRE {
		*newState.TeamInfo(state.SSL_Team_YELLOW).TimeoutsLeft = s.gameConfig.Overtime.Timeouts
		newState.TeamInfo(state.SSL_Team_YELLOW).TimeoutTimeLeft = ptypes.DurationProto(s.gameConfig.Overtime.TimeoutDuration)
		*newState.TeamInfo(state.SSL_Team_BLUE).TimeoutsLeft = s.gameConfig.Overtime.Timeouts
		newState.TeamInfo(state.SSL_Team_BLUE).TimeoutTimeLeft = ptypes.DurationProto(s.gameConfig.Overtime.TimeoutDuration)
	}

	// update next command based on new stage
	newState.NextCommand = s.getNextCommandForStage(newState, *change.NewStage)

	// update new stage
	newState.Stage = change.NewStage

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
