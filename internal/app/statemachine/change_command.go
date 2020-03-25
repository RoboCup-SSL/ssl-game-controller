package statemachine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/golang/protobuf/ptypes"
	"log"
)

func (s *StateMachine) NewCommand(newState *state.State, newCommand *NewCommand) (changes []*Change) {
	newState.Command = newCommand.Command

	switch *newState.Command.Type {
	case state.Command_BALL_PLACEMENT:
		newState.CurrentActionTimeRemaining = ptypes.DurationProto(s.gameConfig.BallPlacementTime)
	case state.Command_DIRECT, state.Command_INDIRECT:
		newState.CurrentActionTimeRemaining = ptypes.DurationProto(s.gameConfig.FreeKickTime[newState.Division.Div()])
	case state.Command_KICKOFF, state.Command_PENALTY:
		newState.CurrentActionTimeRemaining = ptypes.DurationProto(s.gameConfig.GeneralTime)
	case state.Command_TIMEOUT:
		*newState.TeamInfo(*newState.Command.ForTeam).TimeoutsLeft--
	}

	if newState.Command.IsRunning() {
		if newState.Stage.IsPreStage() {
			log.Print("Pre-Stage is over, because game is running now")
			changes = append(changes, &Change{
				ChangeStage: &ChangeStage{
					NewStage: newState.Stage.Next(),
				},
			})
		}

		// reset game events and proposals
		newState.ProposedGameEvents = []*state.ProposedGameEvent{}
		newState.GameEvents = []*state.GameEvent{}

		// reset ball placement pos and follow ups
		newState.PlacementPos = nil
		newState.NextCommand = nil
	}

	return
}
