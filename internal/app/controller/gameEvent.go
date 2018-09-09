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

func (d GameEventDetails) IsSet() bool {
	v := reflect.ValueOf(d)
	for i := 0; i < v.NumField(); i++ {
		if !v.Field(i).IsNil() {
			return true
		}
	}
	return false
}
