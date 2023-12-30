/* eslint-disable */
import { Team, teamFromJSON, teamToJSON } from "./ssl_gc_common";
import { Vector2 } from "./ssl_gc_geometry";

/**
 * GameEvent contains exactly one game event
 * Each game event has optional and required fields. The required fields are mandatory to process the event.
 * Some optional fields are only used for visualization, others are required to determine the ball placement position.
 * If fields are missing that are required for the ball placement position, no ball placement command will be issued.
 * Fields are marked optional to make testing and extending of the protocol easier.
 * An autoRef should ideally set all fields, except if there are good reasons to not do so.
 */
export interface GameEvent {
  /** A globally unique id of the game event. */
  id?:
    | string
    | undefined;
  /** The type of the game event. */
  type?:
    | GameEvent_Type
    | undefined;
  /**
   * The origins of this game event.
   * Empty, if it originates from game controller.
   * Contains autoRef name(s), if it originates from one or more autoRefs.
   * Ignored if sent by autoRef to game controller.
   */
  origin?:
    | string[]
    | undefined;
  /** Unix timestamp in microseconds when the event was created. */
  createdTimestamp?: number | undefined;
  event?:
    | { $case: "ballLeftFieldTouchLine"; ballLeftFieldTouchLine: GameEvent_BallLeftField }
    | { $case: "ballLeftFieldGoalLine"; ballLeftFieldGoalLine: GameEvent_BallLeftField }
    | { $case: "aimlessKick"; aimlessKick: GameEvent_AimlessKick }
    | { $case: "attackerTooCloseToDefenseArea"; attackerTooCloseToDefenseArea: GameEvent_AttackerTooCloseToDefenseArea }
    | { $case: "defenderInDefenseArea"; defenderInDefenseArea: GameEvent_DefenderInDefenseArea }
    | { $case: "boundaryCrossing"; boundaryCrossing: GameEvent_BoundaryCrossing }
    | { $case: "keeperHeldBall"; keeperHeldBall: GameEvent_KeeperHeldBall }
    | { $case: "botDribbledBallTooFar"; botDribbledBallTooFar: GameEvent_BotDribbledBallTooFar }
    | { $case: "botPushedBot"; botPushedBot: GameEvent_BotPushedBot }
    | { $case: "botHeldBallDeliberately"; botHeldBallDeliberately: GameEvent_BotHeldBallDeliberately }
    | { $case: "botTippedOver"; botTippedOver: GameEvent_BotTippedOver }
    | { $case: "botDroppedParts"; botDroppedParts: GameEvent_BotDroppedParts }
    | {
      $case: "attackerTouchedBallInDefenseArea";
      attackerTouchedBallInDefenseArea: GameEvent_AttackerTouchedBallInDefenseArea;
    }
    | { $case: "botKickedBallTooFast"; botKickedBallTooFast: GameEvent_BotKickedBallTooFast }
    | { $case: "botCrashUnique"; botCrashUnique: GameEvent_BotCrashUnique }
    | { $case: "botCrashDrawn"; botCrashDrawn: GameEvent_BotCrashDrawn }
    | { $case: "defenderTooCloseToKickPoint"; defenderTooCloseToKickPoint: GameEvent_DefenderTooCloseToKickPoint }
    | { $case: "botTooFastInStop"; botTooFastInStop: GameEvent_BotTooFastInStop }
    | { $case: "botInterferedPlacement"; botInterferedPlacement: GameEvent_BotInterferedPlacement }
    | { $case: "possibleGoal"; possibleGoal: GameEvent_Goal }
    | { $case: "goal"; goal: GameEvent_Goal }
    | { $case: "invalidGoal"; invalidGoal: GameEvent_Goal }
    | { $case: "attackerDoubleTouchedBall"; attackerDoubleTouchedBall: GameEvent_AttackerDoubleTouchedBall }
    | { $case: "placementSucceeded"; placementSucceeded: GameEvent_PlacementSucceeded }
    | { $case: "penaltyKickFailed"; penaltyKickFailed: GameEvent_PenaltyKickFailed }
    | { $case: "noProgressInGame"; noProgressInGame: GameEvent_NoProgressInGame }
    | { $case: "placementFailed"; placementFailed: GameEvent_PlacementFailed }
    | { $case: "multipleCards"; multipleCards: GameEvent_MultipleCards }
    | { $case: "multipleFouls"; multipleFouls: GameEvent_MultipleFouls }
    | { $case: "botSubstitution"; botSubstitution: GameEvent_BotSubstitution }
    | { $case: "tooManyRobots"; tooManyRobots: GameEvent_TooManyRobots }
    | { $case: "challengeFlag"; challengeFlag: GameEvent_ChallengeFlag }
    | { $case: "challengeFlagHandled"; challengeFlagHandled: GameEvent_ChallengeFlagHandled }
    | { $case: "emergencyStop"; emergencyStop: GameEvent_EmergencyStop }
    | { $case: "unsportingBehaviorMinor"; unsportingBehaviorMinor: GameEvent_UnsportingBehaviorMinor }
    | { $case: "unsportingBehaviorMajor"; unsportingBehaviorMajor: GameEvent_UnsportingBehaviorMajor }
    | { $case: "prepared"; prepared: GameEvent_Prepared }
    | { $case: "indirectGoal"; indirectGoal: GameEvent_IndirectGoal }
    | { $case: "chippedGoal"; chippedGoal: GameEvent_ChippedGoal }
    | { $case: "kickTimeout"; kickTimeout: GameEvent_KickTimeout }
    | {
      $case: "attackerTouchedOpponentInDefenseArea";
      attackerTouchedOpponentInDefenseArea: GameEvent_AttackerTouchedOpponentInDefenseArea;
    }
    | {
      $case: "attackerTouchedOpponentInDefenseAreaSkipped";
      attackerTouchedOpponentInDefenseAreaSkipped: GameEvent_AttackerTouchedOpponentInDefenseArea;
    }
    | { $case: "botCrashUniqueSkipped"; botCrashUniqueSkipped: GameEvent_BotCrashUnique }
    | { $case: "botPushedBotSkipped"; botPushedBotSkipped: GameEvent_BotPushedBot }
    | {
      $case: "defenderInDefenseAreaPartially";
      defenderInDefenseAreaPartially: GameEvent_DefenderInDefenseAreaPartially;
    }
    | { $case: "multiplePlacementFailures"; multiplePlacementFailures: GameEvent_MultiplePlacementFailures }
    | undefined;
}

export enum GameEvent_Type {
  UNKNOWN_GAME_EVENT_TYPE = "UNKNOWN_GAME_EVENT_TYPE",
  /** BALL_LEFT_FIELD_TOUCH_LINE - triggered by autoRef */
  BALL_LEFT_FIELD_TOUCH_LINE = "BALL_LEFT_FIELD_TOUCH_LINE",
  /** BALL_LEFT_FIELD_GOAL_LINE - triggered by autoRef */
  BALL_LEFT_FIELD_GOAL_LINE = "BALL_LEFT_FIELD_GOAL_LINE",
  /** AIMLESS_KICK - triggered by autoRef */
  AIMLESS_KICK = "AIMLESS_KICK",
  /** ATTACKER_TOO_CLOSE_TO_DEFENSE_AREA - triggered by autoRef */
  ATTACKER_TOO_CLOSE_TO_DEFENSE_AREA = "ATTACKER_TOO_CLOSE_TO_DEFENSE_AREA",
  /** DEFENDER_IN_DEFENSE_AREA - triggered by autoRef */
  DEFENDER_IN_DEFENSE_AREA = "DEFENDER_IN_DEFENSE_AREA",
  /** BOUNDARY_CROSSING - triggered by autoRef */
  BOUNDARY_CROSSING = "BOUNDARY_CROSSING",
  /** KEEPER_HELD_BALL - triggered by GC */
  KEEPER_HELD_BALL = "KEEPER_HELD_BALL",
  /** BOT_DRIBBLED_BALL_TOO_FAR - triggered by autoRef */
  BOT_DRIBBLED_BALL_TOO_FAR = "BOT_DRIBBLED_BALL_TOO_FAR",
  /** BOT_PUSHED_BOT - triggered by human ref */
  BOT_PUSHED_BOT = "BOT_PUSHED_BOT",
  /** BOT_HELD_BALL_DELIBERATELY - triggered by human ref */
  BOT_HELD_BALL_DELIBERATELY = "BOT_HELD_BALL_DELIBERATELY",
  /** BOT_TIPPED_OVER - triggered by human ref */
  BOT_TIPPED_OVER = "BOT_TIPPED_OVER",
  /** BOT_DROPPED_PARTS - triggered by human ref */
  BOT_DROPPED_PARTS = "BOT_DROPPED_PARTS",
  /** ATTACKER_TOUCHED_BALL_IN_DEFENSE_AREA - triggered by autoRef */
  ATTACKER_TOUCHED_BALL_IN_DEFENSE_AREA = "ATTACKER_TOUCHED_BALL_IN_DEFENSE_AREA",
  /** BOT_KICKED_BALL_TOO_FAST - triggered by autoRef */
  BOT_KICKED_BALL_TOO_FAST = "BOT_KICKED_BALL_TOO_FAST",
  /** BOT_CRASH_UNIQUE - triggered by autoRef */
  BOT_CRASH_UNIQUE = "BOT_CRASH_UNIQUE",
  /** BOT_CRASH_DRAWN - triggered by autoRef */
  BOT_CRASH_DRAWN = "BOT_CRASH_DRAWN",
  /** DEFENDER_TOO_CLOSE_TO_KICK_POINT - triggered by autoRef */
  DEFENDER_TOO_CLOSE_TO_KICK_POINT = "DEFENDER_TOO_CLOSE_TO_KICK_POINT",
  /** BOT_TOO_FAST_IN_STOP - triggered by autoRef */
  BOT_TOO_FAST_IN_STOP = "BOT_TOO_FAST_IN_STOP",
  /** BOT_INTERFERED_PLACEMENT - triggered by autoRef */
  BOT_INTERFERED_PLACEMENT = "BOT_INTERFERED_PLACEMENT",
  /** POSSIBLE_GOAL - triggered by autoRef */
  POSSIBLE_GOAL = "POSSIBLE_GOAL",
  /** GOAL - triggered by GC */
  GOAL = "GOAL",
  /** INVALID_GOAL - triggered by GC */
  INVALID_GOAL = "INVALID_GOAL",
  /** ATTACKER_DOUBLE_TOUCHED_BALL - triggered by autoRef */
  ATTACKER_DOUBLE_TOUCHED_BALL = "ATTACKER_DOUBLE_TOUCHED_BALL",
  /** PLACEMENT_SUCCEEDED - triggered by autoRef */
  PLACEMENT_SUCCEEDED = "PLACEMENT_SUCCEEDED",
  /** PENALTY_KICK_FAILED - triggered by GC and autoRef */
  PENALTY_KICK_FAILED = "PENALTY_KICK_FAILED",
  /** NO_PROGRESS_IN_GAME - triggered by GC */
  NO_PROGRESS_IN_GAME = "NO_PROGRESS_IN_GAME",
  /** PLACEMENT_FAILED - triggered by GC */
  PLACEMENT_FAILED = "PLACEMENT_FAILED",
  /** MULTIPLE_CARDS - triggered by GC */
  MULTIPLE_CARDS = "MULTIPLE_CARDS",
  /** MULTIPLE_FOULS - triggered by GC */
  MULTIPLE_FOULS = "MULTIPLE_FOULS",
  /** BOT_SUBSTITUTION - triggered by GC */
  BOT_SUBSTITUTION = "BOT_SUBSTITUTION",
  /** TOO_MANY_ROBOTS - triggered by GC */
  TOO_MANY_ROBOTS = "TOO_MANY_ROBOTS",
  /** CHALLENGE_FLAG - triggered by GC */
  CHALLENGE_FLAG = "CHALLENGE_FLAG",
  /** CHALLENGE_FLAG_HANDLED - triggered by GC */
  CHALLENGE_FLAG_HANDLED = "CHALLENGE_FLAG_HANDLED",
  /** EMERGENCY_STOP - triggered by GC */
  EMERGENCY_STOP = "EMERGENCY_STOP",
  /** UNSPORTING_BEHAVIOR_MINOR - triggered by human ref */
  UNSPORTING_BEHAVIOR_MINOR = "UNSPORTING_BEHAVIOR_MINOR",
  /** UNSPORTING_BEHAVIOR_MAJOR - triggered by human ref */
  UNSPORTING_BEHAVIOR_MAJOR = "UNSPORTING_BEHAVIOR_MAJOR",
  /** @deprecated */
  PREPARED = "PREPARED",
  /** @deprecated */
  INDIRECT_GOAL = "INDIRECT_GOAL",
  /** @deprecated */
  CHIPPED_GOAL = "CHIPPED_GOAL",
  /** @deprecated */
  KICK_TIMEOUT = "KICK_TIMEOUT",
  /** @deprecated */
  ATTACKER_TOUCHED_OPPONENT_IN_DEFENSE_AREA = "ATTACKER_TOUCHED_OPPONENT_IN_DEFENSE_AREA",
  /** @deprecated */
  ATTACKER_TOUCHED_OPPONENT_IN_DEFENSE_AREA_SKIPPED = "ATTACKER_TOUCHED_OPPONENT_IN_DEFENSE_AREA_SKIPPED",
  /** @deprecated */
  BOT_CRASH_UNIQUE_SKIPPED = "BOT_CRASH_UNIQUE_SKIPPED",
  /** @deprecated */
  BOT_PUSHED_BOT_SKIPPED = "BOT_PUSHED_BOT_SKIPPED",
  /** @deprecated */
  DEFENDER_IN_DEFENSE_AREA_PARTIALLY = "DEFENDER_IN_DEFENSE_AREA_PARTIALLY",
  /** @deprecated */
  MULTIPLE_PLACEMENT_FAILURES = "MULTIPLE_PLACEMENT_FAILURES",
  UNRECOGNIZED = "UNRECOGNIZED",
}

