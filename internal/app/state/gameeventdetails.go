package state

import (
	"encoding/json"
	"github.com/RoboCup-SSL/ssl-game-controller/pkg/refproto"
)

// GameEventDetails holds details of a game event. Only one field should be non-nil
type GameEventDetails struct {
	BallLeftFieldTouchLine                      *refproto.GameEvent_BallLeftField                        `json:"ballLeftFieldTouchLine,omitempty"`
	BallLeftFieldGoalLine                       *refproto.GameEvent_BallLeftField                        `json:"ballLeftFieldGoalLine,omitempty"`
	AimlessKick                                 *refproto.GameEvent_AimlessKick                          `json:"aimlessKick,omitempty"`
	PossibleGoal                                *refproto.GameEvent_Goal                                 `json:"possibleGoal,omitempty"`
	Goal                                        *refproto.GameEvent_Goal                                 `json:"goal,omitempty"`
	IndirectGoal                                *refproto.GameEvent_IndirectGoal                         `json:"indirectGoal,omitempty"`
	ChippedGoal                                 *refproto.GameEvent_ChippedGoal                          `json:"chippedGoal,omitempty"`
	BotTooFastInStop                            *refproto.GameEvent_BotTooFastInStop                     `json:"botTooFastInStop,omitempty"`
	BotTippedOver                               *refproto.GameEvent_BotTippedOver                        `json:"botTippedOver,omitempty"`
	BotInterferedPlacement                      *refproto.GameEvent_BotInterferedPlacement               `json:"botInterferedPlacement,omitempty"`
	BotCrashDrawn                               *refproto.GameEvent_BotCrashDrawn                        `json:"botCrashDrawn,omitempty"`
	BotKickedBallTooFast                        *refproto.GameEvent_BotKickedBallTooFast                 `json:"botKickedBallTooFast,omitempty"`
	BotDribbledBallTooFar                       *refproto.GameEvent_BotDribbledBallTooFar                `json:"botDribbledBallTooFar,omitempty"`
	BotCrashUnique                              *refproto.GameEvent_BotCrashUnique                       `json:"botCrashUnique,omitempty"`
	BotCrashUniqueSkipped                       *refproto.GameEvent_BotCrashUnique                       `json:"botCrashUniqueSkipped,omitempty"`
	BotPushedBot                                *refproto.GameEvent_BotPushedBot                         `json:"botPushedBot,omitempty"`
	BotPushedBotSkipped                         *refproto.GameEvent_BotPushedBot                         `json:"botPushedBotSkipped,omitempty"`
	BotHeldBallDeliberately                     *refproto.GameEvent_BotHeldBallDeliberately              `json:"botHeldBallDeliberately,omitempty"`
	AttackerDoubleTouchedBall                   *refproto.GameEvent_AttackerDoubleTouchedBall            `json:"attackerDoubleTouchedBall,omitempty"`
	AttackerTooCloseToDefenseArea               *refproto.GameEvent_AttackerTooCloseToDefenseArea        `json:"attackerTooCloseToDefenseArea,omitempty"`
	AttackerTouchedBallInDefenseArea            *refproto.GameEvent_AttackerTouchedBallInDefenseArea     `json:"attackerTouchedBallInDefenseArea,omitempty"`
	AttackerTouchedOpponentInDefenseArea        *refproto.GameEvent_AttackerTouchedOpponentInDefenseArea `json:"attackerTouchedOpponentInDefenseArea,omitempty"`
	AttackerTouchedOpponentInDefenseAreaSkipped *refproto.GameEvent_AttackerTouchedOpponentInDefenseArea `json:"attackerTouchedOpponentInDefenseAreaSkipped,omitempty"`
	DefenderTooCloseToKickPoint                 *refproto.GameEvent_DefenderTooCloseToKickPoint          `json:"defenderTooCloseToKickPoint,omitempty"`
	DefenderInDefenseAreaPartially              *refproto.GameEvent_DefenderInDefenseAreaPartially       `json:"defenderInDefenseAreaPartially,omitempty"`
	DefenderInDefenseArea                       *refproto.GameEvent_DefenderInDefenseArea                `json:"defenderInDefenseArea,omitempty"`
	KeeperHeldBall                              *refproto.GameEvent_KeeperHeldBall                       `json:"keeperHeldBall,omitempty"`
	UnsportingBehaviorMinor                     *refproto.GameEvent_UnsportingBehaviorMinor              `json:"unsportingBehaviorMinor,omitempty"`
	UnsportingBehaviorMajor                     *refproto.GameEvent_UnsportingBehaviorMajor              `json:"unsportingBehaviorMajor,omitempty"`
	MultipleCards                               *refproto.GameEvent_MultipleCards                        `json:"multipleCards,omitempty"`
	MultipleFouls                               *refproto.GameEvent_MultipleFouls                        `json:"multipleFouls,omitempty"`
	MultiplePlacementFailures                   *refproto.GameEvent_MultiplePlacementFailures            `json:"multiplePlacementFailures,omitempty"`
	KickTimeout                                 *refproto.GameEvent_KickTimeout                          `json:"kickTimeout,omitempty"`
	NoProgressInGame                            *refproto.GameEvent_NoProgressInGame                     `json:"noProgressInGame,omitempty"`
	PlacementFailed                             *refproto.GameEvent_PlacementFailed                      `json:"placementFailed,omitempty"`
	PlacementSucceeded                          *refproto.GameEvent_PlacementSucceeded                   `json:"placementSucceeded,omitempty"`
	Prepared                                    *refproto.GameEvent_Prepared                             `json:"prepared,omitempty"`
	BotSubstitution                             *refproto.GameEvent_BotSubstitution                      `json:"botSubstitution,omitempty"`
	TooManyRobots                               *refproto.GameEvent_TooManyRobots                        `json:"tooManyRobots,omitempty"`
}

