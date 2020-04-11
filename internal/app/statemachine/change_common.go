package statemachine

import "github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"

// newCommandChange creates a change with a new command
func (s *StateMachine) newCommandChange(command *state.Command) *Change {
	return &Change{
		Change: &Change_NewCommand{
			NewCommand: &NewCommand{
				Command: command,
			},
		},
	}
}
