package controller

import (
	"encoding/json"
	"fmt"
	"github.com/RoboCup-SSL/ssl-game-controller/pkg/refproto"
	"log"
	"reflect"
)

type GameEventType string

const (
	GameEventNone GameEventType = ""

	GameEventPrepared                     GameEventType = "prepared"
	GameEventNoProgressInGame             GameEventType = "noProgressInGame"
	GameEventPlacementFailedByTeamInFavor GameEventType = "placementFailedByTeamInFavor"
	GameEventPlacementFailedByOpponent    GameEventType = "placementFailedByOpponent"
	GameEventPlacementSucceeded           GameEventType = "placementSucceeded"
	GameEventBotSubstitution              GameEventType = "gameEventBotSubstitution"

	GameEventBallLeftFieldTouchLine GameEventType = "ballLeftFieldTouchLine"
	GameEventBallLeftFieldGoalLine  GameEventType = "ballLeftFieldGoalLine"
	GameEventGoal                   GameEventType = "goal"
	GameEventIndirectGoal           GameEventType = "indirectGoal"
	GameEventChippedGoal            GameEventType = "chippedGoal"

	GameEventAimlessKick               GameEventType = "aimlessKick"
	GameEventKickTimeout               GameEventType = "kickTimeout"
	GameEventKeeperHeldBall            GameEventType = "keeperHeldBall"
	GameEventAttackerDoubleTouchedBall GameEventType = "attackerDoubleTouchedBall"
	GameEventAttackerInDefenseArea     GameEventType = "attackerInDefenseArea"
	GameEventAttackerTouchedKeeper     GameEventType = "attackerTouchedKeeper"
	GameEventBotDribbledBallTooFar     GameEventType = "botDribbledBallTooFar"
	GameEventBotKickedBallTooFast      GameEventType = "botKickedBallTooFast"

	GameEventAttackerTooCloseToDefenseArea  GameEventType = "attackerTooCloseToDefenseArea"
	GameEventBotInterferedPlacement         GameEventType = "botInterferedPlacement"
	GameEventBotCrashDrawn                  GameEventType = "botCrashDrawn"
	GameEventBotCrashUnique                 GameEventType = "botCrashUnique"
	GameEventBotCrashUniqueSkipped          GameEventType = "botCrashUniqueSkipped"
	GameEventBotPushedBot                   GameEventType = "botPushedBot"
	GameEventBotPushedBotSkipped            GameEventType = "botPushedBotSkipped"
	GameEventBotHeldBallDeliberately        GameEventType = "botHeldBallDeliberately"
	GameEventBotTippedOver                  GameEventType = "botTippedOver"
	GameEventBotTooFastInStop               GameEventType = "botTooFastInStop"
	GameEventDefenderTooCloseToKickPoint    GameEventType = "defenderTooCloseToKickPoint"
	GameEventDefenderInDefenseAreaPartially GameEventType = "defenderInDefenseAreaPartially"
	GameEventDefenderInDefenseArea          GameEventType = "defenderInDefenseArea"

	GameEventMultipleCards             GameEventType = "multipleCards"
	GameEventMultiplePlacementFailures GameEventType = "multiplePlacementFailures"
	GameEventMultipleFouls             GameEventType = "multipleFouls"

	GameEventUnsportingBehaviorMinor GameEventType = "unsportingBehaviorMinor"
	GameEventUnsportingBehaviorMajor GameEventType = "unsportingBehaviorMajor"
)

// GameEvent combines the type of a game event with the corresponding detail structures
type GameEvent struct {
	Type    GameEventType    `json:"type"`
	Details GameEventDetails `json:"details"`
}

func (m GameEvent) String() string {
	b, _ := json.Marshal(&m)
	return string(b)
}

