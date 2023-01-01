/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Team, teamFromJSON, teamToJSON } from "./ssl_gc_common";
import { Vector2 } from "./ssl_gc_geometry";

export const protobufPackage = "";

/**
 * GameEvent contains exactly one game event
 * Each game event has optional and required fields. The required fields are mandatory to process the event.
 * Some optional fields are only used for visualization, others are required to determine the ball placement position.
 * If fields are missing that are required for the ball placement position, no ball placement command will be issued.
 * Fields are marked optional to make testing and extending of the protocol easier.
 * An autoRef should ideally set all fields, except if there are good reasons to not do so.
 */
export interface GameEvent {
  type: GameEvent_Type;
  /**
   * The origins of this game event.
   * Empty, if it originates from game controller.
   * Contains autoRef name(s), if it originates from one or more autoRefs.
   * Ignored if sent by autoRef to game controller.
   */
  origin: string[];
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
    | { $case: "multiplePlacementFailures"; multiplePlacementFailures: GameEvent_MultiplePlacementFailures };
}

export enum GameEvent_Type {
  UNKNOWN_GAME_EVENT_TYPE = 0,
  /** BALL_LEFT_FIELD_TOUCH_LINE - triggered by autoRef */
  BALL_LEFT_FIELD_TOUCH_LINE = 6,
  /** BALL_LEFT_FIELD_GOAL_LINE - triggered by autoRef */
  BALL_LEFT_FIELD_GOAL_LINE = 7,
  /** AIMLESS_KICK - triggered by autoRef */
  AIMLESS_KICK = 11,
  /** ATTACKER_TOO_CLOSE_TO_DEFENSE_AREA - triggered by autoRef */
  ATTACKER_TOO_CLOSE_TO_DEFENSE_AREA = 19,
  /** DEFENDER_IN_DEFENSE_AREA - triggered by autoRef */
  DEFENDER_IN_DEFENSE_AREA = 31,
  /** BOUNDARY_CROSSING - triggered by autoRef */
  BOUNDARY_CROSSING = 41,
  /** KEEPER_HELD_BALL - triggered by GC */
  KEEPER_HELD_BALL = 13,
  /** BOT_DRIBBLED_BALL_TOO_FAR - triggered by autoRef */
  BOT_DRIBBLED_BALL_TOO_FAR = 17,
  /** BOT_PUSHED_BOT - triggered by human ref */
  BOT_PUSHED_BOT = 24,
  /** BOT_HELD_BALL_DELIBERATELY - triggered by human ref */
  BOT_HELD_BALL_DELIBERATELY = 26,
  /** BOT_TIPPED_OVER - triggered by human ref */
  BOT_TIPPED_OVER = 27,
  /** ATTACKER_TOUCHED_BALL_IN_DEFENSE_AREA - triggered by autoRef */
  ATTACKER_TOUCHED_BALL_IN_DEFENSE_AREA = 15,
  /** BOT_KICKED_BALL_TOO_FAST - triggered by autoRef */
  BOT_KICKED_BALL_TOO_FAST = 18,
  /** BOT_CRASH_UNIQUE - triggered by autoRef */
  BOT_CRASH_UNIQUE = 22,
  /** BOT_CRASH_DRAWN - triggered by autoRef */
  BOT_CRASH_DRAWN = 21,
  /** DEFENDER_TOO_CLOSE_TO_KICK_POINT - triggered by autoRef */
  DEFENDER_TOO_CLOSE_TO_KICK_POINT = 29,
  /** BOT_TOO_FAST_IN_STOP - triggered by autoRef */
  BOT_TOO_FAST_IN_STOP = 28,
  /** BOT_INTERFERED_PLACEMENT - triggered by autoRef */
  BOT_INTERFERED_PLACEMENT = 20,
  /** POSSIBLE_GOAL - triggered by autoRef */
  POSSIBLE_GOAL = 39,
  /** GOAL - triggered by GC */
  GOAL = 8,
  /** INVALID_GOAL - triggered by GC */
  INVALID_GOAL = 42,
  /** ATTACKER_DOUBLE_TOUCHED_BALL - triggered by autoRef */
  ATTACKER_DOUBLE_TOUCHED_BALL = 14,
  /** PLACEMENT_SUCCEEDED - triggered by autoRef */
  PLACEMENT_SUCCEEDED = 5,
  /** PENALTY_KICK_FAILED - triggered by GC and autoRef */
  PENALTY_KICK_FAILED = 43,
  /** NO_PROGRESS_IN_GAME - triggered by GC */
  NO_PROGRESS_IN_GAME = 2,
  /** PLACEMENT_FAILED - triggered by GC */
  PLACEMENT_FAILED = 3,
  /** MULTIPLE_CARDS - triggered by GC */
  MULTIPLE_CARDS = 32,
  /** MULTIPLE_FOULS - triggered by GC */
  MULTIPLE_FOULS = 34,
  /** BOT_SUBSTITUTION - triggered by GC */
  BOT_SUBSTITUTION = 37,
  /** TOO_MANY_ROBOTS - triggered by GC */
  TOO_MANY_ROBOTS = 38,
  /** CHALLENGE_FLAG - triggered by GC */
  CHALLENGE_FLAG = 44,
  /** EMERGENCY_STOP - triggered by GC */
  EMERGENCY_STOP = 45,
  /** UNSPORTING_BEHAVIOR_MINOR - triggered by human ref */
  UNSPORTING_BEHAVIOR_MINOR = 35,
  /** UNSPORTING_BEHAVIOR_MAJOR - triggered by human ref */
  UNSPORTING_BEHAVIOR_MAJOR = 36,
  /** @deprecated */
  PREPARED = 1,
  /** @deprecated */
  INDIRECT_GOAL = 9,
  /** @deprecated */
  CHIPPED_GOAL = 10,
  /** @deprecated */
  KICK_TIMEOUT = 12,
  /** @deprecated */
  ATTACKER_TOUCHED_OPPONENT_IN_DEFENSE_AREA = 16,
  /** @deprecated */
  ATTACKER_TOUCHED_OPPONENT_IN_DEFENSE_AREA_SKIPPED = 40,
  /** @deprecated */
  BOT_CRASH_UNIQUE_SKIPPED = 23,
  /** @deprecated */
  BOT_PUSHED_BOT_SKIPPED = 25,
  /** @deprecated */
  DEFENDER_IN_DEFENSE_AREA_PARTIALLY = 30,
  /** @deprecated */
  MULTIPLE_PLACEMENT_FAILURES = 33,
  UNRECOGNIZED = -1,
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
  byTeam: Team;
  /** the bot that last touched the ball */
  byBot: number;
  /** the location where the ball left the field [m] */
  location?: Vector2;
}

/** the ball left the field via goal line and a team committed an aimless kick */
export interface GameEvent_AimlessKick {
  /** the team that last touched the ball */
  byTeam: Team;
  /** the bot that last touched the ball */
  byBot: number;
  /** the location where the ball left the field [m] */
  location?: Vector2;
  /** the location where the ball was last touched [m] */
  kickLocation?: Vector2;
}

/** a team shot a goal */
export interface GameEvent_Goal {
  /** the team that scored the goal */
  byTeam: Team;
  /** the team that shot the goal (different from by_team for own goals) */
  kickingTeam: Team;
  /** the bot that shot the goal */
  kickingBot: number;
  /** the location where the ball entered the goal [m] */
  location?: Vector2;
  /** the location where the ball was kicked (for deciding if this was a valid goal) [m] */
  kickLocation?: Vector2;
  /** the maximum height the ball reached during the goal kick (for deciding if this was a valid goal) [m] */
  maxBallHeight: number;
  /** number of robots of scoring team when the ball entered the goal (for deciding if this was a valid goal) */
  numRobotsByTeam: number;
  /** The UNIX timestamp [μs] when the scoring team last touched the ball */
  lastTouchByTeam: number;
  /** An additional message with e.g. a reason for invalid goals */
  message: string;
}

/** the ball entered the goal directly during an indirect free kick */
export interface GameEvent_IndirectGoal {
  /** the team that tried to shoot the goal */
  byTeam: Team;
  /** the bot that kicked the ball - at least the team must be set */
  byBot: number;
  /** the location where the ball entered the goal [m] */
  location?: Vector2;
  /** the location where the ball was kicked [m] */
  kickLocation?: Vector2;
}

/** the ball entered the goal, but was initially chipped */
export interface GameEvent_ChippedGoal {
  /** the team that tried to shoot the goal */
  byTeam: Team;
  /** the bot that kicked the ball */
  byBot: number;
  /** the location where the ball entered the goal [m] */
  location?: Vector2;
  /** the location where the ball was kicked [m] */
  kickLocation?: Vector2;
  /** the maximum height [m] of the ball, before it entered the goal and since the last kick [m] */
  maxBallHeight: number;
}

/** a bot moved too fast while the game was stopped */
export interface GameEvent_BotTooFastInStop {
  /** the team that found guilty */
  byTeam: Team;
  /** the bot that was too fast */
  byBot: number;
  /** the location of the bot [m] */
  location?: Vector2;
  /** the bot speed [m/s] */
  speed: number;
}

/** a bot of the defending team got too close to the kick point during a free kick */
export interface GameEvent_DefenderTooCloseToKickPoint {
  /** the team that was found guilty */
  byTeam: Team;
  /** the bot that violates the distance to the kick point */
  byBot: number;
  /** the location of the bot [m] */
  location?: Vector2;
  /** the distance [m] from bot to the kick point (including the minimum radius) */
  distance: number;
}

/** two robots crashed into each other with similar speeds */
export interface GameEvent_BotCrashDrawn {
  /** the bot of the yellow team */
  botYellow: number;
  /** the bot of the blue team */
  botBlue: number;
  /** the location of the crash (center between both bots) [m] */
  location?: Vector2;
  /** the calculated crash speed [m/s] of the two bots */
  crashSpeed: number;
  /** the difference [m/s] of the velocity of the two bots */
  speedDiff: number;
  /**
   * the angle [rad] in the range [0, π] of the bot velocity vectors
   * an angle of 0 rad (  0°) means, the bots barely touched each other
   * an angle of π rad (180°) means, the bots crashed frontal into each other
   */
  crashAngle: number;
}

/** two robots crashed into each other and one team was found guilty to due significant speed difference */
export interface GameEvent_BotCrashUnique {
  /** the team that caused the crash */
  byTeam: Team;
  /** the bot that caused the crash */
  violator: number;
  /** the bot of the opposite team that was involved in the crash */
  victim: number;
  /** the location of the crash (center between both bots) [m] */
  location?: Vector2;
  /** the calculated crash speed vector [m/s] of the two bots */
  crashSpeed: number;
  /** the difference [m/s] of the velocity of the two bots */
  speedDiff: number;
  /**
   * the angle [rad] in the range [0, π] of the bot velocity vectors
   * an angle of 0 rad (  0°) means, the bots barely touched each other
   * an angle of π rad (180°) means, the bots crashed frontal into each other
   */
  crashAngle: number;
}

/** a bot pushed another bot over a significant distance */
export interface GameEvent_BotPushedBot {
  /** the team that pushed the other team */
  byTeam: Team;
  /** the bot that pushed the other bot */
  violator: number;
  /** the bot of the opposite team that was pushed */
  victim: number;
  /** the location of the push (center between both bots) [m] */
  location?: Vector2;
  /** the pushed distance [m] */
  pushedDistance: number;
}

/** a bot tipped over */
export interface GameEvent_BotTippedOver {
  /** the team that found guilty */
  byTeam: Team;
  /** the bot that tipped over */
  byBot: number;
  /** the location of the bot [m] */
  location?: Vector2;
  /** the location of the ball at the moment when this foul occurred [m] */
  ballLocation?: Vector2;
}

/** a defender other than the keeper was fully located inside its own defense and touched the ball */
export interface GameEvent_DefenderInDefenseArea {
  /** the team that found guilty */
  byTeam: Team;
  /** the bot that is inside the penalty area */
  byBot: number;
  /** the location of the bot [m] */
  location?: Vector2;
  /** the distance [m] from bot case to the nearest point outside the defense area */
  distance: number;
}

/** a defender other than the keeper was partially located inside its own defense area and touched the ball */
export interface GameEvent_DefenderInDefenseAreaPartially {
  /** the team that found guilty */
  byTeam: Team;
  /** the bot that is partially inside the penalty area */
  byBot: number;
  /** the location of the bot */
  location?: Vector2;
  /** the distance [m] that the bot is inside the penalty area */
  distance: number;
  /** the location of the ball at the moment when this foul occurred [m] */
  ballLocation?: Vector2;
}

/** an attacker touched the ball inside the opponent defense area */
export interface GameEvent_AttackerTouchedBallInDefenseArea {
  /** the team that found guilty */
  byTeam: Team;
  /** the bot that is inside the penalty area */
  byBot: number;
  /** the location of the bot [m] */
  location?: Vector2;
  /** the distance [m] that the bot is inside the penalty area */
  distance: number;
}

/** a bot kicked the ball too fast */
export interface GameEvent_BotKickedBallTooFast {
  /** the team that found guilty */
  byTeam: Team;
  /** the bot that kicked too fast */
  byBot: number;
  /** the location of the ball at the time of the highest speed [m] */
  location?: Vector2;
  /** the absolute initial ball speed (kick speed) [m/s] */
  initialBallSpeed: number;
  /** was the ball chipped? */
  chipped: boolean;
}

/** a bot dribbled to ball too far */
export interface GameEvent_BotDribbledBallTooFar {
  /** the team that found guilty */
  byTeam: Team;
  /** the bot that dribbled too far */
  byBot: number;
  /** the location where the dribbling started [m] */
  start?: Vector2;
  /** the location where the maximum dribbling distance was reached [m] */
  end?: Vector2;
}

/** an attacker touched the opponent robot inside defense area */
export interface GameEvent_AttackerTouchedOpponentInDefenseArea {
  /** the team that found guilty */
  byTeam: Team;
  /** the bot that touched the opponent robot */
  byBot: number;
  /** the bot of the opposite team that was touched */
  victim: number;
  /** the location of the contact point between both bots [m] */
  location?: Vector2;
}

/** an attacker touched the ball multiple times when it was not allowed to */
export interface GameEvent_AttackerDoubleTouchedBall {
  /** the team that found guilty */
  byTeam: Team;
  /** the bot that touched the ball twice */
  byBot: number;
  /** the location of the ball when it was first touched [m] */
  location?: Vector2;
}

/** an attacker was located too near to the opponent defense area during stop or free kick */
export interface GameEvent_AttackerTooCloseToDefenseArea {
  /** the team that found guilty */
  byTeam: Team;
  /** the bot that is too close to the defense area */
  byBot: number;
  /** the location of the bot [m] */
  location?: Vector2;
  /** the distance [m] of the bot to the penalty area */
  distance: number;
  /** the location of the ball at the moment when this foul occurred [m] */
  ballLocation?: Vector2;
}

/** a bot held the ball for too long */
export interface GameEvent_BotHeldBallDeliberately {
  /** the team that found guilty */
  byTeam: Team;
  /** the bot that holds the ball */
  byBot: number;
  /** the location of the ball [m] */
  location?: Vector2;
  /** the duration [s] that the bot hold the ball */
  duration: number;
}

/** a bot interfered the ball placement of the other team */
export interface GameEvent_BotInterferedPlacement {
  /** the team that found guilty */
  byTeam: Team;
  /** the bot that interfered the placement */
  byBot: number;
  /** the location of the bot [m] */
  location?: Vector2;
}

/** a team collected multiple cards (yellow and red), which results in a penalty kick */
export interface GameEvent_MultipleCards {
  /** the team that received multiple yellow cards */
  byTeam: Team;
}

/** a team collected multiple fouls, which results in a yellow card */
export interface GameEvent_MultipleFouls {
  /** the team that collected multiple fouls */
  byTeam: Team;
  /** the list of game events that caused the multiple fouls */
  causedGameEvents: GameEvent[];
}

/** a team failed to place the ball multiple times in a row */
export interface GameEvent_MultiplePlacementFailures {
  /** the team that failed multiple times */
  byTeam: Team;
}

/** timeout waiting for the attacking team to perform the free kick */
export interface GameEvent_KickTimeout {
  /** the team that that should have kicked */
  byTeam: Team;
  /** the location of the ball [m] */
  location?: Vector2;
  /** the time [s] that was waited */
  time: number;
}

/** game was stuck */
export interface GameEvent_NoProgressInGame {
  /** the location of the ball */
  location?: Vector2;
  /** the time [s] that was waited */
  time: number;
}

/** ball placement failed */
export interface GameEvent_PlacementFailed {
  /** the team that failed */
  byTeam: Team;
  /** the remaining distance [m] from ball to placement position */
  remainingDistance: number;
}

/** a team was found guilty for minor unsporting behavior */
export interface GameEvent_UnsportingBehaviorMinor {
  /** the team that found guilty */
  byTeam: Team;
  /** an explanation of the situation and decision */
  reason: string;
}

/** a team was found guilty for major unsporting behavior */
export interface GameEvent_UnsportingBehaviorMajor {
  /** the team that found guilty */
  byTeam: Team;
  /** an explanation of the situation and decision */
  reason: string;
}

/** a keeper held the ball in its defense area for too long */
export interface GameEvent_KeeperHeldBall {
  /** the team that found guilty */
  byTeam: Team;
  /** the location of the ball [m] */
  location?: Vector2;
  /** the duration [s] that the keeper hold the ball */
  duration: number;
}

/** a team successfully placed the ball */
export interface GameEvent_PlacementSucceeded {
  /** the team that did the placement */
  byTeam: Team;
  /** the time [s] taken for placing the ball */
  timeTaken: number;
  /** the distance [m] between placement location and actual ball position */
  precision: number;
  /** the distance [m] between the initial ball location and the placement position */
  distance: number;
}

