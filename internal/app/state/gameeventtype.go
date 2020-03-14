package state

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
