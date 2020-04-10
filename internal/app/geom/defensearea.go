package geom

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/config"
)

func NewDefenseArea(geometry config.Geometry, onPositiveHalf bool) *Rectangle {
	if onPositiveHalf {
		return NewDefenseAreaBySign(geometry, 1)
	}
	return NewDefenseAreaBySign(geometry, -1)
}

func NewDefenseAreaBySign(geometry config.Geometry, sign float64) *Rectangle {
	center := NewVector2(sign*(geometry.FieldLength/2.0-geometry.DefenseAreaDepth/2.0), 0)
	return NewRectangleFromCenter(center, geometry.DefenseAreaDepth, geometry.DefenseAreaWidth)
}
