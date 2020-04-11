package statemachine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"log"
)

func (s *StateMachine) processChangeUpdateConfig(newState *state.State, change *UpdateConfig) (changes []*Change) {
	if change.Division != nil {
		log.Printf("Change division to %v", *change.Division)
		newState.Division = change.Division
	}
	if change.FirstKickoffTeam != nil {
		log.Printf("Change first kickoff team to %v", *change.FirstKickoffTeam)
		newState.FirstKickoffTeam = change.FirstKickoffTeam
	}
	if change.AutoContinue != nil {
		log.Printf("Change auto continue to %v", *change.AutoContinue)
		newState.AutoContinue = change.AutoContinue
	}
	for eventType, behavior := range change.GameEventBehavior {
		if _, ok := state.GameEvent_Type_value[eventType]; !ok {
			log.Printf("Game event type %v is unknown.", eventType)
		} else {
			log.Printf("Change game event behavior for %v to %v", eventType, behavior)
			newState.GameEventBehavior[eventType] = behavior
		}
	}
	return
}
