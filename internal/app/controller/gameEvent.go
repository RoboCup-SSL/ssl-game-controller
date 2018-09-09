package controller

import (
	"github.com/RoboCup-SSL/ssl-game-controller/pkg/refproto"
	"reflect"
)

type GameEventType string

const (
	GameEventNone                           GameEventType = "none"
	GameEventBallLeftFieldTouchLine         GameEventType = "ballLeftFieldTouchLine"
	GameEventBallLeftFieldGoalLine          GameEventType = "ballLeftFieldGoalLine"
	GameEventIcing                          GameEventType = "icing"
	GameEventGoal                           GameEventType = "goal"
	GameEventIndirectGoal                   GameEventType = "indirectGoal"
	GameEventChippedGoal                    GameEventType = "chippedGoal"
	GameEventBotTooFastInStop               GameEventType = "botTooFastInStop"
	GameEventBotTippedOver                  GameEventType = "botTippedOver"
	GameEventBotInterferedPlacement         GameEventType = "botInterferedPlacement"
	GameEventBotCrashDrawn                  GameEventType = "botCrashDrawn"
	GameEventBotKickedBallTooFast           GameEventType = "botKickedBallTooFast"
	GameEventBotDribbledBallTooFar          GameEventType = "botDribbledBallTooFar"
	GameEventBotCrashUnique                 GameEventType = "botCrashUnique"
	GameEventBotPushedBot                   GameEventType = "botPushedBot"
	GameEventBotHeldBallDeliberately        GameEventType = "botHeldBallDeliberately"
	GameEventAttackerDoubleTouchedBall      GameEventType = "attackerDoubleTouchedBall"
	GameEventAttackerTooCloseToDefenseArea  GameEventType = "attackerTooCloseToDefenseArea"
	GameEventAttackerInDefenseArea          GameEventType = "attackerInDefenseArea"
	GameEventAttackerTouchedKeeper          GameEventType = "attackerTouchedKeeper"
	GameEventDefenderTooCloseToKickPoint    GameEventType = "defenderTooCloseToKickPoint"
	GameEventDefenderInDefenseAreaPartially GameEventType = "defenderInDefenseAreaPartially"
	GameEventDefenderInDefenseArea          GameEventType = "defenderInDefenseArea"
	GameEventKeeperHeldBall                 GameEventType = "keeperHeldBall"
	GameEventUnsportiveBehaviorMinor        GameEventType = "unsportiveBehaviorMinor"
	GameEventUnsportiveBehaviorMajor        GameEventType = "unsportiveBehaviorMajor"
	GameEventMultipleYellowCards            GameEventType = "multipleYellowCards"
	GameEventMultipleFouls                  GameEventType = "multipleFouls"
	GameEventKickTimeout                    GameEventType = "kickTimeout"
	GameEventNoProgressInGame               GameEventType = "noProgressInGame"
	GameEventPlacementFailedByTeamInFavor   GameEventType = "placementFailedByTeamInFavor"
	GameEventPlacementFailedByOpponent      GameEventType = "placementFailedByOpponent"
)

type GameEvent struct {
	Type    GameEventType    `json:"type"`
	Details GameEventDetails `json:"details"`
}

func (e GameEvent) ByTeam() Team {
	v := reflect.ValueOf(e.Details)
	for i := 0; i < v.NumField(); i++ {
		if !v.Field(i).IsNil() {
			byTeamValue := v.Field(i).Elem().FieldByName("ByTeam")
			if byTeamValue.IsValid() && !byTeamValue.IsNil() {
				return NewTeam(refproto.Team(byTeamValue.Elem().Int()))
			}
		}
	}
	return TeamUnknown
}

