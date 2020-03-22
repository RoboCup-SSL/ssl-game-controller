package statemachine

import "github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"

func (s *StateMachine) ChangeStage(newState *state.State, change *ChangeStage) (changes []Change) {

	// update stage time
	newState.StageTimeLeft = s.stageTimes[change.NewStage]
	newState.StageTimeElapsed = 0

	// if not transiting from a pre stage
	if !newState.Stage.IsPreStage() {
		// reset ball placement failures
		for _, team := range state.BothTeams() {
			newState.TeamState[team].BallPlacementFailuresReached = false
			newState.TeamState[team].BallPlacementFailures = 0
		}

		// halt the game
		changes = append(changes, Change{
			NewCommand: &NewCommand{
				Command: state.CommandHalt,
			},
		})
	}

	// update timeout times when transiting to overtime
	if change.NewStage == state.Referee_EXTRA_FIRST_HALF_PRE {
		newState.TeamState[state.Team_YELLOW].TimeoutsLeft = s.gameConfig.Overtime.Timeouts
		newState.TeamState[state.Team_YELLOW].TimeoutTimeLeft = s.gameConfig.Overtime.TimeoutDuration
		newState.TeamState[state.Team_BLUE].TimeoutsLeft = s.gameConfig.Overtime.Timeouts
		newState.TeamState[state.Team_BLUE].TimeoutTimeLeft = s.gameConfig.Overtime.TimeoutDuration
	}

	// update next command based on new stage
	newState.NextCommand, newState.NextCommandFor = s.getNextCommandForStage(newState, change.NewStage)

	// update new stage
	newState.Stage = change.NewStage

	return
}

func (s *StateMachine) getNextCommandForStage(newState *state.State, stage state.Referee_Stage) (command state.RefCommand, commandFor state.Team) {
	switch stage {
	case state.Referee_NORMAL_FIRST_HALF_PRE, state.Referee_EXTRA_FIRST_HALF_PRE:
		command = state.CommandKickoff
		commandFor = newState.FirstKickoffTeam
	case state.Referee_NORMAL_SECOND_HALF_PRE, state.Referee_EXTRA_SECOND_HALF_PRE:
		command = state.CommandKickoff
		commandFor = newState.FirstKickoffTeam.Opposite()
	default:
		command = ""
		commandFor = state.Team_UNKNOWN
	}
	return
}
