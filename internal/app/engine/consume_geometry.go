package engine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/vision"
	"log"
	"math"
)

func (e *Engine) ProcessGeometry(data *vision.SSL_GeometryData) {
	e.mutex.Lock()
	defer e.mutex.Unlock()

	currentGeometry := e.stateMachine.Geometry
	newGeometry := currentGeometry

	newGeometry.FieldWidth = float64(*data.Field.FieldWidth) / 1000.0
	newGeometry.FieldLength = float64(*data.Field.FieldLength) / 1000.0
	newGeometry.GoalWidth = float64(*data.Field.GoalWidth) / 1000.0

	if data.Field.PenaltyAreaWidth != nil {
		newGeometry.DefenseAreaWidth = float64(*data.Field.PenaltyAreaWidth) / 1000.0
	} else {
		for _, line := range data.Field.FieldLines {
			if (line.Type != nil && *line.Type == vision.SSL_FieldShapeType_LeftPenaltyStretch) ||
				*line.Name == "LeftPenaltyStretch" {
				newGeometry.DefenseAreaWidth = math.Abs(float64(*line.P1.Y-*line.P2.Y)) / 1000.0
				break
			}
		}
	}

	if data.Field.PenaltyAreaDepth != nil {
		newGeometry.DefenseAreaDepth = float64(*data.Field.PenaltyAreaDepth) / 1000.0
	} else {
		for _, line := range data.Field.FieldLines {
			if (line.Type != nil && *line.Type == vision.SSL_FieldShapeType_LeftFieldLeftPenaltyStretch) ||
				*line.Name == "LeftFieldLeftPenaltyStretch" {
				newGeometry.DefenseAreaDepth = math.Abs(float64(*line.P1.X-*line.P2.X)) / 1000.0
				break
			}
		}
	}

	if data.Field.GoalCenterToPenaltyMark != nil {
		newGeometry.PenaltyKickDistToGoal = float64(*data.Field.GoalCenterToPenaltyMark) / 1000.0
	}

	if data.Field.CenterCircleRadius != nil {
		newGeometry.CenterCircleRadius = float64(*data.Field.CenterCircleRadius) / 1000.0
	}

	if newGeometry.FieldWidth/2-
		newGeometry.DefenseAreaWidth/2-
		newGeometry.PlacementOffsetDefenseArea-
		newGeometry.PlacementOffsetTouchLine < 0 {
		// move the offset further into the field, if the ball does not fit between defense area and touch line
		defaultPlacementOffsetGoalLine := e.gameConfig.DefaultGeometry[e.currentState.Division.Div()].PlacementOffsetGoalLine
		newGeometry.PlacementOffsetGoalLine = defaultPlacementOffsetGoalLine + newGeometry.DefenseAreaDepth
	}

	e.stateMachine.Geometry = newGeometry

	if currentGeometry != newGeometry {
		log.Printf("Geometry changed from \n%+v to \n%+v", currentGeometry, newGeometry)
	}
}
