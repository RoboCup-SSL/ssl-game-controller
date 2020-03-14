package statemachine

import "github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"

type ChangeType string

const (
	ChangeTypeCommand   ChangeType = "Command"
	ChangeTypeGameEvent ChangeType = "GameEvent"
)

type Change struct {
	ChangeType
	NewCommand   NewCommand
	AddGameEvent AddGameEvent
}

type NewCommand struct {
	Command    state.RefCommand
	CommandFor state.Team
}

type AddGameEvent struct {
	GameEvent state.GameEvent
}

func process(currentState *state.State, change Change) (newState *state.State) {
	newState = currentState.DeepCopy()
	switch change.ChangeType {
	case ChangeTypeCommand:
		newState.Command = change.NewCommand.Command
		newState.CommandFor = change.NewCommand.CommandFor
	case ChangeTypeGameEvent:
		newState.GameEvents = append(newState.GameEvents, change.AddGameEvent.GameEvent)
	}
	return newState
}
