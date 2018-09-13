package controller

import (
	"github.com/RoboCup-SSL/ssl-game-controller/pkg/refproto"
	"log"
	"math"
)

// BallPlacementPos determines the ball placement position based on the game event
func (e *Engine) BallPlacementPos() *Location {
	if len(e.State.GameEvents) == 0 {
		return nil
	}
	event := e.State.GameEvents[0]
	if event.IsSecondary() || event.IsContinued() {
		return nil
	}

	switch event.Type {
	case GameEventBallLeftFieldTouchLine:
		return e.validateProtoLocation(event.Details.BallLeftFieldTouchLine.Location)
	case GameEventBallLeftFieldGoalLine:
		if event.Details.BallLeftFieldGoalLine.Location != nil && e.isGoalKick(event) {
			location := mapProtoLocation(event.Details.BallLeftFieldGoalLine.Location)
			maxX := e.Geometry.FieldLength/2 - e.Geometry.PlacementOffsetGoalLineGoalKick
			if math.Abs(location.X) > maxX {
				location.X = math.Copysign(maxX, location.X)
			}
			return e.validateLocation(location)
		}
		return e.validateProtoLocation(event.Details.BallLeftFieldGoalLine.Location)
	case GameEventIcing:
		return e.validateProtoLocation(event.Details.Icing.KickLocation)
	case GameEventGoal:
		return &Location{X: 0.0, Y: 0.0}
	case GameEventIndirectGoal:
		return e.validateProtoLocation(event.Details.IndirectGoal.KickLocation)
	case GameEventChippedGoal:
		return e.validateProtoLocation(event.Details.ChippedGoal.KickLocation)
	case GameEventBotTippedOver:
		return e.validateProtoLocation(event.Details.BotTippedOver.Location)
	case GameEventBotInterferedPlacement:
		return e.validateLocation(e.State.PlacementPos)
	case GameEventBotCrashDrawn:
		return e.validateProtoLocation(event.Details.BotCrashDrawn.Location)
	case GameEventBotKickedBallTooFast:
		return e.validateProtoLocation(event.Details.BotKickedBallTooFast.Location)
	case GameEventBotDribbledBallTooFar:
		return e.validateProtoLocation(event.Details.BotDribbledBallTooFar.Start)
	case GameEventBotCrashUnique:
		return e.validateProtoLocation(event.Details.BotCrashUnique.Location)
	case GameEventBotCrashUniqueContinue:
		return e.validateProtoLocation(event.Details.BotCrashUniqueContinue.Location)
	case GameEventBotPushedBot:
		return e.validateProtoLocation(event.Details.BotPushedBot.Location)
	case GameEventBotPushedBotContinue:
		return e.validateProtoLocation(event.Details.BotPushedBotContinue.Location)
	case GameEventBotHeldBallDeliberately:
		return e.validateProtoLocation(event.Details.BotHeldBallDeliberately.Location)
	case GameEventAttackerDoubleTouchedBall:
		return e.validateProtoLocation(event.Details.AttackerDoubleTouchedBall.Location)
	case GameEventAttackerTooCloseToDefenseArea:
		return e.validateProtoLocation(event.Details.AttackerTooCloseToDefenseArea.Location)
	case GameEventAttackerInDefenseArea:
		return e.validateProtoLocation(event.Details.AttackerInDefenseArea.Location)
	case GameEventAttackerTouchedKeeper:
		return e.validateProtoLocation(event.Details.AttackerTouchedKeeper.Location)
	case GameEventDefenderTooCloseToKickPoint:
		return e.validateLocation(e.State.PlacementPos)
	case GameEventDefenderInDefenseAreaPartially:
		return e.validateProtoLocation(event.Details.DefenderInDefenseAreaPartially.Location)
	case GameEventDefenderInDefenseArea:
		teamInFavor := event.ByTeam().Opposite()
		location := Location{}
		location.X = (e.Geometry.FieldLength / 2.0) - e.Geometry.PenaltyAreaDepth
		if e.State.TeamState[teamInFavor].OnPositiveHalf {
			location.X *= -1
		}
		return &location
	case GameEventKeeperHeldBall:
		return e.validateProtoLocation(event.Details.KeeperHeldBall.Location)
	case GameEventKickTimeout:
		return e.validateLocation(e.State.PlacementPos)
	case GameEventNoProgressInGame:
		return e.validateProtoLocation(event.Details.NoProgressInGame.Location)
	case GameEventPlacementFailedByTeamInFavor:
		return e.validateLocation(e.State.PlacementPos)
	case GameEventPlacementFailedByOpponent:
		return e.validateLocation(e.State.PlacementPos)
	default:
		log.Print("Warn: Unknown game event: ", event.Type)
		return nil
	}
}

func (e *Engine) isGoalKick(event *GameEvent) bool {
	teamInFavor := event.ByTeam().Opposite()
	location := mapProtoLocation(event.Details.BallLeftFieldGoalLine.Location)
	if e.State.TeamState[teamInFavor].OnPositiveHalf && location.X > 0 {
		return true
	}
	if !e.State.TeamState[teamInFavor].OnPositiveHalf && location.X < 0 {
		return true
	}
	return false
}

func mapProtoLocation(location *refproto.Location) *Location {
	return &Location{X: float64(*location.X), Y: float64(*location.Y)}
}

func (e *Engine) validateProtoLocation(location *refproto.Location) *Location {
	if location == nil {
		return nil
	}
	return e.validateLocation(mapProtoLocation(location))
}

func (e *Engine) validateLocation(location *Location) *Location {
	if location == nil {
		return nil
	}

	e.movePositionInsideField(location)
	e.movePositionOutOfDefenseArea(location)

	return location
}

func (e *Engine) movePositionOutOfDefenseArea(location *Location) {
	maxX := e.Geometry.FieldLength/2 - e.Geometry.PenaltyAreaDepth - e.Geometry.PlacementOffsetDefenseArea
	minY := e.Geometry.PenaltyAreaWidth + e.Geometry.PlacementOffsetDefenseArea
	if math.Abs(location.X) > maxX && math.Abs(location.Y) < minY {
		if math.Abs(maxX-math.Abs(location.X)) < math.Abs(minY-math.Abs(location.Y)) {
			location.X = math.Copysign(maxX, location.X)
		} else {
			location.Y = math.Copysign(minY, location.Y)
		}
	}
}

func (e *Engine) movePositionInsideField(location *Location) {
	maxX := e.Geometry.FieldLength/2 - e.Geometry.PlacementOffsetGoalLine
	if math.Abs(location.X) > maxX {
		location.X = math.Copysign(maxX, location.X)
	}
	maxY := e.Geometry.FieldWidth/2 - e.Geometry.PlacementOffsetTouchLine
	if math.Abs(location.Y) > maxY {
		location.Y = math.Copysign(maxY, location.Y)
	}
}
