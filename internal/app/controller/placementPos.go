package controller

import (
	"github.com/RoboCup-SSL/ssl-game-controller/pkg/refproto"
	"log"
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
		return validateProtoLocation(event.Details.BallLeftFieldTouchLine.Location)
	case GameEventBallLeftFieldGoalLine:
		// TODO corner
		return validateProtoLocation(event.Details.BallLeftFieldGoalLine.Location)
	case GameEventIcing:
		return validateProtoLocation(event.Details.Icing.KickLocation)
	case GameEventGoal:
		return &Location{X: 0.0, Y: 0.0}
	case GameEventIndirectGoal:
		return validateProtoLocation(event.Details.IndirectGoal.KickLocation)
	case GameEventChippedGoal:
		return validateProtoLocation(event.Details.ChippedGoal.KickLocation)
	case GameEventBotTippedOver:
		return validateProtoLocation(event.Details.BotTippedOver.Location)
	case GameEventBotInterferedPlacement:
		return validateLocation(e.State.PlacementPos)
	case GameEventBotCrashDrawn:
		return validateProtoLocation(event.Details.BotCrashDrawn.Location)
	case GameEventBotKickedBallTooFast:
		return validateProtoLocation(event.Details.BotKickedBallTooFast.Location)
	case GameEventBotDribbledBallTooFar:
		return validateProtoLocation(event.Details.BotDribbledBallTooFar.Start)
	case GameEventBotCrashUnique:
		return validateProtoLocation(event.Details.BotCrashUnique.Location)
	case GameEventBotCrashUniqueContinue:
		return validateProtoLocation(event.Details.BotCrashUniqueContinue.Location)
	case GameEventBotPushedBot:
		return validateProtoLocation(event.Details.BotPushedBot.Location)
	case GameEventBotPushedBotContinue:
		return validateProtoLocation(event.Details.BotPushedBotContinue.Location)
	case GameEventBotHeldBallDeliberately:
		return validateProtoLocation(event.Details.BotHeldBallDeliberately.Location)
	case GameEventAttackerDoubleTouchedBall:
		return validateProtoLocation(event.Details.AttackerDoubleTouchedBall.Location)
	case GameEventAttackerTooCloseToDefenseArea:
		return validateProtoLocation(event.Details.AttackerTooCloseToDefenseArea.Location)
	case GameEventAttackerInDefenseArea:
		return validateProtoLocation(event.Details.AttackerInDefenseArea.Location)
	case GameEventAttackerTouchedKeeper:
		return validateProtoLocation(event.Details.AttackerTouchedKeeper.Location)
	case GameEventDefenderTooCloseToKickPoint:
		return validateLocation(e.State.PlacementPos)
	case GameEventDefenderInDefenseAreaPartially:
		return validateProtoLocation(event.Details.DefenderInDefenseAreaPartially.Location)
	case GameEventDefenderInDefenseArea:
		// TODO penalty mark
		return nil
	case GameEventKeeperHeldBall:
		return validateProtoLocation(event.Details.KeeperHeldBall.Location)
	case GameEventKickTimeout:
		return validateLocation(e.State.PlacementPos)
	case GameEventNoProgressInGame:
		return validateProtoLocation(event.Details.NoProgressInGame.Location)
	case GameEventPlacementFailedByTeamInFavor:
		return validateLocation(e.State.PlacementPos)
	case GameEventPlacementFailedByOpponent:
		return validateLocation(e.State.PlacementPos)
	default:
		log.Print("Warn: Unknown game event: ", event.Type)
		return nil
	}
}

func validateProtoLocation(location *refproto.Location) *Location {
	if location == nil {
		return nil
	}
	return validateLocation(&Location{X: *location.X, Y: *location.Y})
}

func validateLocation(location *Location) *Location {
	if location == nil {
		return nil
	}
	// TODO move inside field
	// TODO move away from defense area
	return location
}
