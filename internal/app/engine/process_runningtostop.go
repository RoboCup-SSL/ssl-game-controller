package engine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/geom"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/statemachine"
	"log"
)

func (e *Engine) processRunningToStop() {
	if e.currentState.PlacementPos == nil {
		return
	}

	if e.ballPlacementRequired() {
		log.Printf("Ball placement is needed")
		e.Enqueue(&statemachine.Change{
			Origin: &changeOriginEngine,
			Change: &statemachine.Change_StartBallPlacement{
				StartBallPlacement: &statemachine.StartBallPlacement{},
			},
		})
	}
}

func (e *Engine) ballPlacementRequired() bool {
	if e.currentState.PlacementPos == nil || e.gcState.TrackerStateGc.Ball == nil {
		// fallback if the fields are not set
		return false
	}
	placementPos := e.currentState.PlacementPos
	ballPos := e.gcState.TrackerStateGc.Ball.Pos.ToVector2()

	// The ball is closer than 1m to the designated position.
	if ballPos.DistanceTo(placementPos) > e.gameConfig.BallPlacementRequiredDistance {
		return true
	}

	// The ball is inside the field.
	field := geom.NewRectangleFromCenter(geom.NewVector2(0, 0), e.getGeometry().FieldLength, e.getGeometry().FieldWidth)
	if !field.IsPointInside(ballPos) {
		return true
	}

	// The ball is at least 0.7m away from any defense area.
	for _, sign := range []float64{1, -1} {
		defenseArea := geom.NewDefenseAreaBySign(e.getGeometry(), sign)
		forbiddenArea := defenseArea.WithMargin(e.gameConfig.BallPlacementMinDistanceToDefenseArea)
		if forbiddenArea.IsPointInside(ballPos) {
			return true
		}
	}

	// The ball is stationary.
	if !e.ballSteady() {
		return true
	}

	return false
}