export function gameEvent_TypeFromJSON(object: any): GameEvent_Type {
  switch (object) {
    case 0:
    case "UNKNOWN_GAME_EVENT_TYPE":
      return GameEvent_Type.UNKNOWN_GAME_EVENT_TYPE;
    case 6:
    case "BALL_LEFT_FIELD_TOUCH_LINE":
      return GameEvent_Type.BALL_LEFT_FIELD_TOUCH_LINE;
    case 7:
    case "BALL_LEFT_FIELD_GOAL_LINE":
      return GameEvent_Type.BALL_LEFT_FIELD_GOAL_LINE;
    case 11:
    case "AIMLESS_KICK":
      return GameEvent_Type.AIMLESS_KICK;
    case 19:
    case "ATTACKER_TOO_CLOSE_TO_DEFENSE_AREA":
      return GameEvent_Type.ATTACKER_TOO_CLOSE_TO_DEFENSE_AREA;
    case 31:
    case "DEFENDER_IN_DEFENSE_AREA":
      return GameEvent_Type.DEFENDER_IN_DEFENSE_AREA;
    case 41:
    case "BOUNDARY_CROSSING":
      return GameEvent_Type.BOUNDARY_CROSSING;
    case 13:
    case "KEEPER_HELD_BALL":
      return GameEvent_Type.KEEPER_HELD_BALL;
    case 17:
    case "BOT_DRIBBLED_BALL_TOO_FAR":
      return GameEvent_Type.BOT_DRIBBLED_BALL_TOO_FAR;
    case 24:
    case "BOT_PUSHED_BOT":
      return GameEvent_Type.BOT_PUSHED_BOT;
    case 26:
    case "BOT_HELD_BALL_DELIBERATELY":
      return GameEvent_Type.BOT_HELD_BALL_DELIBERATELY;
    case 27:
    case "BOT_TIPPED_OVER":
      return GameEvent_Type.BOT_TIPPED_OVER;
    case 47:
    case "BOT_DROPPED_PARTS":
      return GameEvent_Type.BOT_DROPPED_PARTS;
    case 15:
    case "ATTACKER_TOUCHED_BALL_IN_DEFENSE_AREA":
      return GameEvent_Type.ATTACKER_TOUCHED_BALL_IN_DEFENSE_AREA;
    case 18:
    case "BOT_KICKED_BALL_TOO_FAST":
      return GameEvent_Type.BOT_KICKED_BALL_TOO_FAST;
    case 22:
    case "BOT_CRASH_UNIQUE":
      return GameEvent_Type.BOT_CRASH_UNIQUE;
    case 21:
    case "BOT_CRASH_DRAWN":
      return GameEvent_Type.BOT_CRASH_DRAWN;
    case 29:
    case "DEFENDER_TOO_CLOSE_TO_KICK_POINT":
      return GameEvent_Type.DEFENDER_TOO_CLOSE_TO_KICK_POINT;
    case 28:
    case "BOT_TOO_FAST_IN_STOP":
      return GameEvent_Type.BOT_TOO_FAST_IN_STOP;
    case 20:
    case "BOT_INTERFERED_PLACEMENT":
      return GameEvent_Type.BOT_INTERFERED_PLACEMENT;
    case 39:
    case "POSSIBLE_GOAL":
      return GameEvent_Type.POSSIBLE_GOAL;
    case 8:
    case "GOAL":
      return GameEvent_Type.GOAL;
    case 42:
    case "INVALID_GOAL":
      return GameEvent_Type.INVALID_GOAL;
    case 14:
    case "ATTACKER_DOUBLE_TOUCHED_BALL":
      return GameEvent_Type.ATTACKER_DOUBLE_TOUCHED_BALL;
    case 5:
    case "PLACEMENT_SUCCEEDED":
      return GameEvent_Type.PLACEMENT_SUCCEEDED;
    case 43:
    case "PENALTY_KICK_FAILED":
      return GameEvent_Type.PENALTY_KICK_FAILED;
    case 2:
    case "NO_PROGRESS_IN_GAME":
      return GameEvent_Type.NO_PROGRESS_IN_GAME;
    case 3:
    case "PLACEMENT_FAILED":
      return GameEvent_Type.PLACEMENT_FAILED;
    case 32:
    case "MULTIPLE_CARDS":
      return GameEvent_Type.MULTIPLE_CARDS;
    case 34:
    case "MULTIPLE_FOULS":
      return GameEvent_Type.MULTIPLE_FOULS;
    case 37:
    case "BOT_SUBSTITUTION":
      return GameEvent_Type.BOT_SUBSTITUTION;
    case 38:
    case "TOO_MANY_ROBOTS":
      return GameEvent_Type.TOO_MANY_ROBOTS;
    case 44:
    case "CHALLENGE_FLAG":
      return GameEvent_Type.CHALLENGE_FLAG;
    case 46:
    case "CHALLENGE_FLAG_HANDLED":
      return GameEvent_Type.CHALLENGE_FLAG_HANDLED;
    case 45:
    case "EMERGENCY_STOP":
      return GameEvent_Type.EMERGENCY_STOP;
    case 35:
    case "UNSPORTING_BEHAVIOR_MINOR":
      return GameEvent_Type.UNSPORTING_BEHAVIOR_MINOR;
    case 36:
    case "UNSPORTING_BEHAVIOR_MAJOR":
      return GameEvent_Type.UNSPORTING_BEHAVIOR_MAJOR;
    case 1:
    case "PREPARED":
      return GameEvent_Type.PREPARED;
    case 9:
    case "INDIRECT_GOAL":
      return GameEvent_Type.INDIRECT_GOAL;
    case 10:
    case "CHIPPED_GOAL":
      return GameEvent_Type.CHIPPED_GOAL;
    case 12:
    case "KICK_TIMEOUT":
      return GameEvent_Type.KICK_TIMEOUT;
    case 16:
    case "ATTACKER_TOUCHED_OPPONENT_IN_DEFENSE_AREA":
      return GameEvent_Type.ATTACKER_TOUCHED_OPPONENT_IN_DEFENSE_AREA;
    case 40:
    case "ATTACKER_TOUCHED_OPPONENT_IN_DEFENSE_AREA_SKIPPED":
      return GameEvent_Type.ATTACKER_TOUCHED_OPPONENT_IN_DEFENSE_AREA_SKIPPED;
    case 23:
    case "BOT_CRASH_UNIQUE_SKIPPED":
      return GameEvent_Type.BOT_CRASH_UNIQUE_SKIPPED;
    case 25:
    case "BOT_PUSHED_BOT_SKIPPED":
      return GameEvent_Type.BOT_PUSHED_BOT_SKIPPED;
    case 30:
    case "DEFENDER_IN_DEFENSE_AREA_PARTIALLY":
      return GameEvent_Type.DEFENDER_IN_DEFENSE_AREA_PARTIALLY;
    case 33:
    case "MULTIPLE_PLACEMENT_FAILURES":
      return GameEvent_Type.MULTIPLE_PLACEMENT_FAILURES;
    case -1:
    case "UNRECOGNIZED":
    default:
      return GameEvent_Type.UNRECOGNIZED;
  }
}

