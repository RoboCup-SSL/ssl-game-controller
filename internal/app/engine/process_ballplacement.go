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
		e.gcState.TrackerStateGc.Ball == nil {
		return
	}

	if c.ballPlacementStartPos == nil || c.ballPlacementStartTime == nil {
		c.ballPlacementStartPos = e.gcState.TrackerStateGc.Ball.Pos.ToVector2()
		c.ballPlacementStartTime = new(time.Time)
		*c.ballPlacementStartTime = e.timeProvider()
	}

	remainingDistance := c.remainingPlacementDistance()

	if e.ballSteady() && e.teamInFavorKeepsSufficientDistance() &&
		float64(remainingDistance) <= e.gameConfig.BallPlacementTolerance {
		// if opponent does not yet keep sufficient distance, that's not the placing teams fold,
		// so just wait a bit more
		if e.opponentTeamKeepsSufficientDistance() {
			duration := float32(e.timeProvider().Sub(*c.ballPlacementStartTime).Seconds())
			var distance *float32
			if c.ballPlacementStartPos != nil && e.gcState.TrackerStateGc.Ball.Pos != nil {
				distance = new(float32)
				*distance = float32(c.ballPlacementStartPos.DistanceTo(e.gcState.TrackerStateGc.Ball.Pos.ToVector2()))
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
		}
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
	if c.gcEngine.currentState.PlacementPos == nil || c.gcEngine.gcState.TrackerStateGc.Ball.Pos == nil {
		return -1
	}
	placementPos := c.gcEngine.currentState.PlacementPos
	ballPos := c.gcEngine.gcState.TrackerStateGc.Ball.Pos.ToVector2()
	return float32(placementPos.DistanceTo(ballPos))
}

func (e *Engine) teamInFavorKeepsSufficientDistance() bool {
	radius := e.gameConfig.BallPlacementMinRobotDistance + robotRadius + distanceThreshold
	if e.currentState.NextCommand != nil && e.currentState.NextCommand.ForTeam == nil {
		radius = e.gameConfig.DistanceToBallInStop + robotRadius + distanceThreshold
	}

	var robots []*Robot
	for _, robot := range e.gcState.TrackerStateGc.Robots {
		if *robot.Id.Team == *e.currentState.Command.ForTeam {
			robots = append(robots, robot)
		}
	}

	return !e.robotsInsideRadius(robots, e.gcState.TrackerStateGc.Ball.Pos.ToVector2(), radius)
}

func (e *Engine) opponentTeamKeepsSufficientDistance() bool {
	radius := e.gameConfig.DistanceToBallInStop + robotRadius + distanceThreshold

	var robots []*Robot
	for _, robot := range e.gcState.TrackerStateGc.Robots {
		if *robot.Id.Team != *e.currentState.Command.ForTeam {
			robots = append(robots, robot)
		}
	}

	return !e.robotsInsideRadius(robots, e.gcState.TrackerStateGc.Ball.Pos.ToVector2(), radius)
}
