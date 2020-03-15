package statemachine

import "github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"

type ChangeType string

const (
	ChangeTypeTick         ChangeType = "Tick"
	ChangeTypeNewCommand   ChangeType = "Command"
	ChangeTypeAddGameEvent ChangeType = "GameEvent"
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
