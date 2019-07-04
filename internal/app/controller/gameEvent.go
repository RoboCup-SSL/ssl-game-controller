package controller

import (
	"encoding/json"
	"github.com/RoboCup-SSL/ssl-game-controller/pkg/refproto"
	"log"
	"reflect"
	"time"
)

type GameEventType string

const (
	GameEventNone GameEventType = ""
	GameEventAll  GameEventType = "all"

	GameEventPrepared           GameEventType = "prepared"
	GameEventNoProgressInGame   GameEventType = "noProgressInGame"
	GameEventPlacementFailed    GameEventType = "placementFailed"
	GameEventPlacementSucceeded GameEventType = "placementSucceeded"
	GameEventBotSubstitution    GameEventType = "botSubstitution"
	GameEventTooManyRobots      GameEventType = "tooManyRobots"

	GameEventBallLeftFieldTouchLine GameEventType = "ballLeftFieldTouchLine"
	GameEventBallLeftFieldGoalLine  GameEventType = "ballLeftFieldGoalLine"
	GameEventPossibleGoal           GameEventType = "possibleGoal"
	GameEventGoal                   GameEventType = "goal"
	GameEventIndirectGoal           GameEventType = "indirectGoal"
	GameEventChippedGoal            GameEventType = "chippedGoal"

	GameEventAimlessKick                                 GameEventType = "aimlessKick"
	GameEventKickTimeout                                 GameEventType = "kickTimeout"
	GameEventKeeperHeldBall                              GameEventType = "keeperHeldBall"
	GameEventAttackerDoubleTouchedBall                   GameEventType = "attackerDoubleTouchedBall"
	GameEventAttackerTouchedBallInDefenseArea            GameEventType = "attackerTouchedBallInDefenseArea"
	GameEventAttackerTouchedOpponentInDefenseArea        GameEventType = "attackerTouchedOpponentInDefenseArea"
	GameEventAttackerTouchedOpponentInDefenseAreaSkipped GameEventType = "attackerTouchedOpponentInDefenseAreaSkipped"
	GameEventBotDribbledBallTooFar                       GameEventType = "botDribbledBallTooFar"
	GameEventBotKickedBallTooFast                        GameEventType = "botKickedBallTooFast"

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

// GameStates contain all known command enum constants
var GameEventTypes = []GameEventType{
	GameEventNone,
	GameEventAll,
	GameEventPrepared,
	GameEventNoProgressInGame,
	GameEventPlacementFailed,
	GameEventPlacementSucceeded,
	GameEventBotSubstitution,
	GameEventTooManyRobots,
	GameEventBallLeftFieldTouchLine,
	GameEventBallLeftFieldGoalLine,
	GameEventPossibleGoal,
	GameEventGoal,
	GameEventIndirectGoal,
	GameEventChippedGoal,
	GameEventAimlessKick,
	GameEventKickTimeout,
	GameEventKeeperHeldBall,
	GameEventAttackerDoubleTouchedBall,
	GameEventAttackerTouchedBallInDefenseArea,
	GameEventAttackerTouchedOpponentInDefenseArea,
	GameEventAttackerTouchedOpponentInDefenseAreaSkipped,
	GameEventBotDribbledBallTooFar,
	GameEventBotKickedBallTooFast,
	GameEventAttackerTooCloseToDefenseArea,
	GameEventBotInterferedPlacement,
	GameEventBotCrashDrawn,
	GameEventBotCrashUnique,
	GameEventBotCrashUniqueSkipped,
	GameEventBotPushedBot,
	GameEventBotPushedBotSkipped,
	GameEventBotHeldBallDeliberately,
	GameEventBotTippedOver,
	GameEventBotTooFastInStop,
	GameEventDefenderTooCloseToKickPoint,
	GameEventDefenderInDefenseAreaPartially,
	GameEventDefenderInDefenseArea,
	GameEventMultipleCards,
	GameEventMultiplePlacementFailures,
	GameEventMultipleFouls,
	GameEventUnsportingBehaviorMinor,
	GameEventUnsportingBehaviorMajor,
}

// Valid checks if the GameEventType enum value is among the known values
func (g GameEventType) Valid() bool {
	for _, gameState := range GameEventTypes {
		if gameState == g {
			return true
		}
	}
	return false
}

// GameEvent combines the type of a game event with the corresponding detail structures
type GameEvent struct {
	Type     GameEventType    `json:"type"`
	Details  GameEventDetails `json:"details"`
	Origins  []string         `json:"origins"`
	occurred time.Time        `json:"-"`
}

func (e *GameEvent) SetOccurred(occurred time.Time) {
	e.occurred = occurred
}

func (e GameEvent) Occurred() time.Time {
	return e.occurred
}

// String converts the game event into a string
func (e GameEvent) String() string {
	b, _ := json.Marshal(&e)
	return string(b)
}

// AllGameEvents returns a list of all known game events
func AllGameEvents() []GameEventType {
	return []GameEventType{
		GameEventBallLeftFieldTouchLine,
		GameEventBallLeftFieldGoalLine,
		GameEventAimlessKick,
		GameEventPossibleGoal,
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
		GameEventAttackerTouchedBallInDefenseArea,
		GameEventAttackerTouchedOpponentInDefenseArea,
		GameEventAttackerTouchedOpponentInDefenseAreaSkipped,
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
		GameEventPlacementFailed,
		GameEventPlacementSucceeded,
		GameEventPrepared,
		GameEventBotSubstitution,
		GameEventTooManyRobots,
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
		GameEventAttackerTouchedOpponentInDefenseArea,
		GameEventAttackerTouchedOpponentInDefenseAreaSkipped,
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

// IsSecondary checks if this game event is a secondary one that does not influence the next referee command
func (e GameEvent) IsSecondary() bool {
	switch e.Type {
	case GameEventBotTooFastInStop,
		GameEventBotCrashDrawn,
		GameEventUnsportingBehaviorMinor,
		GameEventUnsportingBehaviorMajor,
		GameEventMultipleFouls,
		GameEventMultiplePlacementFailures,
		GameEventBotCrashUniqueSkipped,
		GameEventBotPushedBotSkipped,
		GameEventAttackerTouchedOpponentInDefenseAreaSkipped,
		GameEventPlacementSucceeded,
		GameEventPrepared,
		GameEventBotSubstitution,
		GameEventTooManyRobots,
		GameEventBotInterferedPlacement:
		return true
	}
	return false
}

// IsSkipped checks if the game event is a skipped one (one for which the game was not stopped based on the decision of a team)
func (e GameEvent) IsSkipped() bool {
	switch e.Type {
	case GameEventBotPushedBotSkipped,
		GameEventAttackerTouchedOpponentInDefenseAreaSkipped,
		GameEventBotCrashUniqueSkipped:
		return true
	}
	return false
}

// ToProto converts the internal game event into a protobuf game event
func (e GameEvent) ToProto() *refproto.GameEvent {
	protoEvent := new(refproto.GameEvent)
	protoEvent.Type = new(refproto.GameEventType)
	protoEvent.Origin = e.Origins
	switch e.Type {
	case GameEventNone:
		return nil
	case GameEventBallLeftFieldGoalLine:
		*protoEvent.Type = refproto.GameEventType_BALL_LEFT_FIELD_GOAL_LINE
		protoEvent.Event = &refproto.GameEvent_BallLeftFieldGoalLine{BallLeftFieldGoalLine: e.Details.BallLeftFieldGoalLine}
	case GameEventBallLeftFieldTouchLine:
		*protoEvent.Type = refproto.GameEventType_BALL_LEFT_FIELD_TOUCH_LINE
		protoEvent.Event = &refproto.GameEvent_BallLeftFieldTouchLine{BallLeftFieldTouchLine: e.Details.BallLeftFieldTouchLine}
	case GameEventAimlessKick:
		*protoEvent.Type = refproto.GameEventType_AIMLESS_KICK
		protoEvent.Event = &refproto.GameEvent_AimlessKick_{AimlessKick: e.Details.AimlessKick}
	case GameEventGoal:
		*protoEvent.Type = refproto.GameEventType_GOAL
		protoEvent.Event = &refproto.GameEvent_Goal_{Goal: e.Details.Goal}
	case GameEventPossibleGoal:
		*protoEvent.Type = refproto.GameEventType_POSSIBLE_GOAL
		protoEvent.Event = &refproto.GameEvent_PossibleGoal{PossibleGoal: e.Details.PossibleGoal}
	case GameEventIndirectGoal:
		*protoEvent.Type = refproto.GameEventType_INDIRECT_GOAL
		protoEvent.Event = &refproto.GameEvent_IndirectGoal_{IndirectGoal: e.Details.IndirectGoal}
	case GameEventChippedGoal:
		*protoEvent.Type = refproto.GameEventType_CHIPPED_GOAL
		protoEvent.Event = &refproto.GameEvent_ChippedGoal_{ChippedGoal: e.Details.ChippedGoal}
	case GameEventBotTooFastInStop:
		*protoEvent.Type = refproto.GameEventType_BOT_TOO_FAST_IN_STOP
		protoEvent.Event = &refproto.GameEvent_BotTooFastInStop_{BotTooFastInStop: e.Details.BotTooFastInStop}
	case GameEventBotTippedOver:
		*protoEvent.Type = refproto.GameEventType_BOT_TIPPED_OVER
		protoEvent.Event = &refproto.GameEvent_BotTippedOver_{BotTippedOver: e.Details.BotTippedOver}
	case GameEventBotInterferedPlacement:
		*protoEvent.Type = refproto.GameEventType_BOT_INTERFERED_PLACEMENT
		protoEvent.Event = &refproto.GameEvent_BotInterferedPlacement_{BotInterferedPlacement: e.Details.BotInterferedPlacement}
	case GameEventBotCrashDrawn:
		*protoEvent.Type = refproto.GameEventType_BOT_CRASH_DRAWN
		protoEvent.Event = &refproto.GameEvent_BotCrashDrawn_{BotCrashDrawn: e.Details.BotCrashDrawn}
	case GameEventBotKickedBallTooFast:
		*protoEvent.Type = refproto.GameEventType_BOT_KICKED_BALL_TOO_FAST
		protoEvent.Event = &refproto.GameEvent_BotKickedBallTooFast_{BotKickedBallTooFast: e.Details.BotKickedBallTooFast}
	case GameEventBotDribbledBallTooFar:
		*protoEvent.Type = refproto.GameEventType_BOT_DRIBBLED_BALL_TOO_FAR
		protoEvent.Event = &refproto.GameEvent_BotDribbledBallTooFar_{BotDribbledBallTooFar: e.Details.BotDribbledBallTooFar}
	case GameEventBotCrashUnique:
		*protoEvent.Type = refproto.GameEventType_BOT_CRASH_UNIQUE
		protoEvent.Event = &refproto.GameEvent_BotCrashUnique_{BotCrashUnique: e.Details.BotCrashUnique}
	case GameEventBotCrashUniqueSkipped:
		*protoEvent.Type = refproto.GameEventType_BOT_CRASH_UNIQUE_SKIPPED
		protoEvent.Event = &refproto.GameEvent_BotCrashUniqueSkipped{BotCrashUniqueSkipped: e.Details.BotCrashUniqueSkipped}
	case GameEventBotPushedBot:
		*protoEvent.Type = refproto.GameEventType_BOT_PUSHED_BOT
		protoEvent.Event = &refproto.GameEvent_BotPushedBot_{BotPushedBot: e.Details.BotPushedBot}
	case GameEventBotPushedBotSkipped:
		*protoEvent.Type = refproto.GameEventType_BOT_PUSHED_BOT_SKIPPED
		protoEvent.Event = &refproto.GameEvent_BotPushedBotSkipped{BotPushedBotSkipped: e.Details.BotPushedBotSkipped}
	case GameEventBotHeldBallDeliberately:
		*protoEvent.Type = refproto.GameEventType_BOT_HELD_BALL_DELIBERATELY
		protoEvent.Event = &refproto.GameEvent_BotHeldBallDeliberately_{BotHeldBallDeliberately: e.Details.BotHeldBallDeliberately}
	case GameEventAttackerDoubleTouchedBall:
		*protoEvent.Type = refproto.GameEventType_ATTACKER_DOUBLE_TOUCHED_BALL
		protoEvent.Event = &refproto.GameEvent_AttackerDoubleTouchedBall_{AttackerDoubleTouchedBall: e.Details.AttackerDoubleTouchedBall}
	case GameEventAttackerTooCloseToDefenseArea:
		*protoEvent.Type = refproto.GameEventType_ATTACKER_TOO_CLOSE_TO_DEFENSE_AREA
		protoEvent.Event = &refproto.GameEvent_AttackerTooCloseToDefenseArea_{AttackerTooCloseToDefenseArea: e.Details.AttackerTooCloseToDefenseArea}
	case GameEventAttackerTouchedBallInDefenseArea:
		*protoEvent.Type = refproto.GameEventType_ATTACKER_TOUCHED_BALL_IN_DEFENSE_AREA
		protoEvent.Event = &refproto.GameEvent_AttackerTouchedBallInDefenseArea_{AttackerTouchedBallInDefenseArea: e.Details.AttackerTouchedBallInDefenseArea}
	case GameEventAttackerTouchedOpponentInDefenseArea:
		*protoEvent.Type = refproto.GameEventType_ATTACKER_TOUCHED_OPPONENT_IN_DEFENSE_AREA
		protoEvent.Event = &refproto.GameEvent_AttackerTouchedOpponentInDefenseArea_{AttackerTouchedOpponentInDefenseArea: e.Details.AttackerTouchedOpponentInDefenseArea}
	case GameEventAttackerTouchedOpponentInDefenseAreaSkipped:
		*protoEvent.Type = refproto.GameEventType_ATTACKER_TOUCHED_OPPONENT_IN_DEFENSE_AREA_SKIPPED
		protoEvent.Event = &refproto.GameEvent_AttackerTouchedOpponentInDefenseAreaSkipped{AttackerTouchedOpponentInDefenseAreaSkipped: e.Details.AttackerTouchedOpponentInDefenseAreaSkipped}
	case GameEventDefenderTooCloseToKickPoint:
		*protoEvent.Type = refproto.GameEventType_DEFENDER_TOO_CLOSE_TO_KICK_POINT
		protoEvent.Event = &refproto.GameEvent_DefenderTooCloseToKickPoint_{DefenderTooCloseToKickPoint: e.Details.DefenderTooCloseToKickPoint}
	case GameEventDefenderInDefenseAreaPartially:
		*protoEvent.Type = refproto.GameEventType_DEFENDER_IN_DEFENSE_AREA_PARTIALLY
		protoEvent.Event = &refproto.GameEvent_DefenderInDefenseAreaPartially_{DefenderInDefenseAreaPartially: e.Details.DefenderInDefenseAreaPartially}
	case GameEventDefenderInDefenseArea:
		*protoEvent.Type = refproto.GameEventType_DEFENDER_IN_DEFENSE_AREA
		protoEvent.Event = &refproto.GameEvent_DefenderInDefenseArea_{DefenderInDefenseArea: e.Details.DefenderInDefenseArea}
	case GameEventKeeperHeldBall:
		*protoEvent.Type = refproto.GameEventType_KEEPER_HELD_BALL
		protoEvent.Event = &refproto.GameEvent_KeeperHeldBall_{KeeperHeldBall: e.Details.KeeperHeldBall}
	case GameEventUnsportingBehaviorMinor:
		*protoEvent.Type = refproto.GameEventType_UNSPORTING_BEHAVIOR_MINOR
		protoEvent.Event = &refproto.GameEvent_UnsportingBehaviorMinor_{UnsportingBehaviorMinor: e.Details.UnsportingBehaviorMinor}
	case GameEventUnsportingBehaviorMajor:
		*protoEvent.Type = refproto.GameEventType_UNSPORTING_BEHAVIOR_MAJOR
		protoEvent.Event = &refproto.GameEvent_UnsportingBehaviorMajor_{UnsportingBehaviorMajor: e.Details.UnsportingBehaviorMajor}
	case GameEventMultipleCards:
		*protoEvent.Type = refproto.GameEventType_MULTIPLE_CARDS
		protoEvent.Event = &refproto.GameEvent_MultipleCards_{MultipleCards: e.Details.MultipleCards}
	case GameEventMultipleFouls:
		*protoEvent.Type = refproto.GameEventType_MULTIPLE_FOULS
		protoEvent.Event = &refproto.GameEvent_MultipleFouls_{MultipleFouls: e.Details.MultipleFouls}
	case GameEventMultiplePlacementFailures:
		*protoEvent.Type = refproto.GameEventType_MULTIPLE_PLACEMENT_FAILURES
		protoEvent.Event = &refproto.GameEvent_MultiplePlacementFailures_{MultiplePlacementFailures: e.Details.MultiplePlacementFailures}
	case GameEventKickTimeout:
		*protoEvent.Type = refproto.GameEventType_KICK_TIMEOUT
		protoEvent.Event = &refproto.GameEvent_KickTimeout_{KickTimeout: e.Details.KickTimeout}
	case GameEventNoProgressInGame:
		*protoEvent.Type = refproto.GameEventType_NO_PROGRESS_IN_GAME
		protoEvent.Event = &refproto.GameEvent_NoProgressInGame_{NoProgressInGame: e.Details.NoProgressInGame}
	case GameEventPlacementFailed:
		*protoEvent.Type = refproto.GameEventType_PLACEMENT_FAILED
		protoEvent.Event = &refproto.GameEvent_PlacementFailed_{PlacementFailed: e.Details.PlacementFailed}
	case GameEventPlacementSucceeded:
		*protoEvent.Type = refproto.GameEventType_PLACEMENT_SUCCEEDED
		protoEvent.Event = &refproto.GameEvent_PlacementSucceeded_{PlacementSucceeded: e.Details.PlacementSucceeded}
	case GameEventPrepared:
		*protoEvent.Type = refproto.GameEventType_PREPARED
		protoEvent.Event = &refproto.GameEvent_Prepared_{Prepared: e.Details.Prepared}
	case GameEventBotSubstitution:
		*protoEvent.Type = refproto.GameEventType_BOT_SUBSTITUTION
		protoEvent.Event = &refproto.GameEvent_BotSubstitution_{BotSubstitution: e.Details.BotSubstitution}
	case GameEventTooManyRobots:
		*protoEvent.Type = refproto.GameEventType_TOO_MANY_ROBOTS
		protoEvent.Event = &refproto.GameEvent_TooManyRobots_{TooManyRobots: e.Details.TooManyRobots}
	default:
		log.Printf("Warn: Could not map game event %v", e.Type)
		return nil
	}
	return protoEvent
}

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
