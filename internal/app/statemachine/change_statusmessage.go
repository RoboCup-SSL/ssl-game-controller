package statemachine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"log"
)

func (s *StateMachine) processChangeStatusMessage(newState *state.State, change *Change_SetStatusMessage) (changes []*Change) {
	if change.StatusMessage != nil && len(*change.StatusMessage) > 0 {
		log.Printf("Set status message to %v", *change.StatusMessage)
	} else {
		log.Printf("Clear status message")
	}
	newState.StatusMessage = change.StatusMessage
	return
}
