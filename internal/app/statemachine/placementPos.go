package statemachine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/config"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/geom"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"math"
)

type BallPlacementPosDeterminer struct {
	Event               *state.GameEvent
	Geometry            config.Geometry
	CurrentPlacementPos *geom.Vector2
	OnPositiveHalf      map[state.SSL_Team]bool
}

// Location determines the ball placement position based on the game event type
func (s *BallPlacementPosDeterminer) Location() *geom.Vector2 {
	switch *s.Event.Type {
	case state.GameEvent_BALL_LEFT_FIELD_TOUCH_LINE:
		if s.Event.GetBallLeftFieldTouchLine().Location != nil {
			location := s.Event.GetBallLeftFieldTouchLine().Location
			x := s.Geometry.FieldLength/2 - s.Geometry.PlacementOffsetGoalLine
			if math.Abs(float64(*location.X)) > x {
				*location.X = float32(math.Copysign(x, float64(*location.X)))
			}
			y := s.Geometry.FieldWidth/2 - s.Geometry.PlacementOffsetTouchLine
			*location.Y = float32(math.Copysign(y, float64(*location.Y)))
			return s.validateLocation(location)
		}
		return s.validateLocation(nil)
	case state.GameEvent_BALL_LEFT_FIELD_GOAL_LINE:
		if s.Event.GetBallLeftFieldGoalLine().Location != nil {
			location := s.Event.GetBallLeftFieldGoalLine().Location
			return s.ballPlacementLocationGoalLine(location)
		}
		return s.validateLocation(nil)
	case state.GameEvent_PENALTY_KICK_FAILED:
		if s.Event.GetPenaltyKickFailed().Location != nil {
			location := s.Event.GetPenaltyKickFailed().Location
			return s.ballPlacementLocationGoalLine(location)
		}
		return s.validateLocation(nil)
	case state.GameEvent_POSSIBLE_GOAL:
		if s.Event.GetPossibleGoal().Location != nil {
			location := s.Event.GetPossibleGoal().Location
			return s.ballPlacementLocationGoalLine(location)
		}
		return s.validateLocation(nil)
	case state.GameEvent_AIMLESS_KICK:
		return s.validateLocation(s.Event.GetAimlessKick().KickLocation)
	case state.GameEvent_GOAL:
		center := geom.NewVector2(0.0, 0.0)
		return s.validateLocation(center)
	case state.GameEvent_BOT_TIPPED_OVER:
		return s.validateLocation(s.Event.GetBotTippedOver().BallLocation)
	case state.GameEvent_BOT_INTERFERED_PLACEMENT:
		return s.validateLocation(s.CurrentPlacementPos)
	case state.GameEvent_BOT_KICKED_BALL_TOO_FAST:
		return s.validateLocation(s.Event.GetBotKickedBallTooFast().Location)
	case state.GameEvent_BOT_DRIBBLED_BALL_TOO_FAR:
		return s.validateLocation(s.Event.GetBotDribbledBallTooFar().Start)
	case state.GameEvent_BOT_PUSHED_BOT:
		return s.validateLocation(s.Event.GetBotPushedBot().Location)
	case state.GameEvent_BOT_HELD_BALL_DELIBERATELY:
		return s.validateLocation(s.Event.GetBotHeldBallDeliberately().Location)
	case state.GameEvent_ATTACKER_DOUBLE_TOUCHED_BALL:
		return s.validateLocation(s.Event.GetAttackerDoubleTouchedBall().Location)
	case state.GameEvent_ATTACKER_TOO_CLOSE_TO_DEFENSE_AREA:
		return s.validateLocation(s.Event.GetAttackerTooCloseToDefenseArea().BallLocation)
	case state.GameEvent_ATTACKER_TOUCHED_BALL_IN_DEFENSE_AREA:
		return s.validateLocation(s.Event.GetAttackerTouchedBallInDefenseArea().Location)
	case state.GameEvent_BOUNDARY_CROSSING:
		return s.validateLocation(s.Event.GetBoundaryCrossing().Location)
	case state.GameEvent_DEFENDER_TOO_CLOSE_TO_KICK_POINT:
		return s.validateLocation(s.CurrentPlacementPos)
	case state.GameEvent_DEFENDER_IN_DEFENSE_AREA, state.GameEvent_MULTIPLE_CARDS:
		teamInFavor := s.Event.ByTeam().Opposite()
		location := geom.NewVector2(0, 0)
		*location.X = float32((s.Geometry.FieldLength / 2.0) - s.Geometry.PenaltyKickDistToGoal)
		if s.OnPositiveHalf[teamInFavor] {
			*location.X *= -1
		}
		return location
	case state.GameEvent_KEEPER_HELD_BALL:
		return s.validateLocation(s.Event.GetKeeperHeldBall().Location)
	case state.GameEvent_NO_PROGRESS_IN_GAME:
		return s.validateLocation(s.Event.GetNoProgressInGame().Location)
	case state.GameEvent_PLACEMENT_FAILED:
		return s.validateLocation(s.CurrentPlacementPos)
	case state.GameEvent_TOO_MANY_ROBOTS:
		return s.validateLocation(s.Event.GetTooManyRobots().BallLocation)
	default:
		return s.validateLocation(nil)
	}
}

