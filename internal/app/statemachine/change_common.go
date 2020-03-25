package statemachine

import "github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"

func (s *StateMachine) newCommandChange(command *state.Command) *Change {
	return &Change{
		NewCommand: &NewCommand{
			Command: command,
		},
	}
}