/** both teams are prepared - all conditions are met to continue (with kickoff or penalty kick) */
export interface GameEvent_Prepared {
  /** the time [s] taken for preparing */
  timeTaken: number;
}

/** bots are being substituted by a team */
export interface GameEvent_BotSubstitution {
  /** the team that substitutes robots */
  byTeam: Team;
}

/** A challenge flag, requested by a team previously, is flagged */
export interface GameEvent_ChallengeFlag {
  /** the team that requested the challenge flag */
  byTeam: Team;
}

/** An emergency stop, requested by team previously, occurred */
export interface GameEvent_EmergencyStop {
  /** the team that substitutes robots */
  byTeam: Team;
}

/** a team has too many robots on the field */
export interface GameEvent_TooManyRobots {
  /** the team that has too many robots */
  byTeam: Team;
  /** number of robots allowed at the moment */
  numRobotsAllowed: number;
  /** number of robots currently on the field */
  numRobotsOnField: number;
  /** the location of the ball at the moment when this foul occurred [m] */
  ballLocation?: Vector2;
}

/** a robot chipped the ball over the field boundary out of the playing surface */
export interface GameEvent_BoundaryCrossing {
  /** the team that has too many robots */
  byTeam: Team;
  /** the location of the ball [m] */
  location?: Vector2;
}

/** the penalty kick failed (by time or by keeper) */
export interface GameEvent_PenaltyKickFailed {
  /** the team that last touched the ball */
  byTeam: Team;
  /** the location of the ball at the moment of this event [m] */
  location?: Vector2;
  /** an explanation of the failure */
  reason: string;
}

function createBaseGameEvent(): GameEvent {
  return { type: 0, origin: [], event: undefined };
}

