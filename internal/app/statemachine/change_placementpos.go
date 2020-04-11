package statemachine

import "github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"

func (s *StateMachine) processChangeSetBallPlacementPos(newState *state.State, change *SetBallPlacementPos) (changes []*Change) {
	newState.PlacementPos = change.Pos
	return
}
