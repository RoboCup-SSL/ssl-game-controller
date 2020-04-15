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
	for _, line := range data.Field.FieldLines {
		if *line.Name == "LeftFieldLeftPenaltyStretch" {
			newGeometry.DefenseAreaDepth = math.Abs(float64(*line.P1.X-*line.P2.X)) / 1000.0
		} else if *line.Name == "LeftPenaltyStretch" {
			newGeometry.DefenseAreaWidth = math.Abs(float64(*line.P1.Y-*line.P2.Y)) / 1000.0
		}
	}

	e.stateMachine.Geometry = newGeometry

	if currentGeometry != newGeometry {
		log.Printf("Geometry changed from %v to %v", currentGeometry, newGeometry)
	}
}
