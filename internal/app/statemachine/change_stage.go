package statemachine

import "github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"

func (s *StateMachine) ChangeStage(newState *state.State, change *ChangeStage) (changes []Change) {

	// update stage time
	newState.StageTimeLeft = s.stageTimes[change.NewStage]
	newState.StageTimeElapsed = 0

	// if not transiting from a pre stage, halt the game
	if !newState.Stage.IsPreStage() {
		changes = append(changes, Change{
			ChangeType:   ChangeTypeNewCommand,
			ChangeOrigin: changeOriginStateMachine,
			NewCommand: &NewCommand{
				Command: state.CommandHalt,
			},
		})
	}

	// update timeout times when transiting to overtime
	if change.NewStage == state.StageOvertimeFirstHalfPre {
		newState.TeamState[state.Team_YELLOW].TimeoutsLeft = s.gameConfig.Overtime.Timeouts
		newState.TeamState[state.Team_YELLOW].TimeoutTimeLeft = s.gameConfig.Overtime.TimeoutDuration
		newState.TeamState[state.Team_BLUE].TimeoutsLeft = s.gameConfig.Overtime.Timeouts
		newState.TeamState[state.Team_BLUE].TimeoutTimeLeft = s.gameConfig.Overtime.TimeoutDuration
	}

	// update next command based on new stage
	newState.NextCommand, newState.NextCommandFor = s.getNextCommandForStage(change.NewStage)

	// update new stage
	newState.Stage = change.NewStage

	return
}

func (s *StateMachine) getNextCommandForStage(stage state.Stage) (command state.RefCommand, commandFor state.Team) {
	switch stage {
	case state.StagePreGame, state.StageOvertimeFirstHalfPre:
		command = state.CommandKickoff
		commandFor = s.cfg.FirstKickoffTeam
	case state.StageSecondHalfPre, state.StageOvertimeSecondHalfPre:
		command = state.CommandKickoff
		commandFor = s.cfg.FirstKickoffTeam.Opposite()
	default:
		command = ""
		commandFor = state.Team_UNKNOWN
	}
	return
}
