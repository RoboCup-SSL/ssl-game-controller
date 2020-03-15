package statemachine

import "github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"

type StateChange struct {
	State  *state.State
	Change Change
}

func Process(currentState *state.State, change Change) (newState *state.State) {
	newState = currentState.DeepCopy()
	switch change.ChangeType {
	case ChangeTypeNewCommand:
		newState.Command = change.NewCommand.Command
		newState.CommandFor = change.NewCommand.CommandFor
	case ChangeTypeAddGameEvent:
		newState.GameEvents = append(newState.GameEvents, change.AddGameEvent.GameEvent)
	}
	return newState
}
