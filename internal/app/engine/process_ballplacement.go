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

	if *e.currentState.Command.Type != state.Command_BALL_PLACEMENT {
		return
	}

	if c.ballPlacementStartPos == nil || c.ballPlacementStartTime == nil {
		c.ballPlacementStartPos = e.gcState.TrackerStateGc.BallPos
		c.ballPlacementStartTime = new(time.Time)
		*c.ballPlacementStartTime = e.timeProvider()
	}

	remainingDistance := c.remainingPlacementDistance()
	if e.readyToContinue() &&
		float64(remainingDistance) <= e.gameConfig.BallPlacementTolerance {
		duration := float32(e.timeProvider().Sub(*c.ballPlacementStartTime).Seconds())
		var distance *float32
		if c.ballPlacementStartPos != nil && e.gcState.TrackerStateGc.BallPos != nil {
			distance = new(float32)
			*distance = float32(c.ballPlacementStartPos.DistanceTo(e.gcState.TrackerStateGc.BallPos))
		}
		e.Enqueue(createGameEventChange(state.GameEvent_PLACEMENT_SUCCEEDED, state.GameEvent{
			Event: &state.GameEvent_PlacementSucceeded_{
				PlacementSucceeded: &state.GameEvent_PlacementSucceeded{
					ByTeam:    e.currentState.Command.ForTeam,
					TimeTaken: &duration,
					Precision: &remainingDistance,
					Distance:  distance,
				},
			},
		}))
	} else if goDur(e.currentState.CurrentActionTimeRemaining) <= 0 {
		e.Enqueue(createGameEventChange(state.GameEvent_PLACEMENT_FAILED, state.GameEvent{
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
	if c.gcEngine.currentState.PlacementPos == nil || c.gcEngine.gcState.TrackerStateGc.BallPos == nil {
		return -1
	}
	placementPos := locationToVector2(c.gcEngine.currentState.PlacementPos)
	ballPos := c.gcEngine.gcState.TrackerStateGc.BallPos
	return float32(placementPos.DistanceTo(ballPos))
}
