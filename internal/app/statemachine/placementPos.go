package statemachine

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/config"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/geom"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"log"
	"math"
)

type BallPlacementPosDeterminer struct {
	Event               *state.GameEvent
	Geometry            config.Geometry
	CurrentPlacementPos *geom.Vector2
	OnPositiveHalf      map[state.Team]bool
}

// Location determines the ball placement position based on the game event type
func (s *BallPlacementPosDeterminer) Location() *geom.Vector2 {
	switch *s.Event.Type {
	// Ball out of field events (stopping)
	case state.GameEvent_BALL_LEFT_FIELD_TOUCH_LINE:
		if s.Event.GetBallLeftFieldTouchLine().Location != nil {
			location := s.Event.GetBallLeftFieldTouchLine().Location
			x := s.Geometry.FieldLength/2 - s.Geometry.PlacementOffsetGoalLine
			if math.Abs(location.GetX64()) > x {
				*location.X = float32(math.Copysign(x, location.GetX64()))
			}
			y := s.Geometry.FieldWidth/2 - s.Geometry.PlacementOffsetTouchLine
			*location.Y = float32(math.Copysign(y, location.GetY64()))
			return s.validateLocation(location)
		}
		return s.keepCurrentPlacementPos()
	case state.GameEvent_BALL_LEFT_FIELD_GOAL_LINE:
		if s.Event.GetBallLeftFieldGoalLine().Location != nil {
			location := s.Event.GetBallLeftFieldGoalLine().Location
			return s.ballPlacementLocationGoalLine(location)
		}
		return s.keepCurrentPlacementPos()
	case state.GameEvent_AIMLESS_KICK:
		return s.validateLocation(s.Event.GetAimlessKick().KickLocation)

	// Stopping Fouls
	case state.GameEvent_ATTACKER_TOO_CLOSE_TO_DEFENSE_AREA:
		return s.validateLocation(s.Event.GetAttackerTooCloseToDefenseArea().BallLocation)
	case state.GameEvent_DEFENDER_IN_DEFENSE_AREA:
		teamInFavor := s.Event.ByTeam().Opposite()
		return s.penaltyKick(teamInFavor)
	case state.GameEvent_BOUNDARY_CROSSING:
		return s.validateLocation(s.Event.GetBoundaryCrossing().Location)
	case state.GameEvent_KEEPER_HELD_BALL:
		return s.validateLocation(s.Event.GetKeeperHeldBall().Location)
	case state.GameEvent_BOT_DRIBBLED_BALL_TOO_FAR:
		return s.validateLocation(s.Event.GetBotDribbledBallTooFar().Start)

	case state.GameEvent_BOT_PUSHED_BOT:
		return s.validateLocation(s.Event.GetBotPushedBot().Location)
	case state.GameEvent_BOT_HELD_BALL_DELIBERATELY:
		return s.validateLocation(s.Event.GetBotHeldBallDeliberately().Location)
	case state.GameEvent_BOT_TIPPED_OVER:
		return s.validateLocation(s.Event.GetBotTippedOver().BallLocation)
	case state.GameEvent_BOT_DROPPED_PARTS:
		return s.validateLocation(s.Event.GetBotDroppedParts().BallLocation)

	// Non-Stopping Fouls
	case state.GameEvent_BOT_KICKED_BALL_TOO_FAST,
		state.GameEvent_ATTACKER_TOUCHED_BALL_IN_DEFENSE_AREA,
		state.GameEvent_BOT_CRASH_UNIQUE,
		state.GameEvent_BOT_CRASH_DRAWN:
		return s.keepCurrentPlacementPos()

	// Fouls while ball out of play
	case state.GameEvent_DEFENDER_TOO_CLOSE_TO_KICK_POINT,
		state.GameEvent_BOT_TOO_FAST_IN_STOP,
		state.GameEvent_BOT_INTERFERED_PLACEMENT:
		return s.keepCurrentPlacementPos()

	// Scoring goals
	case state.GameEvent_POSSIBLE_GOAL:
		if s.Event.GetPossibleGoal().Location != nil {
			location := s.Event.GetPossibleGoal().Location
			return s.ballPlacementLocationGoalLine(location)
		}
		return s.keepCurrentPlacementPos()
	case state.GameEvent_GOAL:
		center := geom.NewVector2(0.0, 0.0)
		return s.validateLocation(center)
	case state.GameEvent_INVALID_GOAL:
		return s.keepCurrentPlacementPos()

	// Other events

	case state.GameEvent_ATTACKER_DOUBLE_TOUCHED_BALL:
		return s.validateLocation(s.Event.GetAttackerDoubleTouchedBall().Location)
	case state.GameEvent_PLACEMENT_SUCCEEDED:
		return s.keepCurrentPlacementPos()
	case state.GameEvent_PENALTY_KICK_FAILED:
		if s.Event.GetPenaltyKickFailed().Location != nil {
			location := s.Event.GetPenaltyKickFailed().Location
			return s.ballPlacementLocationGoalLine(location)
		}
		return s.keepCurrentPlacementPos()
	case state.GameEvent_NO_PROGRESS_IN_GAME:
		return s.validateLocation(s.Event.GetNoProgressInGame().Location)
	case state.GameEvent_PLACEMENT_FAILED,
		state.GameEvent_MULTIPLE_CARDS,
		state.GameEvent_MULTIPLE_FOULS,
		state.GameEvent_BOT_SUBSTITUTION,
		state.GameEvent_CHALLENGE_FLAG,
		state.GameEvent_CHALLENGE_FLAG_HANDLED,
		state.GameEvent_EMERGENCY_STOP,
		state.GameEvent_UNSPORTING_BEHAVIOR_MINOR,
		state.GameEvent_UNSPORTING_BEHAVIOR_MAJOR:
		return s.keepCurrentPlacementPos()
	case state.GameEvent_TOO_MANY_ROBOTS:
		return s.validateLocation(s.Event.GetTooManyRobots().BallLocation)

	default:
		log.Fatalln("Unhandled game event: ", *s.Event.Type)
		return nil
	}
}