// EventType returns the internal game event type of game event details
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
	if d.PossibleGoal != nil {
		return GameEventPossibleGoal
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
	if d.AttackerTouchedBallInDefenseArea != nil {
		return GameEventAttackerTouchedBallInDefenseArea
	}
	if d.AttackerTouchedOpponentInDefenseArea != nil {
		return GameEventAttackerTouchedOpponentInDefenseArea
	}
	if d.AttackerTouchedOpponentInDefenseAreaSkipped != nil {
		return GameEventAttackerTouchedOpponentInDefenseAreaSkipped
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
	if d.PlacementFailed != nil {
		return GameEventPlacementFailed
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
	if d.TooManyRobots != nil {
		return GameEventTooManyRobots
	}
	return GameEventNone
}

// String converts the game event details to a string
func (d GameEventDetails) String() string {
	bytes, err := json.Marshal(d)
	if err != nil {
		return err.Error()
	}
	return string(bytes)
}

// GameEventDetailsFromProto converts a protobuf game event into internal details
func GameEventDetailsFromProto(event refproto.GameEvent) (d GameEventDetails) {
	d.BallLeftFieldTouchLine = event.GetBallLeftFieldTouchLine()
	d.BallLeftFieldGoalLine = event.GetBallLeftFieldGoalLine()
	d.AimlessKick = event.GetAimlessKick()
	d.PossibleGoal = event.GetPossibleGoal()
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
	d.AttackerTouchedBallInDefenseArea = event.GetAttackerTouchedBallInDefenseArea()
	d.AttackerTouchedOpponentInDefenseArea = event.GetAttackerTouchedOpponentInDefenseArea()
	d.AttackerTouchedOpponentInDefenseAreaSkipped = event.GetAttackerTouchedOpponentInDefenseAreaSkipped()
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
	d.PlacementFailed = event.GetPlacementFailed()
	d.PlacementSucceeded = event.GetPlacementSucceeded()
	d.Prepared = event.GetPrepared()
	d.BotSubstitution = event.GetBotSubstitution()
	d.TooManyRobots = event.GetTooManyRobots()
	return
}
