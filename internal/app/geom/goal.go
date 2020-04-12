package geom

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/config"
)

// GoalCenter returns the goal center using the flag for the side
func GoalCenter(geometry config.Geometry, onPositiveHalf bool) *Vector2 {
	if onPositiveHalf {
		return GoalCenterBySign(geometry, 1)
	}
	return GoalCenterBySign(geometry, -1)
}

// GoalCenterBySign returns the goal center using the sign
func GoalCenterBySign(geometry config.Geometry, sign float64) *Vector2 {
	return NewVector2(sign*geometry.FieldLength/2, 0)
}
