package statemachine

import "github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"

func (s *StateMachine) processNewGameState(newState *state.State, change *NewGameState) (changes []*Change) {
	newState.GameState = change.GameState
	return
}