func AllGameEvents() []GameEventType {
	return []GameEventType{
		GameEventBallLeftFieldTouchLine,
		GameEventBallLeftFieldGoalLine,
		GameEventAimlessKick,
		GameEventGoal,
		GameEventIndirectGoal,
		GameEventChippedGoal,
		GameEventBotTooFastInStop,
		GameEventBotTippedOver,
		GameEventBotInterferedPlacement,
		GameEventBotCrashDrawn,
		GameEventBotKickedBallTooFast,
		GameEventBotDribbledBallTooFar,
		GameEventBotCrashUnique,
		GameEventBotCrashUniqueSkipped,
		GameEventBotPushedBot,
		GameEventBotPushedBotSkipped,
		GameEventBotHeldBallDeliberately,
		GameEventAttackerDoubleTouchedBall,
		GameEventAttackerTooCloseToDefenseArea,
		GameEventAttackerInDefenseArea,
		GameEventAttackerTouchedKeeper,
		GameEventDefenderTooCloseToKickPoint,
		GameEventDefenderInDefenseAreaPartially,
		GameEventDefenderInDefenseArea,
		GameEventKeeperHeldBall,
		GameEventUnsportingBehaviorMinor,
		GameEventUnsportingBehaviorMajor,
		GameEventMultipleCards,
		GameEventMultipleFouls,
		GameEventMultiplePlacementFailures,
		GameEventKickTimeout,
		GameEventNoProgressInGame,
		GameEventPlacementFailedByTeamInFavor,
		GameEventPlacementFailedByOpponent,
		GameEventPlacementSucceeded,
		GameEventPrepared,
	}
}

// ByTeam extracts the `ByTeam` attribute from the game event details
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

// IncrementsFoulCounter checks if the game event increments the foul counter
func (e GameEvent) IncrementsFoulCounter() bool {
	switch e.Type {
	case GameEventBotCrashDrawn,
		GameEventBotInterferedPlacement,
		GameEventBotTippedOver,
		GameEventAttackerTooCloseToDefenseArea,
		GameEventBotCrashUnique,
		GameEventBotCrashUniqueSkipped,
		GameEventBotPushedBot,
		GameEventBotPushedBotSkipped,
		GameEventBotHeldBallDeliberately,
		GameEventDefenderTooCloseToKickPoint,
		GameEventBotTooFastInStop:
		return true
	}
	return false
}

// AddsYellowCard checks if this game event causes a yellow card
func (e GameEvent) AddsYellowCard() bool {
	switch e.Type {
	case GameEventUnsportingBehaviorMinor,
		GameEventMultipleFouls,
		GameEventDefenderInDefenseAreaPartially:
		return true
	}
	return false
}

// AddsRedCard checks if this game event causes a red card
func (e GameEvent) AddsRedCard() bool {
	switch e.Type {
	case GameEventUnsportingBehaviorMajor:
		return true
	}
	return false
}

func (e GameEvent) IncrementsBallPlacementFailureCounter() bool {
	switch e.Type {
	case GameEventPlacementFailedByTeamInFavor,
		GameEventPlacementFailedByOpponent:
		return true
	}
	return false
}

// IsSecondary checks if this game event is a secondary one that does not influence the next referee command
func (e GameEvent) IsSecondary() bool {
	switch e.Type {
	case GameEventBotTooFastInStop,
		GameEventBotCrashDrawn,
		GameEventUnsportingBehaviorMinor,
		GameEventUnsportingBehaviorMajor,
		GameEventMultipleFouls,
		GameEventBotCrashUniqueSkipped,
		GameEventBotPushedBotSkipped,
		GameEventPlacementFailedByTeamInFavor,
		GameEventPlacementFailedByOpponent,
		GameEventPlacementSucceeded,
		GameEventPrepared,
		GameEventBotSubstitution:
		return true
	}
	return false
}

// IsSkipped checks if the game event is was continued (not stopped) based on the decision of a team
func (e GameEvent) IsSkipped() bool {
	switch e.Type {
	case GameEventBotPushedBotSkipped,
		GameEventBotCrashUniqueSkipped:
		return true
	}
	return false
}