// ballPlacementLocationGoalLine determines the placement location for the case that the ball left the field via goal line
func (s *BallPlacementPosDeterminer) ballPlacementLocationGoalLine(lastBallLocation *geom.Vector2) *geom.Vector2 {
	var x float64
	if s.isGoalKick() {
		x = s.Geometry.FieldLength/2 - s.Geometry.PlacementOffsetGoalLineGoalKick
	} else {
		x = s.Geometry.FieldLength/2 - s.Geometry.PlacementOffsetGoalLine
	}

	y := s.Geometry.FieldWidth/2 - s.Geometry.PlacementOffsetTouchLine
	placementLocation := geom.NewVector2(
		math.Copysign(x, float64(*lastBallLocation.X)),
		math.Copysign(y, float64(*lastBallLocation.Y)),
	)
	return s.validateLocation(placementLocation)
}

// isGoalKick returns true if a goal kick is required. This depends on where the ball left the field.
func (s *BallPlacementPosDeterminer) isGoalKick() bool {
	if s.Event.GetBallLeftFieldGoalLine() == nil {
		// failed goal shot -> goal kick
		return true
	}
	teamInFavor := s.Event.ByTeam().Opposite()
	location := s.Event.GetBallLeftFieldGoalLine().Location
	if s.OnPositiveHalf[teamInFavor] && *location.X > 0 {
		return true
	}
	if !s.OnPositiveHalf[teamInFavor] && *location.X < 0 {
		return true
	}
	return false
}

// validateLocation will move the location to a valid location or will return the current placement pos
// if given location is nil
func (s *BallPlacementPosDeterminer) validateLocation(location *geom.Vector2) *geom.Vector2 {
	if location == nil {
		return s.CurrentPlacementPos
	}

	s.movePositionInsideField(location)
	s.movePositionOutOfDefenseArea(location)

	return location
}

// movePositionOutOfDefenseArea will move the given location outside of the defense area if required
func (s *BallPlacementPosDeterminer) movePositionOutOfDefenseArea(location *geom.Vector2) {
	maxX := s.Geometry.FieldLength/2 - s.Geometry.DefenseAreaDepth - s.Geometry.PlacementOffsetDefenseArea
	minY := s.Geometry.DefenseAreaWidth/2 + s.Geometry.PlacementOffsetDefenseArea
	if math.Abs(float64(*location.X)) > maxX && math.Abs(float64(*location.Y)) < minY {
		diffX := math.Abs(maxX - math.Abs(float64(*location.X)))
		diffY := math.Abs(minY - math.Abs(float64(*location.Y)))
		if diffX < diffY {
			*location.X = float32(math.Copysign(maxX, float64(*location.X)))
		} else {
			*location.Y = float32(math.Copysign(minY, float64(*location.Y)))
		}
	}
}

// movePositionInsideField will move the given location into the field if required
func (s *BallPlacementPosDeterminer) movePositionInsideField(location *geom.Vector2) {
	maxX := s.Geometry.FieldLength/2 - s.Geometry.PlacementOffsetGoalLine
	if math.Abs(float64(*location.X)) > maxX {
		*location.X = float32(math.Copysign(maxX, float64(*location.X)))
	}
	maxY := s.Geometry.FieldWidth/2 - s.Geometry.PlacementOffsetTouchLine
	if math.Abs(float64(*location.Y)) > maxY {
		*location.Y = float32(math.Copysign(maxY, float64(*location.Y)))
	}
}
