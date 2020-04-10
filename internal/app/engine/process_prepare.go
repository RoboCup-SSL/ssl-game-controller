package engine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/statemachine"
	"time"
)

const minPreparationTime = time.Second * 2

func (e *Engine) processPrepare() {
	if !e.currentState.Command.IsPrepare() ||
		!e.readyToContinue() ||
		e.currentState.NextCommand == nil ||
		!e.currentState.GetAutoContinue() ||
		e.timeSinceLastChange() < minPreparationTime {
		return
	}

	if *e.currentState.Command.Type == state.Command_KICKOFF {
		// TODO check if conditions met for kickoff
	}

	if *e.currentState.Command.Type == state.Command_PENALTY {
		// TODO check if conditions met for penalty
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
		e.robotsInsideRadius(e.gcState.TrackerStateGc.Robots, e.gcState.TrackerStateGc.Ball.Pos, radius) {
		return false
	}
	return false
}