// IsContinueGame checks if the game event should trigger continuing the game based on the current primary event
func (e GameEvent) IsContinueGame() bool {
	switch e.Type {
	case GameEventPlacementSucceeded,
		GameEventPrepared:
		return true
	}
	return false
}

func (e GameEvent) ToProto() *refproto.GameEvent {
	protoEvent := new(refproto.GameEvent)
	switch e.Type {
	case GameEventNone:
		return nil
	case GameEventBallLeftFieldGoalLine:
		protoEvent.Event = &refproto.GameEvent_BallLeftFieldGoalLine{BallLeftFieldGoalLine: e.Details.BallLeftFieldGoalLine}
	case GameEventBallLeftFieldTouchLine:
		protoEvent.Event = &refproto.GameEvent_BallLeftFieldTouchLine{BallLeftFieldTouchLine: e.Details.BallLeftFieldTouchLine}
	case GameEventAimlessKick:
		protoEvent.Event = &refproto.GameEvent_AimlessKick_{AimlessKick: e.Details.AimlessKick}
	case GameEventGoal:
		protoEvent.Event = &refproto.GameEvent_Goal_{Goal: e.Details.Goal}
	case GameEventIndirectGoal:
		protoEvent.Event = &refproto.GameEvent_IndirectGoal_{IndirectGoal: e.Details.IndirectGoal}
	case GameEventChippedGoal:
		protoEvent.Event = &refproto.GameEvent_ChippedGoal_{ChippedGoal: e.Details.ChippedGoal}
	case GameEventBotTooFastInStop:
		protoEvent.Event = &refproto.GameEvent_BotTooFastInStop_{BotTooFastInStop: e.Details.BotTooFastInStop}
	case GameEventBotTippedOver:
		protoEvent.Event = &refproto.GameEvent_BotTippedOver_{BotTippedOver: e.Details.BotTippedOver}
	case GameEventBotInterferedPlacement:
		protoEvent.Event = &refproto.GameEvent_BotInterferedPlacement_{BotInterferedPlacement: e.Details.BotInterferedPlacement}
	case GameEventBotCrashDrawn:
		protoEvent.Event = &refproto.GameEvent_BotCrashDrawn_{BotCrashDrawn: e.Details.BotCrashDrawn}
	case GameEventBotKickedBallTooFast:
		protoEvent.Event = &refproto.GameEvent_BotKickedBallTooFast_{BotKickedBallTooFast: e.Details.BotKickedBallTooFast}
	case GameEventBotDribbledBallTooFar:
		protoEvent.Event = &refproto.GameEvent_BotDribbledBallTooFar_{BotDribbledBallTooFar: e.Details.BotDribbledBallTooFar}
	case GameEventBotCrashUnique:
		protoEvent.Event = &refproto.GameEvent_BotCrashUnique_{BotCrashUnique: e.Details.BotCrashUnique}
	case GameEventBotCrashUniqueSkipped:
		protoEvent.Event = &refproto.GameEvent_BotCrashUniqueSkipped{BotCrashUniqueSkipped: e.Details.BotCrashUniqueSkipped}
	case GameEventBotPushedBot:
		protoEvent.Event = &refproto.GameEvent_BotPushedBot_{BotPushedBot: e.Details.BotPushedBot}
	case GameEventBotPushedBotSkipped:
		protoEvent.Event = &refproto.GameEvent_BotPushedBotSkipped{BotPushedBotSkipped: e.Details.BotPushedBotSkipped}
	case GameEventBotHeldBallDeliberately:
		protoEvent.Event = &refproto.GameEvent_BotHeldBallDeliberately_{BotHeldBallDeliberately: e.Details.BotHeldBallDeliberately}
	case GameEventAttackerDoubleTouchedBall:
		protoEvent.Event = &refproto.GameEvent_AttackerDoubleTouchedBall_{AttackerDoubleTouchedBall: e.Details.AttackerDoubleTouchedBall}
	case GameEventAttackerTooCloseToDefenseArea:
		protoEvent.Event = &refproto.GameEvent_AttackerTooCloseToDefenseArea_{AttackerTooCloseToDefenseArea: e.Details.AttackerTooCloseToDefenseArea}
	case GameEventAttackerInDefenseArea:
		protoEvent.Event = &refproto.GameEvent_AttackerInDefenseArea_{AttackerInDefenseArea: e.Details.AttackerInDefenseArea}
	case GameEventAttackerTouchedKeeper:
		protoEvent.Event = &refproto.GameEvent_AttackerTouchedKeeper_{AttackerTouchedKeeper: e.Details.AttackerTouchedKeeper}
	case GameEventDefenderTooCloseToKickPoint:
		protoEvent.Event = &refproto.GameEvent_DefenderTooCloseToKickPoint_{DefenderTooCloseToKickPoint: e.Details.DefenderTooCloseToKickPoint}
	case GameEventDefenderInDefenseAreaPartially:
		protoEvent.Event = &refproto.GameEvent_DefenderInDefenseAreaPartially_{DefenderInDefenseAreaPartially: e.Details.DefenderInDefenseAreaPartially}
	case GameEventDefenderInDefenseArea:
		protoEvent.Event = &refproto.GameEvent_DefenderInDefenseArea_{DefenderInDefenseArea: e.Details.DefenderInDefenseArea}
	case GameEventKeeperHeldBall:
		protoEvent.Event = &refproto.GameEvent_KeeperHeldBall_{KeeperHeldBall: e.Details.KeeperHeldBall}
	case GameEventUnsportingBehaviorMinor:
		protoEvent.Event = &refproto.GameEvent_UnsportingBehaviorMinor_{UnsportingBehaviorMinor: e.Details.UnsportingBehaviorMinor}
	case GameEventUnsportingBehaviorMajor:
		protoEvent.Event = &refproto.GameEvent_UnsportingBehaviorMajor_{UnsportingBehaviorMajor: e.Details.UnsportingBehaviorMajor}
	case GameEventMultipleCards:
		protoEvent.Event = &refproto.GameEvent_MultipleCards_{MultipleCards: e.Details.MultipleCards}
	case GameEventMultipleFouls:
		protoEvent.Event = &refproto.GameEvent_MultipleFouls_{MultipleFouls: e.Details.MultipleFouls}
	case GameEventMultiplePlacementFailures:
		protoEvent.Event = &refproto.GameEvent_MultiplePlacementFailures_{MultiplePlacementFailures: e.Details.MultiplePlacementFailures}
	case GameEventKickTimeout:
		protoEvent.Event = &refproto.GameEvent_KickTimeout_{KickTimeout: e.Details.KickTimeout}
	case GameEventNoProgressInGame:
		protoEvent.Event = &refproto.GameEvent_NoProgressInGame_{NoProgressInGame: e.Details.NoProgressInGame}
	case GameEventPlacementFailedByTeamInFavor:
		protoEvent.Event = &refproto.GameEvent_PlacementFailedByTeamInFavor_{PlacementFailedByTeamInFavor: e.Details.PlacementFailedByTeamInFavor}
	case GameEventPlacementFailedByOpponent:
		protoEvent.Event = &refproto.GameEvent_PlacementFailedByOpponent_{PlacementFailedByOpponent: e.Details.PlacementFailedByOpponent}
	case GameEventPlacementSucceeded:
		protoEvent.Event = &refproto.GameEvent_PlacementSucceeded_{PlacementSucceeded: e.Details.PlacementSucceeded}
	case GameEventPrepared:
		protoEvent.Event = &refproto.GameEvent_Prepared_{Prepared: e.Details.Prepared}
	case GameEventBotSubstitution:
		protoEvent.Event = &refproto.GameEvent_BotSubstitution_{BotSubstitution: e.Details.BotSubstitution}
	default:
		log.Printf("Warn: Could not map game e %v", e.Type)
		return nil
	}
	return protoEvent
}

