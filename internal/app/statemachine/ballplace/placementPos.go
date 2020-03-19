package ballplace

import (
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/config"
	"github.com/RoboCup-SSL/ssl-game-controller/internal/app/state"
	"math"
)

type BallPlacementPosDeterminer struct {
	Event               *state.GameEvent
	Geometry            *config.Geometry
	CurrentPlacementPos *state.Location
	OnPositiveHalf      map[state.Team]bool
}

// BallPlacementPos determines the ball placement position based on the primary game event
func (s *BallPlacementPosDeterminer) Location() *state.Location {
	switch *s.Event.Type {
	case state.GameEventType_BALL_LEFT_FIELD_TOUCH_LINE:
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
	case state.GameEventType_BALL_LEFT_FIELD_GOAL_LINE:
		if s.Event.GetBallLeftFieldGoalLine().Location != nil {
			location := s.Event.GetBallLeftFieldGoalLine().Location
			return s.ballPlacementLocationGoalLine(location)
		}
		return s.validateLocation(nil)
	case state.GameEventType_POSSIBLE_GOAL:
		if s.Event.GetPossibleGoal().Location != nil {
			location := s.Event.GetPossibleGoal().Location
			return s.ballPlacementLocationGoalLine(location)
		}
		return s.validateLocation(nil)
	case state.GameEventType_AIMLESS_KICK:
		return s.validateLocation(s.Event.GetAimlessKick().KickLocation)
	case state.GameEventType_GOAL:
		center := state.NewLocation(0.0, 0.0)
		return s.validateLocation(&center)
	case state.GameEventType_CHIPPED_GOAL:
		return s.validateLocation(s.Event.GetChippedGoal().KickLocation)
	case state.GameEventType_BOT_TIPPED_OVER:
		return s.validateLocation(s.Event.GetBotTippedOver().Location)
	case state.GameEventType_BOT_INTERFERED_PLACEMENT:
		return s.validateLocation(s.CurrentPlacementPos)
	case state.GameEventType_BOT_KICKED_BALL_TOO_FAST:
		return s.validateLocation(s.Event.GetBotKickedBallTooFast().Location)
	case state.GameEventType_BOT_DRIBBLED_BALL_TOO_FAR:
		return s.validateLocation(s.Event.GetBotDribbledBallTooFar().Start)
	case state.GameEventType_BOT_CRASH_UNIQUE:
		return s.validateLocation(s.Event.GetBotCrashUnique().Location)
	case state.GameEventType_BOT_PUSHED_BOT:
		return s.validateLocation(s.Event.GetBotPushedBot().Location)
	case state.GameEventType_BOT_HELD_BALL_DELIBERATELY:
		return s.validateLocation(s.Event.GetBotHeldBallDeliberately().Location)
	case state.GameEventType_ATTACKER_DOUBLE_TOUCHED_BALL:
		return s.validateLocation(s.Event.GetAttackerDoubleTouchedBall().Location)
	case state.GameEventType_ATTACKER_TOO_CLOSE_TO_DEFENSE_AREA:
		return s.validateLocation(s.Event.GetAttackerTooCloseToDefenseArea().Location)
	case state.GameEventType_ATTACKER_TOUCHED_BALL_IN_DEFENSE_AREA:
		return s.validateLocation(s.Event.GetAttackerTouchedBallInDefenseArea().Location)
	case state.GameEventType_ATTACKER_TOUCHED_OPPONENT_IN_DEFENSE_AREA:
		return s.validateLocation(s.Event.GetAttackerTouchedOpponentInDefenseArea().Location)
	case state.GameEventType_DEFENDER_TOO_CLOSE_TO_KICK_POINT:
		return s.validateLocation(s.CurrentPlacementPos)
	case state.GameEventType_DEFENDER_IN_DEFENSE_AREA_PARTIALLY:
		return s.validateLocation(s.Event.GetDefenderInDefenseAreaPartially().Location)
	case state.GameEventType_DEFENDER_IN_DEFENSE_AREA, state.GameEventType_MULTIPLE_CARDS:
		teamInFavor := s.Event.ByTeam().Opposite()
		location := state.NewLocation(0, 0)
		*location.X = float32((s.Geometry.FieldLength / 2.0) - s.Geometry.PenaltyKickDistToGoal)
		if s.OnPositiveHalf[teamInFavor] {
			*location.X *= -1
		}
		return &location
	case state.GameEventType_KEEPER_HELD_BALL:
		return s.validateLocation(s.Event.GetKeeperHeldBall().Location)
	case state.GameEventType_NO_PROGRESS_IN_GAME:
		return s.validateLocation(s.Event.GetNoProgressInGame().Location)
	case state.GameEventType_PLACEMENT_FAILED:
		return s.validateLocation(s.CurrentPlacementPos)
	default:
		return s.validateLocation(nil)
	}
}

func (s *BallPlacementPosDeterminer) ballPlacementLocationGoalLine(lastBallLocation *state.Location) *state.Location {
	var x float64
	if s.isGoalKick() {
		x = s.Geometry.FieldLength/2 - s.Geometry.PlacementOffsetGoalLineGoalKick
	} else {
		x = s.Geometry.FieldLength/2 - s.Geometry.PlacementOffsetGoalLine
	}

	y := s.Geometry.FieldWidth/2 - s.Geometry.PlacementOffsetTouchLine
	placementLocation := state.NewLocation64(
		math.Copysign(x, float64(*lastBallLocation.X)),
		math.Copysign(y, float64(*lastBallLocation.Y)),
	)
	return s.validateLocation(&placementLocation)
}

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

func (s *BallPlacementPosDeterminer) validateLocation(location *state.Location) *state.Location {
	if location == nil {
		return s.CurrentPlacementPos
	}

	s.movePositionInsideField(location)
	s.movePositionOutOfDefenseArea(location)

	return location
}

func (s *BallPlacementPosDeterminer) movePositionOutOfDefenseArea(location *state.Location) {
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

func (s *BallPlacementPosDeterminer) movePositionInsideField(location *state.Location) {
	maxX := s.Geometry.FieldLength/2 - s.Geometry.PlacementOffsetGoalLine
	if math.Abs(float64(*location.X)) > maxX {
		*location.X = float32(math.Copysign(maxX, float64(*location.X)))
	}
	maxY := s.Geometry.FieldWidth/2 - s.Geometry.PlacementOffsetTouchLine
	if math.Abs(float64(*location.Y)) > maxY {
		*location.Y = float32(math.Copysign(maxY, float64(*location.Y)))
	}
}
