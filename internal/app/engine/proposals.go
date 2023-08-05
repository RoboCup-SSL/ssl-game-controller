package engine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/statemachine"
	"log"
)

// EnqueueGameEvent accepts a game event and handles behaviors accordingly
func (e *Engine) EnqueueGameEvent(gameEvent *state.GameEvent) {
	e.mutex.Lock()
	defer e.mutex.Unlock()

	if len(gameEvent.Origin) != 1 {
		log.Printf("Ignoring game event with non-unique origin: %v", gameEvent)
		return
	}
	origin := gameEvent.Origin[0]

	var autoRefBehavior AutoRefConfig_Behavior
	if config, ok := e.config.AutoRefConfigs[origin]; ok {
		autoRefBehavior = config.GameEventBehavior[gameEvent.Type.String()]
	} else {
		autoRefBehavior = AutoRefConfig_BEHAVIOR_ACCEPT
	}

	if e.currentState.Stage.IsPreStage() || e.currentState.Stage.IsPausedStage() {
		log.Printf("Ignoring game event in paused or pre stage")
		autoRefBehavior = AutoRefConfig_BEHAVIOR_IGNORE
	}

	switch autoRefBehavior {
	case AutoRefConfig_BEHAVIOR_IGNORE:
		log.Printf("Ignoring game event from autoRef: %v", gameEvent)
	case AutoRefConfig_BEHAVIOR_LOG:
		e.Enqueue(&statemachine.Change{
			Origin: &changeOriginEngine,
			Change: &statemachine.Change_AddPassiveGameEventChange{
				AddPassiveGameEventChange: &statemachine.Change_AddPassiveGameEvent{
					GameEvent: gameEvent,
				},
			},
		})
	case AutoRefConfig_BEHAVIOR_ACCEPT, AutoRefConfig_BEHAVIOR_UNKNOWN:
		e.Enqueue(&statemachine.Change{
			Origin: &changeOriginEngine,
			Change: &statemachine.Change_AddGameEventChange{
				AddGameEventChange: &statemachine.Change_AddGameEvent{
					GameEvent: gameEvent,
				},
			},
		})
	}
}
