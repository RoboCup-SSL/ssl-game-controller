package statemachine

import "github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"

func (s *StateMachine) SetBallPlacementPos(newState *state.State, change *SetBallPlacementPos) (changes []Change) {
	newState.PlacementPos = new(state.Location)
	*newState.PlacementPos = change.Pos
	return
}