// GameEventDetails holds details of a game event. Only one field should be non-nil
type GameEventDetails struct {
	BallLeftFieldTouchLine         *refproto.GameEvent_BallLeftFieldEvent             `json:"ballLeftFieldTouchLine,omitempty"`
	BallLeftFieldGoalLine          *refproto.GameEvent_BallLeftFieldEvent             `json:"ballLeftFieldGoalLine,omitempty"`
	AimlessKick                    *refproto.GameEvent_AimlessKick                    `json:"aimlessKick,omitempty"`
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
	BotCrashUniqueSkipped          *refproto.GameEvent_BotCrashUnique                 `json:"botCrashUniqueSkipped,omitempty"`
	BotPushedBot                   *refproto.GameEvent_BotPushedBot                   `json:"botPushedBot,omitempty"`
	BotPushedBotSkipped            *refproto.GameEvent_BotPushedBot                   `json:"botPushedBotSkipped,omitempty"`
	BotHeldBallDeliberately        *refproto.GameEvent_BotHeldBallDeliberately        `json:"botHeldBallDeliberately,omitempty"`
	AttackerDoubleTouchedBall      *refproto.GameEvent_AttackerDoubleTouchedBall      `json:"attackerDoubleTouchedBall,omitempty"`
	AttackerTooCloseToDefenseArea  *refproto.GameEvent_AttackerTooCloseToDefenseArea  `json:"attackerTooCloseToDefenseArea,omitempty"`
	AttackerInDefenseArea          *refproto.GameEvent_AttackerInDefenseArea          `json:"attackerInDefenseArea,omitempty"`
	AttackerTouchedKeeper          *refproto.GameEvent_AttackerTouchedKeeper          `json:"attackerTouchedKeeper,omitempty"`
	DefenderTooCloseToKickPoint    *refproto.GameEvent_DefenderTooCloseToKickPoint    `json:"defenderTooCloseToKickPoint,omitempty"`
	DefenderInDefenseAreaPartially *refproto.GameEvent_DefenderInDefenseAreaPartially `json:"defenderInDefenseAreaPartially,omitempty"`
	DefenderInDefenseArea          *refproto.GameEvent_DefenderInDefenseArea          `json:"defenderInDefenseArea,omitempty"`
	KeeperHeldBall                 *refproto.GameEvent_KeeperHeldBall                 `json:"keeperHeldBall,omitempty"`
	UnsportingBehaviorMinor        *refproto.GameEvent_UnsportingBehaviorMinor        `json:"unsportingBehaviorMinor,omitempty"`
	UnsportingBehaviorMajor        *refproto.GameEvent_UnsportingBehaviorMajor        `json:"unsportingBehaviorMajor,omitempty"`
	MultipleCards                  *refproto.GameEvent_MultipleCards                  `json:"multiple,omitempty"`
	MultipleFouls                  *refproto.GameEvent_MultipleFouls                  `json:"multipleFouls,omitempty"`
	MultiplePlacementFailures      *refproto.GameEvent_MultiplePlacementFailures      `json:"multiplePlacementFailures,omitempty"`
	KickTimeout                    *refproto.GameEvent_KickTimeout                    `json:"kickTimeout,omitempty"`
	NoProgressInGame               *refproto.GameEvent_NoProgressInGame               `json:"noProgressInGame,omitempty"`
	PlacementFailedByTeamInFavor   *refproto.GameEvent_PlacementFailedByTeamInFavor   `json:"placementFailedByTeamInFavor,omitempty"`
	PlacementFailedByOpponent      *refproto.GameEvent_PlacementFailedByOpponent      `json:"placementFailedByOpponent,omitempty"`
	PlacementSucceeded             *refproto.GameEvent_PlacementSucceeded             `json:"placementSucceeded,omitempty"`
	Prepared                       *refproto.GameEvent_Prepared                       `json:"prepared,omitempty"`
	BotSubstitution                *refproto.GameEvent_BotSubstitution                `json:"botSubstitution,omitempty"`
}

