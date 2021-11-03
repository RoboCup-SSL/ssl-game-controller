package statemachine

import "github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"

// createCommandChange creates a change with a new command
func (s *StateMachine) createCommandChange(command *state.Command) *Change {
	return &Change{
		Change: &Change_NewCommand{
			NewCommand: &NewCommand{
				Command: command,
			},
		},
	}
}

// createGameEventChange creates a change with a new game event
func createGameEventChange(eventType state.GameEvent_Type, event *state.GameEvent) *Change {
	event.Type = &eventType
	event.Origin = []string{changeOriginStateMachine}
	return &Change{
		Origin: &changeOriginStateMachine,
		Change: &Change_AddGameEvent{
			AddGameEvent: &AddGameEvent{
				GameEvent: event,
			},
		},
	}
}
