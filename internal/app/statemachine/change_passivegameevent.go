package statemachine

import (
	"log"
)

func (s *StateMachine) processChangeAddPassiveGameEvent(change *Change_AddPassiveGameEvent) (changes []*Change) {
	log.Printf("Ignoring passive game event %v", change.GameEvent)
	return
}