// GameEventDetails holds details of a game event. Only one field should be non-nil
type GameEventDetails struct {
	BallLeftFieldTouchLine         *refproto.GameEvent_BallLeftFieldEvent             `json:"ballLeftFieldTouchLine,omitempty"`
	BallLeftFieldGoalLine          *refproto.GameEvent_BallLeftFieldEvent             `json:"ballLeftFieldGoalLine,omitempty"`
	Icing                          *refproto.GameEvent_Icing                          `json:"icing,omitempty"`
	Goal                           *refproto.GameEvent_Goal                           `json:"goal,omitempty"`
	IndirectGoal                   *refproto.GameEvent_IndirectGoal                   `json:"indirectGoal,omitempty"`
	ChippedGoal                    *refproto.GameEvent_ChippedGoal                    `json:"chippedGoal,omitempty"`
	BotTooFastInStop               *refproto.GameEvent_BotTooFastInStop               `json:"botTooFastInStop,omitempty"`
	BotTippedOver                  *refproto.GameEvent_BotTippedOver                  `json:"botTippedOver,omitempty"`
	BotInterferedPlacement         *refproto.GameEvent_BotInterferedPlacement         `json:"botInterferedPlacement,omitempty"`
	BotCrashDrawn                  *refproto.GameEvent_BotCrashDrawn                  `json:"botCrashDrawn,omitempty"`
	BotKickedBallTooFast           *refproto.GameEvent_BotKickedBallTooFast           `json:"botKickedBallTooFast,omitempty"`
	BotDribbledBallTooFar          *refproto.GameEvent_BotDribbledBallTooFar          `json:"botDribbledBallTooFar,omitempty"`
	BotCrashUnique                 *refproto.GameEvent_BotCrashUnique                 `json:"botCrashUnique,omitempty"`
	BotPushedBot                   *refproto.GameEvent_BotPushedBot                   `json:"botPushedBot,omitempty"`
	BotHeldBallDeliberately        *refproto.GameEvent_BotHeldBallDeliberately        `json:"botHeldBallDeliberately,omitempty"`
	AttackerDoubleTouchedBall      *refproto.GameEvent_AttackerDoubleTouchedBall      `json:"attackerDoubleTouchedBall,omitempty"`
	AttackerTooCloseToDefenseArea  *refproto.GameEvent_AttackerTooCloseToDefenseArea  `json:"attackerTooCloseToDefenseArea,omitempty"`
	AttackerInDefenseArea          *refproto.GameEvent_AttackerInDefenseArea          `json:"attackerInDefenseArea,omitempty"`
	AttackerTouchedKeeper          *refproto.GameEvent_AttackerTouchedKeeper          `json:"attackerTouchedKeeper,omitempty"`
	DefenderTooCloseToKickPoint    *refproto.GameEvent_DefenderTooCloseToKickPoint    `json:"defenderTooCloseToKickPoint,omitempty"`
	DefenderInDefenseAreaPartially *refproto.GameEvent_DefenderInDefenseAreaPartially `json:"defenderInDefenseAreaPartially,omitempty"`
	DefenderInDefenseArea          *refproto.GameEvent_DefenderInDefenseArea          `json:"defenderInDefenseArea,omitempty"`
	KeeperHeldBall                 *refproto.GameEvent_KeeperHeldBall                 `json:"keeperHeldBall,omitempty"`
	UnsportiveBehaviorMinor        *refproto.GameEvent_UnsportiveBehaviorMinor        `json:"unsportiveBehaviorMinor,omitempty"`
	UnsportiveBehaviorMajor        *refproto.GameEvent_UnsportiveBehaviorMajor        `json:"unsportiveBehaviorMajor,omitempty"`
	MultipleYellowCards            *refproto.GameEvent_MultipleYellowCards            `json:"multipleYellowCards,omitempty"`
	MultipleFouls                  *refproto.GameEvent_MultipleFouls                  `json:"multipleFouls,omitempty"`
	KickTimeout                    *refproto.GameEvent_KickTimeout                    `json:"kickTimeout,omitempty"`
	NoProgressInGame               *refproto.GameEvent_NoProgressInGame               `json:"noProgressInGame,omitempty"`
	PlacementFailedByTeamInFavor   *refproto.GameEvent_PlacementFailedByTeamInFavor   `json:"placementFailedByTeamInFavor,omitempty"`
	PlacementFailedByOpponent      *refproto.GameEvent_PlacementFailedByOpponent      `json:"placementFailedByOpponent,omitempty"`
}

