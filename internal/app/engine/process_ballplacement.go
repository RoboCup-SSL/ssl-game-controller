package engine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/geom"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"time"
)

type BallPlacementCoordinator struct {
	gcEngine               *Engine
	ballPlacementStartPos  *geom.Vector2
	ballPlacementStartTime *time.Time
}

func (c *BallPlacementCoordinator) process() {
	e := c.gcEngine

	if *e.currentState.Command.Type != state.Command_BALL_PLACEMENT ||
		e.trackerStateGc.Ball == nil {
		return
	}

	if c.ballPlacementStartPos == nil || c.ballPlacementStartTime == nil {
		c.ballPlacementStartPos = e.trackerStateGc.Ball.Pos.ToVector2()
		c.ballPlacementStartTime = new(time.Time)
		*c.ballPlacementStartTime = e.timeProvider()
	}

	remainingDistance := c.remainingPlacementDistance()

	if goDur(e.currentState.CurrentActionTimeRemaining) <= 0 {
		e.Enqueue(createGameEventChange(state.GameEvent_PLACEMENT_FAILED, &state.GameEvent{
			Event: &state.GameEvent_PlacementFailed_{
				PlacementFailed: &state.GameEvent_PlacementFailed{
					ByTeam:            e.currentState.Command.ForTeam,
					RemainingDistance: &remainingDistance,
				},
			},
		}))
	}
}

func (c *BallPlacementCoordinator) remainingPlacementDistance() float32 {
	if c.gcEngine.currentState.PlacementPos == nil || c.gcEngine.trackerStateGc.Ball.Pos == nil {
		return -1
	}
	placementPos := c.gcEngine.currentState.PlacementPos
	ballPos := c.gcEngine.trackerStateGc.Ball.Pos.ToVector2()
	return float32(placementPos.DistanceTo(ballPos))
}