func (d GameEventDetails) EventType() GameEventType {
	if d.BallLeftFieldTouchLine != nil {
		return GameEventBallLeftFieldTouchLine
	}
	if d.BallLeftFieldGoalLine != nil {
		return GameEventBallLeftFieldGoalLine
	}
	if d.AimlessKick != nil {
		return GameEventAimlessKick
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
	if d.BotCrashUniqueSkipped != nil {
		return GameEventBotCrashUniqueSkipped
	}
	if d.BotPushedBot != nil {
		return GameEventBotPushedBot
	}
	if d.BotPushedBotSkipped != nil {
		return GameEventBotPushedBotSkipped
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
	if d.UnsportingBehaviorMinor != nil {
		return GameEventUnsportingBehaviorMinor
	}
	if d.UnsportingBehaviorMajor != nil {
		return GameEventUnsportingBehaviorMajor
	}
	if d.MultipleCards != nil {
		return GameEventMultipleCards
	}
	if d.MultipleFouls != nil {
		return GameEventMultipleFouls
	}
	if d.MultiplePlacementFailures != nil {
		return GameEventMultiplePlacementFailures
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
	if d.PlacementSucceeded != nil {
		return GameEventPlacementSucceeded
	}
	if d.Prepared != nil {
		return GameEventPrepared
	}
	if d.BotSubstitution != nil {
		return GameEventBotSubstitution
	}
	return GameEventNone
}

func (d GameEventDetails) Description() string {
	if d.BallLeftFieldTouchLine != nil {
		if d.BallLeftFieldTouchLine.ByBot != nil {
			return fmt.Sprintf("By bot %v", *d.BallLeftFieldTouchLine.ByBot)
		}
		return ""
	}
	if d.BallLeftFieldGoalLine != nil {
		if d.BallLeftFieldGoalLine.ByBot != nil {
			return fmt.Sprintf("By bot %v", *d.BallLeftFieldGoalLine.ByBot)
		}
		return ""
	}
	if d.AimlessKick != nil {
		if d.AimlessKick.ByBot != nil {
			return fmt.Sprintf("By bot %v", *d.AimlessKick.ByBot)
		}
		return ""
	}
	if d.Goal != nil {
		if d.Goal.ByBot != nil {
			return fmt.Sprintf("By bot %v", *d.Goal.ByBot)
		}
		return ""
	}
	if d.IndirectGoal != nil {
		if d.IndirectGoal.ByBot != nil {
			return fmt.Sprintf("By bot %v", *d.IndirectGoal.ByBot)
		}
		return ""
	}
	if d.ChippedGoal != nil {
		if d.ChippedGoal.ByBot != nil {
			if d.ChippedGoal.MaxBallHeight != nil {
				return fmt.Sprintf("By bot %v with %v m height", *d.ChippedGoal.ByBot, *d.ChippedGoal.MaxBallHeight)
			}
			return fmt.Sprintf("By bot %v", *d.ChippedGoal.ByBot)
		}
		return ""
	}
	if d.BotTooFastInStop != nil {
		if d.BotTooFastInStop.ByBot != nil {
			if d.BotTooFastInStop.Speed != nil {
				return fmt.Sprintf("By bot %v with %v m/s", *d.BotTooFastInStop.ByBot, *d.BotTooFastInStop.Speed)
			}
			return fmt.Sprintf("By bot %v", *d.BotTooFastInStop.ByBot)
		}
		return ""
	}
	if d.BotTippedOver != nil {
		if d.BotTippedOver.ByBot != nil {
			return fmt.Sprintf("By bot %v", *d.BotTippedOver.ByBot)
		}
		return ""
	}
	if d.BotInterferedPlacement != nil {
		if d.BotInterferedPlacement.ByBot != nil {
			return fmt.Sprintf("By bot %v", *d.BotInterferedPlacement.ByBot)
		}
		return ""
	}
	if d.BotCrashDrawn != nil {
		if d.BotCrashDrawn.BotBlue != nil && d.BotCrashDrawn.BotYellow != nil {
			return fmt.Sprintf("By bot %v B and %v Y", *d.BotCrashDrawn.BotBlue, *d.BotCrashDrawn.BotYellow)
		}
		return ""
	}
	if d.BotKickedBallTooFast != nil {
		if d.BotKickedBallTooFast.ByBot != nil {
			return fmt.Sprintf("By bot %v", *d.BotKickedBallTooFast.ByBot)
		}
		return ""
	}
	if d.BotDribbledBallTooFar != nil {
		if d.BotDribbledBallTooFar.ByBot != nil {
			return fmt.Sprintf("By bot %v", *d.BotDribbledBallTooFar.ByBot)
		}
		return ""
	}
	if d.BotCrashUnique != nil {
		if d.BotCrashUnique.Violator != nil && d.BotCrashUnique.Victim != nil {
			return fmt.Sprintf("Bot %v by %v", *d.BotCrashUnique.Victim, *d.BotCrashUnique.Violator)
		}
		return ""
	}
	if d.BotCrashUniqueSkipped != nil {
		if d.BotCrashUniqueSkipped.Violator != nil && d.BotCrashUniqueSkipped.Victim != nil {
			return fmt.Sprintf("Bot %v by %v", *d.BotCrashUniqueSkipped.Victim, *d.BotCrashUniqueSkipped.Violator)
		}
		return ""
	}
	if d.BotPushedBot != nil {
		if d.BotPushedBot.Violator != nil && d.BotPushedBot.Victim != nil {
			return fmt.Sprintf("Bot %v by %v", *d.BotPushedBot.Victim, *d.BotPushedBot.Violator)
		}
		return ""
	}
	if d.BotPushedBotSkipped != nil {
		if d.BotPushedBotSkipped.Violator != nil && d.BotPushedBotSkipped.Victim != nil {
			return fmt.Sprintf("Bot %v by %v", *d.BotPushedBotSkipped.Victim, *d.BotPushedBotSkipped.Violator)
		}
		return ""
	}
	if d.BotHeldBallDeliberately != nil {
		if d.BotHeldBallDeliberately.ByBot != nil {
			return fmt.Sprintf("By bot %v", *d.BotHeldBallDeliberately.ByBot)
		}
		return ""
	}
	if d.AttackerDoubleTouchedBall != nil {
		if d.AttackerDoubleTouchedBall.ByBot != nil {
			return fmt.Sprintf("By bot %v", *d.AttackerDoubleTouchedBall.ByBot)
		}
		return ""
	}
	if d.AttackerTooCloseToDefenseArea != nil {
		if d.AttackerTooCloseToDefenseArea.ByBot != nil {
			return fmt.Sprintf("By bot %v", *d.AttackerTooCloseToDefenseArea.ByBot)
		}
		return ""
	}
	if d.AttackerInDefenseArea != nil {
		if d.AttackerInDefenseArea.ByBot != nil {
			return fmt.Sprintf("By bot %v", *d.AttackerInDefenseArea.ByBot)
		}
		return ""
	}
	if d.AttackerTouchedKeeper != nil {
		if d.AttackerTouchedKeeper.ByBot != nil {
			return fmt.Sprintf("By bot %v", *d.AttackerTouchedKeeper.ByBot)
		}
		return ""
	}
	if d.DefenderTooCloseToKickPoint != nil {
		if d.DefenderTooCloseToKickPoint.ByBot != nil {
			return fmt.Sprintf("By bot %v", *d.DefenderTooCloseToKickPoint.ByBot)
		}
		return ""
	}
	if d.DefenderInDefenseAreaPartially != nil {
		if d.DefenderInDefenseAreaPartially.ByBot != nil {
			return fmt.Sprintf("By bot %v", *d.DefenderInDefenseAreaPartially.ByBot)
		}
		return ""
	}
	if d.DefenderInDefenseArea != nil {
		if d.DefenderInDefenseArea.ByBot != nil {
			return fmt.Sprintf("By bot %v", *d.DefenderInDefenseArea.ByBot)
		}
		return ""
	}
	if d.KeeperHeldBall != nil {
		return ""
	}
	if d.UnsportingBehaviorMinor != nil {
		if d.UnsportingBehaviorMinor.Reason != nil {
			return fmt.Sprintf("%v", *d.UnsportingBehaviorMinor.Reason)
		}
		return ""
	}
	if d.UnsportingBehaviorMajor != nil {
		if d.UnsportingBehaviorMajor.Reason != nil {
			return fmt.Sprintf("%v", *d.UnsportingBehaviorMajor.Reason)
		}
		return ""
	}
	if d.MultipleCards != nil {
		return ""
	}
	if d.MultipleFouls != nil {
		return ""
	}
	if d.MultiplePlacementFailures != nil {
		return ""
	}
	if d.KickTimeout != nil {
		return ""
	}
	if d.NoProgressInGame != nil {
		return ""
	}
	if d.PlacementFailedByTeamInFavor != nil {
		return ""
	}
	if d.PlacementFailedByOpponent != nil {
		return ""
	}
	if d.PlacementSucceeded != nil {
		return ""
	}
	if d.Prepared != nil {
		return ""
	}
	if d.BotSubstitution != nil {
		return ""
	}
	return ""
}

func NewGameEventDetails(event refproto.GameEvent) (d GameEventDetails) {
	d.BallLeftFieldTouchLine = event.GetBallLeftFieldTouchLine()
	d.BallLeftFieldGoalLine = event.GetBallLeftFieldGoalLine()
	d.AimlessKick = event.GetAimlessKick()
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
	d.BotCrashUniqueSkipped = event.GetBotCrashUniqueSkipped()
	d.BotPushedBot = event.GetBotPushedBot()
	d.BotPushedBotSkipped = event.GetBotPushedBotSkipped()
	d.BotHeldBallDeliberately = event.GetBotHeldBallDeliberately()
	d.AttackerDoubleTouchedBall = event.GetAttackerDoubleTouchedBall()
	d.AttackerTooCloseToDefenseArea = event.GetAttackerTooCloseToDefenseArea()
	d.AttackerInDefenseArea = event.GetAttackerInDefenseArea()
	d.AttackerTouchedKeeper = event.GetAttackerTouchedKeeper()
	d.DefenderTooCloseToKickPoint = event.GetDefenderTooCloseToKickPoint()
	d.DefenderInDefenseAreaPartially = event.GetDefenderInDefenseAreaPartially()
	d.DefenderInDefenseArea = event.GetDefenderInDefenseArea()
	d.KeeperHeldBall = event.GetKeeperHeldBall()
	d.UnsportingBehaviorMinor = event.GetUnsportingBehaviorMinor()
	d.UnsportingBehaviorMajor = event.GetUnsportingBehaviorMajor()
	d.MultipleCards = event.GetMultipleCards()
	d.MultipleFouls = event.GetMultipleFouls()
	d.MultiplePlacementFailures = event.GetMultiplePlacementFailures()
	d.KickTimeout = event.GetKickTimeout()
	d.NoProgressInGame = event.GetNoProgressInGame()
	d.PlacementFailedByTeamInFavor = event.GetPlacementFailedByTeamInFavor()
	d.PlacementFailedByOpponent = event.GetPlacementFailedByOpponent()
	d.PlacementSucceeded = event.GetPlacementSucceeded()
	d.Prepared = event.GetPrepared()
	d.BotSubstitution = event.GetBotSubstitution()
	return
}
