package controller

import (
	"github.com/RoboCup-SSL/ssl-go-tools/pkg/sslproto"
	"log"
	"math"
)

func (c *GameController) ProcessGeometry(data *sslproto.SSL_GeometryData) {
	if int32(math.Round(c.Engine.Geometry.FieldWidth*1000.0)) != *data.Field.FieldWidth {
		newFieldWidth := float64(*data.Field.FieldWidth) / 1000.0
		log.Printf("FieldWidth changed from %v to %v", c.Engine.Geometry.FieldWidth, newFieldWidth)
		c.Engine.Geometry.FieldWidth = newFieldWidth
	}
	if int32(math.Round(c.Engine.Geometry.FieldLength*1000)) != *data.Field.FieldLength {
		newFieldLength := float64(*data.Field.FieldLength) / 1000.0
		log.Printf("FieldLength changed from %v to %v", c.Engine.Geometry.FieldLength, newFieldLength)
		c.Engine.Geometry.FieldLength = newFieldLength
	}
	for _, line := range data.Field.FieldLines {
		if *line.Name == "LeftFieldLeftPenaltyStretch" {
			defenseAreaDepth := math.Abs(float64(*line.P1.X-*line.P2.X)) / 1000.0
			if math.Abs(defenseAreaDepth-c.Engine.Geometry.DefenseAreaDepth) > 1e-3 {
				log.Printf("DefenseAreaDepth changed from %v to %v", c.Engine.Geometry.DefenseAreaDepth, defenseAreaDepth)
				c.Engine.Geometry.DefenseAreaDepth = defenseAreaDepth
			}
		} else if *line.Name == "LeftPenaltyStretch" {
			defenseAreaWidth := math.Abs(float64(*line.P1.Y-*line.P2.Y)) / 1000.0
			if math.Abs(defenseAreaWidth-c.Engine.Geometry.DefenseAreaWidth) > 1e-3 {
				log.Printf("DefenseAreaDepth changed from %v to %v", c.Engine.Geometry.DefenseAreaWidth, defenseAreaWidth)
				c.Engine.Geometry.DefenseAreaWidth = defenseAreaWidth
			}
		}
	}
}
