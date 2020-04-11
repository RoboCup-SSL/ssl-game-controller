package engine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/geom"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/statemachine"
	"time"
)

const ballSteadyThreshold = 0.2
const robotRadius = 0.09
const distanceThreshold = 0.03

func createGameEventChange(eventType state.GameEvent_Type, event state.GameEvent) *statemachine.Change {
	event.Type = &eventType
	event.Origin = []string{changeOriginEngine}
	return &statemachine.Change{
		Origin: &changeOriginEngine,
		Change: &statemachine.Change_AddGameEvent{
			AddGameEvent: &statemachine.AddGameEvent{
				GameEvent: &event,
			},
		},
	}
}

func (e *Engine) robotsInsideRadius(robots []*Robot, pos *geom.Vector2, radius float64) bool {
	for _, robot := range robots {
		distance := robot.Pos.DistanceTo(pos)
		if distance < radius {
			return true
		}
	}

	return false
}

func (e *Engine) timeSinceLastChange() time.Duration {
	if e.stateStore.LatestEntry() != nil {
		lastChangeTs := goTime(e.stateStore.LatestEntry().Timestamp)
		now := e.timeProvider()
		return now.Sub(lastChangeTs)
	}
	return 0
}
