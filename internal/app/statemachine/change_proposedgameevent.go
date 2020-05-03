package statemachine

import "github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"

func (s *StateMachine) processChangeAddProposedGameEvent(newState *state.State, change *AddProposedGameEvent) (changes []*Change) {
	newState.GameEventProposals = append(newState.GameEventProposals, change.Proposal)
	return
}
