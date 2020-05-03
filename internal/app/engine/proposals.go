package engine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/statemachine"
	"github.com/golang/protobuf/ptypes"
	"log"
)

// EnqueueGameEvent accepts a game event and handles majority accordingly
func (e *Engine) EnqueueGameEvent(gameEvent *state.GameEvent) {
	e.mutex.Lock()
	defer e.mutex.Unlock()

	if len(gameEvent.Origin) != 1 {
		log.Printf("Ignoring game event with non-unique origin: %v", gameEvent)
		return
	}
	origin := gameEvent.Origin[0]

	if !e.config.AutoRefConfigs[origin].GameEventEnabled[gameEvent.Type.String()] {
		e.Enqueue(&statemachine.Change{
			Origin: &origin,
			Change: &statemachine.Change_AddPassiveGameEvent{
				AddPassiveGameEvent: &statemachine.AddPassiveGameEvent{
					GameEvent: gameEvent,
				},
			},
		})
		return
	}

	if e.IsMajorityForGameEventEnabled(*gameEvent.Type) {
		timestamp, _ := ptypes.TimestampProto(e.timeProvider())
		e.Enqueue(&statemachine.Change{
			Origin: &origin,
			Change: &statemachine.Change_AddProposedGameEvent{
				AddProposedGameEvent: &statemachine.AddProposedGameEvent{
					Proposal: &state.GameEventProposal{
						Timestamp: timestamp,
						GameEvent: gameEvent,
					},
				},
			},
		})
	} else {
		e.Enqueue(&statemachine.Change{
			Origin: &origin,
			Change: &statemachine.Change_AddGameEvent{
				AddGameEvent: &statemachine.AddGameEvent{
					GameEvent: gameEvent,
				},
			},
		})
	}
}

// IsMajorityForGameEventEnabled returns true, if the game event behavior is set to majority
func (e *Engine) IsMajorityForGameEventEnabled(evenType state.GameEvent_Type) bool {
	return e.config.GameEventBehavior[evenType.String()] == Config_GAME_EVENT_BEHAVIOR_MAJORITY
}