export const GameEvent = {
  encode(message: GameEvent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(320).int32(message.type);
    }
    for (const v of message.origin) {
      writer.uint32(330).string(v!);
    }
    if (message.event?.$case === "ballLeftFieldTouchLine") {
      GameEvent_BallLeftField.encode(message.event.ballLeftFieldTouchLine, writer.uint32(50).fork()).ldelim();
    }
    if (message.event?.$case === "ballLeftFieldGoalLine") {
      GameEvent_BallLeftField.encode(message.event.ballLeftFieldGoalLine, writer.uint32(58).fork()).ldelim();
    }
    if (message.event?.$case === "aimlessKick") {
      GameEvent_AimlessKick.encode(message.event.aimlessKick, writer.uint32(90).fork()).ldelim();
    }
    if (message.event?.$case === "attackerTooCloseToDefenseArea") {
      GameEvent_AttackerTooCloseToDefenseArea.encode(
        message.event.attackerTooCloseToDefenseArea,
        writer.uint32(154).fork(),
      ).ldelim();
    }
    if (message.event?.$case === "defenderInDefenseArea") {
      GameEvent_DefenderInDefenseArea.encode(message.event.defenderInDefenseArea, writer.uint32(250).fork()).ldelim();
    }
    if (message.event?.$case === "boundaryCrossing") {
      GameEvent_BoundaryCrossing.encode(message.event.boundaryCrossing, writer.uint32(346).fork()).ldelim();
    }
    if (message.event?.$case === "keeperHeldBall") {
      GameEvent_KeeperHeldBall.encode(message.event.keeperHeldBall, writer.uint32(106).fork()).ldelim();
    }
    if (message.event?.$case === "botDribbledBallTooFar") {
      GameEvent_BotDribbledBallTooFar.encode(message.event.botDribbledBallTooFar, writer.uint32(138).fork()).ldelim();
    }
    if (message.event?.$case === "botPushedBot") {
      GameEvent_BotPushedBot.encode(message.event.botPushedBot, writer.uint32(194).fork()).ldelim();
    }
    if (message.event?.$case === "botHeldBallDeliberately") {
      GameEvent_BotHeldBallDeliberately.encode(message.event.botHeldBallDeliberately, writer.uint32(210).fork())
        .ldelim();
    }
    if (message.event?.$case === "botTippedOver") {
      GameEvent_BotTippedOver.encode(message.event.botTippedOver, writer.uint32(218).fork()).ldelim();
    }
    if (message.event?.$case === "attackerTouchedBallInDefenseArea") {
      GameEvent_AttackerTouchedBallInDefenseArea.encode(
        message.event.attackerTouchedBallInDefenseArea,
        writer.uint32(122).fork(),
      ).ldelim();
    }
    if (message.event?.$case === "botKickedBallTooFast") {
      GameEvent_BotKickedBallTooFast.encode(message.event.botKickedBallTooFast, writer.uint32(146).fork()).ldelim();
    }
    if (message.event?.$case === "botCrashUnique") {
      GameEvent_BotCrashUnique.encode(message.event.botCrashUnique, writer.uint32(178).fork()).ldelim();
    }
    if (message.event?.$case === "botCrashDrawn") {
      GameEvent_BotCrashDrawn.encode(message.event.botCrashDrawn, writer.uint32(170).fork()).ldelim();
    }
    if (message.event?.$case === "defenderTooCloseToKickPoint") {
      GameEvent_DefenderTooCloseToKickPoint.encode(message.event.defenderTooCloseToKickPoint, writer.uint32(234).fork())
        .ldelim();
    }
    if (message.event?.$case === "botTooFastInStop") {
      GameEvent_BotTooFastInStop.encode(message.event.botTooFastInStop, writer.uint32(226).fork()).ldelim();
    }
    if (message.event?.$case === "botInterferedPlacement") {
      GameEvent_BotInterferedPlacement.encode(message.event.botInterferedPlacement, writer.uint32(162).fork()).ldelim();
    }
    if (message.event?.$case === "possibleGoal") {
      GameEvent_Goal.encode(message.event.possibleGoal, writer.uint32(314).fork()).ldelim();
    }
    if (message.event?.$case === "goal") {
      GameEvent_Goal.encode(message.event.goal, writer.uint32(66).fork()).ldelim();
    }
    if (message.event?.$case === "invalidGoal") {
      GameEvent_Goal.encode(message.event.invalidGoal, writer.uint32(354).fork()).ldelim();
    }
    if (message.event?.$case === "attackerDoubleTouchedBall") {
      GameEvent_AttackerDoubleTouchedBall.encode(message.event.attackerDoubleTouchedBall, writer.uint32(114).fork())
        .ldelim();
    }
    if (message.event?.$case === "placementSucceeded") {
      GameEvent_PlacementSucceeded.encode(message.event.placementSucceeded, writer.uint32(42).fork()).ldelim();
    }
    if (message.event?.$case === "penaltyKickFailed") {
      GameEvent_PenaltyKickFailed.encode(message.event.penaltyKickFailed, writer.uint32(362).fork()).ldelim();
    }
    if (message.event?.$case === "noProgressInGame") {
      GameEvent_NoProgressInGame.encode(message.event.noProgressInGame, writer.uint32(18).fork()).ldelim();
    }
    if (message.event?.$case === "placementFailed") {
      GameEvent_PlacementFailed.encode(message.event.placementFailed, writer.uint32(26).fork()).ldelim();
    }
    if (message.event?.$case === "multipleCards") {
      GameEvent_MultipleCards.encode(message.event.multipleCards, writer.uint32(258).fork()).ldelim();
    }
    if (message.event?.$case === "multipleFouls") {
      GameEvent_MultipleFouls.encode(message.event.multipleFouls, writer.uint32(274).fork()).ldelim();
    }
    if (message.event?.$case === "botSubstitution") {
      GameEvent_BotSubstitution.encode(message.event.botSubstitution, writer.uint32(298).fork()).ldelim();
    }
    if (message.event?.$case === "tooManyRobots") {
      GameEvent_TooManyRobots.encode(message.event.tooManyRobots, writer.uint32(306).fork()).ldelim();
    }
    if (message.event?.$case === "challengeFlag") {
      GameEvent_ChallengeFlag.encode(message.event.challengeFlag, writer.uint32(370).fork()).ldelim();
    }
    if (message.event?.$case === "emergencyStop") {
      GameEvent_EmergencyStop.encode(message.event.emergencyStop, writer.uint32(378).fork()).ldelim();
    }
    if (message.event?.$case === "unsportingBehaviorMinor") {
      GameEvent_UnsportingBehaviorMinor.encode(message.event.unsportingBehaviorMinor, writer.uint32(282).fork())
        .ldelim();
    }
    if (message.event?.$case === "unsportingBehaviorMajor") {
      GameEvent_UnsportingBehaviorMajor.encode(message.event.unsportingBehaviorMajor, writer.uint32(290).fork())
        .ldelim();
    }
    if (message.event?.$case === "prepared") {
      GameEvent_Prepared.encode(message.event.prepared, writer.uint32(10).fork()).ldelim();
    }
    if (message.event?.$case === "indirectGoal") {
      GameEvent_IndirectGoal.encode(message.event.indirectGoal, writer.uint32(74).fork()).ldelim();
    }
    if (message.event?.$case === "chippedGoal") {
      GameEvent_ChippedGoal.encode(message.event.chippedGoal, writer.uint32(82).fork()).ldelim();
    }
    if (message.event?.$case === "kickTimeout") {
      GameEvent_KickTimeout.encode(message.event.kickTimeout, writer.uint32(98).fork()).ldelim();
    }
    if (message.event?.$case === "attackerTouchedOpponentInDefenseArea") {
      GameEvent_AttackerTouchedOpponentInDefenseArea.encode(
        message.event.attackerTouchedOpponentInDefenseArea,
        writer.uint32(130).fork(),
      ).ldelim();
    }
    if (message.event?.$case === "attackerTouchedOpponentInDefenseAreaSkipped") {
      GameEvent_AttackerTouchedOpponentInDefenseArea.encode(
        message.event.attackerTouchedOpponentInDefenseAreaSkipped,
        writer.uint32(338).fork(),
      ).ldelim();
    }
    if (message.event?.$case === "botCrashUniqueSkipped") {
      GameEvent_BotCrashUnique.encode(message.event.botCrashUniqueSkipped, writer.uint32(186).fork()).ldelim();
    }
    if (message.event?.$case === "botPushedBotSkipped") {
      GameEvent_BotPushedBot.encode(message.event.botPushedBotSkipped, writer.uint32(202).fork()).ldelim();
    }
    if (message.event?.$case === "defenderInDefenseAreaPartially") {
      GameEvent_DefenderInDefenseAreaPartially.encode(
        message.event.defenderInDefenseAreaPartially,
        writer.uint32(242).fork(),
      ).ldelim();
    }
    if (message.event?.$case === "multiplePlacementFailures") {
      GameEvent_MultiplePlacementFailures.encode(message.event.multiplePlacementFailures, writer.uint32(266).fork())
        .ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GameEvent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGameEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 40:
          message.type = reader.int32() as any;
          break;
        case 41:
          message.origin.push(reader.string());
          break;
        case 6:
          message.event = {
            $case: "ballLeftFieldTouchLine",
            ballLeftFieldTouchLine: GameEvent_BallLeftField.decode(reader, reader.uint32()),
          };
          break;
        case 7:
          message.event = {
            $case: "ballLeftFieldGoalLine",
            ballLeftFieldGoalLine: GameEvent_BallLeftField.decode(reader, reader.uint32()),
          };
          break;
        case 11:
          message.event = { $case: "aimlessKick", aimlessKick: GameEvent_AimlessKick.decode(reader, reader.uint32()) };
          break;
        case 19:
          message.event = {
            $case: "attackerTooCloseToDefenseArea",
            attackerTooCloseToDefenseArea: GameEvent_AttackerTooCloseToDefenseArea.decode(reader, reader.uint32()),
          };
          break;
        case 31:
          message.event = {
            $case: "defenderInDefenseArea",
            defenderInDefenseArea: GameEvent_DefenderInDefenseArea.decode(reader, reader.uint32()),
          };
          break;
        case 43:
          message.event = {
            $case: "boundaryCrossing",
            boundaryCrossing: GameEvent_BoundaryCrossing.decode(reader, reader.uint32()),
          };
          break;
        case 13:
          message.event = {
            $case: "keeperHeldBall",
            keeperHeldBall: GameEvent_KeeperHeldBall.decode(reader, reader.uint32()),
          };
          break;
        case 17:
          message.event = {
            $case: "botDribbledBallTooFar",
            botDribbledBallTooFar: GameEvent_BotDribbledBallTooFar.decode(reader, reader.uint32()),
          };
          break;
        case 24:
          message.event = {
            $case: "botPushedBot",
            botPushedBot: GameEvent_BotPushedBot.decode(reader, reader.uint32()),
          };
          break;
        case 26:
          message.event = {
            $case: "botHeldBallDeliberately",
            botHeldBallDeliberately: GameEvent_BotHeldBallDeliberately.decode(reader, reader.uint32()),
          };
          break;
        case 27:
          message.event = {
            $case: "botTippedOver",
            botTippedOver: GameEvent_BotTippedOver.decode(reader, reader.uint32()),
          };
          break;
        case 15:
          message.event = {
            $case: "attackerTouchedBallInDefenseArea",
            attackerTouchedBallInDefenseArea: GameEvent_AttackerTouchedBallInDefenseArea.decode(
              reader,
              reader.uint32(),
            ),
          };
          break;
        case 18:
          message.event = {
            $case: "botKickedBallTooFast",
            botKickedBallTooFast: GameEvent_BotKickedBallTooFast.decode(reader, reader.uint32()),
          };
          break;
        case 22:
          message.event = {
            $case: "botCrashUnique",
            botCrashUnique: GameEvent_BotCrashUnique.decode(reader, reader.uint32()),
          };
          break;
        case 21:
          message.event = {
            $case: "botCrashDrawn",
            botCrashDrawn: GameEvent_BotCrashDrawn.decode(reader, reader.uint32()),
          };
          break;
        case 29:
          message.event = {
            $case: "defenderTooCloseToKickPoint",
            defenderTooCloseToKickPoint: GameEvent_DefenderTooCloseToKickPoint.decode(reader, reader.uint32()),
          };
          break;
        case 28:
          message.event = {
            $case: "botTooFastInStop",
            botTooFastInStop: GameEvent_BotTooFastInStop.decode(reader, reader.uint32()),
          };
          break;
        case 20:
          message.event = {
            $case: "botInterferedPlacement",
            botInterferedPlacement: GameEvent_BotInterferedPlacement.decode(reader, reader.uint32()),
          };
          break;
        case 39:
          message.event = { $case: "possibleGoal", possibleGoal: GameEvent_Goal.decode(reader, reader.uint32()) };
          break;
        case 8:
          message.event = { $case: "goal", goal: GameEvent_Goal.decode(reader, reader.uint32()) };
          break;
        case 44:
          message.event = { $case: "invalidGoal", invalidGoal: GameEvent_Goal.decode(reader, reader.uint32()) };
          break;
        case 14:
          message.event = {
            $case: "attackerDoubleTouchedBall",
            attackerDoubleTouchedBall: GameEvent_AttackerDoubleTouchedBall.decode(reader, reader.uint32()),
          };
          break;
        case 5:
          message.event = {
            $case: "placementSucceeded",
            placementSucceeded: GameEvent_PlacementSucceeded.decode(reader, reader.uint32()),
          };
          break;
        case 45:
          message.event = {
            $case: "penaltyKickFailed",
            penaltyKickFailed: GameEvent_PenaltyKickFailed.decode(reader, reader.uint32()),
          };
          break;
        case 2:
          message.event = {
            $case: "noProgressInGame",
            noProgressInGame: GameEvent_NoProgressInGame.decode(reader, reader.uint32()),
          };
          break;
        case 3:
          message.event = {
            $case: "placementFailed",
            placementFailed: GameEvent_PlacementFailed.decode(reader, reader.uint32()),
          };
          break;
        case 32:
          message.event = {
            $case: "multipleCards",
            multipleCards: GameEvent_MultipleCards.decode(reader, reader.uint32()),
          };
          break;
        case 34:
          message.event = {
            $case: "multipleFouls",
            multipleFouls: GameEvent_MultipleFouls.decode(reader, reader.uint32()),
          };
          break;
        case 37:
          message.event = {
            $case: "botSubstitution",
            botSubstitution: GameEvent_BotSubstitution.decode(reader, reader.uint32()),
          };
          break;
        case 38:
          message.event = {
            $case: "tooManyRobots",
            tooManyRobots: GameEvent_TooManyRobots.decode(reader, reader.uint32()),
          };
          break;
        case 46:
          message.event = {
            $case: "challengeFlag",
            challengeFlag: GameEvent_ChallengeFlag.decode(reader, reader.uint32()),
          };
          break;
        case 47:
          message.event = {
            $case: "emergencyStop",
            emergencyStop: GameEvent_EmergencyStop.decode(reader, reader.uint32()),
          };
          break;
        case 35:
          message.event = {
            $case: "unsportingBehaviorMinor",
            unsportingBehaviorMinor: GameEvent_UnsportingBehaviorMinor.decode(reader, reader.uint32()),
          };
          break;
        case 36:
          message.event = {
            $case: "unsportingBehaviorMajor",
            unsportingBehaviorMajor: GameEvent_UnsportingBehaviorMajor.decode(reader, reader.uint32()),
          };
          break;
        case 1:
          message.event = { $case: "prepared", prepared: GameEvent_Prepared.decode(reader, reader.uint32()) };
          break;
        case 9:
          message.event = {
            $case: "indirectGoal",
            indirectGoal: GameEvent_IndirectGoal.decode(reader, reader.uint32()),
          };
          break;
        case 10:
          message.event = { $case: "chippedGoal", chippedGoal: GameEvent_ChippedGoal.decode(reader, reader.uint32()) };
          break;
        case 12:
          message.event = { $case: "kickTimeout", kickTimeout: GameEvent_KickTimeout.decode(reader, reader.uint32()) };
          break;
        case 16:
          message.event = {
            $case: "attackerTouchedOpponentInDefenseArea",
            attackerTouchedOpponentInDefenseArea: GameEvent_AttackerTouchedOpponentInDefenseArea.decode(
              reader,
              reader.uint32(),
            ),
          };
          break;
        case 42:
          message.event = {
            $case: "attackerTouchedOpponentInDefenseAreaSkipped",
            attackerTouchedOpponentInDefenseAreaSkipped: GameEvent_AttackerTouchedOpponentInDefenseArea.decode(
              reader,
              reader.uint32(),
            ),
          };
          break;
        case 23:
          message.event = {
            $case: "botCrashUniqueSkipped",
            botCrashUniqueSkipped: GameEvent_BotCrashUnique.decode(reader, reader.uint32()),
          };
          break;
        case 25:
          message.event = {
            $case: "botPushedBotSkipped",
            botPushedBotSkipped: GameEvent_BotPushedBot.decode(reader, reader.uint32()),
          };
          break;
        case 30:
          message.event = {
            $case: "defenderInDefenseAreaPartially",
            defenderInDefenseAreaPartially: GameEvent_DefenderInDefenseAreaPartially.decode(reader, reader.uint32()),
          };
          break;
        case 33:
          message.event = {
            $case: "multiplePlacementFailures",
            multiplePlacementFailures: GameEvent_MultiplePlacementFailures.decode(reader, reader.uint32()),
          };
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GameEvent {
    return {
      type: isSet(object.type) ? gameEvent_TypeFromJSON(object.type) : 0,
      origin: Array.isArray(object?.origin) ? object.origin.map((e: any) => String(e)) : [],
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
    message.type !== undefined && (obj.type = gameEvent_TypeToJSON(message.type));
    if (message.origin) {
      obj.origin = message.origin.map((e) => e);
    } else {
      obj.origin = [];
    }
    message.event?.$case === "ballLeftFieldTouchLine" &&
      (obj.ballLeftFieldTouchLine = message.event?.ballLeftFieldTouchLine
        ? GameEvent_BallLeftField.toJSON(message.event?.ballLeftFieldTouchLine)
        : undefined);
    message.event?.$case === "ballLeftFieldGoalLine" &&
      (obj.ballLeftFieldGoalLine = message.event?.ballLeftFieldGoalLine
        ? GameEvent_BallLeftField.toJSON(message.event?.ballLeftFieldGoalLine)
        : undefined);
    message.event?.$case === "aimlessKick" && (obj.aimlessKick = message.event?.aimlessKick
      ? GameEvent_AimlessKick.toJSON(message.event?.aimlessKick)
      : undefined);
    message.event?.$case === "attackerTooCloseToDefenseArea" &&
      (obj.attackerTooCloseToDefenseArea = message.event?.attackerTooCloseToDefenseArea
        ? GameEvent_AttackerTooCloseToDefenseArea.toJSON(message.event?.attackerTooCloseToDefenseArea)
        : undefined);
    message.event?.$case === "defenderInDefenseArea" &&
      (obj.defenderInDefenseArea = message.event?.defenderInDefenseArea
        ? GameEvent_DefenderInDefenseArea.toJSON(message.event?.defenderInDefenseArea)
        : undefined);
    message.event?.$case === "boundaryCrossing" && (obj.boundaryCrossing = message.event?.boundaryCrossing
      ? GameEvent_BoundaryCrossing.toJSON(message.event?.boundaryCrossing)
      : undefined);
    message.event?.$case === "keeperHeldBall" && (obj.keeperHeldBall = message.event?.keeperHeldBall
      ? GameEvent_KeeperHeldBall.toJSON(message.event?.keeperHeldBall)
      : undefined);
    message.event?.$case === "botDribbledBallTooFar" &&
      (obj.botDribbledBallTooFar = message.event?.botDribbledBallTooFar
        ? GameEvent_BotDribbledBallTooFar.toJSON(message.event?.botDribbledBallTooFar)
        : undefined);
    message.event?.$case === "botPushedBot" && (obj.botPushedBot = message.event?.botPushedBot
      ? GameEvent_BotPushedBot.toJSON(message.event?.botPushedBot)
      : undefined);
    message.event?.$case === "botHeldBallDeliberately" &&
      (obj.botHeldBallDeliberately = message.event?.botHeldBallDeliberately
        ? GameEvent_BotHeldBallDeliberately.toJSON(message.event?.botHeldBallDeliberately)
        : undefined);
    message.event?.$case === "botTippedOver" && (obj.botTippedOver = message.event?.botTippedOver
      ? GameEvent_BotTippedOver.toJSON(message.event?.botTippedOver)
      : undefined);
    message.event?.$case === "attackerTouchedBallInDefenseArea" &&
      (obj.attackerTouchedBallInDefenseArea = message.event?.attackerTouchedBallInDefenseArea
        ? GameEvent_AttackerTouchedBallInDefenseArea.toJSON(message.event?.attackerTouchedBallInDefenseArea)
        : undefined);
    message.event?.$case === "botKickedBallTooFast" && (obj.botKickedBallTooFast = message.event?.botKickedBallTooFast
      ? GameEvent_BotKickedBallTooFast.toJSON(message.event?.botKickedBallTooFast)
      : undefined);
    message.event?.$case === "botCrashUnique" && (obj.botCrashUnique = message.event?.botCrashUnique
      ? GameEvent_BotCrashUnique.toJSON(message.event?.botCrashUnique)
      : undefined);
    message.event?.$case === "botCrashDrawn" && (obj.botCrashDrawn = message.event?.botCrashDrawn
      ? GameEvent_BotCrashDrawn.toJSON(message.event?.botCrashDrawn)
      : undefined);
    message.event?.$case === "defenderTooCloseToKickPoint" &&
      (obj.defenderTooCloseToKickPoint = message.event?.defenderTooCloseToKickPoint
        ? GameEvent_DefenderTooCloseToKickPoint.toJSON(message.event?.defenderTooCloseToKickPoint)
        : undefined);
    message.event?.$case === "botTooFastInStop" && (obj.botTooFastInStop = message.event?.botTooFastInStop
      ? GameEvent_BotTooFastInStop.toJSON(message.event?.botTooFastInStop)
      : undefined);
    message.event?.$case === "botInterferedPlacement" &&
      (obj.botInterferedPlacement = message.event?.botInterferedPlacement
        ? GameEvent_BotInterferedPlacement.toJSON(message.event?.botInterferedPlacement)
        : undefined);
    message.event?.$case === "possibleGoal" &&
      (obj.possibleGoal = message.event?.possibleGoal ? GameEvent_Goal.toJSON(message.event?.possibleGoal) : undefined);
    message.event?.$case === "goal" &&
      (obj.goal = message.event?.goal ? GameEvent_Goal.toJSON(message.event?.goal) : undefined);
    message.event?.$case === "invalidGoal" &&
      (obj.invalidGoal = message.event?.invalidGoal ? GameEvent_Goal.toJSON(message.event?.invalidGoal) : undefined);
    message.event?.$case === "attackerDoubleTouchedBall" &&
      (obj.attackerDoubleTouchedBall = message.event?.attackerDoubleTouchedBall
        ? GameEvent_AttackerDoubleTouchedBall.toJSON(message.event?.attackerDoubleTouchedBall)
        : undefined);
    message.event?.$case === "placementSucceeded" && (obj.placementSucceeded = message.event?.placementSucceeded
      ? GameEvent_PlacementSucceeded.toJSON(message.event?.placementSucceeded)
      : undefined);
    message.event?.$case === "penaltyKickFailed" && (obj.penaltyKickFailed = message.event?.penaltyKickFailed
      ? GameEvent_PenaltyKickFailed.toJSON(message.event?.penaltyKickFailed)
      : undefined);
    message.event?.$case === "noProgressInGame" && (obj.noProgressInGame = message.event?.noProgressInGame
      ? GameEvent_NoProgressInGame.toJSON(message.event?.noProgressInGame)
      : undefined);
    message.event?.$case === "placementFailed" && (obj.placementFailed = message.event?.placementFailed
      ? GameEvent_PlacementFailed.toJSON(message.event?.placementFailed)
      : undefined);
    message.event?.$case === "multipleCards" && (obj.multipleCards = message.event?.multipleCards
      ? GameEvent_MultipleCards.toJSON(message.event?.multipleCards)
      : undefined);
    message.event?.$case === "multipleFouls" && (obj.multipleFouls = message.event?.multipleFouls
      ? GameEvent_MultipleFouls.toJSON(message.event?.multipleFouls)
      : undefined);
    message.event?.$case === "botSubstitution" && (obj.botSubstitution = message.event?.botSubstitution
      ? GameEvent_BotSubstitution.toJSON(message.event?.botSubstitution)
      : undefined);
    message.event?.$case === "tooManyRobots" && (obj.tooManyRobots = message.event?.tooManyRobots
      ? GameEvent_TooManyRobots.toJSON(message.event?.tooManyRobots)
      : undefined);
    message.event?.$case === "challengeFlag" && (obj.challengeFlag = message.event?.challengeFlag
      ? GameEvent_ChallengeFlag.toJSON(message.event?.challengeFlag)
      : undefined);
    message.event?.$case === "emergencyStop" && (obj.emergencyStop = message.event?.emergencyStop
      ? GameEvent_EmergencyStop.toJSON(message.event?.emergencyStop)
      : undefined);
    message.event?.$case === "unsportingBehaviorMinor" &&
      (obj.unsportingBehaviorMinor = message.event?.unsportingBehaviorMinor
        ? GameEvent_UnsportingBehaviorMinor.toJSON(message.event?.unsportingBehaviorMinor)
        : undefined);
    message.event?.$case === "unsportingBehaviorMajor" &&
      (obj.unsportingBehaviorMajor = message.event?.unsportingBehaviorMajor
        ? GameEvent_UnsportingBehaviorMajor.toJSON(message.event?.unsportingBehaviorMajor)
        : undefined);
    message.event?.$case === "prepared" &&
      (obj.prepared = message.event?.prepared ? GameEvent_Prepared.toJSON(message.event?.prepared) : undefined);
    message.event?.$case === "indirectGoal" && (obj.indirectGoal = message.event?.indirectGoal
      ? GameEvent_IndirectGoal.toJSON(message.event?.indirectGoal)
      : undefined);
    message.event?.$case === "chippedGoal" && (obj.chippedGoal = message.event?.chippedGoal
      ? GameEvent_ChippedGoal.toJSON(message.event?.chippedGoal)
      : undefined);
    message.event?.$case === "kickTimeout" && (obj.kickTimeout = message.event?.kickTimeout
      ? GameEvent_KickTimeout.toJSON(message.event?.kickTimeout)
      : undefined);
    message.event?.$case === "attackerTouchedOpponentInDefenseArea" &&
      (obj.attackerTouchedOpponentInDefenseArea = message.event?.attackerTouchedOpponentInDefenseArea
        ? GameEvent_AttackerTouchedOpponentInDefenseArea.toJSON(message.event?.attackerTouchedOpponentInDefenseArea)
        : undefined);
    message.event?.$case === "attackerTouchedOpponentInDefenseAreaSkipped" &&
      (obj.attackerTouchedOpponentInDefenseAreaSkipped = message.event?.attackerTouchedOpponentInDefenseAreaSkipped
        ? GameEvent_AttackerTouchedOpponentInDefenseArea.toJSON(
          message.event?.attackerTouchedOpponentInDefenseAreaSkipped,
        )
        : undefined);
    message.event?.$case === "botCrashUniqueSkipped" &&
      (obj.botCrashUniqueSkipped = message.event?.botCrashUniqueSkipped
        ? GameEvent_BotCrashUnique.toJSON(message.event?.botCrashUniqueSkipped)
        : undefined);
    message.event?.$case === "botPushedBotSkipped" && (obj.botPushedBotSkipped = message.event?.botPushedBotSkipped
      ? GameEvent_BotPushedBot.toJSON(message.event?.botPushedBotSkipped)
      : undefined);
    message.event?.$case === "defenderInDefenseAreaPartially" &&
      (obj.defenderInDefenseAreaPartially = message.event?.defenderInDefenseAreaPartially
        ? GameEvent_DefenderInDefenseAreaPartially.toJSON(message.event?.defenderInDefenseAreaPartially)
        : undefined);
    message.event?.$case === "multiplePlacementFailures" &&
      (obj.multiplePlacementFailures = message.event?.multiplePlacementFailures
        ? GameEvent_MultiplePlacementFailures.toJSON(message.event?.multiplePlacementFailures)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GameEvent>, I>>(object: I): GameEvent {
    const message = createBaseGameEvent();
    message.type = object.type ?? 0;
    message.origin = object.origin?.map((e) => e) || [];
    if (
      object.event?.$case === "ballLeftFieldTouchLine" &&
      object.event?.ballLeftFieldTouchLine !== undefined &&
      object.event?.ballLeftFieldTouchLine !== null
    ) {
      message.event = {
        $case: "ballLeftFieldTouchLine",
        ballLeftFieldTouchLine: GameEvent_BallLeftField.fromPartial(object.event.ballLeftFieldTouchLine),
      };
    }
    if (
      object.event?.$case === "ballLeftFieldGoalLine" &&
      object.event?.ballLeftFieldGoalLine !== undefined &&
      object.event?.ballLeftFieldGoalLine !== null
    ) {
      message.event = {
        $case: "ballLeftFieldGoalLine",
        ballLeftFieldGoalLine: GameEvent_BallLeftField.fromPartial(object.event.ballLeftFieldGoalLine),
      };
    }
    if (
      object.event?.$case === "aimlessKick" &&
      object.event?.aimlessKick !== undefined &&
      object.event?.aimlessKick !== null
    ) {
      message.event = {
        $case: "aimlessKick",
        aimlessKick: GameEvent_AimlessKick.fromPartial(object.event.aimlessKick),
      };
    }
    if (
      object.event?.$case === "attackerTooCloseToDefenseArea" &&
      object.event?.attackerTooCloseToDefenseArea !== undefined &&
      object.event?.attackerTooCloseToDefenseArea !== null
    ) {
      message.event = {
        $case: "attackerTooCloseToDefenseArea",
        attackerTooCloseToDefenseArea: GameEvent_AttackerTooCloseToDefenseArea.fromPartial(
          object.event.attackerTooCloseToDefenseArea,
        ),
      };
    }
    if (
      object.event?.$case === "defenderInDefenseArea" &&
      object.event?.defenderInDefenseArea !== undefined &&
      object.event?.defenderInDefenseArea !== null
    ) {
      message.event = {
        $case: "defenderInDefenseArea",
        defenderInDefenseArea: GameEvent_DefenderInDefenseArea.fromPartial(object.event.defenderInDefenseArea),
      };
    }
    if (
      object.event?.$case === "boundaryCrossing" &&
      object.event?.boundaryCrossing !== undefined &&
      object.event?.boundaryCrossing !== null
    ) {
      message.event = {
        $case: "boundaryCrossing",
        boundaryCrossing: GameEvent_BoundaryCrossing.fromPartial(object.event.boundaryCrossing),
      };
    }
    if (
      object.event?.$case === "keeperHeldBall" &&
      object.event?.keeperHeldBall !== undefined &&
      object.event?.keeperHeldBall !== null
    ) {
      message.event = {
        $case: "keeperHeldBall",
        keeperHeldBall: GameEvent_KeeperHeldBall.fromPartial(object.event.keeperHeldBall),
      };
    }
    if (
      object.event?.$case === "botDribbledBallTooFar" &&
      object.event?.botDribbledBallTooFar !== undefined &&
      object.event?.botDribbledBallTooFar !== null
    ) {
      message.event = {
        $case: "botDribbledBallTooFar",
        botDribbledBallTooFar: GameEvent_BotDribbledBallTooFar.fromPartial(object.event.botDribbledBallTooFar),
      };
    }
    if (
      object.event?.$case === "botPushedBot" &&
      object.event?.botPushedBot !== undefined &&
      object.event?.botPushedBot !== null
    ) {
      message.event = {
        $case: "botPushedBot",
        botPushedBot: GameEvent_BotPushedBot.fromPartial(object.event.botPushedBot),
      };
    }
    if (
      object.event?.$case === "botHeldBallDeliberately" &&
      object.event?.botHeldBallDeliberately !== undefined &&
      object.event?.botHeldBallDeliberately !== null
    ) {
      message.event = {
        $case: "botHeldBallDeliberately",
        botHeldBallDeliberately: GameEvent_BotHeldBallDeliberately.fromPartial(object.event.botHeldBallDeliberately),
      };
    }
    if (
      object.event?.$case === "botTippedOver" &&
      object.event?.botTippedOver !== undefined &&
      object.event?.botTippedOver !== null
    ) {
      message.event = {
        $case: "botTippedOver",
        botTippedOver: GameEvent_BotTippedOver.fromPartial(object.event.botTippedOver),
      };
    }
    if (
      object.event?.$case === "attackerTouchedBallInDefenseArea" &&
      object.event?.attackerTouchedBallInDefenseArea !== undefined &&
      object.event?.attackerTouchedBallInDefenseArea !== null
    ) {
      message.event = {
        $case: "attackerTouchedBallInDefenseArea",
        attackerTouchedBallInDefenseArea: GameEvent_AttackerTouchedBallInDefenseArea.fromPartial(
          object.event.attackerTouchedBallInDefenseArea,
        ),
      };
    }
    if (
      object.event?.$case === "botKickedBallTooFast" &&
      object.event?.botKickedBallTooFast !== undefined &&
      object.event?.botKickedBallTooFast !== null
    ) {
      message.event = {
        $case: "botKickedBallTooFast",
        botKickedBallTooFast: GameEvent_BotKickedBallTooFast.fromPartial(object.event.botKickedBallTooFast),
      };
    }
    if (
      object.event?.$case === "botCrashUnique" &&
      object.event?.botCrashUnique !== undefined &&
      object.event?.botCrashUnique !== null
    ) {
      message.event = {
        $case: "botCrashUnique",
        botCrashUnique: GameEvent_BotCrashUnique.fromPartial(object.event.botCrashUnique),
      };
    }
    if (
      object.event?.$case === "botCrashDrawn" &&
      object.event?.botCrashDrawn !== undefined &&
      object.event?.botCrashDrawn !== null
    ) {
      message.event = {
        $case: "botCrashDrawn",
        botCrashDrawn: GameEvent_BotCrashDrawn.fromPartial(object.event.botCrashDrawn),
      };
    }
    if (
      object.event?.$case === "defenderTooCloseToKickPoint" &&
      object.event?.defenderTooCloseToKickPoint !== undefined &&
      object.event?.defenderTooCloseToKickPoint !== null
    ) {
      message.event = {
        $case: "defenderTooCloseToKickPoint",
        defenderTooCloseToKickPoint: GameEvent_DefenderTooCloseToKickPoint.fromPartial(
          object.event.defenderTooCloseToKickPoint,
        ),
      };
    }
    if (
      object.event?.$case === "botTooFastInStop" &&
      object.event?.botTooFastInStop !== undefined &&
      object.event?.botTooFastInStop !== null
    ) {
      message.event = {
        $case: "botTooFastInStop",
        botTooFastInStop: GameEvent_BotTooFastInStop.fromPartial(object.event.botTooFastInStop),
      };
    }
    if (
      object.event?.$case === "botInterferedPlacement" &&
      object.event?.botInterferedPlacement !== undefined &&
      object.event?.botInterferedPlacement !== null
    ) {
      message.event = {
        $case: "botInterferedPlacement",
        botInterferedPlacement: GameEvent_BotInterferedPlacement.fromPartial(object.event.botInterferedPlacement),
      };
    }
    if (
      object.event?.$case === "possibleGoal" &&
      object.event?.possibleGoal !== undefined &&
      object.event?.possibleGoal !== null
    ) {
      message.event = { $case: "possibleGoal", possibleGoal: GameEvent_Goal.fromPartial(object.event.possibleGoal) };
    }
    if (object.event?.$case === "goal" && object.event?.goal !== undefined && object.event?.goal !== null) {
      message.event = { $case: "goal", goal: GameEvent_Goal.fromPartial(object.event.goal) };
    }
    if (
      object.event?.$case === "invalidGoal" &&
      object.event?.invalidGoal !== undefined &&
      object.event?.invalidGoal !== null
    ) {
      message.event = { $case: "invalidGoal", invalidGoal: GameEvent_Goal.fromPartial(object.event.invalidGoal) };
    }
    if (
      object.event?.$case === "attackerDoubleTouchedBall" &&
      object.event?.attackerDoubleTouchedBall !== undefined &&
      object.event?.attackerDoubleTouchedBall !== null
    ) {
      message.event = {
        $case: "attackerDoubleTouchedBall",
        attackerDoubleTouchedBall: GameEvent_AttackerDoubleTouchedBall.fromPartial(
          object.event.attackerDoubleTouchedBall,
        ),
      };
    }
    if (
      object.event?.$case === "placementSucceeded" &&
      object.event?.placementSucceeded !== undefined &&
      object.event?.placementSucceeded !== null
    ) {
      message.event = {
        $case: "placementSucceeded",
        placementSucceeded: GameEvent_PlacementSucceeded.fromPartial(object.event.placementSucceeded),
      };
    }
    if (
      object.event?.$case === "penaltyKickFailed" &&
      object.event?.penaltyKickFailed !== undefined &&
      object.event?.penaltyKickFailed !== null
    ) {
      message.event = {
        $case: "penaltyKickFailed",
        penaltyKickFailed: GameEvent_PenaltyKickFailed.fromPartial(object.event.penaltyKickFailed),
      };
    }
    if (
      object.event?.$case === "noProgressInGame" &&
      object.event?.noProgressInGame !== undefined &&
      object.event?.noProgressInGame !== null
    ) {
      message.event = {
        $case: "noProgressInGame",
        noProgressInGame: GameEvent_NoProgressInGame.fromPartial(object.event.noProgressInGame),
      };
    }
    if (
      object.event?.$case === "placementFailed" &&
      object.event?.placementFailed !== undefined &&
      object.event?.placementFailed !== null
    ) {
      message.event = {
        $case: "placementFailed",
        placementFailed: GameEvent_PlacementFailed.fromPartial(object.event.placementFailed),
      };
    }
    if (
      object.event?.$case === "multipleCards" &&
      object.event?.multipleCards !== undefined &&
      object.event?.multipleCards !== null
    ) {
      message.event = {
        $case: "multipleCards",
        multipleCards: GameEvent_MultipleCards.fromPartial(object.event.multipleCards),
      };
    }
    if (
      object.event?.$case === "multipleFouls" &&
      object.event?.multipleFouls !== undefined &&
      object.event?.multipleFouls !== null
    ) {
      message.event = {
        $case: "multipleFouls",
        multipleFouls: GameEvent_MultipleFouls.fromPartial(object.event.multipleFouls),
      };
    }
    if (
      object.event?.$case === "botSubstitution" &&
      object.event?.botSubstitution !== undefined &&
      object.event?.botSubstitution !== null
    ) {
      message.event = {
        $case: "botSubstitution",
        botSubstitution: GameEvent_BotSubstitution.fromPartial(object.event.botSubstitution),
      };
    }
    if (
      object.event?.$case === "tooManyRobots" &&
      object.event?.tooManyRobots !== undefined &&
      object.event?.tooManyRobots !== null
    ) {
      message.event = {
        $case: "tooManyRobots",
        tooManyRobots: GameEvent_TooManyRobots.fromPartial(object.event.tooManyRobots),
      };
    }
    if (
      object.event?.$case === "challengeFlag" &&
      object.event?.challengeFlag !== undefined &&
      object.event?.challengeFlag !== null
    ) {
      message.event = {
        $case: "challengeFlag",
        challengeFlag: GameEvent_ChallengeFlag.fromPartial(object.event.challengeFlag),
      };
    }
    if (
      object.event?.$case === "emergencyStop" &&
      object.event?.emergencyStop !== undefined &&
      object.event?.emergencyStop !== null
    ) {
      message.event = {
        $case: "emergencyStop",
        emergencyStop: GameEvent_EmergencyStop.fromPartial(object.event.emergencyStop),
      };
    }
    if (
      object.event?.$case === "unsportingBehaviorMinor" &&
      object.event?.unsportingBehaviorMinor !== undefined &&
      object.event?.unsportingBehaviorMinor !== null
    ) {
      message.event = {
        $case: "unsportingBehaviorMinor",
        unsportingBehaviorMinor: GameEvent_UnsportingBehaviorMinor.fromPartial(object.event.unsportingBehaviorMinor),
      };
    }
    if (
      object.event?.$case === "unsportingBehaviorMajor" &&
      object.event?.unsportingBehaviorMajor !== undefined &&
      object.event?.unsportingBehaviorMajor !== null
    ) {
      message.event = {
        $case: "unsportingBehaviorMajor",
        unsportingBehaviorMajor: GameEvent_UnsportingBehaviorMajor.fromPartial(object.event.unsportingBehaviorMajor),
      };
    }
    if (object.event?.$case === "prepared" && object.event?.prepared !== undefined && object.event?.prepared !== null) {
      message.event = { $case: "prepared", prepared: GameEvent_Prepared.fromPartial(object.event.prepared) };
    }
    if (
      object.event?.$case === "indirectGoal" &&
      object.event?.indirectGoal !== undefined &&
      object.event?.indirectGoal !== null
    ) {
      message.event = {
        $case: "indirectGoal",
        indirectGoal: GameEvent_IndirectGoal.fromPartial(object.event.indirectGoal),
      };
    }
    if (
      object.event?.$case === "chippedGoal" &&
      object.event?.chippedGoal !== undefined &&
      object.event?.chippedGoal !== null
    ) {
      message.event = {
        $case: "chippedGoal",
        chippedGoal: GameEvent_ChippedGoal.fromPartial(object.event.chippedGoal),
      };
    }
    if (
      object.event?.$case === "kickTimeout" &&
      object.event?.kickTimeout !== undefined &&
      object.event?.kickTimeout !== null
    ) {
      message.event = {
        $case: "kickTimeout",
        kickTimeout: GameEvent_KickTimeout.fromPartial(object.event.kickTimeout),
      };
    }
    if (
      object.event?.$case === "attackerTouchedOpponentInDefenseArea" &&
      object.event?.attackerTouchedOpponentInDefenseArea !== undefined &&
      object.event?.attackerTouchedOpponentInDefenseArea !== null
    ) {
      message.event = {
        $case: "attackerTouchedOpponentInDefenseArea",
        attackerTouchedOpponentInDefenseArea: GameEvent_AttackerTouchedOpponentInDefenseArea.fromPartial(
          object.event.attackerTouchedOpponentInDefenseArea,
        ),
      };
    }
    if (
      object.event?.$case === "attackerTouchedOpponentInDefenseAreaSkipped" &&
      object.event?.attackerTouchedOpponentInDefenseAreaSkipped !== undefined &&
      object.event?.attackerTouchedOpponentInDefenseAreaSkipped !== null
    ) {
      message.event = {
        $case: "attackerTouchedOpponentInDefenseAreaSkipped",
        attackerTouchedOpponentInDefenseAreaSkipped: GameEvent_AttackerTouchedOpponentInDefenseArea.fromPartial(
          object.event.attackerTouchedOpponentInDefenseAreaSkipped,
        ),
      };
    }
    if (
      object.event?.$case === "botCrashUniqueSkipped" &&
      object.event?.botCrashUniqueSkipped !== undefined &&
      object.event?.botCrashUniqueSkipped !== null
    ) {
      message.event = {
        $case: "botCrashUniqueSkipped",
        botCrashUniqueSkipped: GameEvent_BotCrashUnique.fromPartial(object.event.botCrashUniqueSkipped),
      };
    }
    if (
      object.event?.$case === "botPushedBotSkipped" &&
      object.event?.botPushedBotSkipped !== undefined &&
      object.event?.botPushedBotSkipped !== null
    ) {
      message.event = {
        $case: "botPushedBotSkipped",
        botPushedBotSkipped: GameEvent_BotPushedBot.fromPartial(object.event.botPushedBotSkipped),
      };
    }
    if (
      object.event?.$case === "defenderInDefenseAreaPartially" &&
      object.event?.defenderInDefenseAreaPartially !== undefined &&
      object.event?.defenderInDefenseAreaPartially !== null
    ) {
      message.event = {
        $case: "defenderInDefenseAreaPartially",
        defenderInDefenseAreaPartially: GameEvent_DefenderInDefenseAreaPartially.fromPartial(
          object.event.defenderInDefenseAreaPartially,
        ),
      };
    }
    if (
      object.event?.$case === "multiplePlacementFailures" &&
      object.event?.multiplePlacementFailures !== undefined &&
      object.event?.multiplePlacementFailures !== null
    ) {
      message.event = {
        $case: "multiplePlacementFailures",
        multiplePlacementFailures: GameEvent_MultiplePlacementFailures.fromPartial(
          object.event.multiplePlacementFailures,
        ),
      };
    }
    return message;
  },
};

function createBaseGameEvent_BallLeftField(): GameEvent_BallLeftField {
  return { byTeam: 0, byBot: 0, location: undefined };
}

export const GameEvent_BallLeftField = {
  encode(message: GameEvent_BallLeftField, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.byTeam !== 0) {
      writer.uint32(8).int32(message.byTeam);
    }
    if (message.byBot !== 0) {
      writer.uint32(16).uint32(message.byBot);
    }
    if (message.location !== undefined) {
      Vector2.encode(message.location, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GameEvent_BallLeftField {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGameEvent_BallLeftField();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.byTeam = reader.int32() as any;
          break;
        case 2:
          message.byBot = reader.uint32();
          break;
        case 3:
          message.location = Vector2.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GameEvent_BallLeftField {
    return {
      byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : 0,
      byBot: isSet(object.byBot) ? Number(object.byBot) : 0,
      location: isSet(object.location) ? Vector2.fromJSON(object.location) : undefined,
    };
  },

  toJSON(message: GameEvent_BallLeftField): unknown {
    const obj: any = {};
    message.byTeam !== undefined && (obj.byTeam = teamToJSON(message.byTeam));
    message.byBot !== undefined && (obj.byBot = Math.round(message.byBot));
    message.location !== undefined && (obj.location = message.location ? Vector2.toJSON(message.location) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GameEvent_BallLeftField>, I>>(object: I): GameEvent_BallLeftField {
    const message = createBaseGameEvent_BallLeftField();
    message.byTeam = object.byTeam ?? 0;
    message.byBot = object.byBot ?? 0;
    message.location = (object.location !== undefined && object.location !== null)
      ? Vector2.fromPartial(object.location)
      : undefined;
    return message;
  },
};

function createBaseGameEvent_AimlessKick(): GameEvent_AimlessKick {
  return { byTeam: 0, byBot: 0, location: undefined, kickLocation: undefined };
}

export const GameEvent_AimlessKick = {
  encode(message: GameEvent_AimlessKick, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.byTeam !== 0) {
      writer.uint32(8).int32(message.byTeam);
    }
    if (message.byBot !== 0) {
      writer.uint32(16).uint32(message.byBot);
    }
    if (message.location !== undefined) {
      Vector2.encode(message.location, writer.uint32(26).fork()).ldelim();
    }
    if (message.kickLocation !== undefined) {
      Vector2.encode(message.kickLocation, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GameEvent_AimlessKick {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGameEvent_AimlessKick();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.byTeam = reader.int32() as any;
          break;
        case 2:
          message.byBot = reader.uint32();
          break;
        case 3:
          message.location = Vector2.decode(reader, reader.uint32());
          break;
        case 4:
          message.kickLocation = Vector2.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GameEvent_AimlessKick {
    return {
      byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : 0,
      byBot: isSet(object.byBot) ? Number(object.byBot) : 0,
      location: isSet(object.location) ? Vector2.fromJSON(object.location) : undefined,
      kickLocation: isSet(object.kickLocation) ? Vector2.fromJSON(object.kickLocation) : undefined,
    };
  },

  toJSON(message: GameEvent_AimlessKick): unknown {
    const obj: any = {};
    message.byTeam !== undefined && (obj.byTeam = teamToJSON(message.byTeam));
    message.byBot !== undefined && (obj.byBot = Math.round(message.byBot));
    message.location !== undefined && (obj.location = message.location ? Vector2.toJSON(message.location) : undefined);
    message.kickLocation !== undefined &&
      (obj.kickLocation = message.kickLocation ? Vector2.toJSON(message.kickLocation) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GameEvent_AimlessKick>, I>>(object: I): GameEvent_AimlessKick {
    const message = createBaseGameEvent_AimlessKick();
    message.byTeam = object.byTeam ?? 0;
    message.byBot = object.byBot ?? 0;
    message.location = (object.location !== undefined && object.location !== null)
      ? Vector2.fromPartial(object.location)
      : undefined;
    message.kickLocation = (object.kickLocation !== undefined && object.kickLocation !== null)
      ? Vector2.fromPartial(object.kickLocation)
      : undefined;
    return message;
  },
};

function createBaseGameEvent_Goal(): GameEvent_Goal {
  return {
    byTeam: 0,
    kickingTeam: 0,
    kickingBot: 0,
    location: undefined,
    kickLocation: undefined,
    maxBallHeight: 0,
    numRobotsByTeam: 0,
    lastTouchByTeam: 0,
    message: "",
  };
}

export const GameEvent_Goal = {
  encode(message: GameEvent_Goal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.byTeam !== 0) {
      writer.uint32(8).int32(message.byTeam);
    }
    if (message.kickingTeam !== 0) {
      writer.uint32(48).int32(message.kickingTeam);
    }
    if (message.kickingBot !== 0) {
      writer.uint32(16).uint32(message.kickingBot);
    }
    if (message.location !== undefined) {
      Vector2.encode(message.location, writer.uint32(26).fork()).ldelim();
    }
    if (message.kickLocation !== undefined) {
      Vector2.encode(message.kickLocation, writer.uint32(34).fork()).ldelim();
    }
    if (message.maxBallHeight !== 0) {
      writer.uint32(45).float(message.maxBallHeight);
    }
    if (message.numRobotsByTeam !== 0) {
      writer.uint32(56).uint32(message.numRobotsByTeam);
    }
    if (message.lastTouchByTeam !== 0) {
      writer.uint32(64).uint64(message.lastTouchByTeam);
    }
    if (message.message !== "") {
      writer.uint32(74).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GameEvent_Goal {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGameEvent_Goal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.byTeam = reader.int32() as any;
          break;
        case 6:
          message.kickingTeam = reader.int32() as any;
          break;
        case 2:
          message.kickingBot = reader.uint32();
          break;
        case 3:
          message.location = Vector2.decode(reader, reader.uint32());
          break;
        case 4:
          message.kickLocation = Vector2.decode(reader, reader.uint32());
          break;
        case 5:
          message.maxBallHeight = reader.float();
          break;
        case 7:
          message.numRobotsByTeam = reader.uint32();
          break;
        case 8:
          message.lastTouchByTeam = longToNumber(reader.uint64() as Long);
          break;
        case 9:
          message.message = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GameEvent_Goal {
    return {
      byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : 0,
      kickingTeam: isSet(object.kickingTeam) ? teamFromJSON(object.kickingTeam) : 0,
      kickingBot: isSet(object.kickingBot) ? Number(object.kickingBot) : 0,
      location: isSet(object.location) ? Vector2.fromJSON(object.location) : undefined,
      kickLocation: isSet(object.kickLocation) ? Vector2.fromJSON(object.kickLocation) : undefined,
      maxBallHeight: isSet(object.maxBallHeight) ? Number(object.maxBallHeight) : 0,
      numRobotsByTeam: isSet(object.numRobotsByTeam) ? Number(object.numRobotsByTeam) : 0,
      lastTouchByTeam: isSet(object.lastTouchByTeam) ? Number(object.lastTouchByTeam) : 0,
      message: isSet(object.message) ? String(object.message) : "",
    };
  },

  toJSON(message: GameEvent_Goal): unknown {
    const obj: any = {};
    message.byTeam !== undefined && (obj.byTeam = teamToJSON(message.byTeam));
    message.kickingTeam !== undefined && (obj.kickingTeam = teamToJSON(message.kickingTeam));
    message.kickingBot !== undefined && (obj.kickingBot = Math.round(message.kickingBot));
    message.location !== undefined && (obj.location = message.location ? Vector2.toJSON(message.location) : undefined);
    message.kickLocation !== undefined &&
      (obj.kickLocation = message.kickLocation ? Vector2.toJSON(message.kickLocation) : undefined);
    message.maxBallHeight !== undefined && (obj.maxBallHeight = message.maxBallHeight);
    message.numRobotsByTeam !== undefined && (obj.numRobotsByTeam = Math.round(message.numRobotsByTeam));
    message.lastTouchByTeam !== undefined && (obj.lastTouchByTeam = Math.round(message.lastTouchByTeam));
    message.message !== undefined && (obj.message = message.message);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GameEvent_Goal>, I>>(object: I): GameEvent_Goal {
    const message = createBaseGameEvent_Goal();
    message.byTeam = object.byTeam ?? 0;
    message.kickingTeam = object.kickingTeam ?? 0;
    message.kickingBot = object.kickingBot ?? 0;
    message.location = (object.location !== undefined && object.location !== null)
      ? Vector2.fromPartial(object.location)
      : undefined;
    message.kickLocation = (object.kickLocation !== undefined && object.kickLocation !== null)
      ? Vector2.fromPartial(object.kickLocation)
      : undefined;
    message.maxBallHeight = object.maxBallHeight ?? 0;
    message.numRobotsByTeam = object.numRobotsByTeam ?? 0;
    message.lastTouchByTeam = object.lastTouchByTeam ?? 0;
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseGameEvent_IndirectGoal(): GameEvent_IndirectGoal {
  return { byTeam: 0, byBot: 0, location: undefined, kickLocation: undefined };
}

export const GameEvent_IndirectGoal = {
  encode(message: GameEvent_IndirectGoal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.byTeam !== 0) {
      writer.uint32(8).int32(message.byTeam);
    }
    if (message.byBot !== 0) {
      writer.uint32(16).uint32(message.byBot);
    }
    if (message.location !== undefined) {
      Vector2.encode(message.location, writer.uint32(26).fork()).ldelim();
    }
    if (message.kickLocation !== undefined) {
      Vector2.encode(message.kickLocation, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GameEvent_IndirectGoal {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGameEvent_IndirectGoal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.byTeam = reader.int32() as any;
          break;
        case 2:
          message.byBot = reader.uint32();
          break;
        case 3:
          message.location = Vector2.decode(reader, reader.uint32());
          break;
        case 4:
          message.kickLocation = Vector2.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GameEvent_IndirectGoal {
    return {
      byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : 0,
      byBot: isSet(object.byBot) ? Number(object.byBot) : 0,
      location: isSet(object.location) ? Vector2.fromJSON(object.location) : undefined,
      kickLocation: isSet(object.kickLocation) ? Vector2.fromJSON(object.kickLocation) : undefined,
    };
  },

  toJSON(message: GameEvent_IndirectGoal): unknown {
    const obj: any = {};
    message.byTeam !== undefined && (obj.byTeam = teamToJSON(message.byTeam));
    message.byBot !== undefined && (obj.byBot = Math.round(message.byBot));
    message.location !== undefined && (obj.location = message.location ? Vector2.toJSON(message.location) : undefined);
    message.kickLocation !== undefined &&
      (obj.kickLocation = message.kickLocation ? Vector2.toJSON(message.kickLocation) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GameEvent_IndirectGoal>, I>>(object: I): GameEvent_IndirectGoal {
    const message = createBaseGameEvent_IndirectGoal();
    message.byTeam = object.byTeam ?? 0;
    message.byBot = object.byBot ?? 0;
    message.location = (object.location !== undefined && object.location !== null)
      ? Vector2.fromPartial(object.location)
      : undefined;
    message.kickLocation = (object.kickLocation !== undefined && object.kickLocation !== null)
      ? Vector2.fromPartial(object.kickLocation)
      : undefined;
    return message;
  },
};

function createBaseGameEvent_ChippedGoal(): GameEvent_ChippedGoal {
  return { byTeam: 0, byBot: 0, location: undefined, kickLocation: undefined, maxBallHeight: 0 };
}

export const GameEvent_ChippedGoal = {
  encode(message: GameEvent_ChippedGoal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.byTeam !== 0) {
      writer.uint32(8).int32(message.byTeam);
    }
    if (message.byBot !== 0) {
      writer.uint32(16).uint32(message.byBot);
    }
    if (message.location !== undefined) {
      Vector2.encode(message.location, writer.uint32(26).fork()).ldelim();
    }
    if (message.kickLocation !== undefined) {
      Vector2.encode(message.kickLocation, writer.uint32(34).fork()).ldelim();
    }
    if (message.maxBallHeight !== 0) {
      writer.uint32(45).float(message.maxBallHeight);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GameEvent_ChippedGoal {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGameEvent_ChippedGoal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.byTeam = reader.int32() as any;
          break;
        case 2:
          message.byBot = reader.uint32();
          break;
        case 3:
          message.location = Vector2.decode(reader, reader.uint32());
          break;
        case 4:
          message.kickLocation = Vector2.decode(reader, reader.uint32());
          break;
        case 5:
          message.maxBallHeight = reader.float();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GameEvent_ChippedGoal {
    return {
      byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : 0,
      byBot: isSet(object.byBot) ? Number(object.byBot) : 0,
      location: isSet(object.location) ? Vector2.fromJSON(object.location) : undefined,
      kickLocation: isSet(object.kickLocation) ? Vector2.fromJSON(object.kickLocation) : undefined,
      maxBallHeight: isSet(object.maxBallHeight) ? Number(object.maxBallHeight) : 0,
    };
  },

  toJSON(message: GameEvent_ChippedGoal): unknown {
    const obj: any = {};
    message.byTeam !== undefined && (obj.byTeam = teamToJSON(message.byTeam));
    message.byBot !== undefined && (obj.byBot = Math.round(message.byBot));
    message.location !== undefined && (obj.location = message.location ? Vector2.toJSON(message.location) : undefined);
    message.kickLocation !== undefined &&
      (obj.kickLocation = message.kickLocation ? Vector2.toJSON(message.kickLocation) : undefined);
    message.maxBallHeight !== undefined && (obj.maxBallHeight = message.maxBallHeight);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GameEvent_ChippedGoal>, I>>(object: I): GameEvent_ChippedGoal {
    const message = createBaseGameEvent_ChippedGoal();
    message.byTeam = object.byTeam ?? 0;
    message.byBot = object.byBot ?? 0;
    message.location = (object.location !== undefined && object.location !== null)
      ? Vector2.fromPartial(object.location)
      : undefined;
    message.kickLocation = (object.kickLocation !== undefined && object.kickLocation !== null)
      ? Vector2.fromPartial(object.kickLocation)
      : undefined;
    message.maxBallHeight = object.maxBallHeight ?? 0;
    return message;
  },
};

function createBaseGameEvent_BotTooFastInStop(): GameEvent_BotTooFastInStop {
  return { byTeam: 0, byBot: 0, location: undefined, speed: 0 };
}

export const GameEvent_BotTooFastInStop = {
  encode(message: GameEvent_BotTooFastInStop, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.byTeam !== 0) {
      writer.uint32(8).int32(message.byTeam);
    }
    if (message.byBot !== 0) {
      writer.uint32(16).uint32(message.byBot);
    }
    if (message.location !== undefined) {
      Vector2.encode(message.location, writer.uint32(26).fork()).ldelim();
    }
    if (message.speed !== 0) {
      writer.uint32(37).float(message.speed);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GameEvent_BotTooFastInStop {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGameEvent_BotTooFastInStop();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.byTeam = reader.int32() as any;
          break;
        case 2:
          message.byBot = reader.uint32();
          break;
        case 3:
          message.location = Vector2.decode(reader, reader.uint32());
          break;
        case 4:
          message.speed = reader.float();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GameEvent_BotTooFastInStop {
    return {
      byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : 0,
      byBot: isSet(object.byBot) ? Number(object.byBot) : 0,
      location: isSet(object.location) ? Vector2.fromJSON(object.location) : undefined,
      speed: isSet(object.speed) ? Number(object.speed) : 0,
    };
  },

  toJSON(message: GameEvent_BotTooFastInStop): unknown {
    const obj: any = {};
    message.byTeam !== undefined && (obj.byTeam = teamToJSON(message.byTeam));
    message.byBot !== undefined && (obj.byBot = Math.round(message.byBot));
    message.location !== undefined && (obj.location = message.location ? Vector2.toJSON(message.location) : undefined);
    message.speed !== undefined && (obj.speed = message.speed);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GameEvent_BotTooFastInStop>, I>>(object: I): GameEvent_BotTooFastInStop {
    const message = createBaseGameEvent_BotTooFastInStop();
    message.byTeam = object.byTeam ?? 0;
    message.byBot = object.byBot ?? 0;
    message.location = (object.location !== undefined && object.location !== null)
      ? Vector2.fromPartial(object.location)
      : undefined;
    message.speed = object.speed ?? 0;
    return message;
  },
};

function createBaseGameEvent_DefenderTooCloseToKickPoint(): GameEvent_DefenderTooCloseToKickPoint {
  return { byTeam: 0, byBot: 0, location: undefined, distance: 0 };
}

export const GameEvent_DefenderTooCloseToKickPoint = {
  encode(message: GameEvent_DefenderTooCloseToKickPoint, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.byTeam !== 0) {
      writer.uint32(8).int32(message.byTeam);
    }
    if (message.byBot !== 0) {
      writer.uint32(16).uint32(message.byBot);
    }
    if (message.location !== undefined) {
      Vector2.encode(message.location, writer.uint32(26).fork()).ldelim();
    }
    if (message.distance !== 0) {
      writer.uint32(37).float(message.distance);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GameEvent_DefenderTooCloseToKickPoint {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGameEvent_DefenderTooCloseToKickPoint();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.byTeam = reader.int32() as any;
          break;
        case 2:
          message.byBot = reader.uint32();
          break;
        case 3:
          message.location = Vector2.decode(reader, reader.uint32());
          break;
        case 4:
          message.distance = reader.float();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GameEvent_DefenderTooCloseToKickPoint {
    return {
      byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : 0,
      byBot: isSet(object.byBot) ? Number(object.byBot) : 0,
      location: isSet(object.location) ? Vector2.fromJSON(object.location) : undefined,
      distance: isSet(object.distance) ? Number(object.distance) : 0,
    };
  },

  toJSON(message: GameEvent_DefenderTooCloseToKickPoint): unknown {
    const obj: any = {};
    message.byTeam !== undefined && (obj.byTeam = teamToJSON(message.byTeam));
    message.byBot !== undefined && (obj.byBot = Math.round(message.byBot));
    message.location !== undefined && (obj.location = message.location ? Vector2.toJSON(message.location) : undefined);
    message.distance !== undefined && (obj.distance = message.distance);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GameEvent_DefenderTooCloseToKickPoint>, I>>(
    object: I,
  ): GameEvent_DefenderTooCloseToKickPoint {
    const message = createBaseGameEvent_DefenderTooCloseToKickPoint();
    message.byTeam = object.byTeam ?? 0;
    message.byBot = object.byBot ?? 0;
    message.location = (object.location !== undefined && object.location !== null)
      ? Vector2.fromPartial(object.location)
      : undefined;
    message.distance = object.distance ?? 0;
    return message;
  },
};

function createBaseGameEvent_BotCrashDrawn(): GameEvent_BotCrashDrawn {
  return { botYellow: 0, botBlue: 0, location: undefined, crashSpeed: 0, speedDiff: 0, crashAngle: 0 };
}

export const GameEvent_BotCrashDrawn = {
  encode(message: GameEvent_BotCrashDrawn, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.botYellow !== 0) {
      writer.uint32(8).uint32(message.botYellow);
    }
    if (message.botBlue !== 0) {
      writer.uint32(16).uint32(message.botBlue);
    }
    if (message.location !== undefined) {
      Vector2.encode(message.location, writer.uint32(26).fork()).ldelim();
    }
    if (message.crashSpeed !== 0) {
      writer.uint32(37).float(message.crashSpeed);
    }
    if (message.speedDiff !== 0) {
      writer.uint32(45).float(message.speedDiff);
    }
    if (message.crashAngle !== 0) {
      writer.uint32(53).float(message.crashAngle);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GameEvent_BotCrashDrawn {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGameEvent_BotCrashDrawn();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.botYellow = reader.uint32();
          break;
        case 2:
          message.botBlue = reader.uint32();
          break;
        case 3:
          message.location = Vector2.decode(reader, reader.uint32());
          break;
        case 4:
          message.crashSpeed = reader.float();
          break;
        case 5:
          message.speedDiff = reader.float();
          break;
        case 6:
          message.crashAngle = reader.float();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GameEvent_BotCrashDrawn {
    return {
      botYellow: isSet(object.botYellow) ? Number(object.botYellow) : 0,
      botBlue: isSet(object.botBlue) ? Number(object.botBlue) : 0,
      location: isSet(object.location) ? Vector2.fromJSON(object.location) : undefined,
      crashSpeed: isSet(object.crashSpeed) ? Number(object.crashSpeed) : 0,
      speedDiff: isSet(object.speedDiff) ? Number(object.speedDiff) : 0,
      crashAngle: isSet(object.crashAngle) ? Number(object.crashAngle) : 0,
    };
  },

  toJSON(message: GameEvent_BotCrashDrawn): unknown {
    const obj: any = {};
    message.botYellow !== undefined && (obj.botYellow = Math.round(message.botYellow));
    message.botBlue !== undefined && (obj.botBlue = Math.round(message.botBlue));
    message.location !== undefined && (obj.location = message.location ? Vector2.toJSON(message.location) : undefined);
    message.crashSpeed !== undefined && (obj.crashSpeed = message.crashSpeed);
    message.speedDiff !== undefined && (obj.speedDiff = message.speedDiff);
    message.crashAngle !== undefined && (obj.crashAngle = message.crashAngle);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GameEvent_BotCrashDrawn>, I>>(object: I): GameEvent_BotCrashDrawn {
    const message = createBaseGameEvent_BotCrashDrawn();
    message.botYellow = object.botYellow ?? 0;
    message.botBlue = object.botBlue ?? 0;
    message.location = (object.location !== undefined && object.location !== null)
      ? Vector2.fromPartial(object.location)
      : undefined;
    message.crashSpeed = object.crashSpeed ?? 0;
    message.speedDiff = object.speedDiff ?? 0;
    message.crashAngle = object.crashAngle ?? 0;
    return message;
  },
};

function createBaseGameEvent_BotCrashUnique(): GameEvent_BotCrashUnique {
  return { byTeam: 0, violator: 0, victim: 0, location: undefined, crashSpeed: 0, speedDiff: 0, crashAngle: 0 };
}

export const GameEvent_BotCrashUnique = {
  encode(message: GameEvent_BotCrashUnique, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.byTeam !== 0) {
      writer.uint32(8).int32(message.byTeam);
    }
    if (message.violator !== 0) {
      writer.uint32(16).uint32(message.violator);
    }
    if (message.victim !== 0) {
      writer.uint32(24).uint32(message.victim);
    }
    if (message.location !== undefined) {
      Vector2.encode(message.location, writer.uint32(34).fork()).ldelim();
    }
    if (message.crashSpeed !== 0) {
      writer.uint32(45).float(message.crashSpeed);
    }
    if (message.speedDiff !== 0) {
      writer.uint32(53).float(message.speedDiff);
    }
    if (message.crashAngle !== 0) {
      writer.uint32(61).float(message.crashAngle);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GameEvent_BotCrashUnique {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGameEvent_BotCrashUnique();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.byTeam = reader.int32() as any;
          break;
        case 2:
          message.violator = reader.uint32();
          break;
        case 3:
          message.victim = reader.uint32();
          break;
        case 4:
          message.location = Vector2.decode(reader, reader.uint32());
          break;
        case 5:
          message.crashSpeed = reader.float();
          break;
        case 6:
          message.speedDiff = reader.float();
          break;
        case 7:
          message.crashAngle = reader.float();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GameEvent_BotCrashUnique {
    return {
      byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : 0,
      violator: isSet(object.violator) ? Number(object.violator) : 0,
      victim: isSet(object.victim) ? Number(object.victim) : 0,
      location: isSet(object.location) ? Vector2.fromJSON(object.location) : undefined,
      crashSpeed: isSet(object.crashSpeed) ? Number(object.crashSpeed) : 0,
      speedDiff: isSet(object.speedDiff) ? Number(object.speedDiff) : 0,
      crashAngle: isSet(object.crashAngle) ? Number(object.crashAngle) : 0,
    };
  },

  toJSON(message: GameEvent_BotCrashUnique): unknown {
    const obj: any = {};
    message.byTeam !== undefined && (obj.byTeam = teamToJSON(message.byTeam));
    message.violator !== undefined && (obj.violator = Math.round(message.violator));
    message.victim !== undefined && (obj.victim = Math.round(message.victim));
    message.location !== undefined && (obj.location = message.location ? Vector2.toJSON(message.location) : undefined);
    message.crashSpeed !== undefined && (obj.crashSpeed = message.crashSpeed);
    message.speedDiff !== undefined && (obj.speedDiff = message.speedDiff);
    message.crashAngle !== undefined && (obj.crashAngle = message.crashAngle);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GameEvent_BotCrashUnique>, I>>(object: I): GameEvent_BotCrashUnique {
    const message = createBaseGameEvent_BotCrashUnique();
    message.byTeam = object.byTeam ?? 0;
    message.violator = object.violator ?? 0;
    message.victim = object.victim ?? 0;
    message.location = (object.location !== undefined && object.location !== null)
      ? Vector2.fromPartial(object.location)
      : undefined;
    message.crashSpeed = object.crashSpeed ?? 0;
    message.speedDiff = object.speedDiff ?? 0;
    message.crashAngle = object.crashAngle ?? 0;
    return message;
  },
};

function createBaseGameEvent_BotPushedBot(): GameEvent_BotPushedBot {
  return { byTeam: 0, violator: 0, victim: 0, location: undefined, pushedDistance: 0 };
}

export const GameEvent_BotPushedBot = {
  encode(message: GameEvent_BotPushedBot, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.byTeam !== 0) {
      writer.uint32(8).int32(message.byTeam);
    }
    if (message.violator !== 0) {
      writer.uint32(16).uint32(message.violator);
    }
    if (message.victim !== 0) {
      writer.uint32(24).uint32(message.victim);
    }
    if (message.location !== undefined) {
      Vector2.encode(message.location, writer.uint32(34).fork()).ldelim();
    }
    if (message.pushedDistance !== 0) {
      writer.uint32(45).float(message.pushedDistance);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GameEvent_BotPushedBot {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGameEvent_BotPushedBot();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.byTeam = reader.int32() as any;
          break;
        case 2:
          message.violator = reader.uint32();
          break;
        case 3:
          message.victim = reader.uint32();
          break;
        case 4:
          message.location = Vector2.decode(reader, reader.uint32());
          break;
        case 5:
          message.pushedDistance = reader.float();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GameEvent_BotPushedBot {
    return {
      byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : 0,
      violator: isSet(object.violator) ? Number(object.violator) : 0,
      victim: isSet(object.victim) ? Number(object.victim) : 0,
      location: isSet(object.location) ? Vector2.fromJSON(object.location) : undefined,
      pushedDistance: isSet(object.pushedDistance) ? Number(object.pushedDistance) : 0,
    };
  },

  toJSON(message: GameEvent_BotPushedBot): unknown {
    const obj: any = {};
    message.byTeam !== undefined && (obj.byTeam = teamToJSON(message.byTeam));
    message.violator !== undefined && (obj.violator = Math.round(message.violator));
    message.victim !== undefined && (obj.victim = Math.round(message.victim));
    message.location !== undefined && (obj.location = message.location ? Vector2.toJSON(message.location) : undefined);
    message.pushedDistance !== undefined && (obj.pushedDistance = message.pushedDistance);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GameEvent_BotPushedBot>, I>>(object: I): GameEvent_BotPushedBot {
    const message = createBaseGameEvent_BotPushedBot();
    message.byTeam = object.byTeam ?? 0;
    message.violator = object.violator ?? 0;
    message.victim = object.victim ?? 0;
    message.location = (object.location !== undefined && object.location !== null)
      ? Vector2.fromPartial(object.location)
      : undefined;
    message.pushedDistance = object.pushedDistance ?? 0;
    return message;
  },
};

function createBaseGameEvent_BotTippedOver(): GameEvent_BotTippedOver {
  return { byTeam: 0, byBot: 0, location: undefined, ballLocation: undefined };
}

export const GameEvent_BotTippedOver = {
  encode(message: GameEvent_BotTippedOver, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.byTeam !== 0) {
      writer.uint32(8).int32(message.byTeam);
    }
    if (message.byBot !== 0) {
      writer.uint32(16).uint32(message.byBot);
    }
    if (message.location !== undefined) {
      Vector2.encode(message.location, writer.uint32(26).fork()).ldelim();
    }
    if (message.ballLocation !== undefined) {
      Vector2.encode(message.ballLocation, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GameEvent_BotTippedOver {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGameEvent_BotTippedOver();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.byTeam = reader.int32() as any;
          break;
        case 2:
          message.byBot = reader.uint32();
          break;
        case 3:
          message.location = Vector2.decode(reader, reader.uint32());
          break;
        case 4:
          message.ballLocation = Vector2.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GameEvent_BotTippedOver {
    return {
      byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : 0,
      byBot: isSet(object.byBot) ? Number(object.byBot) : 0,
      location: isSet(object.location) ? Vector2.fromJSON(object.location) : undefined,
      ballLocation: isSet(object.ballLocation) ? Vector2.fromJSON(object.ballLocation) : undefined,
    };
  },

  toJSON(message: GameEvent_BotTippedOver): unknown {
    const obj: any = {};
    message.byTeam !== undefined && (obj.byTeam = teamToJSON(message.byTeam));
    message.byBot !== undefined && (obj.byBot = Math.round(message.byBot));
    message.location !== undefined && (obj.location = message.location ? Vector2.toJSON(message.location) : undefined);
    message.ballLocation !== undefined &&
      (obj.ballLocation = message.ballLocation ? Vector2.toJSON(message.ballLocation) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GameEvent_BotTippedOver>, I>>(object: I): GameEvent_BotTippedOver {
    const message = createBaseGameEvent_BotTippedOver();
    message.byTeam = object.byTeam ?? 0;
    message.byBot = object.byBot ?? 0;
    message.location = (object.location !== undefined && object.location !== null)
      ? Vector2.fromPartial(object.location)
      : undefined;
    message.ballLocation = (object.ballLocation !== undefined && object.ballLocation !== null)
      ? Vector2.fromPartial(object.ballLocation)
      : undefined;
    return message;
  },
};

function createBaseGameEvent_DefenderInDefenseArea(): GameEvent_DefenderInDefenseArea {
  return { byTeam: 0, byBot: 0, location: undefined, distance: 0 };
}

export const GameEvent_DefenderInDefenseArea = {
  encode(message: GameEvent_DefenderInDefenseArea, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.byTeam !== 0) {
      writer.uint32(8).int32(message.byTeam);
    }
    if (message.byBot !== 0) {
      writer.uint32(16).uint32(message.byBot);
    }
    if (message.location !== undefined) {
      Vector2.encode(message.location, writer.uint32(26).fork()).ldelim();
    }
    if (message.distance !== 0) {
      writer.uint32(37).float(message.distance);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GameEvent_DefenderInDefenseArea {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGameEvent_DefenderInDefenseArea();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.byTeam = reader.int32() as any;
          break;
        case 2:
          message.byBot = reader.uint32();
          break;
        case 3:
          message.location = Vector2.decode(reader, reader.uint32());
          break;
        case 4:
          message.distance = reader.float();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GameEvent_DefenderInDefenseArea {
    return {
      byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : 0,
      byBot: isSet(object.byBot) ? Number(object.byBot) : 0,
      location: isSet(object.location) ? Vector2.fromJSON(object.location) : undefined,
      distance: isSet(object.distance) ? Number(object.distance) : 0,
    };
  },

  toJSON(message: GameEvent_DefenderInDefenseArea): unknown {
    const obj: any = {};
    message.byTeam !== undefined && (obj.byTeam = teamToJSON(message.byTeam));
    message.byBot !== undefined && (obj.byBot = Math.round(message.byBot));
    message.location !== undefined && (obj.location = message.location ? Vector2.toJSON(message.location) : undefined);
    message.distance !== undefined && (obj.distance = message.distance);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GameEvent_DefenderInDefenseArea>, I>>(
    object: I,
  ): GameEvent_DefenderInDefenseArea {
    const message = createBaseGameEvent_DefenderInDefenseArea();
    message.byTeam = object.byTeam ?? 0;
    message.byBot = object.byBot ?? 0;
    message.location = (object.location !== undefined && object.location !== null)
      ? Vector2.fromPartial(object.location)
      : undefined;
    message.distance = object.distance ?? 0;
    return message;
  },
};

function createBaseGameEvent_DefenderInDefenseAreaPartially(): GameEvent_DefenderInDefenseAreaPartially {
  return { byTeam: 0, byBot: 0, location: undefined, distance: 0, ballLocation: undefined };
}

export const GameEvent_DefenderInDefenseAreaPartially = {
  encode(message: GameEvent_DefenderInDefenseAreaPartially, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.byTeam !== 0) {
      writer.uint32(8).int32(message.byTeam);
    }
    if (message.byBot !== 0) {
      writer.uint32(16).uint32(message.byBot);
    }
    if (message.location !== undefined) {
      Vector2.encode(message.location, writer.uint32(26).fork()).ldelim();
    }
    if (message.distance !== 0) {
      writer.uint32(37).float(message.distance);
    }
    if (message.ballLocation !== undefined) {
      Vector2.encode(message.ballLocation, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GameEvent_DefenderInDefenseAreaPartially {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGameEvent_DefenderInDefenseAreaPartially();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.byTeam = reader.int32() as any;
          break;
        case 2:
          message.byBot = reader.uint32();
          break;
        case 3:
          message.location = Vector2.decode(reader, reader.uint32());
          break;
        case 4:
          message.distance = reader.float();
          break;
        case 5:
          message.ballLocation = Vector2.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GameEvent_DefenderInDefenseAreaPartially {
    return {
      byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : 0,
      byBot: isSet(object.byBot) ? Number(object.byBot) : 0,
      location: isSet(object.location) ? Vector2.fromJSON(object.location) : undefined,
      distance: isSet(object.distance) ? Number(object.distance) : 0,
      ballLocation: isSet(object.ballLocation) ? Vector2.fromJSON(object.ballLocation) : undefined,
    };
  },

  toJSON(message: GameEvent_DefenderInDefenseAreaPartially): unknown {
    const obj: any = {};
    message.byTeam !== undefined && (obj.byTeam = teamToJSON(message.byTeam));
    message.byBot !== undefined && (obj.byBot = Math.round(message.byBot));
    message.location !== undefined && (obj.location = message.location ? Vector2.toJSON(message.location) : undefined);
    message.distance !== undefined && (obj.distance = message.distance);
    message.ballLocation !== undefined &&
      (obj.ballLocation = message.ballLocation ? Vector2.toJSON(message.ballLocation) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GameEvent_DefenderInDefenseAreaPartially>, I>>(
    object: I,
  ): GameEvent_DefenderInDefenseAreaPartially {
    const message = createBaseGameEvent_DefenderInDefenseAreaPartially();
    message.byTeam = object.byTeam ?? 0;
    message.byBot = object.byBot ?? 0;
    message.location = (object.location !== undefined && object.location !== null)
      ? Vector2.fromPartial(object.location)
      : undefined;
    message.distance = object.distance ?? 0;
    message.ballLocation = (object.ballLocation !== undefined && object.ballLocation !== null)
      ? Vector2.fromPartial(object.ballLocation)
      : undefined;
    return message;
  },
};

function createBaseGameEvent_AttackerTouchedBallInDefenseArea(): GameEvent_AttackerTouchedBallInDefenseArea {
  return { byTeam: 0, byBot: 0, location: undefined, distance: 0 };
}

export const GameEvent_AttackerTouchedBallInDefenseArea = {
  encode(message: GameEvent_AttackerTouchedBallInDefenseArea, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.byTeam !== 0) {
      writer.uint32(8).int32(message.byTeam);
    }
    if (message.byBot !== 0) {
      writer.uint32(16).uint32(message.byBot);
    }
    if (message.location !== undefined) {
      Vector2.encode(message.location, writer.uint32(26).fork()).ldelim();
    }
    if (message.distance !== 0) {
      writer.uint32(37).float(message.distance);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GameEvent_AttackerTouchedBallInDefenseArea {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGameEvent_AttackerTouchedBallInDefenseArea();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.byTeam = reader.int32() as any;
          break;
        case 2:
          message.byBot = reader.uint32();
          break;
        case 3:
          message.location = Vector2.decode(reader, reader.uint32());
          break;
        case 4:
          message.distance = reader.float();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GameEvent_AttackerTouchedBallInDefenseArea {
    return {
      byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : 0,
      byBot: isSet(object.byBot) ? Number(object.byBot) : 0,
      location: isSet(object.location) ? Vector2.fromJSON(object.location) : undefined,
      distance: isSet(object.distance) ? Number(object.distance) : 0,
    };
  },

  toJSON(message: GameEvent_AttackerTouchedBallInDefenseArea): unknown {
    const obj: any = {};
    message.byTeam !== undefined && (obj.byTeam = teamToJSON(message.byTeam));
    message.byBot !== undefined && (obj.byBot = Math.round(message.byBot));
    message.location !== undefined && (obj.location = message.location ? Vector2.toJSON(message.location) : undefined);
    message.distance !== undefined && (obj.distance = message.distance);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GameEvent_AttackerTouchedBallInDefenseArea>, I>>(
    object: I,
  ): GameEvent_AttackerTouchedBallInDefenseArea {
    const message = createBaseGameEvent_AttackerTouchedBallInDefenseArea();
    message.byTeam = object.byTeam ?? 0;
    message.byBot = object.byBot ?? 0;
    message.location = (object.location !== undefined && object.location !== null)
      ? Vector2.fromPartial(object.location)
      : undefined;
    message.distance = object.distance ?? 0;
    return message;
  },
};

function createBaseGameEvent_BotKickedBallTooFast(): GameEvent_BotKickedBallTooFast {
  return { byTeam: 0, byBot: 0, location: undefined, initialBallSpeed: 0, chipped: false };
}

export const GameEvent_BotKickedBallTooFast = {
  encode(message: GameEvent_BotKickedBallTooFast, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.byTeam !== 0) {
      writer.uint32(8).int32(message.byTeam);
    }
    if (message.byBot !== 0) {
      writer.uint32(16).uint32(message.byBot);
    }
    if (message.location !== undefined) {
      Vector2.encode(message.location, writer.uint32(26).fork()).ldelim();
    }
    if (message.initialBallSpeed !== 0) {
      writer.uint32(37).float(message.initialBallSpeed);
    }
    if (message.chipped === true) {
      writer.uint32(40).bool(message.chipped);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GameEvent_BotKickedBallTooFast {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGameEvent_BotKickedBallTooFast();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.byTeam = reader.int32() as any;
          break;
        case 2:
          message.byBot = reader.uint32();
          break;
        case 3:
          message.location = Vector2.decode(reader, reader.uint32());
          break;
        case 4:
          message.initialBallSpeed = reader.float();
          break;
        case 5:
          message.chipped = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GameEvent_BotKickedBallTooFast {
    return {
      byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : 0,
      byBot: isSet(object.byBot) ? Number(object.byBot) : 0,
      location: isSet(object.location) ? Vector2.fromJSON(object.location) : undefined,
      initialBallSpeed: isSet(object.initialBallSpeed) ? Number(object.initialBallSpeed) : 0,
      chipped: isSet(object.chipped) ? Boolean(object.chipped) : false,
    };
  },

  toJSON(message: GameEvent_BotKickedBallTooFast): unknown {
    const obj: any = {};
    message.byTeam !== undefined && (obj.byTeam = teamToJSON(message.byTeam));
    message.byBot !== undefined && (obj.byBot = Math.round(message.byBot));
    message.location !== undefined && (obj.location = message.location ? Vector2.toJSON(message.location) : undefined);
    message.initialBallSpeed !== undefined && (obj.initialBallSpeed = message.initialBallSpeed);
    message.chipped !== undefined && (obj.chipped = message.chipped);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GameEvent_BotKickedBallTooFast>, I>>(
    object: I,
  ): GameEvent_BotKickedBallTooFast {
    const message = createBaseGameEvent_BotKickedBallTooFast();
    message.byTeam = object.byTeam ?? 0;
    message.byBot = object.byBot ?? 0;
    message.location = (object.location !== undefined && object.location !== null)
      ? Vector2.fromPartial(object.location)
      : undefined;
    message.initialBallSpeed = object.initialBallSpeed ?? 0;
    message.chipped = object.chipped ?? false;
    return message;
  },
};

function createBaseGameEvent_BotDribbledBallTooFar(): GameEvent_BotDribbledBallTooFar {
  return { byTeam: 0, byBot: 0, start: undefined, end: undefined };
}

export const GameEvent_BotDribbledBallTooFar = {
  encode(message: GameEvent_BotDribbledBallTooFar, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.byTeam !== 0) {
      writer.uint32(8).int32(message.byTeam);
    }
    if (message.byBot !== 0) {
      writer.uint32(16).uint32(message.byBot);
    }
    if (message.start !== undefined) {
      Vector2.encode(message.start, writer.uint32(26).fork()).ldelim();
    }
    if (message.end !== undefined) {
      Vector2.encode(message.end, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GameEvent_BotDribbledBallTooFar {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGameEvent_BotDribbledBallTooFar();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.byTeam = reader.int32() as any;
          break;
        case 2:
          message.byBot = reader.uint32();
          break;
        case 3:
          message.start = Vector2.decode(reader, reader.uint32());
          break;
        case 4:
          message.end = Vector2.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GameEvent_BotDribbledBallTooFar {
    return {
      byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : 0,
      byBot: isSet(object.byBot) ? Number(object.byBot) : 0,
      start: isSet(object.start) ? Vector2.fromJSON(object.start) : undefined,
      end: isSet(object.end) ? Vector2.fromJSON(object.end) : undefined,
    };
  },

  toJSON(message: GameEvent_BotDribbledBallTooFar): unknown {
    const obj: any = {};
    message.byTeam !== undefined && (obj.byTeam = teamToJSON(message.byTeam));
    message.byBot !== undefined && (obj.byBot = Math.round(message.byBot));
    message.start !== undefined && (obj.start = message.start ? Vector2.toJSON(message.start) : undefined);
    message.end !== undefined && (obj.end = message.end ? Vector2.toJSON(message.end) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GameEvent_BotDribbledBallTooFar>, I>>(
    object: I,
  ): GameEvent_BotDribbledBallTooFar {
    const message = createBaseGameEvent_BotDribbledBallTooFar();
    message.byTeam = object.byTeam ?? 0;
    message.byBot = object.byBot ?? 0;
    message.start = (object.start !== undefined && object.start !== null)
      ? Vector2.fromPartial(object.start)
      : undefined;
    message.end = (object.end !== undefined && object.end !== null) ? Vector2.fromPartial(object.end) : undefined;
    return message;
  },
};

function createBaseGameEvent_AttackerTouchedOpponentInDefenseArea(): GameEvent_AttackerTouchedOpponentInDefenseArea {
  return { byTeam: 0, byBot: 0, victim: 0, location: undefined };
}

export const GameEvent_AttackerTouchedOpponentInDefenseArea = {
  encode(
    message: GameEvent_AttackerTouchedOpponentInDefenseArea,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.byTeam !== 0) {
      writer.uint32(8).int32(message.byTeam);
    }
    if (message.byBot !== 0) {
      writer.uint32(16).uint32(message.byBot);
    }
    if (message.victim !== 0) {
      writer.uint32(32).uint32(message.victim);
    }
    if (message.location !== undefined) {
      Vector2.encode(message.location, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GameEvent_AttackerTouchedOpponentInDefenseArea {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGameEvent_AttackerTouchedOpponentInDefenseArea();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.byTeam = reader.int32() as any;
          break;
        case 2:
          message.byBot = reader.uint32();
          break;
        case 4:
          message.victim = reader.uint32();
          break;
        case 3:
          message.location = Vector2.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GameEvent_AttackerTouchedOpponentInDefenseArea {
    return {
      byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : 0,
      byBot: isSet(object.byBot) ? Number(object.byBot) : 0,
      victim: isSet(object.victim) ? Number(object.victim) : 0,
      location: isSet(object.location) ? Vector2.fromJSON(object.location) : undefined,
    };
  },

  toJSON(message: GameEvent_AttackerTouchedOpponentInDefenseArea): unknown {
    const obj: any = {};
    message.byTeam !== undefined && (obj.byTeam = teamToJSON(message.byTeam));
    message.byBot !== undefined && (obj.byBot = Math.round(message.byBot));
    message.victim !== undefined && (obj.victim = Math.round(message.victim));
    message.location !== undefined && (obj.location = message.location ? Vector2.toJSON(message.location) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GameEvent_AttackerTouchedOpponentInDefenseArea>, I>>(
    object: I,
  ): GameEvent_AttackerTouchedOpponentInDefenseArea {
    const message = createBaseGameEvent_AttackerTouchedOpponentInDefenseArea();
    message.byTeam = object.byTeam ?? 0;
    message.byBot = object.byBot ?? 0;
    message.victim = object.victim ?? 0;
    message.location = (object.location !== undefined && object.location !== null)
      ? Vector2.fromPartial(object.location)
      : undefined;
    return message;
  },
};

function createBaseGameEvent_AttackerDoubleTouchedBall(): GameEvent_AttackerDoubleTouchedBall {
  return { byTeam: 0, byBot: 0, location: undefined };
}

export const GameEvent_AttackerDoubleTouchedBall = {
  encode(message: GameEvent_AttackerDoubleTouchedBall, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.byTeam !== 0) {
      writer.uint32(8).int32(message.byTeam);
    }
    if (message.byBot !== 0) {
      writer.uint32(16).uint32(message.byBot);
    }
    if (message.location !== undefined) {
      Vector2.encode(message.location, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GameEvent_AttackerDoubleTouchedBall {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGameEvent_AttackerDoubleTouchedBall();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.byTeam = reader.int32() as any;
          break;
        case 2:
          message.byBot = reader.uint32();
          break;
        case 3:
          message.location = Vector2.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GameEvent_AttackerDoubleTouchedBall {
    return {
      byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : 0,
      byBot: isSet(object.byBot) ? Number(object.byBot) : 0,
      location: isSet(object.location) ? Vector2.fromJSON(object.location) : undefined,
    };
  },

  toJSON(message: GameEvent_AttackerDoubleTouchedBall): unknown {
    const obj: any = {};
    message.byTeam !== undefined && (obj.byTeam = teamToJSON(message.byTeam));
    message.byBot !== undefined && (obj.byBot = Math.round(message.byBot));
    message.location !== undefined && (obj.location = message.location ? Vector2.toJSON(message.location) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GameEvent_AttackerDoubleTouchedBall>, I>>(
    object: I,
  ): GameEvent_AttackerDoubleTouchedBall {
    const message = createBaseGameEvent_AttackerDoubleTouchedBall();
    message.byTeam = object.byTeam ?? 0;
    message.byBot = object.byBot ?? 0;
    message.location = (object.location !== undefined && object.location !== null)
      ? Vector2.fromPartial(object.location)
      : undefined;
    return message;
  },
};

function createBaseGameEvent_AttackerTooCloseToDefenseArea(): GameEvent_AttackerTooCloseToDefenseArea {
  return { byTeam: 0, byBot: 0, location: undefined, distance: 0, ballLocation: undefined };
}

export const GameEvent_AttackerTooCloseToDefenseArea = {
  encode(message: GameEvent_AttackerTooCloseToDefenseArea, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.byTeam !== 0) {
      writer.uint32(8).int32(message.byTeam);
    }
    if (message.byBot !== 0) {
      writer.uint32(16).uint32(message.byBot);
    }
    if (message.location !== undefined) {
      Vector2.encode(message.location, writer.uint32(26).fork()).ldelim();
    }
    if (message.distance !== 0) {
      writer.uint32(37).float(message.distance);
    }
    if (message.ballLocation !== undefined) {
      Vector2.encode(message.ballLocation, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GameEvent_AttackerTooCloseToDefenseArea {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGameEvent_AttackerTooCloseToDefenseArea();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.byTeam = reader.int32() as any;
          break;
        case 2:
          message.byBot = reader.uint32();
          break;
        case 3:
          message.location = Vector2.decode(reader, reader.uint32());
          break;
        case 4:
          message.distance = reader.float();
          break;
        case 5:
          message.ballLocation = Vector2.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GameEvent_AttackerTooCloseToDefenseArea {
    return {
      byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : 0,
      byBot: isSet(object.byBot) ? Number(object.byBot) : 0,
      location: isSet(object.location) ? Vector2.fromJSON(object.location) : undefined,
      distance: isSet(object.distance) ? Number(object.distance) : 0,
      ballLocation: isSet(object.ballLocation) ? Vector2.fromJSON(object.ballLocation) : undefined,
    };
  },

  toJSON(message: GameEvent_AttackerTooCloseToDefenseArea): unknown {
    const obj: any = {};
    message.byTeam !== undefined && (obj.byTeam = teamToJSON(message.byTeam));
    message.byBot !== undefined && (obj.byBot = Math.round(message.byBot));
    message.location !== undefined && (obj.location = message.location ? Vector2.toJSON(message.location) : undefined);
    message.distance !== undefined && (obj.distance = message.distance);
    message.ballLocation !== undefined &&
      (obj.ballLocation = message.ballLocation ? Vector2.toJSON(message.ballLocation) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GameEvent_AttackerTooCloseToDefenseArea>, I>>(
    object: I,
  ): GameEvent_AttackerTooCloseToDefenseArea {
    const message = createBaseGameEvent_AttackerTooCloseToDefenseArea();
    message.byTeam = object.byTeam ?? 0;
    message.byBot = object.byBot ?? 0;
    message.location = (object.location !== undefined && object.location !== null)
      ? Vector2.fromPartial(object.location)
      : undefined;
    message.distance = object.distance ?? 0;
    message.ballLocation = (object.ballLocation !== undefined && object.ballLocation !== null)
      ? Vector2.fromPartial(object.ballLocation)
      : undefined;
    return message;
  },
};

function createBaseGameEvent_BotHeldBallDeliberately(): GameEvent_BotHeldBallDeliberately {
  return { byTeam: 0, byBot: 0, location: undefined, duration: 0 };
}

export const GameEvent_BotHeldBallDeliberately = {
  encode(message: GameEvent_BotHeldBallDeliberately, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.byTeam !== 0) {
      writer.uint32(8).int32(message.byTeam);
    }
    if (message.byBot !== 0) {
      writer.uint32(16).uint32(message.byBot);
    }
    if (message.location !== undefined) {
      Vector2.encode(message.location, writer.uint32(26).fork()).ldelim();
    }
    if (message.duration !== 0) {
      writer.uint32(37).float(message.duration);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GameEvent_BotHeldBallDeliberately {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGameEvent_BotHeldBallDeliberately();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.byTeam = reader.int32() as any;
          break;
        case 2:
          message.byBot = reader.uint32();
          break;
        case 3:
          message.location = Vector2.decode(reader, reader.uint32());
          break;
        case 4:
          message.duration = reader.float();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GameEvent_BotHeldBallDeliberately {
    return {
      byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : 0,
      byBot: isSet(object.byBot) ? Number(object.byBot) : 0,
      location: isSet(object.location) ? Vector2.fromJSON(object.location) : undefined,
      duration: isSet(object.duration) ? Number(object.duration) : 0,
    };
  },

  toJSON(message: GameEvent_BotHeldBallDeliberately): unknown {
    const obj: any = {};
    message.byTeam !== undefined && (obj.byTeam = teamToJSON(message.byTeam));
    message.byBot !== undefined && (obj.byBot = Math.round(message.byBot));
    message.location !== undefined && (obj.location = message.location ? Vector2.toJSON(message.location) : undefined);
    message.duration !== undefined && (obj.duration = message.duration);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GameEvent_BotHeldBallDeliberately>, I>>(
    object: I,
  ): GameEvent_BotHeldBallDeliberately {
    const message = createBaseGameEvent_BotHeldBallDeliberately();
    message.byTeam = object.byTeam ?? 0;
    message.byBot = object.byBot ?? 0;
    message.location = (object.location !== undefined && object.location !== null)
      ? Vector2.fromPartial(object.location)
      : undefined;
    message.duration = object.duration ?? 0;
    return message;
  },
};

function createBaseGameEvent_BotInterferedPlacement(): GameEvent_BotInterferedPlacement {
  return { byTeam: 0, byBot: 0, location: undefined };
}

export const GameEvent_BotInterferedPlacement = {
  encode(message: GameEvent_BotInterferedPlacement, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.byTeam !== 0) {
      writer.uint32(8).int32(message.byTeam);
    }
    if (message.byBot !== 0) {
      writer.uint32(16).uint32(message.byBot);
    }
    if (message.location !== undefined) {
      Vector2.encode(message.location, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GameEvent_BotInterferedPlacement {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGameEvent_BotInterferedPlacement();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.byTeam = reader.int32() as any;
          break;
        case 2:
          message.byBot = reader.uint32();
          break;
        case 3:
          message.location = Vector2.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GameEvent_BotInterferedPlacement {
    return {
      byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : 0,
      byBot: isSet(object.byBot) ? Number(object.byBot) : 0,
      location: isSet(object.location) ? Vector2.fromJSON(object.location) : undefined,
    };
  },

  toJSON(message: GameEvent_BotInterferedPlacement): unknown {
    const obj: any = {};
    message.byTeam !== undefined && (obj.byTeam = teamToJSON(message.byTeam));
    message.byBot !== undefined && (obj.byBot = Math.round(message.byBot));
    message.location !== undefined && (obj.location = message.location ? Vector2.toJSON(message.location) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GameEvent_BotInterferedPlacement>, I>>(
    object: I,
  ): GameEvent_BotInterferedPlacement {
    const message = createBaseGameEvent_BotInterferedPlacement();
    message.byTeam = object.byTeam ?? 0;
    message.byBot = object.byBot ?? 0;
    message.location = (object.location !== undefined && object.location !== null)
      ? Vector2.fromPartial(object.location)
      : undefined;
    return message;
  },
};

function createBaseGameEvent_MultipleCards(): GameEvent_MultipleCards {
  return { byTeam: 0 };
}

export const GameEvent_MultipleCards = {
  encode(message: GameEvent_MultipleCards, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.byTeam !== 0) {
      writer.uint32(8).int32(message.byTeam);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GameEvent_MultipleCards {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGameEvent_MultipleCards();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.byTeam = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GameEvent_MultipleCards {
    return { byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : 0 };
  },

  toJSON(message: GameEvent_MultipleCards): unknown {
    const obj: any = {};
    message.byTeam !== undefined && (obj.byTeam = teamToJSON(message.byTeam));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GameEvent_MultipleCards>, I>>(object: I): GameEvent_MultipleCards {
    const message = createBaseGameEvent_MultipleCards();
    message.byTeam = object.byTeam ?? 0;
    return message;
  },
};

function createBaseGameEvent_MultipleFouls(): GameEvent_MultipleFouls {
  return { byTeam: 0, causedGameEvents: [] };
}

export const GameEvent_MultipleFouls = {
  encode(message: GameEvent_MultipleFouls, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.byTeam !== 0) {
      writer.uint32(8).int32(message.byTeam);
    }
    for (const v of message.causedGameEvents) {
      GameEvent.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GameEvent_MultipleFouls {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGameEvent_MultipleFouls();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.byTeam = reader.int32() as any;
          break;
        case 2:
          message.causedGameEvents.push(GameEvent.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GameEvent_MultipleFouls {
    return {
      byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : 0,
      causedGameEvents: Array.isArray(object?.causedGameEvents)
        ? object.causedGameEvents.map((e: any) => GameEvent.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GameEvent_MultipleFouls): unknown {
    const obj: any = {};
    message.byTeam !== undefined && (obj.byTeam = teamToJSON(message.byTeam));
    if (message.causedGameEvents) {
      obj.causedGameEvents = message.causedGameEvents.map((e) => e ? GameEvent.toJSON(e) : undefined);
    } else {
      obj.causedGameEvents = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GameEvent_MultipleFouls>, I>>(object: I): GameEvent_MultipleFouls {
    const message = createBaseGameEvent_MultipleFouls();
    message.byTeam = object.byTeam ?? 0;
    message.causedGameEvents = object.causedGameEvents?.map((e) => GameEvent.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGameEvent_MultiplePlacementFailures(): GameEvent_MultiplePlacementFailures {
  return { byTeam: 0 };
}

export const GameEvent_MultiplePlacementFailures = {
  encode(message: GameEvent_MultiplePlacementFailures, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.byTeam !== 0) {
      writer.uint32(8).int32(message.byTeam);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GameEvent_MultiplePlacementFailures {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGameEvent_MultiplePlacementFailures();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.byTeam = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GameEvent_MultiplePlacementFailures {
    return { byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : 0 };
  },

  toJSON(message: GameEvent_MultiplePlacementFailures): unknown {
    const obj: any = {};
    message.byTeam !== undefined && (obj.byTeam = teamToJSON(message.byTeam));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GameEvent_MultiplePlacementFailures>, I>>(
    object: I,
  ): GameEvent_MultiplePlacementFailures {
    const message = createBaseGameEvent_MultiplePlacementFailures();
    message.byTeam = object.byTeam ?? 0;
    return message;
  },
};

function createBaseGameEvent_KickTimeout(): GameEvent_KickTimeout {
  return { byTeam: 0, location: undefined, time: 0 };
}

export const GameEvent_KickTimeout = {
  encode(message: GameEvent_KickTimeout, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.byTeam !== 0) {
      writer.uint32(8).int32(message.byTeam);
    }
    if (message.location !== undefined) {
      Vector2.encode(message.location, writer.uint32(18).fork()).ldelim();
    }
    if (message.time !== 0) {
      writer.uint32(29).float(message.time);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GameEvent_KickTimeout {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGameEvent_KickTimeout();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.byTeam = reader.int32() as any;
          break;
        case 2:
          message.location = Vector2.decode(reader, reader.uint32());
          break;
        case 3:
          message.time = reader.float();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GameEvent_KickTimeout {
    return {
      byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : 0,
      location: isSet(object.location) ? Vector2.fromJSON(object.location) : undefined,
      time: isSet(object.time) ? Number(object.time) : 0,
    };
  },

  toJSON(message: GameEvent_KickTimeout): unknown {
    const obj: any = {};
    message.byTeam !== undefined && (obj.byTeam = teamToJSON(message.byTeam));
    message.location !== undefined && (obj.location = message.location ? Vector2.toJSON(message.location) : undefined);
    message.time !== undefined && (obj.time = message.time);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GameEvent_KickTimeout>, I>>(object: I): GameEvent_KickTimeout {
    const message = createBaseGameEvent_KickTimeout();
    message.byTeam = object.byTeam ?? 0;
    message.location = (object.location !== undefined && object.location !== null)
      ? Vector2.fromPartial(object.location)
      : undefined;
    message.time = object.time ?? 0;
    return message;
  },
};

function createBaseGameEvent_NoProgressInGame(): GameEvent_NoProgressInGame {
  return { location: undefined, time: 0 };
}

export const GameEvent_NoProgressInGame = {
  encode(message: GameEvent_NoProgressInGame, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.location !== undefined) {
      Vector2.encode(message.location, writer.uint32(10).fork()).ldelim();
    }
    if (message.time !== 0) {
      writer.uint32(21).float(message.time);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GameEvent_NoProgressInGame {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGameEvent_NoProgressInGame();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.location = Vector2.decode(reader, reader.uint32());
          break;
        case 2:
          message.time = reader.float();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GameEvent_NoProgressInGame {
    return {
      location: isSet(object.location) ? Vector2.fromJSON(object.location) : undefined,
      time: isSet(object.time) ? Number(object.time) : 0,
    };
  },

  toJSON(message: GameEvent_NoProgressInGame): unknown {
    const obj: any = {};
    message.location !== undefined && (obj.location = message.location ? Vector2.toJSON(message.location) : undefined);
    message.time !== undefined && (obj.time = message.time);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GameEvent_NoProgressInGame>, I>>(object: I): GameEvent_NoProgressInGame {
    const message = createBaseGameEvent_NoProgressInGame();
    message.location = (object.location !== undefined && object.location !== null)
      ? Vector2.fromPartial(object.location)
      : undefined;
    message.time = object.time ?? 0;
    return message;
  },
};

function createBaseGameEvent_PlacementFailed(): GameEvent_PlacementFailed {
  return { byTeam: 0, remainingDistance: 0 };
}

export const GameEvent_PlacementFailed = {
  encode(message: GameEvent_PlacementFailed, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.byTeam !== 0) {
      writer.uint32(8).int32(message.byTeam);
    }
    if (message.remainingDistance !== 0) {
      writer.uint32(21).float(message.remainingDistance);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GameEvent_PlacementFailed {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGameEvent_PlacementFailed();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.byTeam = reader.int32() as any;
          break;
        case 2:
          message.remainingDistance = reader.float();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GameEvent_PlacementFailed {
    return {
      byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : 0,
      remainingDistance: isSet(object.remainingDistance) ? Number(object.remainingDistance) : 0,
    };
  },

  toJSON(message: GameEvent_PlacementFailed): unknown {
    const obj: any = {};
    message.byTeam !== undefined && (obj.byTeam = teamToJSON(message.byTeam));
    message.remainingDistance !== undefined && (obj.remainingDistance = message.remainingDistance);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GameEvent_PlacementFailed>, I>>(object: I): GameEvent_PlacementFailed {
    const message = createBaseGameEvent_PlacementFailed();
    message.byTeam = object.byTeam ?? 0;
    message.remainingDistance = object.remainingDistance ?? 0;
    return message;
  },
};

function createBaseGameEvent_UnsportingBehaviorMinor(): GameEvent_UnsportingBehaviorMinor {
  return { byTeam: 0, reason: "" };
}

export const GameEvent_UnsportingBehaviorMinor = {
  encode(message: GameEvent_UnsportingBehaviorMinor, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.byTeam !== 0) {
      writer.uint32(8).int32(message.byTeam);
    }
    if (message.reason !== "") {
      writer.uint32(18).string(message.reason);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GameEvent_UnsportingBehaviorMinor {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGameEvent_UnsportingBehaviorMinor();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.byTeam = reader.int32() as any;
          break;
        case 2:
          message.reason = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GameEvent_UnsportingBehaviorMinor {
    return {
      byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : 0,
      reason: isSet(object.reason) ? String(object.reason) : "",
    };
  },

  toJSON(message: GameEvent_UnsportingBehaviorMinor): unknown {
    const obj: any = {};
    message.byTeam !== undefined && (obj.byTeam = teamToJSON(message.byTeam));
    message.reason !== undefined && (obj.reason = message.reason);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GameEvent_UnsportingBehaviorMinor>, I>>(
    object: I,
  ): GameEvent_UnsportingBehaviorMinor {
    const message = createBaseGameEvent_UnsportingBehaviorMinor();
    message.byTeam = object.byTeam ?? 0;
    message.reason = object.reason ?? "";
    return message;
  },
};

function createBaseGameEvent_UnsportingBehaviorMajor(): GameEvent_UnsportingBehaviorMajor {
  return { byTeam: 0, reason: "" };
}

export const GameEvent_UnsportingBehaviorMajor = {
  encode(message: GameEvent_UnsportingBehaviorMajor, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.byTeam !== 0) {
      writer.uint32(8).int32(message.byTeam);
    }
    if (message.reason !== "") {
      writer.uint32(18).string(message.reason);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GameEvent_UnsportingBehaviorMajor {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGameEvent_UnsportingBehaviorMajor();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.byTeam = reader.int32() as any;
          break;
        case 2:
          message.reason = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GameEvent_UnsportingBehaviorMajor {
    return {
      byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : 0,
      reason: isSet(object.reason) ? String(object.reason) : "",
    };
  },

  toJSON(message: GameEvent_UnsportingBehaviorMajor): unknown {
    const obj: any = {};
    message.byTeam !== undefined && (obj.byTeam = teamToJSON(message.byTeam));
    message.reason !== undefined && (obj.reason = message.reason);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GameEvent_UnsportingBehaviorMajor>, I>>(
    object: I,
  ): GameEvent_UnsportingBehaviorMajor {
    const message = createBaseGameEvent_UnsportingBehaviorMajor();
    message.byTeam = object.byTeam ?? 0;
    message.reason = object.reason ?? "";
    return message;
  },
};

function createBaseGameEvent_KeeperHeldBall(): GameEvent_KeeperHeldBall {
  return { byTeam: 0, location: undefined, duration: 0 };
}

export const GameEvent_KeeperHeldBall = {
  encode(message: GameEvent_KeeperHeldBall, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.byTeam !== 0) {
      writer.uint32(8).int32(message.byTeam);
    }
    if (message.location !== undefined) {
      Vector2.encode(message.location, writer.uint32(18).fork()).ldelim();
    }
    if (message.duration !== 0) {
      writer.uint32(29).float(message.duration);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GameEvent_KeeperHeldBall {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGameEvent_KeeperHeldBall();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.byTeam = reader.int32() as any;
          break;
        case 2:
          message.location = Vector2.decode(reader, reader.uint32());
          break;
        case 3:
          message.duration = reader.float();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GameEvent_KeeperHeldBall {
    return {
      byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : 0,
      location: isSet(object.location) ? Vector2.fromJSON(object.location) : undefined,
      duration: isSet(object.duration) ? Number(object.duration) : 0,
    };
  },

  toJSON(message: GameEvent_KeeperHeldBall): unknown {
    const obj: any = {};
    message.byTeam !== undefined && (obj.byTeam = teamToJSON(message.byTeam));
    message.location !== undefined && (obj.location = message.location ? Vector2.toJSON(message.location) : undefined);
    message.duration !== undefined && (obj.duration = message.duration);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GameEvent_KeeperHeldBall>, I>>(object: I): GameEvent_KeeperHeldBall {
    const message = createBaseGameEvent_KeeperHeldBall();
    message.byTeam = object.byTeam ?? 0;
    message.location = (object.location !== undefined && object.location !== null)
      ? Vector2.fromPartial(object.location)
      : undefined;
    message.duration = object.duration ?? 0;
    return message;
  },
};

function createBaseGameEvent_PlacementSucceeded(): GameEvent_PlacementSucceeded {
  return { byTeam: 0, timeTaken: 0, precision: 0, distance: 0 };
}

export const GameEvent_PlacementSucceeded = {
  encode(message: GameEvent_PlacementSucceeded, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.byTeam !== 0) {
      writer.uint32(8).int32(message.byTeam);
    }
    if (message.timeTaken !== 0) {
      writer.uint32(21).float(message.timeTaken);
    }
    if (message.precision !== 0) {
      writer.uint32(29).float(message.precision);
    }
    if (message.distance !== 0) {
      writer.uint32(37).float(message.distance);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GameEvent_PlacementSucceeded {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGameEvent_PlacementSucceeded();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.byTeam = reader.int32() as any;
          break;
        case 2:
          message.timeTaken = reader.float();
          break;
        case 3:
          message.precision = reader.float();
          break;
        case 4:
          message.distance = reader.float();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GameEvent_PlacementSucceeded {
    return {
      byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : 0,
      timeTaken: isSet(object.timeTaken) ? Number(object.timeTaken) : 0,
      precision: isSet(object.precision) ? Number(object.precision) : 0,
      distance: isSet(object.distance) ? Number(object.distance) : 0,
    };
  },

  toJSON(message: GameEvent_PlacementSucceeded): unknown {
    const obj: any = {};
    message.byTeam !== undefined && (obj.byTeam = teamToJSON(message.byTeam));
    message.timeTaken !== undefined && (obj.timeTaken = message.timeTaken);
    message.precision !== undefined && (obj.precision = message.precision);
    message.distance !== undefined && (obj.distance = message.distance);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GameEvent_PlacementSucceeded>, I>>(object: I): GameEvent_PlacementSucceeded {
    const message = createBaseGameEvent_PlacementSucceeded();
    message.byTeam = object.byTeam ?? 0;
    message.timeTaken = object.timeTaken ?? 0;
    message.precision = object.precision ?? 0;
    message.distance = object.distance ?? 0;
    return message;
  },
};

function createBaseGameEvent_Prepared(): GameEvent_Prepared {
  return { timeTaken: 0 };
}

export const GameEvent_Prepared = {
  encode(message: GameEvent_Prepared, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.timeTaken !== 0) {
      writer.uint32(13).float(message.timeTaken);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GameEvent_Prepared {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGameEvent_Prepared();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.timeTaken = reader.float();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GameEvent_Prepared {
    return { timeTaken: isSet(object.timeTaken) ? Number(object.timeTaken) : 0 };
  },

  toJSON(message: GameEvent_Prepared): unknown {
    const obj: any = {};
    message.timeTaken !== undefined && (obj.timeTaken = message.timeTaken);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GameEvent_Prepared>, I>>(object: I): GameEvent_Prepared {
    const message = createBaseGameEvent_Prepared();
    message.timeTaken = object.timeTaken ?? 0;
    return message;
  },
};

function createBaseGameEvent_BotSubstitution(): GameEvent_BotSubstitution {
  return { byTeam: 0 };
}

export const GameEvent_BotSubstitution = {
  encode(message: GameEvent_BotSubstitution, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.byTeam !== 0) {
      writer.uint32(8).int32(message.byTeam);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GameEvent_BotSubstitution {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGameEvent_BotSubstitution();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.byTeam = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GameEvent_BotSubstitution {
    return { byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : 0 };
  },

  toJSON(message: GameEvent_BotSubstitution): unknown {
    const obj: any = {};
    message.byTeam !== undefined && (obj.byTeam = teamToJSON(message.byTeam));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GameEvent_BotSubstitution>, I>>(object: I): GameEvent_BotSubstitution {
    const message = createBaseGameEvent_BotSubstitution();
    message.byTeam = object.byTeam ?? 0;
    return message;
  },
};

function createBaseGameEvent_ChallengeFlag(): GameEvent_ChallengeFlag {
  return { byTeam: 0 };
}

export const GameEvent_ChallengeFlag = {
  encode(message: GameEvent_ChallengeFlag, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.byTeam !== 0) {
      writer.uint32(8).int32(message.byTeam);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GameEvent_ChallengeFlag {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGameEvent_ChallengeFlag();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.byTeam = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GameEvent_ChallengeFlag {
    return { byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : 0 };
  },

  toJSON(message: GameEvent_ChallengeFlag): unknown {
    const obj: any = {};
    message.byTeam !== undefined && (obj.byTeam = teamToJSON(message.byTeam));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GameEvent_ChallengeFlag>, I>>(object: I): GameEvent_ChallengeFlag {
    const message = createBaseGameEvent_ChallengeFlag();
    message.byTeam = object.byTeam ?? 0;
    return message;
  },
};

function createBaseGameEvent_EmergencyStop(): GameEvent_EmergencyStop {
  return { byTeam: 0 };
}

export const GameEvent_EmergencyStop = {
  encode(message: GameEvent_EmergencyStop, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.byTeam !== 0) {
      writer.uint32(8).int32(message.byTeam);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GameEvent_EmergencyStop {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGameEvent_EmergencyStop();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.byTeam = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GameEvent_EmergencyStop {
    return { byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : 0 };
  },

  toJSON(message: GameEvent_EmergencyStop): unknown {
    const obj: any = {};
    message.byTeam !== undefined && (obj.byTeam = teamToJSON(message.byTeam));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GameEvent_EmergencyStop>, I>>(object: I): GameEvent_EmergencyStop {
    const message = createBaseGameEvent_EmergencyStop();
    message.byTeam = object.byTeam ?? 0;
    return message;
  },
};

function createBaseGameEvent_TooManyRobots(): GameEvent_TooManyRobots {
  return { byTeam: 0, numRobotsAllowed: 0, numRobotsOnField: 0, ballLocation: undefined };
}

export const GameEvent_TooManyRobots = {
  encode(message: GameEvent_TooManyRobots, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.byTeam !== 0) {
      writer.uint32(8).int32(message.byTeam);
    }
    if (message.numRobotsAllowed !== 0) {
      writer.uint32(16).int32(message.numRobotsAllowed);
    }
    if (message.numRobotsOnField !== 0) {
      writer.uint32(24).int32(message.numRobotsOnField);
    }
    if (message.ballLocation !== undefined) {
      Vector2.encode(message.ballLocation, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GameEvent_TooManyRobots {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGameEvent_TooManyRobots();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.byTeam = reader.int32() as any;
          break;
        case 2:
          message.numRobotsAllowed = reader.int32();
          break;
        case 3:
          message.numRobotsOnField = reader.int32();
          break;
        case 4:
          message.ballLocation = Vector2.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GameEvent_TooManyRobots {
    return {
      byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : 0,
      numRobotsAllowed: isSet(object.numRobotsAllowed) ? Number(object.numRobotsAllowed) : 0,
      numRobotsOnField: isSet(object.numRobotsOnField) ? Number(object.numRobotsOnField) : 0,
      ballLocation: isSet(object.ballLocation) ? Vector2.fromJSON(object.ballLocation) : undefined,
    };
  },

  toJSON(message: GameEvent_TooManyRobots): unknown {
    const obj: any = {};
    message.byTeam !== undefined && (obj.byTeam = teamToJSON(message.byTeam));
    message.numRobotsAllowed !== undefined && (obj.numRobotsAllowed = Math.round(message.numRobotsAllowed));
    message.numRobotsOnField !== undefined && (obj.numRobotsOnField = Math.round(message.numRobotsOnField));
    message.ballLocation !== undefined &&
      (obj.ballLocation = message.ballLocation ? Vector2.toJSON(message.ballLocation) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GameEvent_TooManyRobots>, I>>(object: I): GameEvent_TooManyRobots {
    const message = createBaseGameEvent_TooManyRobots();
    message.byTeam = object.byTeam ?? 0;
    message.numRobotsAllowed = object.numRobotsAllowed ?? 0;
    message.numRobotsOnField = object.numRobotsOnField ?? 0;
    message.ballLocation = (object.ballLocation !== undefined && object.ballLocation !== null)
      ? Vector2.fromPartial(object.ballLocation)
      : undefined;
    return message;
  },
};

function createBaseGameEvent_BoundaryCrossing(): GameEvent_BoundaryCrossing {
  return { byTeam: 0, location: undefined };
}

export const GameEvent_BoundaryCrossing = {
  encode(message: GameEvent_BoundaryCrossing, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.byTeam !== 0) {
      writer.uint32(8).int32(message.byTeam);
    }
    if (message.location !== undefined) {
      Vector2.encode(message.location, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GameEvent_BoundaryCrossing {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGameEvent_BoundaryCrossing();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.byTeam = reader.int32() as any;
          break;
        case 2:
          message.location = Vector2.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GameEvent_BoundaryCrossing {
    return {
      byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : 0,
      location: isSet(object.location) ? Vector2.fromJSON(object.location) : undefined,
    };
  },

  toJSON(message: GameEvent_BoundaryCrossing): unknown {
    const obj: any = {};
    message.byTeam !== undefined && (obj.byTeam = teamToJSON(message.byTeam));
    message.location !== undefined && (obj.location = message.location ? Vector2.toJSON(message.location) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GameEvent_BoundaryCrossing>, I>>(object: I): GameEvent_BoundaryCrossing {
    const message = createBaseGameEvent_BoundaryCrossing();
    message.byTeam = object.byTeam ?? 0;
    message.location = (object.location !== undefined && object.location !== null)
      ? Vector2.fromPartial(object.location)
      : undefined;
    return message;
  },
};

function createBaseGameEvent_PenaltyKickFailed(): GameEvent_PenaltyKickFailed {
  return { byTeam: 0, location: undefined, reason: "" };
}

export const GameEvent_PenaltyKickFailed = {
  encode(message: GameEvent_PenaltyKickFailed, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.byTeam !== 0) {
      writer.uint32(8).int32(message.byTeam);
    }
    if (message.location !== undefined) {
      Vector2.encode(message.location, writer.uint32(18).fork()).ldelim();
    }
    if (message.reason !== "") {
      writer.uint32(26).string(message.reason);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GameEvent_PenaltyKickFailed {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGameEvent_PenaltyKickFailed();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.byTeam = reader.int32() as any;
          break;
        case 2:
          message.location = Vector2.decode(reader, reader.uint32());
          break;
        case 3:
          message.reason = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GameEvent_PenaltyKickFailed {
    return {
      byTeam: isSet(object.byTeam) ? teamFromJSON(object.byTeam) : 0,
      location: isSet(object.location) ? Vector2.fromJSON(object.location) : undefined,
      reason: isSet(object.reason) ? String(object.reason) : "",
    };
  },

  toJSON(message: GameEvent_PenaltyKickFailed): unknown {
    const obj: any = {};
    message.byTeam !== undefined && (obj.byTeam = teamToJSON(message.byTeam));
    message.location !== undefined && (obj.location = message.location ? Vector2.toJSON(message.location) : undefined);
    message.reason !== undefined && (obj.reason = message.reason);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GameEvent_PenaltyKickFailed>, I>>(object: I): GameEvent_PenaltyKickFailed {
    const message = createBaseGameEvent_PenaltyKickFailed();
    message.byTeam = object.byTeam ?? 0;
    message.location = (object.location !== undefined && object.location !== null)
      ? Vector2.fromPartial(object.location)
      : undefined;
    message.reason = object.reason ?? "";
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var tsProtoGlobalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends { $case: string } ? { [K in keyof Omit<T, "$case">]?: DeepPartial<T[K]> } & { $case: T["$case"] }
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new tsProtoGlobalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