func (s *BallPlacementPosDeterminer) keepCurrentPlacementPos() *geom.Vector2 {
	return s.validateLocation(nil)
}

func (s *BallPlacementPosDeterminer) penaltyKick(teamInFavor state.Team) *geom.Vector2 {
	location := geom.NewVector2(0, 0)
	*location.X = float32((s.Geometry.FieldLength / 2.0) - s.Geometry.PenaltyKickDistToGoal)
	if s.OnPositiveHalf[teamInFavor] {
		*location.X *= -1
	}
	return location
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
		math.Copysign(x, float64(lastBallLocation.GetX())),
		math.Copysign(y, float64(lastBallLocation.GetY())),
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
	if s.OnPositiveHalf[teamInFavor] && location.GetX() > 0 {
		return true
	}
	if !s.OnPositiveHalf[teamInFavor] && location.GetX() < 0 {
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
	if math.Abs(location.GetX64()) > maxX && math.Abs(location.GetY64()) < minY {
		diffX := math.Abs(maxX - math.Abs(location.GetX64()))
		diffY := math.Abs(minY - math.Abs(location.GetY64()))
		if diffX < diffY {
			*location.X = float32(math.Copysign(maxX, location.GetX64()))
		} else {
			*location.Y = float32(math.Copysign(minY, location.GetY64()))
		}
	}
}

// movePositionInsideField will move the given location into the field if required
func (s *BallPlacementPosDeterminer) movePositionInsideField(location *geom.Vector2) {
	maxX := s.Geometry.FieldLength/2 - s.Geometry.PlacementOffsetGoalLine
	if math.Abs(location.GetX64()) > maxX {
		*location.X = float32(math.Copysign(maxX, location.GetX64()))
	}
	maxY := s.Geometry.FieldWidth/2 - s.Geometry.PlacementOffsetTouchLine
	if math.Abs(location.GetY64()) > maxY {
		*location.Y = float32(math.Copysign(maxY, location.GetY64()))
	}
}