func (d GameEventDetails) EventType() GameEventType {
	if d.BallLeftFieldTouchLine != nil {
		return GameEventBallLeftFieldTouchLine
	}
	if d.BallLeftFieldGoalLine != nil {
		return GameEventBallLeftFieldGoalLine
	}
	if d.Icing != nil {
		return GameEventIcing
	}
	if d.Goal != nil {
		return GameEventGoal
	}
	if d.IndirectGoal != nil {
		return GameEventIndirectGoal
	}
	if d.ChippedGoal != nil {
		return GameEventChippedGoal
	}
	if d.BotTooFastInStop != nil {
		return GameEventBotTooFastInStop
	}
	if d.BotTippedOver != nil {
		return GameEventBotTippedOver
	}
	if d.BotInterferedPlacement != nil {
		return GameEventBotInterferedPlacement
	}
	if d.BotCrashDrawn != nil {
		return GameEventBotCrashDrawn
	}
	if d.BotKickedBallTooFast != nil {
		return GameEventBotKickedBallTooFast
	}
	if d.BotDribbledBallTooFar != nil {
		return GameEventBotDribbledBallTooFar
	}
	if d.BotCrashUnique != nil {
		return GameEventBotCrashUnique
	}
	if d.BotPushedBot != nil {
		return GameEventBotPushedBot
	}
	if d.BotHeldBallDeliberately != nil {
		return GameEventBotHeldBallDeliberately
	}
	if d.AttackerDoubleTouchedBall != nil {
		return GameEventAttackerDoubleTouchedBall
	}
	if d.AttackerTooCloseToDefenseArea != nil {
		return GameEventAttackerTooCloseToDefenseArea
	}
	if d.AttackerInDefenseArea != nil {
		return GameEventAttackerInDefenseArea
	}
	if d.AttackerTouchedKeeper != nil {
		return GameEventAttackerTouchedKeeper
	}
	if d.DefenderTooCloseToKickPoint != nil {
		return GameEventDefenderTooCloseToKickPoint
	}
	if d.DefenderInDefenseAreaPartially != nil {
		return GameEventDefenderInDefenseAreaPartially
	}
	if d.DefenderInDefenseArea != nil {
		return GameEventDefenderInDefenseArea
	}
	if d.KeeperHeldBall != nil {
		return GameEventKeeperHeldBall
	}
	if d.UnsportiveBehaviorMinor != nil {
		return GameEventUnsportiveBehaviorMinor
	}
	if d.UnsportiveBehaviorMajor != nil {
		return GameEventUnsportiveBehaviorMajor
	}
	if d.MultipleYellowCards != nil {
		return GameEventMultipleYellowCards
	}
	if d.MultipleFouls != nil {
		return GameEventMultipleFouls
	}
	if d.KickTimeout != nil {
		return GameEventKickTimeout
	}
	if d.NoProgressInGame != nil {
		return GameEventNoProgressInGame
	}
	if d.PlacementFailedByTeamInFavor != nil {
		return GameEventPlacementFailedByTeamInFavor
	}
	if d.PlacementFailedByOpponent != nil {
		return GameEventPlacementFailedByOpponent
	}
	return GameEventNone
}

func NewGameEventDetails(event refproto.GameEvent) (d GameEventDetails) {
	d.BallLeftFieldTouchLine = event.GetBallLeftFieldTouchLine()
	d.BallLeftFieldGoalLine = event.GetBallLeftFieldGoalLine()
	d.Icing = event.GetIcing()
	d.Goal = event.GetGoal()
	d.IndirectGoal = event.GetIndirectGoal()
	d.ChippedGoal = event.GetChippedGoal()
	d.BotTooFastInStop = event.GetBotTooFastInStop()
	d.BotTippedOver = event.GetBotTippedOver()
	d.BotInterferedPlacement = event.GetBotInterferedPlacement()
	d.BotCrashDrawn = event.GetBotCrashDrawn()
	d.BotKickedBallTooFast = event.GetBotKickedBallTooFast()
	d.BotDribbledBallTooFar = event.GetBotDribbledBallTooFar()
	d.BotCrashUnique = event.GetBotCrashUnique()
	d.BotPushedBot = event.GetBotPushedBot()
	d.BotHeldBallDeliberately = event.GetBotHeldBallDeliberately()
	d.AttackerDoubleTouchedBall = event.GetAttackerDoubleTouchedBall()
	d.AttackerTooCloseToDefenseArea = event.GetAttackerTooCloseToDefenseArea()
	d.AttackerInDefenseArea = event.GetAttackerInDefenseArea()
	d.AttackerTouchedKeeper = event.GetAttackerTouchedKeeper()
	d.DefenderTooCloseToKickPoint = event.GetDefenderTooCloseToKickPoint()
	d.DefenderInDefenseAreaPartially = event.GetDefenderInDefenseAreaPartially()
	d.DefenderInDefenseArea = event.GetDefenderInDefenseArea()
	d.KeeperHeldBall = event.GetKeeperHeldBall()
	d.UnsportiveBehaviorMinor = event.GetUnsportiveBehaviorMinor()
	d.UnsportiveBehaviorMajor = event.GetUnsportiveBehaviorMajor()
	d.MultipleYellowCards = event.GetMultipleYellowCards()
	d.MultipleFouls = event.GetMultipleFouls()
	d.KickTimeout = event.GetKickTimeout()
	d.NoProgressInGame = event.GetNoProgressInGame()
	d.PlacementFailedByTeamInFavor = event.GetPlacementFailedByTeamInFavor()
	d.PlacementFailedByOpponent = event.GetPlacementFailedByOpponent()
	return
}
