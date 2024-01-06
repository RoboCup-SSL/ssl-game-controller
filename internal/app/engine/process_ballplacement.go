package engine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"slices"
)

type BallPlacementCoordinator struct {
	gcEngine *Engine
}

func (c *BallPlacementCoordinator) process() {
	e := c.gcEngine

	if *e.currentState.Command.Type != state.Command_BALL_PLACEMENT ||
		e.trackerStateGc.Ball == nil {
		return
	}

	// Take the AutoRefProposalTimeout into account, as game events may be delayed by up to this amount of time
	if e.currentState.CurrentActionTimeRemaining.AsDuration() > -e.gameConfig.AutoRefProposalTimeout {
		// Still time remaining
		return
	}

	remainingDistance := c.remainingPlacementDistance()
	nearestOwnRobotDistance := c.nearestOwnRobotDistance()

	e.Enqueue(createGameEventChange(state.GameEvent_PLACEMENT_FAILED, &state.GameEvent{
		Event: &state.GameEvent_PlacementFailed_{
			PlacementFailed: &state.GameEvent_PlacementFailed{
				ByTeam:                e.currentState.Command.ForTeam,
				RemainingDistance:     &remainingDistance,
				NearestOwnBotDistance: &nearestOwnRobotDistance,
			},
		},
	}))
}

func (c *BallPlacementCoordinator) remainingPlacementDistance() float32 {
	if c.gcEngine.currentState.PlacementPos == nil || c.gcEngine.trackerStateGc.Ball.Pos == nil {
		return -1
	}
	placementPos := c.gcEngine.currentState.PlacementPos
	ballPos := c.gcEngine.trackerStateGc.Ball.Pos.ToVector2()
	return float32(placementPos.DistanceTo(ballPos))
}

func (c *BallPlacementCoordinator) nearestOwnRobotDistance() float32 {
	if c.gcEngine.currentState.PlacementPos == nil {
		return -1
	}
	placementPos := c.gcEngine.currentState.PlacementPos

	var distances []float32
	for _, robot := range c.gcEngine.trackerStateGc.Robots {
		if *robot.Id.Team == *c.gcEngine.currentState.Command.ForTeam {
			distance := float32(robot.Pos.DistanceTo(placementPos))
			distances = append(distances, distance)
		}
	}

	if len(distances) == 0 {
		return -1
	}

	slices.Sort(distances)
	return distances[0]
}