export function gameEvent_TypeToJSON(object: GameEvent_Type): string {
  switch (object) {
    case GameEvent_Type.UNKNOWN_GAME_EVENT_TYPE:
      return "UNKNOWN_GAME_EVENT_TYPE";
    case GameEvent_Type.BALL_LEFT_FIELD_TOUCH_LINE:
      return "BALL_LEFT_FIELD_TOUCH_LINE";
    case GameEvent_Type.BALL_LEFT_FIELD_GOAL_LINE:
      return "BALL_LEFT_FIELD_GOAL_LINE";
    case GameEvent_Type.AIMLESS_KICK:
      return "AIMLESS_KICK";
    case GameEvent_Type.ATTACKER_TOO_CLOSE_TO_DEFENSE_AREA:
      return "ATTACKER_TOO_CLOSE_TO_DEFENSE_AREA";
    case GameEvent_Type.DEFENDER_IN_DEFENSE_AREA:
      return "DEFENDER_IN_DEFENSE_AREA";
    case GameEvent_Type.BOUNDARY_CROSSING:
      return "BOUNDARY_CROSSING";
    case GameEvent_Type.KEEPER_HELD_BALL:
      return "KEEPER_HELD_BALL";
    case GameEvent_Type.BOT_DRIBBLED_BALL_TOO_FAR:
      return "BOT_DRIBBLED_BALL_TOO_FAR";
    case GameEvent_Type.BOT_PUSHED_BOT:
      return "BOT_PUSHED_BOT";
    case GameEvent_Type.BOT_HELD_BALL_DELIBERATELY:
      return "BOT_HELD_BALL_DELIBERATELY";
    case GameEvent_Type.BOT_TIPPED_OVER:
      return "BOT_TIPPED_OVER";
    case GameEvent_Type.BOT_DROPPED_PARTS:
      return "BOT_DROPPED_PARTS";
    case GameEvent_Type.ATTACKER_TOUCHED_BALL_IN_DEFENSE_AREA:
      return "ATTACKER_TOUCHED_BALL_IN_DEFENSE_AREA";
    case GameEvent_Type.BOT_KICKED_BALL_TOO_FAST:
      return "BOT_KICKED_BALL_TOO_FAST";
    case GameEvent_Type.BOT_CRASH_UNIQUE:
      return "BOT_CRASH_UNIQUE";
    case GameEvent_Type.BOT_CRASH_DRAWN:
      return "BOT_CRASH_DRAWN";
    case GameEvent_Type.DEFENDER_TOO_CLOSE_TO_KICK_POINT:
      return "DEFENDER_TOO_CLOSE_TO_KICK_POINT";
    case GameEvent_Type.BOT_TOO_FAST_IN_STOP:
      return "BOT_TOO_FAST_IN_STOP";
    case GameEvent_Type.BOT_INTERFERED_PLACEMENT:
      return "BOT_INTERFERED_PLACEMENT";
    case GameEvent_Type.POSSIBLE_GOAL:
      return "POSSIBLE_GOAL";
    case GameEvent_Type.GOAL:
      return "GOAL";
    case GameEvent_Type.INVALID_GOAL:
      return "INVALID_GOAL";
    case GameEvent_Type.ATTACKER_DOUBLE_TOUCHED_BALL:
      return "ATTACKER_DOUBLE_TOUCHED_BALL";
    case GameEvent_Type.PLACEMENT_SUCCEEDED:
      return "PLACEMENT_SUCCEEDED";
    case GameEvent_Type.PENALTY_KICK_FAILED:
      return "PENALTY_KICK_FAILED";
    case GameEvent_Type.NO_PROGRESS_IN_GAME:
      return "NO_PROGRESS_IN_GAME";
    case GameEvent_Type.PLACEMENT_FAILED:
      return "PLACEMENT_FAILED";
    case GameEvent_Type.MULTIPLE_CARDS:
      return "MULTIPLE_CARDS";
    case GameEvent_Type.MULTIPLE_FOULS:
      return "MULTIPLE_FOULS";
    case GameEvent_Type.BOT_SUBSTITUTION:
      return "BOT_SUBSTITUTION";
    case GameEvent_Type.TOO_MANY_ROBOTS:
      return "TOO_MANY_ROBOTS";
    case GameEvent_Type.CHALLENGE_FLAG:
      return "CHALLENGE_FLAG";
    case GameEvent_Type.CHALLENGE_FLAG_HANDLED:
      return "CHALLENGE_FLAG_HANDLED";
    case GameEvent_Type.EMERGENCY_STOP:
      return "EMERGENCY_STOP";
    case GameEvent_Type.UNSPORTING_BEHAVIOR_MINOR:
      return "UNSPORTING_BEHAVIOR_MINOR";
    case GameEvent_Type.UNSPORTING_BEHAVIOR_MAJOR:
      return "UNSPORTING_BEHAVIOR_MAJOR";
    case GameEvent_Type.PREPARED:
      return "PREPARED";
    case GameEvent_Type.INDIRECT_GOAL:
      return "INDIRECT_GOAL";
    case GameEvent_Type.CHIPPED_GOAL:
      return "CHIPPED_GOAL";
    case GameEvent_Type.KICK_TIMEOUT:
      return "KICK_TIMEOUT";
    case GameEvent_Type.ATTACKER_TOUCHED_OPPONENT_IN_DEFENSE_AREA:
      return "ATTACKER_TOUCHED_OPPONENT_IN_DEFENSE_AREA";
    case GameEvent_Type.ATTACKER_TOUCHED_OPPONENT_IN_DEFENSE_AREA_SKIPPED:
      return "ATTACKER_TOUCHED_OPPONENT_IN_DEFENSE_AREA_SKIPPED";
    case GameEvent_Type.BOT_CRASH_UNIQUE_SKIPPED:
      return "BOT_CRASH_UNIQUE_SKIPPED";
    case GameEvent_Type.BOT_PUSHED_BOT_SKIPPED:
      return "BOT_PUSHED_BOT_SKIPPED";
    case GameEvent_Type.DEFENDER_IN_DEFENSE_AREA_PARTIALLY:
      return "DEFENDER_IN_DEFENSE_AREA_PARTIALLY";
    case GameEvent_Type.MULTIPLE_PLACEMENT_FAILURES:
      return "MULTIPLE_PLACEMENT_FAILURES";
    case GameEvent_Type.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** the ball left the field normally */
export interface GameEvent_BallLeftField {
  /** the team that last touched the ball */
  byTeam?:
    | Team
    | undefined;
  /** the bot that last touched the ball */
  byBot?:
    | number
    | undefined;
  /** the location where the ball left the field [m] */
  location?: Vector2 | undefined;
}

/** the ball left the field via goal line and a team committed an aimless kick */
export interface GameEvent_AimlessKick {
  /** the team that last touched the ball */
  byTeam?:
    | Team
    | undefined;
  /** the bot that last touched the ball */
  byBot?:
    | number
    | undefined;
  /** the location where the ball left the field [m] */
  location?:
    | Vector2
    | undefined;
  /** the location where the ball was last touched [m] */
  kickLocation?: Vector2 | undefined;
}

/** a team shot a goal */
export interface GameEvent_Goal {
  /** the team that scored the goal */
  byTeam?:
    | Team
    | undefined;
  /** the team that shot the goal (different from by_team for own goals) */
  kickingTeam?:
    | Team
    | undefined;
  /** the bot that shot the goal */
  kickingBot?:
    | number
    | undefined;
  /** the location where the ball entered the goal [m] */
  location?:
    | Vector2
    | undefined;
  /** the location where the ball was kicked (for deciding if this was a valid goal) [m] */
  kickLocation?:
    | Vector2
    | undefined;
  /** the maximum height the ball reached during the goal kick (for deciding if this was a valid goal) [m] */
  maxBallHeight?:
    | number
    | undefined;
  /** number of robots of scoring team when the ball entered the goal (for deciding if this was a valid goal) */
  numRobotsByTeam?:
    | number
    | undefined;
  /** The UNIX timestamp [μs] when the scoring team last touched the ball */
  lastTouchByTeam?:
    | number
    | undefined;
  /** An additional message with e.g. a reason for invalid goals */
  message?: string | undefined;
}

/** the ball entered the goal directly during an indirect free kick */
export interface GameEvent_IndirectGoal {
  /** the team that tried to shoot the goal */
  byTeam?:
    | Team
    | undefined;
  /** the bot that kicked the ball - at least the team must be set */
  byBot?:
    | number
    | undefined;
  /** the location where the ball entered the goal [m] */
  location?:
    | Vector2
    | undefined;
  /** the location where the ball was kicked [m] */
  kickLocation?: Vector2 | undefined;
}

/** the ball entered the goal, but was initially chipped */
export interface GameEvent_ChippedGoal {
  /** the team that tried to shoot the goal */
  byTeam?:
    | Team
    | undefined;
  /** the bot that kicked the ball */
  byBot?:
    | number
    | undefined;
  /** the location where the ball entered the goal [m] */
  location?:
    | Vector2
    | undefined;
  /** the location where the ball was kicked [m] */
  kickLocation?:
    | Vector2
    | undefined;
  /** the maximum height [m] of the ball, before it entered the goal and since the last kick [m] */
  maxBallHeight?: number | undefined;
}

/** a bot moved too fast while the game was stopped */
export interface GameEvent_BotTooFastInStop {
  /** the team that found guilty */
  byTeam?:
    | Team
    | undefined;
  /** the bot that was too fast */
  byBot?:
    | number
    | undefined;
  /** the location of the bot [m] */
  location?:
    | Vector2
    | undefined;
  /** the bot speed [m/s] */
  speed?: number | undefined;
}

/** a bot of the defending team got too close to the kick point during a free kick */
export interface GameEvent_DefenderTooCloseToKickPoint {
  /** the team that was found guilty */
  byTeam?:
    | Team
    | undefined;
  /** the bot that violates the distance to the kick point */
  byBot?:
    | number
    | undefined;
  /** the location of the bot [m] */
  location?:
    | Vector2
    | undefined;
  /** the distance [m] from bot to the kick point (including the minimum radius) */
  distance?: number | undefined;
}

/** two robots crashed into each other with similar speeds */
export interface GameEvent_BotCrashDrawn {
  /** the bot of the yellow team */
  botYellow?:
    | number
    | undefined;
  /** the bot of the blue team */
  botBlue?:
    | number
    | undefined;
  /** the location of the crash (center between both bots) [m] */
  location?:
    | Vector2
    | undefined;
  /** the calculated crash speed [m/s] of the two bots */
  crashSpeed?:
    | number
    | undefined;
  /** the difference [m/s] of the velocity of the two bots */
  speedDiff?:
    | number
    | undefined;
  /**
   * the angle [rad] in the range [0, π] of the bot velocity vectors
   * an angle of 0 rad (  0°) means, the bots barely touched each other
   * an angle of π rad (180°) means, the bots crashed frontal into each other
   */
  crashAngle?: number | undefined;
}

/** two robots crashed into each other and one team was found guilty to due significant speed difference */
export interface GameEvent_BotCrashUnique {
  /** the team that caused the crash */
  byTeam?:
    | Team
    | undefined;
  /** the bot that caused the crash */
  violator?:
    | number
    | undefined;
  /** the bot of the opposite team that was involved in the crash */
  victim?:
    | number
    | undefined;
  /** the location of the crash (center between both bots) [m] */
  location?:
    | Vector2
    | undefined;
  /** the calculated crash speed vector [m/s] of the two bots */
  crashSpeed?:
    | number
    | undefined;
  /** the difference [m/s] of the velocity of the two bots */
  speedDiff?:
    | number
    | undefined;
  /**
   * the angle [rad] in the range [0, π] of the bot velocity vectors
   * an angle of 0 rad (  0°) means, the bots barely touched each other
   * an angle of π rad (180°) means, the bots crashed frontal into each other
   */
  crashAngle?: number | undefined;
}

/** a bot pushed another bot over a significant distance */
export interface GameEvent_BotPushedBot {
  /** the team that pushed the other team */
  byTeam?:
    | Team
    | undefined;
  /** the bot that pushed the other bot */
  violator?:
    | number
    | undefined;
  /** the bot of the opposite team that was pushed */
  victim?:
    | number
    | undefined;
  /** the location of the push (center between both bots) [m] */
  location?:
    | Vector2
    | undefined;
  /** the pushed distance [m] */
  pushedDistance?: number | undefined;
}

/** a bot tipped over */
export interface GameEvent_BotTippedOver {
  /** the team that found guilty */
  byTeam?:
    | Team
    | undefined;
  /** the bot that tipped over */
  byBot?:
    | number
    | undefined;
  /** the location of the bot [m] */
  location?:
    | Vector2
    | undefined;
  /** the location of the ball at the moment when this foul occurred [m] */
  ballLocation?: Vector2 | undefined;
}

/** a bot dropped parts */
export interface GameEvent_BotDroppedParts {
  /** the team that found guilty */
  byTeam?:
    | Team
    | undefined;
  /** the bot that dropped the parts */
  byBot?:
    | number
    | undefined;
  /** the location where the parts were dropped [m] */
  location?:
    | Vector2
    | undefined;
  /** the location of the ball at the moment when this foul occurred [m] */
  ballLocation?: Vector2 | undefined;
}

/** a defender other than the keeper was fully located inside its own defense and touched the ball */
export interface GameEvent_DefenderInDefenseArea {
  /** the team that found guilty */
  byTeam?:
    | Team
    | undefined;
  /** the bot that is inside the penalty area */
  byBot?:
    | number
    | undefined;
  /** the location of the bot [m] */
  location?:
    | Vector2
    | undefined;
  /** the distance [m] from bot case to the nearest point outside the defense area */
  distance?: number | undefined;
}

/** a defender other than the keeper was partially located inside its own defense area and touched the ball */
export interface GameEvent_DefenderInDefenseAreaPartially {
  /** the team that found guilty */
  byTeam?:
    | Team
    | undefined;
  /** the bot that is partially inside the penalty area */
  byBot?:
    | number
    | undefined;
  /** the location of the bot */
  location?:
    | Vector2
    | undefined;
  /** the distance [m] that the bot is inside the penalty area */
  distance?:
    | number
    | undefined;
  /** the location of the ball at the moment when this foul occurred [m] */
  ballLocation?: Vector2 | undefined;
}

/** an attacker touched the ball inside the opponent defense area */
export interface GameEvent_AttackerTouchedBallInDefenseArea {
  /** the team that found guilty */
  byTeam?:
    | Team
    | undefined;
  /** the bot that is inside the penalty area */
  byBot?:
    | number
    | undefined;
  /** the location of the bot [m] */
  location?:
    | Vector2
    | undefined;
  /** the distance [m] that the bot is inside the penalty area */
  distance?: number | undefined;
}

/** a bot kicked the ball too fast */
export interface GameEvent_BotKickedBallTooFast {
  /** the team that found guilty */
  byTeam?:
    | Team
    | undefined;
  /** the bot that kicked too fast */
  byBot?:
    | number
    | undefined;
  /** the location of the ball at the time of the highest speed [m] */
  location?:
    | Vector2
    | undefined;
  /** the absolute initial ball speed (kick speed) [m/s] */
  initialBallSpeed?:
    | number
    | undefined;
  /** was the ball chipped? */
  chipped?: boolean | undefined;
}

/** a bot dribbled to ball too far */
export interface GameEvent_BotDribbledBallTooFar {
  /** the team that found guilty */
  byTeam?:
    | Team
    | undefined;
  /** the bot that dribbled too far */
  byBot?:
    | number
    | undefined;
  /** the location where the dribbling started [m] */
  start?:
    | Vector2
    | undefined;
  /** the location where the maximum dribbling distance was reached [m] */
  end?: Vector2 | undefined;
}

/** an attacker touched the opponent robot inside defense area */
export interface GameEvent_AttackerTouchedOpponentInDefenseArea {
  /** the team that found guilty */
  byTeam?:
    | Team
    | undefined;
  /** the bot that touched the opponent robot */
  byBot?:
    | number
    | undefined;
  /** the bot of the opposite team that was touched */
  victim?:
    | number
    | undefined;
  /** the location of the contact point between both bots [m] */
  location?: Vector2 | undefined;
}

/** an attacker touched the ball multiple times when it was not allowed to */
export interface GameEvent_AttackerDoubleTouchedBall {
  /** the team that found guilty */
  byTeam?:
    | Team
    | undefined;
  /** the bot that touched the ball twice */
  byBot?:
    | number
    | undefined;
  /** the location of the ball when it was first touched [m] */
  location?: Vector2 | undefined;
}

/** an attacker was located too near to the opponent defense area during stop or free kick */
export interface GameEvent_AttackerTooCloseToDefenseArea {
  /** the team that found guilty */
  byTeam?:
    | Team
    | undefined;
  /** the bot that is too close to the defense area */
  byBot?:
    | number
    | undefined;
  /** the location of the bot [m] */
  location?:
    | Vector2
    | undefined;
  /** the distance [m] of the bot to the penalty area */
  distance?:
    | number
    | undefined;
  /** the location of the ball at the moment when this foul occurred [m] */
  ballLocation?: Vector2 | undefined;
}

/** a bot held the ball for too long */
export interface GameEvent_BotHeldBallDeliberately {
  /** the team that found guilty */
  byTeam?:
    | Team
    | undefined;
  /** the bot that holds the ball */
  byBot?:
    | number
    | undefined;
  /** the location of the ball [m] */
  location?:
    | Vector2
    | undefined;
  /** the duration [s] that the bot hold the ball */
  duration?: number | undefined;
}

/** a bot interfered the ball placement of the other team */
export interface GameEvent_BotInterferedPlacement {
  /** the team that found guilty */
  byTeam?:
    | Team
    | undefined;
  /** the bot that interfered the placement */
  byBot?:
    | number
    | undefined;
  /** the location of the bot [m] */
  location?: Vector2 | undefined;
}

/** a team collected multiple yellow cards */
export interface GameEvent_MultipleCards {
  /** the team that received multiple yellow cards */
  byTeam?: Team | undefined;
}

/** a team collected multiple fouls, which results in a yellow card */
export interface GameEvent_MultipleFouls {
  /** the team that collected multiple fouls */
  byTeam?:
    | Team
    | undefined;
  /** the list of game events that caused the multiple fouls */
  causedGameEvents?: GameEvent[] | undefined;
}

/** a team failed to place the ball multiple times in a row */
export interface GameEvent_MultiplePlacementFailures {
  /** the team that failed multiple times */
  byTeam?: Team | undefined;
}

/** timeout waiting for the attacking team to perform the free kick */
export interface GameEvent_KickTimeout {
  /** the team that that should have kicked */
  byTeam?:
    | Team
    | undefined;
  /** the location of the ball [m] */
  location?:
    | Vector2
    | undefined;
  /** the time [s] that was waited */
  time?: number | undefined;
}

/** game was stuck */
export interface GameEvent_NoProgressInGame {
  /** the location of the ball */
  location?:
    | Vector2
    | undefined;
  /** the time [s] that was waited */
  time?: number | undefined;
}

/** ball placement failed */
export interface GameEvent_PlacementFailed {
  /** the team that failed */
  byTeam?:
    | Team
    | undefined;
  /** the remaining distance [m] from ball to placement position */
  remainingDistance?: number | undefined;
}

/** a team was found guilty for minor unsporting behavior */
export interface GameEvent_UnsportingBehaviorMinor {
  /** the team that found guilty */
  byTeam?:
    | Team
    | undefined;
  /** an explanation of the situation and decision */
  reason?: string | undefined;
}

/** a team was found guilty for major unsporting behavior */
export interface GameEvent_UnsportingBehaviorMajor {
  /** the team that found guilty */
  byTeam?:
    | Team
    | undefined;
  /** an explanation of the situation and decision */
  reason?: string | undefined;
}

/** a keeper held the ball in its defense area for too long */
export interface GameEvent_KeeperHeldBall {
  /** the team that found guilty */
  byTeam?:
    | Team
    | undefined;
  /** the location of the ball [m] */
  location?:
    | Vector2
    | undefined;
  /** the duration [s] that the keeper hold the ball */
  duration?: number | undefined;
}

/** a team successfully placed the ball */
export interface GameEvent_PlacementSucceeded {
  /** the team that did the placement */
  byTeam?:
    | Team
    | undefined;
  /** the time [s] taken for placing the ball */
  timeTaken?:
    | number
    | undefined;
  /** the distance [m] between placement location and actual ball position */
  precision?:
    | number
    | undefined;
  /** the distance [m] between the initial ball location and the placement position */
  distance?: number | undefined;
}

/** both teams are prepared - all conditions are met to continue (with kickoff or penalty kick) */
export interface GameEvent_Prepared {
  /** the time [s] taken for preparing */
  timeTaken?: number | undefined;
}

/** bots are being substituted by a team */
export interface GameEvent_BotSubstitution {
  /** the team that substitutes robots */
  byTeam?: Team | undefined;
}

/** A challenge flag, requested by a team previously, is flagged */
export interface GameEvent_ChallengeFlag {
  /** the team that requested the challenge flag */
  byTeam?: Team | undefined;
}

/** A challenge, flagged recently, has been handled by the referee */
export interface GameEvent_ChallengeFlagHandled {
  /** the team that requested the challenge flag */
  byTeam?:
    | Team
    | undefined;
  /** the challenge was accepted by the referee */
  accepted?: boolean | undefined;
}

/** An emergency stop, requested by team previously, occurred */
export interface GameEvent_EmergencyStop {
  /** the team that substitutes robots */
  byTeam?: Team | undefined;
}

/** a team has too many robots on the field */
export interface GameEvent_TooManyRobots {
  /** the team that has too many robots */
  byTeam?:
    | Team
    | undefined;
  /** number of robots allowed at the moment */
  numRobotsAllowed?:
    | number
    | undefined;
  /** number of robots currently on the field */
  numRobotsOnField?:
    | number
    | undefined;
  /** the location of the ball at the moment when this foul occurred [m] */
  ballLocation?: Vector2 | undefined;
}

/** a robot chipped the ball over the field boundary out of the playing surface */
export interface GameEvent_BoundaryCrossing {
  /** the team that has too many robots */
  byTeam?:
    | Team
    | undefined;
  /** the location of the ball [m] */
  location?: Vector2 | undefined;
}

/** the penalty kick failed (by time or by keeper) */
export interface GameEvent_PenaltyKickFailed {
  /** the team that last touched the ball */
  byTeam?:
    | Team
    | undefined;
  /** the location of the ball at the moment of this event [m] */
  location?:
    | Vector2
    | undefined;
  /** an explanation of the failure */
  reason?: string | undefined;
}

export const GameEvent = {
  fromJSON(object: any): GameEvent {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : undefined,
      type: isSet(object.type) ? gameEvent_TypeFromJSON(object.type) : undefined,
      origin: globalThis.Array.isArray(object?.origin)
        ? object.origin.map((e: any) => globalThis.String(e))
        : undefined,
      createdTimestamp: isSet(object.createdTimestamp) ? globalThis.Number(object.createdTimestamp) : undefined,
      event: isSet(object.ballLeftFieldTouchLine)
        ? {
          $case: "ballLeftFieldTouchLine",
          ballLeftFieldTouchLine: GameEvent_BallLeftField.fromJSON(object.ballLeftFieldTouchLine),
        }
        : isSet(object.ballLeftFieldGoalLine)
        ? {
          $case: "ballLeftFieldGoalLine",
          ballLeftFieldGoalLine: GameEvent_BallLeftField.fromJSON(object.ballLeftFieldGoalLine),
        }
        : isSet(object.aimlessKick)
        ? { $case: "aimlessKick", aimlessKick: GameEvent_AimlessKick.fromJSON(object.aimlessKick) }
        : isSet(object.attackerTooCloseToDefenseArea)
        ? {
          $case: "attackerTooCloseToDefenseArea",
          attackerTooCloseToDefenseArea: GameEvent_AttackerTooCloseToDefenseArea.fromJSON(
            object.attackerTooCloseToDefenseArea,
          ),
        }
        : isSet(object.defenderInDefenseArea)
        ? {
          $case: "defenderInDefenseArea",
          defenderInDefenseArea: GameEvent_DefenderInDefenseArea.fromJSON(object.defenderInDefenseArea),
        }
        : isSet(object.boundaryCrossing)
        ? { $case: "boundaryCrossing", boundaryCrossing: GameEvent_BoundaryCrossing.fromJSON(object.boundaryCrossing) }
        : isSet(object.keeperHeldBall)
        ? { $case: "keeperHeldBall", keeperHeldBall: GameEvent_KeeperHeldBall.fromJSON(object.keeperHeldBall) }
        : isSet(object.botDribbledBallTooFar)
        ? {
          $case: "botDribbledBallTooFar",
          botDribbledBallTooFar: GameEvent_BotDribbledBallTooFar.fromJSON(object.botDribbledBallTooFar),
        }
        : isSet(object.botPushedBot)
        ? { $case: "botPushedBot", botPushedBot: GameEvent_BotPushedBot.fromJSON(object.botPushedBot) }
        : isSet(object.botHeldBallDeliberately)
        ? {
          $case: "botHeldBallDeliberately",
          botHeldBallDeliberately: GameEvent_BotHeldBallDeliberately.fromJSON(object.botHeldBallDeliberately),
        }
        : isSet(object.botTippedOver)
        ? { $case: "botTippedOver", botTippedOver: GameEvent_BotTippedOver.fromJSON(object.botTippedOver) }
        : isSet(object.botDroppedParts)
        ? { $case: "botDroppedParts", botDroppedParts: GameEvent_BotDroppedParts.fromJSON(object.botDroppedParts) }
        : isSet(object.attackerTouchedBallInDefenseArea)
        ? {
          $case: "attackerTouchedBallInDefenseArea",
          attackerTouchedBallInDefenseArea: GameEvent_AttackerTouchedBallInDefenseArea.fromJSON(
            object.attackerTouchedBallInDefenseArea,
          ),
        }
        : isSet(object.botKickedBallTooFast)
        ? {
          $case: "botKickedBallTooFast",
          botKickedBallTooFast: GameEvent_BotKickedBallTooFast.fromJSON(object.botKickedBallTooFast),
        }
        : isSet(object.botCrashUnique)
        ? { $case: "botCrashUnique", botCrashUnique: GameEvent_BotCrashUnique.fromJSON(object.botCrashUnique) }
        : isSet(object.botCrashDrawn)
        ? { $case: "botCrashDrawn", botCrashDrawn: GameEvent_BotCrashDrawn.fromJSON(object.botCrashDrawn) }
        : isSet(object.defenderTooCloseToKickPoint)
        ? {
          $case: "defenderTooCloseToKickPoint",
          defenderTooCloseToKickPoint: GameEvent_DefenderTooCloseToKickPoint.fromJSON(
            object.defenderTooCloseToKickPoint,
          ),
        }
        : isSet(object.botTooFastInStop)
        ? { $case: "botTooFastInStop", botTooFastInStop: GameEvent_BotTooFastInStop.fromJSON(object.botTooFastInStop) }
        : isSet(object.botInterferedPlacement)
        ? {
          $case: "botInterferedPlacement",
          botInterferedPlacement: GameEvent_BotInterferedPlacement.fromJSON(object.botInterferedPlacement),
        }
        : isSet(object.possibleGoal)
        ? { $case: "possibleGoal", possibleGoal: GameEvent_Goal.fromJSON(object.possibleGoal) }
        : isSet(object.goal)
        ? { $case: "goal", goal: GameEvent_Goal.fromJSON(object.goal) }
        : isSet(object.invalidGoal)
        ? { $case: "invalidGoal", invalidGoal: GameEvent_Goal.fromJSON(object.invalidGoal) }
        : isSet(object.attackerDoubleTouchedBall)
        ? {
          $case: "attackerDoubleTouchedBall",
          attackerDoubleTouchedBall: GameEvent_AttackerDoubleTouchedBall.fromJSON(object.attackerDoubleTouchedBall),
        }
        : isSet(object.placementSucceeded)
        ? {
          $case: "placementSucceeded",
          placementSucceeded: GameEvent_PlacementSucceeded.fromJSON(object.placementSucceeded),
        }
        : isSet(object.penaltyKickFailed)
        ? {
          $case: "penaltyKickFailed",
          penaltyKickFailed: GameEvent_PenaltyKickFailed.fromJSON(object.penaltyKickFailed),
        }
        : isSet(object.noProgressInGame)
        ? { $case: "noProgressInGame", noProgressInGame: GameEvent_NoProgressInGame.fromJSON(object.noProgressInGame) }
        : isSet(object.placementFailed)
        ? { $case: "placementFailed", placementFailed: GameEvent_PlacementFailed.fromJSON(object.placementFailed) }
        : isSet(object.multipleCards)
        ? { $case: "multipleCards", multipleCards: GameEvent_MultipleCards.fromJSON(object.multipleCards) }
        : isSet(object.multipleFouls)
        ? { $case: "multipleFouls", multipleFouls: GameEvent_MultipleFouls.fromJSON(object.multipleFouls) }
        : isSet(object.botSubstitution)
        ? { $case: "botSubstitution", botSubstitution: GameEvent_BotSubstitution.fromJSON(object.botSubstitution) }
        : isSet(object.tooManyRobots)
        ? { $case: "tooManyRobots", tooManyRobots: GameEvent_TooManyRobots.fromJSON(object.tooManyRobots) }
        : isSet(object.challengeFlag)
        ? { $case: "challengeFlag", challengeFlag: GameEvent_ChallengeFlag.fromJSON(object.challengeFlag) }
        : isSet(object.challengeFlagHandled)
        ? {
          $case: "challengeFlagHandled",
          challengeFlagHandled: GameEvent_ChallengeFlagHandled.fromJSON(object.challengeFlagHandled),
        }
        : isSet(object.emergencyStop)
        ? { $case: "emergencyStop", emergencyStop: GameEvent_EmergencyStop.fromJSON(object.emergencyStop) }
        : isSet(object.unsportingBehaviorMinor)
        ? {
          $case: "unsportingBehaviorMinor",
          unsportingBehaviorMinor: GameEvent_UnsportingBehaviorMinor.fromJSON(object.unsportingBehaviorMinor),
        }
        : isSet(object.unsportingBehaviorMajor)
        ? {
          $case: "unsportingBehaviorMajor",
          unsportingBehaviorMajor: GameEvent_UnsportingBehaviorMajor.fromJSON(object.unsportingBehaviorMajor),
        }
        : isSet(object.prepared)
        ? { $case: "prepared", prepared: GameEvent_Prepared.fromJSON(object.prepared) }
        : isSet(object.indirectGoal)
        ? { $case: "indirectGoal", indirectGoal: GameEvent_IndirectGoal.fromJSON(object.indirectGoal) }
        : isSet(object.chippedGoal)
        ? { $case: "chippedGoal", chippedGoal: GameEvent_ChippedGoal.fromJSON(object.chippedGoal) }
        : isSet(object.kickTimeout)
        ? { $case: "kickTimeout", kickTimeout: GameEvent_KickTimeout.fromJSON(object.kickTimeout) }
        : isSet(object.attackerTouchedOpponentInDefenseArea)
        ? {
          $case: "attackerTouchedOpponentInDefenseArea",
          attackerTouchedOpponentInDefenseArea: GameEvent_AttackerTouchedOpponentInDefenseArea.fromJSON(
            object.attackerTouchedOpponentInDefenseArea,
          ),
        }
        : isSet(object.attackerTouchedOpponentInDefenseAreaSkipped)
        ? {
          $case: "attackerTouchedOpponentInDefenseAreaSkipped",
          attackerTouchedOpponentInDefenseAreaSkipped: GameEvent_AttackerTouchedOpponentInDefenseArea.fromJSON(
            object.attackerTouchedOpponentInDefenseAreaSkipped,
          ),
        }
        : isSet(object.botCrashUniqueSkipped)
        ? {
          $case: "botCrashUniqueSkipped",
          botCrashUniqueSkipped: GameEvent_BotCrashUnique.fromJSON(object.botCrashUniqueSkipped),
        }
        : isSet(object.botPushedBotSkipped)
        ? {
          $case: "botPushedBotSkipped",
          botPushedBotSkipped: GameEvent_BotPushedBot.fromJSON(object.botPushedBotSkipped),
        }
        : isSet(object.defenderInDefenseAreaPartially)
        ? {
          $case: "defenderInDefenseAreaPartially",
          defenderInDefenseAreaPartially: GameEvent_DefenderInDefenseAreaPartially.fromJSON(
            object.defenderInDefenseAreaPartially,
          ),
        }
        : isSet(object.multiplePlacementFailures)
        ? {
          $case: "multiplePlacementFailures",
          multiplePlacementFailures: GameEvent_MultiplePlacementFailures.fromJSON(object.multiplePlacementFailures),
        }
        : undefined,
    };
  },

  toJSON(message: GameEvent): unknown {
    const obj: any = {};
    if (message.id !== undefined && message.id !== "") {
      obj.id = message.id;
    }
    if (message.type !== undefined && message.type !== GameEvent_Type.UNKNOWN_GAME_EVENT_TYPE) {
      obj.type = gameEvent_TypeToJSON(message.type);
    }
    if (message.origin?.length) {
      obj.origin = message.origin;
    }
    if (message.createdTimestamp !== undefined && message.createdTimestamp !== 0) {
      obj.createdTimestamp = Math.round(message.createdTimestamp);
    }
    if (message.event?.$case === "ballLeftFieldTouchLine") {
      obj.ballLeftFieldTouchLine = GameEvent_BallLeftField.toJSON(message.event.ballLeftFieldTouchLine);
    }
    if (message.event?.$case === "ballLeftFieldGoalLine") {
      obj.ballLeftFieldGoalLine = GameEvent_BallLeftField.toJSON(message.event.ballLeftFieldGoalLine);
    }
    if (message.event?.$case === "aimlessKick") {
      obj.aimlessKick = GameEvent_AimlessKick.toJSON(message.event.aimlessKick);
    }
    if (message.event?.$case === "attackerTooCloseToDefenseArea") {
      obj.attackerTooCloseToDefenseArea = GameEvent_AttackerTooCloseToDefenseArea.toJSON(
        message.event.attackerTooCloseToDefenseArea,
      );
    }
    if (message.event?.$case === "defenderInDefenseArea") {
      obj.defenderInDefenseArea = GameEvent_DefenderInDefenseArea.toJSON(message.event.defenderInDefenseArea);
    }
    if (message.event?.$case === "boundaryCrossing") {
      obj.boundaryCrossing = GameEvent_BoundaryCrossing.toJSON(message.event.boundaryCrossing);
    }
    if (message.event?.$case === "keeperHeldBall") {
      obj.keeperHeldBall = GameEvent_KeeperHeldBall.toJSON(message.event.keeperHeldBall);
    }
    if (message.event?.$case === "botDribbledBallTooFar") {
      obj.botDribbledBallTooFar = GameEvent_BotDribbledBallTooFar.toJSON(message.event.botDribbledBallTooFar);
    }
    if (message.event?.$case === "botPushedBot") {
      obj.botPushedBot = GameEvent_BotPushedBot.toJSON(message.event.botPushedBot);
    }
    if (message.event?.$case === "botHeldBallDeliberately") {
      obj.botHeldBallDeliberately = GameEvent_BotHeldBallDeliberately.toJSON(message.event.botHeldBallDeliberately);
    }
    if (message.event?.$case === "botTippedOver") {
      obj.botTippedOver = GameEvent_BotTippedOver.toJSON(message.event.botTippedOver);
    }
    if (message.event?.$case === "botDroppedParts") {
      obj.botDroppedParts = GameEvent_BotDroppedParts.toJSON(message.event.botDroppedParts);
    }
    if (message.event?.$case === "attackerTouchedBallInDefenseArea") {
      obj.attackerTouchedBallInDefenseArea = GameEvent_AttackerTouchedBallInDefenseArea.toJSON(
        message.event.attackerTouchedBallInDefenseArea,
      );
    }
    if (message.event?.$case === "botKickedBallTooFast") {
      obj.botKickedBallTooFast = GameEvent_BotKickedBallTooFast.toJSON(message.event.botKickedBallTooFast);
    }
    if (message.event?.$case === "botCrashUnique") {
      obj.botCrashUnique = GameEvent_BotCrashUnique.toJSON(message.event.botCrashUnique);
    }
    if (message.event?.$case === "botCrashDrawn") {
      obj.botCrashDrawn = GameEvent_BotCrashDrawn.toJSON(message.event.botCrashDrawn);
    }
    if (message.event?.$case === "defenderTooCloseToKickPoint") {
      obj.defenderTooCloseToKickPoint = GameEvent_DefenderTooCloseToKickPoint.toJSON(
        message.event.defenderTooCloseToKickPoint,
      );
    }
    if (message.event?.$case === "botTooFastInStop") {
      obj.botTooFastInStop = GameEvent_BotTooFastInStop.toJSON(message.event.botTooFastInStop);
    }
    if (message.event?.$case === "botInterferedPlacement") {
      obj.botInterferedPlacement = GameEvent_BotInterferedPlacement.toJSON(message.event.botInterferedPlacement);
    }
    if (message.event?.$case === "possibleGoal") {
      obj.possibleGoal = GameEvent_Goal.toJSON(message.event.possibleGoal);
    }
    if (message.event?.$case === "goal") {
      obj.goal = GameEvent_Goal.toJSON(message.event.goal);
    }
    if (message.event?.$case === "invalidGoal") {
      obj.invalidGoal = GameEvent_Goal.toJSON(message.event.invalidGoal);
    }
    if (message.event?.$case === "attackerDoubleTouchedBall") {
      obj.attackerDoubleTouchedBall = GameEvent_AttackerDoubleTouchedBall.toJSON(
        message.event.attackerDoubleTouchedBall,
      );
    }
    if (message.event?.$case === "placementSucceeded") {
      obj.placementSucceeded = GameEvent_PlacementSucceeded.toJSON(message.event.placementSucceeded);
    }
    if (message.event?.$case === "penaltyKickFailed") {
      obj.penaltyKickFailed = GameEvent_PenaltyKickFailed.toJSON(message.event.penaltyKickFailed);
    }
    if (message.event?.$case === "noProgressInGame") {
      obj.noProgressInGame = GameEvent_NoProgressInGame.toJSON(message.event.noProgressInGame);
    }
    if (message.event?.$case === "placementFailed") {
      obj.placementFailed = GameEvent_PlacementFailed.toJSON(message.event.placementFailed);
    }
    if (message.event?.$case === "multipleCards") {
      obj.multipleCards = GameEvent_MultipleCards.toJSON(message.event.multipleCards);
    }
    if (message.event?.$case === "multipleFouls") {
      obj.multipleFouls = GameEvent_MultipleFouls.toJSON(message.event.multipleFouls);
    }
    if (message.event?.$case === "botSubstitution") {
      obj.botSubstitution = GameEvent_BotSubstitution.toJSON(message.event.botSubstitution);
    }
    if (message.event?.$case === "tooManyRobots") {
      obj.tooManyRobots = GameEvent_TooManyRobots.toJSON(message.event.tooManyRobots);
    }
    if (message.event?.$case === "challengeFlag") {
      obj.challengeFlag = GameEvent_ChallengeFlag.toJSON(message.event.challengeFlag);
    }
    if (message.event?.$case === "challengeFlagHandled") {
      obj.challengeFlagHandled = GameEvent_ChallengeFlagHandled.toJSON(message.event.challengeFlagHandled);
    }
    if (message.event?.$case === "emergencyStop") {
      obj.emergencyStop = GameEvent_EmergencyStop.toJSON(message.event.emergencyStop);
    }
    if (message.event?.$case === "unsportingBehaviorMinor") {
      obj.unsportingBehaviorMinor = GameEvent_UnsportingBehaviorMinor.toJSON(message.event.unsportingBehaviorMinor);
    }
    if (message.event?.$case === "unsportingBehaviorMajor") {
      obj.unsportingBehaviorMajor = GameEvent_UnsportingBehaviorMajor.toJSON(message.event.unsportingBehaviorMajor);
    }
    if (message.event?.$case === "prepared") {
      obj.prepared = GameEvent_Prepared.toJSON(message.event.prepared);
    }
    if (message.event?.$case === "indirectGoal") {
      obj.indirectGoal = GameEvent_IndirectGoal.toJSON(message.event.indirectGoal);
    }
    if (message.event?.$case === "chippedGoal") {
      obj.chippedGoal = GameEvent_ChippedGoal.toJSON(message.event.chippedGoal);
    }
    if (message.event?.$case === "kickTimeout") {
      obj.kickTimeout = GameEvent_KickTimeout.toJSON(message.event.kickTimeout);
    }
    if (message.event?.$case === "attackerTouchedOpponentInDefenseArea") {
      obj.attackerTouchedOpponentInDefenseArea = GameEvent_AttackerTouchedOpponentInDefenseArea.toJSON(
        message.event.attackerTouchedOpponentInDefenseArea,
      );
    }
    if (message.event?.$case === "attackerTouchedOpponentInDefenseAreaSkipped") {
      obj.attackerTouchedOpponentInDefenseAreaSkipped = GameEvent_AttackerTouchedOpponentInDefenseArea.toJSON(
        message.event.attackerTouchedOpponentInDefenseAreaSkipped,
      );
    }
    if (message.event?.$case === "botCrashUniqueSkipped") {
      obj.botCrashUniqueSkipped = GameEvent_BotCrashUnique.toJSON(message.event.botCrashUniqueSkipped);
    }
    if (message.event?.$case === "botPushedBotSkipped") {
      obj.botPushedBotSkipped = GameEvent_BotPushedBot.toJSON(message.event.botPushedBotSkipped);
    }
    if (message.event?.$case === "defenderInDefenseAreaPartially") {
      obj.defenderInDefenseAreaPartially = GameEvent_DefenderInDefenseAreaPartially.toJSON(
        message.event.defenderInDefenseAreaPartially,
      );
    }
    if (message.event?.$case === "multiplePlacementFailures") {
      obj.multiplePlacementFailures = GameEvent_MultiplePlacementFailures.toJSON(
        message.event.multiplePlacementFailures,
      );
    }
    return obj;
  },
};

export const GameEvent_BallLeftField = {
  fromJSON(object: any): GameEvent_BallLeftField {
    return {
      byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : undefined,
      byBot: isSet(object.byBot) ? globalThis.Number(object.byBot) : undefined,
      location: isSet(object.location) ? Vector2.fromJSON(object.location) : undefined,
    };
  },

  toJSON(message: GameEvent_BallLeftField): unknown {
    const obj: any = {};
    if (message.byTeam !== undefined && message.byTeam !== Team.UNKNOWN) {
      obj.byTeam = teamToJSON(message.byTeam);
    }
    if (message.byBot !== undefined && message.byBot !== 0) {
      obj.byBot = Math.round(message.byBot);
    }
    if (message.location !== undefined) {
      obj.location = Vector2.toJSON(message.location);
    }
    return obj;
  },
};

export const GameEvent_AimlessKick = {
  fromJSON(object: any): GameEvent_AimlessKick {
    return {
      byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : undefined,
      byBot: isSet(object.byBot) ? globalThis.Number(object.byBot) : undefined,
      location: isSet(object.location) ? Vector2.fromJSON(object.location) : undefined,
      kickLocation: isSet(object.kickLocation) ? Vector2.fromJSON(object.kickLocation) : undefined,
    };
  },

  toJSON(message: GameEvent_AimlessKick): unknown {
    const obj: any = {};
    if (message.byTeam !== undefined && message.byTeam !== Team.UNKNOWN) {
      obj.byTeam = teamToJSON(message.byTeam);
    }
    if (message.byBot !== undefined && message.byBot !== 0) {
      obj.byBot = Math.round(message.byBot);
    }
    if (message.location !== undefined) {
      obj.location = Vector2.toJSON(message.location);
    }
    if (message.kickLocation !== undefined) {
      obj.kickLocation = Vector2.toJSON(message.kickLocation);
    }
    return obj;
  },
};

export const GameEvent_Goal = {
  fromJSON(object: any): GameEvent_Goal {
    return {
      byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : undefined,
      kickingTeam: isSet(object.kickingTeam) ? teamFromJSON(object.kickingTeam) : undefined,
      kickingBot: isSet(object.kickingBot) ? globalThis.Number(object.kickingBot) : undefined,
      location: isSet(object.location) ? Vector2.fromJSON(object.location) : undefined,
      kickLocation: isSet(object.kickLocation) ? Vector2.fromJSON(object.kickLocation) : undefined,
      maxBallHeight: isSet(object.maxBallHeight) ? globalThis.Number(object.maxBallHeight) : undefined,
      numRobotsByTeam: isSet(object.numRobotsByTeam) ? globalThis.Number(object.numRobotsByTeam) : undefined,
      lastTouchByTeam: isSet(object.lastTouchByTeam) ? globalThis.Number(object.lastTouchByTeam) : undefined,
      message: isSet(object.message) ? globalThis.String(object.message) : undefined,
    };
  },

  toJSON(message: GameEvent_Goal): unknown {
    const obj: any = {};
    if (message.byTeam !== undefined && message.byTeam !== Team.UNKNOWN) {
      obj.byTeam = teamToJSON(message.byTeam);
    }
    if (message.kickingTeam !== undefined && message.kickingTeam !== Team.UNKNOWN) {
      obj.kickingTeam = teamToJSON(message.kickingTeam);
    }
    if (message.kickingBot !== undefined && message.kickingBot !== 0) {
      obj.kickingBot = Math.round(message.kickingBot);
    }
    if (message.location !== undefined) {
      obj.location = Vector2.toJSON(message.location);
    }
    if (message.kickLocation !== undefined) {
      obj.kickLocation = Vector2.toJSON(message.kickLocation);
    }
    if (message.maxBallHeight !== undefined && message.maxBallHeight !== 0) {
      obj.maxBallHeight = message.maxBallHeight;
    }
    if (message.numRobotsByTeam !== undefined && message.numRobotsByTeam !== 0) {
      obj.numRobotsByTeam = Math.round(message.numRobotsByTeam);
    }
    if (message.lastTouchByTeam !== undefined && message.lastTouchByTeam !== 0) {
      obj.lastTouchByTeam = Math.round(message.lastTouchByTeam);
    }
    if (message.message !== undefined && message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },
};

export const GameEvent_IndirectGoal = {
  fromJSON(object: any): GameEvent_IndirectGoal {
    return {
      byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : undefined,
      byBot: isSet(object.byBot) ? globalThis.Number(object.byBot) : undefined,
      location: isSet(object.location) ? Vector2.fromJSON(object.location) : undefined,
      kickLocation: isSet(object.kickLocation) ? Vector2.fromJSON(object.kickLocation) : undefined,
    };
  },

  toJSON(message: GameEvent_IndirectGoal): unknown {
    const obj: any = {};
    if (message.byTeam !== undefined && message.byTeam !== Team.UNKNOWN) {
      obj.byTeam = teamToJSON(message.byTeam);
    }
    if (message.byBot !== undefined && message.byBot !== 0) {
      obj.byBot = Math.round(message.byBot);
    }
    if (message.location !== undefined) {
      obj.location = Vector2.toJSON(message.location);
    }
    if (message.kickLocation !== undefined) {
      obj.kickLocation = Vector2.toJSON(message.kickLocation);
    }
    return obj;
  },
};

export const GameEvent_ChippedGoal = {
  fromJSON(object: any): GameEvent_ChippedGoal {
    return {
      byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : undefined,
      byBot: isSet(object.byBot) ? globalThis.Number(object.byBot) : undefined,
      location: isSet(object.location) ? Vector2.fromJSON(object.location) : undefined,
      kickLocation: isSet(object.kickLocation) ? Vector2.fromJSON(object.kickLocation) : undefined,
      maxBallHeight: isSet(object.maxBallHeight) ? globalThis.Number(object.maxBallHeight) : undefined,
    };
  },

  toJSON(message: GameEvent_ChippedGoal): unknown {
    const obj: any = {};
    if (message.byTeam !== undefined && message.byTeam !== Team.UNKNOWN) {
      obj.byTeam = teamToJSON(message.byTeam);
    }
    if (message.byBot !== undefined && message.byBot !== 0) {
      obj.byBot = Math.round(message.byBot);
    }
    if (message.location !== undefined) {
      obj.location = Vector2.toJSON(message.location);
    }
    if (message.kickLocation !== undefined) {
      obj.kickLocation = Vector2.toJSON(message.kickLocation);
    }
    if (message.maxBallHeight !== undefined && message.maxBallHeight !== 0) {
      obj.maxBallHeight = message.maxBallHeight;
    }
    return obj;
  },
};

export const GameEvent_BotTooFastInStop = {
  fromJSON(object: any): GameEvent_BotTooFastInStop {
    return {
      byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : undefined,
      byBot: isSet(object.byBot) ? globalThis.Number(object.byBot) : undefined,
      location: isSet(object.location) ? Vector2.fromJSON(object.location) : undefined,
      speed: isSet(object.speed) ? globalThis.Number(object.speed) : undefined,
    };
  },

  toJSON(message: GameEvent_BotTooFastInStop): unknown {
    const obj: any = {};
    if (message.byTeam !== undefined && message.byTeam !== Team.UNKNOWN) {
      obj.byTeam = teamToJSON(message.byTeam);
    }
    if (message.byBot !== undefined && message.byBot !== 0) {
      obj.byBot = Math.round(message.byBot);
    }
    if (message.location !== undefined) {
      obj.location = Vector2.toJSON(message.location);
    }
    if (message.speed !== undefined && message.speed !== 0) {
      obj.speed = message.speed;
    }
    return obj;
  },
};

export const GameEvent_DefenderTooCloseToKickPoint = {
  fromJSON(object: any): GameEvent_DefenderTooCloseToKickPoint {
    return {
      byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : undefined,
      byBot: isSet(object.byBot) ? globalThis.Number(object.byBot) : undefined,
      location: isSet(object.location) ? Vector2.fromJSON(object.location) : undefined,
      distance: isSet(object.distance) ? globalThis.Number(object.distance) : undefined,
    };
  },

  toJSON(message: GameEvent_DefenderTooCloseToKickPoint): unknown {
    const obj: any = {};
    if (message.byTeam !== undefined && message.byTeam !== Team.UNKNOWN) {
      obj.byTeam = teamToJSON(message.byTeam);
    }
    if (message.byBot !== undefined && message.byBot !== 0) {
      obj.byBot = Math.round(message.byBot);
    }
    if (message.location !== undefined) {
      obj.location = Vector2.toJSON(message.location);
    }
    if (message.distance !== undefined && message.distance !== 0) {
      obj.distance = message.distance;
    }
    return obj;
  },
};

export const GameEvent_BotCrashDrawn = {
  fromJSON(object: any): GameEvent_BotCrashDrawn {
    return {
      botYellow: isSet(object.botYellow) ? globalThis.Number(object.botYellow) : undefined,
      botBlue: isSet(object.botBlue) ? globalThis.Number(object.botBlue) : undefined,
      location: isSet(object.location) ? Vector2.fromJSON(object.location) : undefined,
      crashSpeed: isSet(object.crashSpeed) ? globalThis.Number(object.crashSpeed) : undefined,
      speedDiff: isSet(object.speedDiff) ? globalThis.Number(object.speedDiff) : undefined,
      crashAngle: isSet(object.crashAngle) ? globalThis.Number(object.crashAngle) : undefined,
    };
  },

  toJSON(message: GameEvent_BotCrashDrawn): unknown {
    const obj: any = {};
    if (message.botYellow !== undefined && message.botYellow !== 0) {
      obj.botYellow = Math.round(message.botYellow);
    }
    if (message.botBlue !== undefined && message.botBlue !== 0) {
      obj.botBlue = Math.round(message.botBlue);
    }
    if (message.location !== undefined) {
      obj.location = Vector2.toJSON(message.location);
    }
    if (message.crashSpeed !== undefined && message.crashSpeed !== 0) {
      obj.crashSpeed = message.crashSpeed;
    }
    if (message.speedDiff !== undefined && message.speedDiff !== 0) {
      obj.speedDiff = message.speedDiff;
    }
    if (message.crashAngle !== undefined && message.crashAngle !== 0) {
      obj.crashAngle = message.crashAngle;
    }
    return obj;
  },
};

export const GameEvent_BotCrashUnique = {
  fromJSON(object: any): GameEvent_BotCrashUnique {
    return {
      byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : undefined,
      violator: isSet(object.violator) ? globalThis.Number(object.violator) : undefined,
      victim: isSet(object.victim) ? globalThis.Number(object.victim) : undefined,
      location: isSet(object.location) ? Vector2.fromJSON(object.location) : undefined,
      crashSpeed: isSet(object.crashSpeed) ? globalThis.Number(object.crashSpeed) : undefined,
      speedDiff: isSet(object.speedDiff) ? globalThis.Number(object.speedDiff) : undefined,
      crashAngle: isSet(object.crashAngle) ? globalThis.Number(object.crashAngle) : undefined,
    };
  },

  toJSON(message: GameEvent_BotCrashUnique): unknown {
    const obj: any = {};
    if (message.byTeam !== undefined && message.byTeam !== Team.UNKNOWN) {
      obj.byTeam = teamToJSON(message.byTeam);
    }
    if (message.violator !== undefined && message.violator !== 0) {
      obj.violator = Math.round(message.violator);
    }
    if (message.victim !== undefined && message.victim !== 0) {
      obj.victim = Math.round(message.victim);
    }
    if (message.location !== undefined) {
      obj.location = Vector2.toJSON(message.location);
    }
    if (message.crashSpeed !== undefined && message.crashSpeed !== 0) {
      obj.crashSpeed = message.crashSpeed;
    }
    if (message.speedDiff !== undefined && message.speedDiff !== 0) {
      obj.speedDiff = message.speedDiff;
    }
    if (message.crashAngle !== undefined && message.crashAngle !== 0) {
      obj.crashAngle = message.crashAngle;
    }
    return obj;
  },
};

export const GameEvent_BotPushedBot = {
  fromJSON(object: any): GameEvent_BotPushedBot {
    return {
      byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : undefined,
      violator: isSet(object.violator) ? globalThis.Number(object.violator) : undefined,
      victim: isSet(object.victim) ? globalThis.Number(object.victim) : undefined,
      location: isSet(object.location) ? Vector2.fromJSON(object.location) : undefined,
      pushedDistance: isSet(object.pushedDistance) ? globalThis.Number(object.pushedDistance) : undefined,
    };
  },

  toJSON(message: GameEvent_BotPushedBot): unknown {
    const obj: any = {};
    if (message.byTeam !== undefined && message.byTeam !== Team.UNKNOWN) {
      obj.byTeam = teamToJSON(message.byTeam);
    }
    if (message.violator !== undefined && message.violator !== 0) {
      obj.violator = Math.round(message.violator);
    }
    if (message.victim !== undefined && message.victim !== 0) {
      obj.victim = Math.round(message.victim);
    }
    if (message.location !== undefined) {
      obj.location = Vector2.toJSON(message.location);
    }
    if (message.pushedDistance !== undefined && message.pushedDistance !== 0) {
      obj.pushedDistance = message.pushedDistance;
    }
    return obj;
  },
};

export const GameEvent_BotTippedOver = {
  fromJSON(object: any): GameEvent_BotTippedOver {
    return {
      byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : undefined,
      byBot: isSet(object.byBot) ? globalThis.Number(object.byBot) : undefined,
      location: isSet(object.location) ? Vector2.fromJSON(object.location) : undefined,
      ballLocation: isSet(object.ballLocation) ? Vector2.fromJSON(object.ballLocation) : undefined,
    };
  },

  toJSON(message: GameEvent_BotTippedOver): unknown {
    const obj: any = {};
    if (message.byTeam !== undefined && message.byTeam !== Team.UNKNOWN) {
      obj.byTeam = teamToJSON(message.byTeam);
    }
    if (message.byBot !== undefined && message.byBot !== 0) {
      obj.byBot = Math.round(message.byBot);
    }
    if (message.location !== undefined) {
      obj.location = Vector2.toJSON(message.location);
    }
    if (message.ballLocation !== undefined) {
      obj.ballLocation = Vector2.toJSON(message.ballLocation);
    }
    return obj;
  },
};

export const GameEvent_BotDroppedParts = {
  fromJSON(object: any): GameEvent_BotDroppedParts {
    return {
      byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : undefined,
      byBot: isSet(object.byBot) ? globalThis.Number(object.byBot) : undefined,
      location: isSet(object.location) ? Vector2.fromJSON(object.location) : undefined,
      ballLocation: isSet(object.ballLocation) ? Vector2.fromJSON(object.ballLocation) : undefined,
    };
  },

  toJSON(message: GameEvent_BotDroppedParts): unknown {
    const obj: any = {};
    if (message.byTeam !== undefined && message.byTeam !== Team.UNKNOWN) {
      obj.byTeam = teamToJSON(message.byTeam);
    }
    if (message.byBot !== undefined && message.byBot !== 0) {
      obj.byBot = Math.round(message.byBot);
    }
    if (message.location !== undefined) {
      obj.location = Vector2.toJSON(message.location);
    }
    if (message.ballLocation !== undefined) {
      obj.ballLocation = Vector2.toJSON(message.ballLocation);
    }
    return obj;
  },
};

export const GameEvent_DefenderInDefenseArea = {
  fromJSON(object: any): GameEvent_DefenderInDefenseArea {
    return {
      byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : undefined,
      byBot: isSet(object.byBot) ? globalThis.Number(object.byBot) : undefined,
      location: isSet(object.location) ? Vector2.fromJSON(object.location) : undefined,
      distance: isSet(object.distance) ? globalThis.Number(object.distance) : undefined,
    };
  },

  toJSON(message: GameEvent_DefenderInDefenseArea): unknown {
    const obj: any = {};
    if (message.byTeam !== undefined && message.byTeam !== Team.UNKNOWN) {
      obj.byTeam = teamToJSON(message.byTeam);
    }
    if (message.byBot !== undefined && message.byBot !== 0) {
      obj.byBot = Math.round(message.byBot);
    }
    if (message.location !== undefined) {
      obj.location = Vector2.toJSON(message.location);
    }
    if (message.distance !== undefined && message.distance !== 0) {
      obj.distance = message.distance;
    }
    return obj;
  },
};

export const GameEvent_DefenderInDefenseAreaPartially = {
  fromJSON(object: any): GameEvent_DefenderInDefenseAreaPartially {
    return {
      byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : undefined,
      byBot: isSet(object.byBot) ? globalThis.Number(object.byBot) : undefined,
      location: isSet(object.location) ? Vector2.fromJSON(object.location) : undefined,
      distance: isSet(object.distance) ? globalThis.Number(object.distance) : undefined,
      ballLocation: isSet(object.ballLocation) ? Vector2.fromJSON(object.ballLocation) : undefined,
    };
  },

  toJSON(message: GameEvent_DefenderInDefenseAreaPartially): unknown {
    const obj: any = {};
    if (message.byTeam !== undefined && message.byTeam !== Team.UNKNOWN) {
      obj.byTeam = teamToJSON(message.byTeam);
    }
    if (message.byBot !== undefined && message.byBot !== 0) {
      obj.byBot = Math.round(message.byBot);
    }
    if (message.location !== undefined) {
      obj.location = Vector2.toJSON(message.location);
    }
    if (message.distance !== undefined && message.distance !== 0) {
      obj.distance = message.distance;
    }
    if (message.ballLocation !== undefined) {
      obj.ballLocation = Vector2.toJSON(message.ballLocation);
    }
    return obj;
  },
};

export const GameEvent_AttackerTouchedBallInDefenseArea = {
  fromJSON(object: any): GameEvent_AttackerTouchedBallInDefenseArea {
    return {
      byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : undefined,
      byBot: isSet(object.byBot) ? globalThis.Number(object.byBot) : undefined,
      location: isSet(object.location) ? Vector2.fromJSON(object.location) : undefined,
      distance: isSet(object.distance) ? globalThis.Number(object.distance) : undefined,
    };
  },

  toJSON(message: GameEvent_AttackerTouchedBallInDefenseArea): unknown {
    const obj: any = {};
    if (message.byTeam !== undefined && message.byTeam !== Team.UNKNOWN) {
      obj.byTeam = teamToJSON(message.byTeam);
    }
    if (message.byBot !== undefined && message.byBot !== 0) {
      obj.byBot = Math.round(message.byBot);
    }
    if (message.location !== undefined) {
      obj.location = Vector2.toJSON(message.location);
    }
    if (message.distance !== undefined && message.distance !== 0) {
      obj.distance = message.distance;
    }
    return obj;
  },
};

export const GameEvent_BotKickedBallTooFast = {
  fromJSON(object: any): GameEvent_BotKickedBallTooFast {
    return {
      byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : undefined,
      byBot: isSet(object.byBot) ? globalThis.Number(object.byBot) : undefined,
      location: isSet(object.location) ? Vector2.fromJSON(object.location) : undefined,
      initialBallSpeed: isSet(object.initialBallSpeed) ? globalThis.Number(object.initialBallSpeed) : undefined,
      chipped: isSet(object.chipped) ? globalThis.Boolean(object.chipped) : undefined,
    };
  },

  toJSON(message: GameEvent_BotKickedBallTooFast): unknown {
    const obj: any = {};
    if (message.byTeam !== undefined && message.byTeam !== Team.UNKNOWN) {
      obj.byTeam = teamToJSON(message.byTeam);
    }
    if (message.byBot !== undefined && message.byBot !== 0) {
      obj.byBot = Math.round(message.byBot);
    }
    if (message.location !== undefined) {
      obj.location = Vector2.toJSON(message.location);
    }
    if (message.initialBallSpeed !== undefined && message.initialBallSpeed !== 0) {
      obj.initialBallSpeed = message.initialBallSpeed;
    }
    if (message.chipped === true) {
      obj.chipped = message.chipped;
    }
    return obj;
  },
};

export const GameEvent_BotDribbledBallTooFar = {
  fromJSON(object: any): GameEvent_BotDribbledBallTooFar {
    return {
      byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : undefined,
      byBot: isSet(object.byBot) ? globalThis.Number(object.byBot) : undefined,
      start: isSet(object.start) ? Vector2.fromJSON(object.start) : undefined,
      end: isSet(object.end) ? Vector2.fromJSON(object.end) : undefined,
    };
  },

  toJSON(message: GameEvent_BotDribbledBallTooFar): unknown {
    const obj: any = {};
    if (message.byTeam !== undefined && message.byTeam !== Team.UNKNOWN) {
      obj.byTeam = teamToJSON(message.byTeam);
    }
    if (message.byBot !== undefined && message.byBot !== 0) {
      obj.byBot = Math.round(message.byBot);
    }
    if (message.start !== undefined) {
      obj.start = Vector2.toJSON(message.start);
    }
    if (message.end !== undefined) {
      obj.end = Vector2.toJSON(message.end);
    }
    return obj;
  },
};

export const GameEvent_AttackerTouchedOpponentInDefenseArea = {
  fromJSON(object: any): GameEvent_AttackerTouchedOpponentInDefenseArea {
    return {
      byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : undefined,
      byBot: isSet(object.byBot) ? globalThis.Number(object.byBot) : undefined,
      victim: isSet(object.victim) ? globalThis.Number(object.victim) : undefined,
      location: isSet(object.location) ? Vector2.fromJSON(object.location) : undefined,
    };
  },

  toJSON(message: GameEvent_AttackerTouchedOpponentInDefenseArea): unknown {
    const obj: any = {};
    if (message.byTeam !== undefined && message.byTeam !== Team.UNKNOWN) {
      obj.byTeam = teamToJSON(message.byTeam);
    }
    if (message.byBot !== undefined && message.byBot !== 0) {
      obj.byBot = Math.round(message.byBot);
    }
    if (message.victim !== undefined && message.victim !== 0) {
      obj.victim = Math.round(message.victim);
    }
    if (message.location !== undefined) {
      obj.location = Vector2.toJSON(message.location);
    }
    return obj;
  },
};

export const GameEvent_AttackerDoubleTouchedBall = {
  fromJSON(object: any): GameEvent_AttackerDoubleTouchedBall {
    return {
      byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : undefined,
      byBot: isSet(object.byBot) ? globalThis.Number(object.byBot) : undefined,
      location: isSet(object.location) ? Vector2.fromJSON(object.location) : undefined,
    };
  },

  toJSON(message: GameEvent_AttackerDoubleTouchedBall): unknown {
    const obj: any = {};
    if (message.byTeam !== undefined && message.byTeam !== Team.UNKNOWN) {
      obj.byTeam = teamToJSON(message.byTeam);
    }
    if (message.byBot !== undefined && message.byBot !== 0) {
      obj.byBot = Math.round(message.byBot);
    }
    if (message.location !== undefined) {
      obj.location = Vector2.toJSON(message.location);
    }
    return obj;
  },
};

export const GameEvent_AttackerTooCloseToDefenseArea = {
  fromJSON(object: any): GameEvent_AttackerTooCloseToDefenseArea {
    return {
      byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : undefined,
      byBot: isSet(object.byBot) ? globalThis.Number(object.byBot) : undefined,
      location: isSet(object.location) ? Vector2.fromJSON(object.location) : undefined,
      distance: isSet(object.distance) ? globalThis.Number(object.distance) : undefined,
      ballLocation: isSet(object.ballLocation) ? Vector2.fromJSON(object.ballLocation) : undefined,
    };
  },

  toJSON(message: GameEvent_AttackerTooCloseToDefenseArea): unknown {
    const obj: any = {};
    if (message.byTeam !== undefined && message.byTeam !== Team.UNKNOWN) {
      obj.byTeam = teamToJSON(message.byTeam);
    }
    if (message.byBot !== undefined && message.byBot !== 0) {
      obj.byBot = Math.round(message.byBot);
    }
    if (message.location !== undefined) {
      obj.location = Vector2.toJSON(message.location);
    }
    if (message.distance !== undefined && message.distance !== 0) {
      obj.distance = message.distance;
    }
    if (message.ballLocation !== undefined) {
      obj.ballLocation = Vector2.toJSON(message.ballLocation);
    }
    return obj;
  },
};

export const GameEvent_BotHeldBallDeliberately = {
  fromJSON(object: any): GameEvent_BotHeldBallDeliberately {
    return {
      byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : undefined,
      byBot: isSet(object.byBot) ? globalThis.Number(object.byBot) : undefined,
      location: isSet(object.location) ? Vector2.fromJSON(object.location) : undefined,
      duration: isSet(object.duration) ? globalThis.Number(object.duration) : undefined,
    };
  },

  toJSON(message: GameEvent_BotHeldBallDeliberately): unknown {
    const obj: any = {};
    if (message.byTeam !== undefined && message.byTeam !== Team.UNKNOWN) {
      obj.byTeam = teamToJSON(message.byTeam);
    }
    if (message.byBot !== undefined && message.byBot !== 0) {
      obj.byBot = Math.round(message.byBot);
    }
    if (message.location !== undefined) {
      obj.location = Vector2.toJSON(message.location);
    }
    if (message.duration !== undefined && message.duration !== 0) {
      obj.duration = message.duration;
    }
    return obj;
  },
};

export const GameEvent_BotInterferedPlacement = {
  fromJSON(object: any): GameEvent_BotInterferedPlacement {
    return {
      byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : undefined,
      byBot: isSet(object.byBot) ? globalThis.Number(object.byBot) : undefined,
      location: isSet(object.location) ? Vector2.fromJSON(object.location) : undefined,
    };
  },

  toJSON(message: GameEvent_BotInterferedPlacement): unknown {
    const obj: any = {};
    if (message.byTeam !== undefined && message.byTeam !== Team.UNKNOWN) {
      obj.byTeam = teamToJSON(message.byTeam);
    }
    if (message.byBot !== undefined && message.byBot !== 0) {
      obj.byBot = Math.round(message.byBot);
    }
    if (message.location !== undefined) {
      obj.location = Vector2.toJSON(message.location);
    }
    return obj;
  },
};

export const GameEvent_MultipleCards = {
  fromJSON(object: any): GameEvent_MultipleCards {
    return { byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : undefined };
  },

  toJSON(message: GameEvent_MultipleCards): unknown {
    const obj: any = {};
    if (message.byTeam !== undefined && message.byTeam !== Team.UNKNOWN) {
      obj.byTeam = teamToJSON(message.byTeam);
    }
    return obj;
  },
};

export const GameEvent_MultipleFouls = {
  fromJSON(object: any): GameEvent_MultipleFouls {
    return {
      byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : undefined,
      causedGameEvents: globalThis.Array.isArray(object?.causedGameEvents)
        ? object.causedGameEvents.map((e: any) => GameEvent.fromJSON(e))
        : undefined,
    };
  },

  toJSON(message: GameEvent_MultipleFouls): unknown {
    const obj: any = {};
    if (message.byTeam !== undefined && message.byTeam !== Team.UNKNOWN) {
      obj.byTeam = teamToJSON(message.byTeam);
    }
    if (message.causedGameEvents?.length) {
      obj.causedGameEvents = message.causedGameEvents.map((e) => GameEvent.toJSON(e));
    }
    return obj;
  },
};

export const GameEvent_MultiplePlacementFailures = {
  fromJSON(object: any): GameEvent_MultiplePlacementFailures {
    return { byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : undefined };
  },

  toJSON(message: GameEvent_MultiplePlacementFailures): unknown {
    const obj: any = {};
    if (message.byTeam !== undefined && message.byTeam !== Team.UNKNOWN) {
      obj.byTeam = teamToJSON(message.byTeam);
    }
    return obj;
  },
};

export const GameEvent_KickTimeout = {
  fromJSON(object: any): GameEvent_KickTimeout {
    return {
      byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : undefined,
      location: isSet(object.location) ? Vector2.fromJSON(object.location) : undefined,
      time: isSet(object.time) ? globalThis.Number(object.time) : undefined,
    };
  },

  toJSON(message: GameEvent_KickTimeout): unknown {
    const obj: any = {};
    if (message.byTeam !== undefined && message.byTeam !== Team.UNKNOWN) {
      obj.byTeam = teamToJSON(message.byTeam);
    }
    if (message.location !== undefined) {
      obj.location = Vector2.toJSON(message.location);
    }
    if (message.time !== undefined && message.time !== 0) {
      obj.time = message.time;
    }
    return obj;
  },
};

export const GameEvent_NoProgressInGame = {
  fromJSON(object: any): GameEvent_NoProgressInGame {
    return {
      location: isSet(object.location) ? Vector2.fromJSON(object.location) : undefined,
      time: isSet(object.time) ? globalThis.Number(object.time) : undefined,
    };
  },

  toJSON(message: GameEvent_NoProgressInGame): unknown {
    const obj: any = {};
    if (message.location !== undefined) {
      obj.location = Vector2.toJSON(message.location);
    }
    if (message.time !== undefined && message.time !== 0) {
      obj.time = message.time;
    }
    return obj;
  },
};

export const GameEvent_PlacementFailed = {
  fromJSON(object: any): GameEvent_PlacementFailed {
    return {
      byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : undefined,
      remainingDistance: isSet(object.remainingDistance) ? globalThis.Number(object.remainingDistance) : undefined,
    };
  },

  toJSON(message: GameEvent_PlacementFailed): unknown {
    const obj: any = {};
    if (message.byTeam !== undefined && message.byTeam !== Team.UNKNOWN) {
      obj.byTeam = teamToJSON(message.byTeam);
    }
    if (message.remainingDistance !== undefined && message.remainingDistance !== 0) {
      obj.remainingDistance = message.remainingDistance;
    }
    return obj;
  },
};

export const GameEvent_UnsportingBehaviorMinor = {
  fromJSON(object: any): GameEvent_UnsportingBehaviorMinor {
    return {
      byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : undefined,
      reason: isSet(object.reason) ? globalThis.String(object.reason) : undefined,
    };
  },

  toJSON(message: GameEvent_UnsportingBehaviorMinor): unknown {
    const obj: any = {};
    if (message.byTeam !== undefined && message.byTeam !== Team.UNKNOWN) {
      obj.byTeam = teamToJSON(message.byTeam);
    }
    if (message.reason !== undefined && message.reason !== "") {
      obj.reason = message.reason;
    }
    return obj;
  },
};

export const GameEvent_UnsportingBehaviorMajor = {
  fromJSON(object: any): GameEvent_UnsportingBehaviorMajor {
    return {
      byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : undefined,
      reason: isSet(object.reason) ? globalThis.String(object.reason) : undefined,
    };
  },

  toJSON(message: GameEvent_UnsportingBehaviorMajor): unknown {
    const obj: any = {};
    if (message.byTeam !== undefined && message.byTeam !== Team.UNKNOWN) {
      obj.byTeam = teamToJSON(message.byTeam);
    }
    if (message.reason !== undefined && message.reason !== "") {
      obj.reason = message.reason;
    }
    return obj;
  },
};

export const GameEvent_KeeperHeldBall = {
  fromJSON(object: any): GameEvent_KeeperHeldBall {
    return {
      byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : undefined,
      location: isSet(object.location) ? Vector2.fromJSON(object.location) : undefined,
      duration: isSet(object.duration) ? globalThis.Number(object.duration) : undefined,
    };
  },

  toJSON(message: GameEvent_KeeperHeldBall): unknown {
    const obj: any = {};
    if (message.byTeam !== undefined && message.byTeam !== Team.UNKNOWN) {
      obj.byTeam = teamToJSON(message.byTeam);
    }
    if (message.location !== undefined) {
      obj.location = Vector2.toJSON(message.location);
    }
    if (message.duration !== undefined && message.duration !== 0) {
      obj.duration = message.duration;
    }
    return obj;
  },
};

export const GameEvent_PlacementSucceeded = {
  fromJSON(object: any): GameEvent_PlacementSucceeded {
    return {
      byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : undefined,
      timeTaken: isSet(object.timeTaken) ? globalThis.Number(object.timeTaken) : undefined,
      precision: isSet(object.precision) ? globalThis.Number(object.precision) : undefined,
      distance: isSet(object.distance) ? globalThis.Number(object.distance) : undefined,
    };
  },

  toJSON(message: GameEvent_PlacementSucceeded): unknown {
    const obj: any = {};
    if (message.byTeam !== undefined && message.byTeam !== Team.UNKNOWN) {
      obj.byTeam = teamToJSON(message.byTeam);
    }
    if (message.timeTaken !== undefined && message.timeTaken !== 0) {
      obj.timeTaken = message.timeTaken;
    }
    if (message.precision !== undefined && message.precision !== 0) {
      obj.precision = message.precision;
    }
    if (message.distance !== undefined && message.distance !== 0) {
      obj.distance = message.distance;
    }
    return obj;
  },
};

export const GameEvent_Prepared = {
  fromJSON(object: any): GameEvent_Prepared {
    return { timeTaken: isSet(object.timeTaken) ? globalThis.Number(object.timeTaken) : undefined };
  },

  toJSON(message: GameEvent_Prepared): unknown {
    const obj: any = {};
    if (message.timeTaken !== undefined && message.timeTaken !== 0) {
      obj.timeTaken = message.timeTaken;
    }
    return obj;
  },
};

export const GameEvent_BotSubstitution = {
  fromJSON(object: any): GameEvent_BotSubstitution {
    return { byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : undefined };
  },

  toJSON(message: GameEvent_BotSubstitution): unknown {
    const obj: any = {};
    if (message.byTeam !== undefined && message.byTeam !== Team.UNKNOWN) {
      obj.byTeam = teamToJSON(message.byTeam);
    }
    return obj;
  },
};

export const GameEvent_ChallengeFlag = {
  fromJSON(object: any): GameEvent_ChallengeFlag {
    return { byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : undefined };
  },

  toJSON(message: GameEvent_ChallengeFlag): unknown {
    const obj: any = {};
    if (message.byTeam !== undefined && message.byTeam !== Team.UNKNOWN) {
      obj.byTeam = teamToJSON(message.byTeam);
    }
    return obj;
  },
};

export const GameEvent_ChallengeFlagHandled = {
  fromJSON(object: any): GameEvent_ChallengeFlagHandled {
    return {
      byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : undefined,
      accepted: isSet(object.accepted) ? globalThis.Boolean(object.accepted) : undefined,
    };
  },

  toJSON(message: GameEvent_ChallengeFlagHandled): unknown {
    const obj: any = {};
    if (message.byTeam !== undefined && message.byTeam !== Team.UNKNOWN) {
      obj.byTeam = teamToJSON(message.byTeam);
    }
    if (message.accepted === true) {
      obj.accepted = message.accepted;
    }
    return obj;
  },
};

export const GameEvent_EmergencyStop = {
  fromJSON(object: any): GameEvent_EmergencyStop {
    return { byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : undefined };
  },

  toJSON(message: GameEvent_EmergencyStop): unknown {
    const obj: any = {};
    if (message.byTeam !== undefined && message.byTeam !== Team.UNKNOWN) {
      obj.byTeam = teamToJSON(message.byTeam);
    }
    return obj;
  },
};

export const GameEvent_TooManyRobots = {
  fromJSON(object: any): GameEvent_TooManyRobots {
    return {
      byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : undefined,
      numRobotsAllowed: isSet(object.numRobotsAllowed) ? globalThis.Number(object.numRobotsAllowed) : undefined,
      numRobotsOnField: isSet(object.numRobotsOnField) ? globalThis.Number(object.numRobotsOnField) : undefined,
      ballLocation: isSet(object.ballLocation) ? Vector2.fromJSON(object.ballLocation) : undefined,
    };
  },

  toJSON(message: GameEvent_TooManyRobots): unknown {
    const obj: any = {};
    if (message.byTeam !== undefined && message.byTeam !== Team.UNKNOWN) {
      obj.byTeam = teamToJSON(message.byTeam);
    }
    if (message.numRobotsAllowed !== undefined && message.numRobotsAllowed !== 0) {
      obj.numRobotsAllowed = Math.round(message.numRobotsAllowed);
    }
    if (message.numRobotsOnField !== undefined && message.numRobotsOnField !== 0) {
      obj.numRobotsOnField = Math.round(message.numRobotsOnField);
    }
    if (message.ballLocation !== undefined) {
      obj.ballLocation = Vector2.toJSON(message.ballLocation);
    }
    return obj;
  },
};

export const GameEvent_BoundaryCrossing = {
  fromJSON(object: any): GameEvent_BoundaryCrossing {
    return {
      byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : undefined,
      location: isSet(object.location) ? Vector2.fromJSON(object.location) : undefined,
    };
  },

  toJSON(message: GameEvent_BoundaryCrossing): unknown {
    const obj: any = {};
    if (message.byTeam !== undefined && message.byTeam !== Team.UNKNOWN) {
      obj.byTeam = teamToJSON(message.byTeam);
    }
    if (message.location !== undefined) {
      obj.location = Vector2.toJSON(message.location);
    }
    return obj;
  },
};

export const GameEvent_PenaltyKickFailed = {
  fromJSON(object: any): GameEvent_PenaltyKickFailed {
    return {
      byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : undefined,
      location: isSet(object.location) ? Vector2.fromJSON(object.location) : undefined,
      reason: isSet(object.reason) ? globalThis.String(object.reason) : undefined,
    };
  },

  toJSON(message: GameEvent_PenaltyKickFailed): unknown {
    const obj: any = {};
    if (message.byTeam !== undefined && message.byTeam !== Team.UNKNOWN) {
      obj.byTeam = teamToJSON(message.byTeam);
    }
    if (message.location !== undefined) {
      obj.location = Vector2.toJSON(message.location);
    }
    if (message.reason !== undefined && message.reason !== "") {
      obj.reason = message.reason;
    }
    return obj;
  },
};

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
