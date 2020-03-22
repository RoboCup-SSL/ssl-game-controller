package statemachine

import "github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"

func (s *StateMachine) UpdateConfig(newState *state.State, change *UpdateConfig) (changes []Change) {
	if change.Division != nil {
		newState.Division = *change.Division
	}
	if change.FirstKickoffTeam != nil {
		newState.FirstKickoffTeam = *change.FirstKickoffTeam
	}
	if change.AutoContinue != nil {
		newState.AutoContinue = *change.AutoContinue
	}
	for eventType, behavior := range change.GameEventBehavior {
		newState.GameEventBehavior[eventType] = behavior
	}
	return
}
