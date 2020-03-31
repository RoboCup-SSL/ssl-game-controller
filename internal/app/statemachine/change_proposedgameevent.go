package statemachine

import "github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"

func (s *StateMachine) AddProposedGameEvent(newState *state.State, change *AddProposedGameEvent) (changes []*Change) {
	newState.ProposedGameEvents = append(newState.ProposedGameEvents, change.GameEvent)
	return
}
