package controller

import (
	"github.com/RoboCup-SSL/ssl-game-controller/pkg/refproto"
	"time"
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
	ForTeam Team             `json:"forTeam"`
	Details GameEventDetails `json:"details"`
}

// GameEventDetails holds details of a game event. Only one field should be non-nil
type GameEventDetails struct {
	BallLeftFieldTouchLine         *refproto.GameEvent_BallLeftFieldEvent             `json:"BallLeftFieldTouchLine,omitempty"`
	BallLeftFieldGoalLine          *refproto.GameEvent_BallLeftFieldEvent             `json:"BallLeftFieldGoalLine,omitempty"`
	Icing                          *refproto.GameEvent_Icing                          `json:"Icing,omitempty"`
	Goal                           *refproto.GameEvent_Goal                           `json:"Goal,omitempty"`
	IndirectGoal                   *refproto.GameEvent_IndirectGoal                   `json:"IndirectGoal,omitempty"`
	ChippedGoal                    *refproto.GameEvent_ChippedGoal                    `json:"ChippedGoal,omitempty"`
	BotTooFastInStop               *refproto.GameEvent_BotTooFastInStop               `json:"BotTooFastInStop,omitempty"`
	BotTippedOver                  *refproto.GameEvent_BotTippedOver                  `json:"BotTippedOver,omitempty"`
	BotInterferedPlacement         *refproto.GameEvent_BotInterferedPlacement         `json:"BotInterferedPlacement,omitempty"`
	BotCrashDrawn                  *refproto.GameEvent_BotCrashDrawn                  `json:"BotCrashDrawn,omitempty"`
	BotKickedBallTooFast           *refproto.GameEvent_BotKickedBallTooFast           `json:"BotKickedBallTooFast,omitempty"`
	BotDribbledBallTooFar          *refproto.GameEvent_BotDribbledBallTooFar          `json:"BotDribbledBallTooFar,omitempty"`
	BotCrashUnique                 *refproto.GameEvent_BotCrashUnique                 `json:"BotCrashUnique,omitempty"`
	BotPushedBot                   *refproto.GameEvent_BotPushedBot                   `json:"BotPushedBot,omitempty"`
	BotHeldBallDeliberately        *refproto.GameEvent_BotHeldBallDeliberately        `json:"BotHeldBallDeliberately,omitempty"`
	AttackerDoubleTouchedBall      *refproto.GameEvent_AttackerDoubleTouchedBall      `json:"AttackerDoubleTouchedBall,omitempty"`
	AttackerTooCloseToDefenseArea  *refproto.GameEvent_AttackerTooCloseToDefenseArea  `json:"AttackerTooCloseToDefenseArea,omitempty"`
	AttackerInDefenseArea          *refproto.GameEvent_AttackerInDefenseArea          `json:"AttackerInDefenseArea,omitempty"`
	AttackerTouchedKeeper          *refproto.GameEvent_AttackerTouchedKeeper          `json:"AttackerTouchedKeeper,omitempty"`
	DefenderTooCloseToKickPoint    *refproto.GameEvent_DefenderTooCloseToKickPoint    `json:"DefenderTooCloseToKickPoint,omitempty"`
	DefenderInDefenseAreaPartially *refproto.GameEvent_DefenderInDefenseAreaPartially `json:"DefenderInDefenseAreaPartially,omitempty"`
	DefenderInDefenseArea          *refproto.GameEvent_DefenderInDefenseArea          `json:"DefenderInDefenseArea,omitempty"`
	KeeperHeldBall                 *refproto.GameEvent_KeeperHeldBall                 `json:"KeeperHeldBall,omitempty"`
	UnsportiveBehaviorMinor        *refproto.GameEvent_UnsportiveBehaviorMinor        `json:"UnsportiveBehaviorMinor,omitempty"`
	UnsportiveBehaviorMajor        *refproto.GameEvent_UnsportiveBehaviorMajor        `json:"UnsportiveBehaviorMajor,omitempty"`
	MultipleYellowCards            *refproto.GameEvent_MultipleYellowCards            `json:"MultipleYellowCards,omitempty"`
	MultipleFouls                  *refproto.GameEvent_MultipleFouls                  `json:"MultipleFouls,omitempty"`
	KickTimeout                    *refproto.GameEvent_KickTimeout                    `json:"KickTimeout,omitempty"`
	NoProgressInGame               *refproto.GameEvent_NoProgressInGame               `json:"NoProgressInGame,omitempty"`
	PlacementFailedByTeamInFavor   *refproto.GameEvent_PlacementFailedByTeamInFavor   `json:"PlacementFailedByTeamInFavor,omitempty"`
	PlacementFailedByOpponent      *refproto.GameEvent_PlacementFailedByOpponent      `json:"PlacementFailedByOpponent,omitempty"`
}

type RefereeEventType string

const (
	RefereeEventCommand   RefereeEventType = "command"
	RefereeEventStage     RefereeEventType = "stage"
	RefereeEventCard      RefereeEventType = "card"
	RefereeEventTime      RefereeEventType = "time"
	RefereeEventGameEvent RefereeEventType = "gameEvent"
)

type RefereeEvent struct {
	Timestamp   time.Time        `json:"timestamp"`
	StageTime   time.Duration    `json:"stageTime"`
	Type        RefereeEventType `json:"type"`
	Name        string           `json:"name"`
	Team        Team             `json:"team"`
	Description string           `json:"description"`
}
