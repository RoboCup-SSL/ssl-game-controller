package statemachine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/golang/protobuf/ptypes"
	"log"
)

func (s *StateMachine) processChangeNewCommand(newState *state.State, newCommand *NewCommand) (changes []*Change) {
	newState.GameState = s.newGameState(newState, newCommand)
	newState.Command = newCommand.Command

	switch *newState.Command.Type {
	case state.Command_BALL_PLACEMENT:
		newState.CurrentActionTimeRemaining = ptypes.DurationProto(s.gameConfig.BallPlacementTime)
	case state.Command_DIRECT, state.Command_INDIRECT:
		newState.CurrentActionTimeRemaining = ptypes.DurationProto(s.gameConfig.FreeKickTimeout[newState.Division.Div()])
	case state.Command_KICKOFF, state.Command_PENALTY:
		newState.CurrentActionTimeRemaining = ptypes.DurationProto(s.gameConfig.PrepareTimeout)
	case state.Command_TIMEOUT:
		if *newState.TeamInfo(*newState.Command.ForTeam).TimeoutsLeft > 0 {
			*newState.TeamInfo(*newState.Command.ForTeam).TimeoutsLeft--
		}
		newState.TeamInfo(*newState.Command.ForTeam).RequestsTimeoutSince = nil
	}

	// determine next command
	newState.NextCommand = s.nextCommandForCommand(newState)

	if newState.Command.IsRunning() {
		if newState.Stage.IsPreStage() {
			log.Print("Pre-Stage is over, because game is running now")
			changes = append(changes, &Change{
				Change: &Change_ChangeStage{
					ChangeStage: &ChangeStage{
						NewStage: newState.Stage.Next(),
					},
				},
			})
		}

		// reset game events and proposals
		newState.ProposalGroups = nil
		newState.GameEvents = nil

		// reset ball placement pos and follow ups
		newState.PlacementPos = nil
		newState.NextCommand = nil
	}

	return
}

// nextCommandForCommand determines the next command for the given command or returns the currently set one
func (s *StateMachine) nextCommandForCommand(newState *state.State) (command *state.Command) {
	if *newState.Command.Type == state.Command_PENALTY || *newState.Command.Type == state.Command_KICKOFF {
		return state.NewCommand(state.Command_NORMAL_START, state.SSL_Team_UNKNOWN)
	}

	return newState.NextCommand
}

func (s *StateMachine) newGameState(newState *state.State, newCommand *NewCommand) *state.GameState {
	switch *newCommand.Command.Type {
	case state.Command_HALT:
		return state.NewGameStateNeutral(state.GameState_HALT)
	case state.Command_STOP:
		return state.NewGameStateNeutral(state.GameState_STOP)
	case state.Command_NORMAL_START:
		// Keep previous state
		return newState.GameState
	case state.Command_FORCE_START:
		return state.NewGameStateNeutral(state.GameState_RUNNING)
	case state.Command_DIRECT:
		return state.NewGameStateWithTeam(state.GameState_FREE_KICK, *newCommand.Command.ForTeam)
	case state.Command_INDIRECT:
		return state.NewGameStateWithTeam(state.GameState_FREE_KICK, *newCommand.Command.ForTeam)
	case state.Command_KICKOFF:
		return state.NewGameStateWithTeam(state.GameState_KICKOFF, *newCommand.Command.ForTeam)
	case state.Command_PENALTY:
		return state.NewGameStateWithTeam(state.GameState_PENALTY, *newCommand.Command.ForTeam)
	case state.Command_TIMEOUT:
		return state.NewGameStateWithTeam(state.GameState_TIMEOUT, *newCommand.Command.ForTeam)
	case state.Command_BALL_PLACEMENT:
		return state.NewGameStateWithTeam(state.GameState_BALL_PLACEMENT, *newCommand.Command.ForTeam)
	case state.Command_UNKNOWN:
		return state.NewGameStateNeutral(state.GameState_UNKNOWN)
	default:
		return state.NewGameStateNeutral(state.GameState_UNKNOWN)
	}
}
