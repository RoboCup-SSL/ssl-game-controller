package statemachine

import "github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"

func (s *StateMachine) NewCommand(newState *state.State, newCommand *NewCommand) (changes []Change) {
	newState.Command = newCommand.Command
	newState.CommandFor = newCommand.CommandFor

	switch newState.Command {
	case state.CommandBallPlacement:
		newState.CurrentActionTimeRemaining = s.gameConfig.BallPlacementTime
	case state.CommandDirect, state.CommandIndirect:
		newState.CurrentActionTimeRemaining = s.gameConfig.FreeKickTime[newState.Division]
	case state.CommandKickoff, state.CommandPenalty:
		newState.CurrentActionTimeRemaining = s.gameConfig.GeneralTime
	case state.CommandTimeout:
		newState.TeamState[newState.CommandFor].TimeoutsLeft--
	}

	if newState.GameState() == state.GameStateRunning {
		if newState.Stage.IsPreStage() {
			changes = append(changes, Change{
				ChangeType:   ChangeTypeChangeStage,
				ChangeOrigin: changeOriginStateMachine,
				ChangeStage:  &ChangeStage{NewStage: newState.Stage.Next()},
			})
		}

		// reset game events and proposals
		newState.ProposedGameEvents = []state.ProposedGameEvent{}
		newState.GameEvents = []state.GameEvent{}

		// reset ball placement pos and follow ups
		newState.PlacementPos = nil
		newState.NextCommand = state.CommandUnknown
		newState.NextCommandFor = state.Team_UNKNOWN
	}

	return
}
