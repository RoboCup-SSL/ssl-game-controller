package controller

import (
	"fmt"
	"github.com/RoboCup-SSL/ssl-game-controller/pkg/refproto"
	"reflect"
)

type GameEventType string

const (
	GameEventNone                           GameEventType = ""
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
	GameEventBotCrashUniqueContinue         GameEventType = "botCrashUniqueContinue"
	GameEventBotPushedBot                   GameEventType = "botPushedBot"
	GameEventBotPushedBotContinue           GameEventType = "botPushedBotContinue"
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

// GameEvent combines the type of a game event with the corresponding detail structures
type GameEvent struct {
	Type    GameEventType    `json:"type"`
	Details GameEventDetails `json:"details"`
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
		GameEventBotCrashUnique,
		GameEventBotCrashUniqueContinue,
		GameEventBotPushedBot,
		GameEventBotPushedBotContinue,
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
	case GameEventUnsportiveBehaviorMinor,
		GameEventMultipleFouls,
		GameEventDefenderInDefenseAreaPartially:
		return true
	}
	return false
}

// AddsRedCard checks if this game event causes a red card
func (e GameEvent) AddsRedCard() bool {
	switch e.Type {
	case GameEventUnsportiveBehaviorMajor:
		return true
	}
	return false
}

// IsSecondary checks if this game event is a secondary one that does not influence the next referee command
func (e GameEvent) IsSecondary() bool {
	switch e.Type {
	case GameEventBotTooFastInStop,
		GameEventUnsportiveBehaviorMinor,
		GameEventUnsportiveBehaviorMajor,
		GameEventMultipleFouls,
		GameEventBotCrashUniqueContinue,
		GameEventBotPushedBotContinue,
		GameEventPlacementFailedByOpponent:
		return true
	}
	return false
}

// IsContinued checks if the game event is was continued (not stopped) based on the decision of a team
func (e GameEvent) IsContinued() bool {
	switch e.Type {
	case GameEventBotPushedBotContinue,
		GameEventBotCrashUniqueContinue:
		return true
	}
	return false
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
	BotCrashUniqueContinue         *refproto.GameEvent_BotCrashUnique                 `json:"botCrashUniqueContinue,omitempty"`
	BotPushedBot                   *refproto.GameEvent_BotPushedBot                   `json:"botPushedBot,omitempty"`
	BotPushedBotContinue           *refproto.GameEvent_BotPushedBot                   `json:"botPushedBotContinue,omitempty"`
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
	if d.BotCrashUniqueContinue != nil {
		return GameEventBotCrashUniqueContinue
	}
	if d.BotPushedBot != nil {
		return GameEventBotPushedBot
	}
	if d.BotPushedBotContinue != nil {
		return GameEventBotPushedBotContinue
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
	if d.Icing != nil {
		if d.Icing.ByBot != nil {
			return fmt.Sprintf("By bot %v", *d.Icing.ByBot)
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
	if d.BotCrashUniqueContinue != nil {
		if d.BotCrashUniqueContinue.Violator != nil && d.BotCrashUniqueContinue.Victim != nil {
			return fmt.Sprintf("Bot %v by %v", *d.BotCrashUniqueContinue.Victim, *d.BotCrashUniqueContinue.Violator)
		}
		return ""
	}
	if d.BotPushedBot != nil {
		if d.BotPushedBot.Violator != nil && d.BotPushedBot.Victim != nil {
			return fmt.Sprintf("Bot %v by %v", *d.BotPushedBot.Victim, *d.BotPushedBot.Violator)
		}
		return ""
	}
	if d.BotPushedBotContinue != nil {
		if d.BotPushedBotContinue.Violator != nil && d.BotPushedBotContinue.Victim != nil {
			return fmt.Sprintf("Bot %v by %v", *d.BotPushedBotContinue.Victim, *d.BotPushedBotContinue.Violator)
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
	if d.UnsportiveBehaviorMinor != nil {
		if d.UnsportiveBehaviorMinor.Reason != nil {
			return fmt.Sprintf("%v", *d.UnsportiveBehaviorMinor.Reason)
		}
		return ""
	}
	if d.UnsportiveBehaviorMajor != nil {
		if d.UnsportiveBehaviorMajor.Reason != nil {
			return fmt.Sprintf("%v", *d.UnsportiveBehaviorMajor.Reason)
		}
		return ""
	}
	if d.MultipleYellowCards != nil {
		return ""
	}
	if d.MultipleFouls != nil {
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
	return ""
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
	d.BotCrashUniqueContinue = event.GetBotCrashUniqueContinue()
	d.BotPushedBot = event.GetBotPushedBot()
	d.BotPushedBotContinue = event.GetBotPushedBotContinue()
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
