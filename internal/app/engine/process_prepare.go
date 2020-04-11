package engine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/statemachine"
	"time"
)

const minPreparationTime = time.Second * 2

func (e *Engine) processPrepare() {
	if !e.currentState.Command.IsPrepare() ||
		e.gcState.TrackerStateGc.Ball == nil ||
		!e.readyToContinue() ||
		e.currentState.NextCommand == nil ||
		!e.currentState.GetAutoContinue() ||
		e.timeSinceLastChange() < minPreparationTime {
		return
	}

	if *e.currentState.Command.Type == state.Command_KICKOFF {
		// ball in center circle
		if e.gcState.TrackerStateGc.Ball.Pos.ToVector2().Length() > e.gameConfig.DistanceToBallInStop {
			return
		}

		// bots on wrong side
		for _, robot := range e.gcState.TrackerStateGc.Robots {
			if *e.currentState.TeamState[robot.Id.Team.String()].OnPositiveHalf {
				if *robot.Pos.X < robotRadius {
					return
				}
			} else if *robot.Pos.X > -robotRadius {
				return
			}
		}
	}

	if *e.currentState.Command.Type == state.Command_PENALTY {
		// TODO check if conditions met for penalty
		// keeper pos

		// kicking team positions correct

		// opponent team positions correct

	}

	e.Enqueue(&statemachine.Change{
		Origin: &changeOriginEngine,
		Change: &statemachine.Change_Continue{
			Continue: &statemachine.Continue{},
		},
	})
}

func (e *Engine) readyToContinue() bool {
	radius := e.gameConfig.DistanceToBallInStop + robotRadius + distanceThreshold
	if !e.ballSteady() ||
		e.robotsInsideRadius(e.gcState.TrackerStateGc.Robots, e.gcState.TrackerStateGc.Ball.Pos.ToVector2(), radius) {
		return false
	}
	return false
}
