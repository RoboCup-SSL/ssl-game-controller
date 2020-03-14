package statemachine

import "github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"

func Process(currentState *state.State, change Change) (newState *state.State) {
	if currentState == nil {
		newState = &state.State{}
	} else {
		newState = currentState.DeepCopy()
	}
	switch change.ChangeType {
	case ChangeTypeCommand:
		newState.Command = change.NewCommand.Command
		newState.CommandFor = change.NewCommand.CommandFor
	case ChangeTypeGameEvent:
		newState.GameEvents = append(newState.GameEvents, change.AddGameEvent.GameEvent)
	}
	return newState
}
