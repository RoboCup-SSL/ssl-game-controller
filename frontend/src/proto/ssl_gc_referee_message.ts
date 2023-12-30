/* eslint-disable */
import { GameEvent } from "./ssl_gc_game_event";

/** MatchType is a meta information about the current match for easier log processing */
export enum MatchType {
  /** UNKNOWN_MATCH - not set */
  UNKNOWN_MATCH = "UNKNOWN_MATCH",
  /** GROUP_PHASE - match is part of the group phase */
  GROUP_PHASE = "GROUP_PHASE",
  /** ELIMINATION_PHASE - match is part of the elimination phase */
  ELIMINATION_PHASE = "ELIMINATION_PHASE",
  /** FRIENDLY - a friendly match, not part of a tournament */
  FRIENDLY = "FRIENDLY",
  UNRECOGNIZED = "UNRECOGNIZED",
}

export function matchTypeFromJSON(object: any): MatchType {
  switch (object) {
    case 0:
    case "UNKNOWN_MATCH":
      return MatchType.UNKNOWN_MATCH;
    case 1:
    case "GROUP_PHASE":
      return MatchType.GROUP_PHASE;
    case 2:
    case "ELIMINATION_PHASE":
      return MatchType.ELIMINATION_PHASE;
    case 3:
    case "FRIENDLY":
      return MatchType.FRIENDLY;
    case -1:
    case "UNRECOGNIZED":
    default:
      return MatchType.UNRECOGNIZED;
  }
}

export function matchTypeToJSON(object: MatchType): string {
  switch (object) {
    case MatchType.UNKNOWN_MATCH:
      return "UNKNOWN_MATCH";
    case MatchType.GROUP_PHASE:
      return "GROUP_PHASE";
    case MatchType.ELIMINATION_PHASE:
      return "ELIMINATION_PHASE";
    case MatchType.FRIENDLY:
      return "FRIENDLY";
    case MatchType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Each UDP packet contains one of these messages. */
export interface Referee {
  /**
   * A random UUID of the source that is kept constant at the source while running
   * If multiple sources are broadcasting to the same network, this id can be used to identify individual sources
   */
  sourceIdentifier?:
    | string
    | undefined;
  /** The match type is a meta information about the current match that helps to process the logs after a competition */
  matchType?:
    | MatchType
    | undefined;
  /**
   * The UNIX timestamp when the packet was sent, in microseconds.
   * Divide by 1,000,000 to get a time_t.
   */
  packetTimestamp?: number | undefined;
  stage?:
    | Referee_Stage
    | undefined;
  /**
   * The number of microseconds left in the stage.
   * The following stages have this value; the rest do not:
   * NORMAL_FIRST_HALF
   * NORMAL_HALF_TIME
   * NORMAL_SECOND_HALF
   * EXTRA_TIME_BREAK
   * EXTRA_FIRST_HALF
   * EXTRA_HALF_TIME
   * EXTRA_SECOND_HALF
   * PENALTY_SHOOTOUT_BREAK
   *
   * If the stage runs over its specified time, this value
   * becomes negative.
   */
  stageTimeLeft?: number | undefined;
  command?:
    | Referee_Command
    | undefined;
  /** The number of commands issued since startup (mod 2^32). */
  commandCounter?:
    | number
    | undefined;
  /**
   * The UNIX timestamp when the command was issued, in microseconds.
   * This value changes only when a new command is issued, not on each packet.
   */
  commandTimestamp?:
    | number
    | undefined;
  /** Information about the two teams. */
  yellow?: Referee_TeamInfo | undefined;
  blue?: Referee_TeamInfo | undefined;
  designatedPosition?:
    | Referee_Point
    | undefined;
  /**
   * Information about the direction of play.
   * True, if the blue team will have it's goal on the positive x-axis of the ssl-vision coordinate system.
   * Obviously, the yellow team will play on the opposite half.
   */
  blueTeamOnPositiveHalf?:
    | boolean
    | undefined;
  /** The command that will be issued after the current stoppage and ball placement to continue the game. */
  nextCommand?: Referee_Command | undefined;
  gameEvents?: GameEvent[] | undefined;
  gameEventProposals?:
    | GameEventProposalGroup[]
    | undefined;
  /**
   * The time in microseconds that is remaining until the current action times out
   * The time will not be reset. It can get negative.
   * An autoRef would raise an appropriate event, if the time gets negative.
   * Possible actions where this time is relevant:
   *  * free kicks
   *  * kickoff, penalty kick, force start
   *  * ball placement
   */
  currentActionTimeRemaining?: number | undefined;
}

/** These are the "coarse" stages of the game. */
export enum Referee_Stage {
  /**
   * NORMAL_FIRST_HALF_PRE - The first half is about to start.
   * A kickoff is called within this stage.
   * This stage ends with the NORMAL_START.
   */
  NORMAL_FIRST_HALF_PRE = "NORMAL_FIRST_HALF_PRE",
  /** NORMAL_FIRST_HALF - The first half of the normal game, before half time. */
  NORMAL_FIRST_HALF = "NORMAL_FIRST_HALF",
  /** NORMAL_HALF_TIME - Half time between first and second halves. */
  NORMAL_HALF_TIME = "NORMAL_HALF_TIME",
  /**
   * NORMAL_SECOND_HALF_PRE - The second half is about to start.
   * A kickoff is called within this stage.
   * This stage ends with the NORMAL_START.
   */
  NORMAL_SECOND_HALF_PRE = "NORMAL_SECOND_HALF_PRE",
  /** NORMAL_SECOND_HALF - The second half of the normal game, after half time. */
  NORMAL_SECOND_HALF = "NORMAL_SECOND_HALF",
  /** EXTRA_TIME_BREAK - The break before extra time. */
  EXTRA_TIME_BREAK = "EXTRA_TIME_BREAK",
  /**
   * EXTRA_FIRST_HALF_PRE - The first half of extra time is about to start.
   * A kickoff is called within this stage.
   * This stage ends with the NORMAL_START.
   */
  EXTRA_FIRST_HALF_PRE = "EXTRA_FIRST_HALF_PRE",
  /** EXTRA_FIRST_HALF - The first half of extra time. */
  EXTRA_FIRST_HALF = "EXTRA_FIRST_HALF",
  /** EXTRA_HALF_TIME - Half time between first and second extra halves. */
  EXTRA_HALF_TIME = "EXTRA_HALF_TIME",
  /**
   * EXTRA_SECOND_HALF_PRE - The second half of extra time is about to start.
   * A kickoff is called within this stage.
   * This stage ends with the NORMAL_START.
   */
  EXTRA_SECOND_HALF_PRE = "EXTRA_SECOND_HALF_PRE",
  /** EXTRA_SECOND_HALF - The second half of extra time. */
  EXTRA_SECOND_HALF = "EXTRA_SECOND_HALF",
  /** PENALTY_SHOOTOUT_BREAK - The break before penalty shootout. */
  PENALTY_SHOOTOUT_BREAK = "PENALTY_SHOOTOUT_BREAK",
  /** PENALTY_SHOOTOUT - The penalty shootout. */
  PENALTY_SHOOTOUT = "PENALTY_SHOOTOUT",
  /** POST_GAME - The game is over. */
  POST_GAME = "POST_GAME",
  UNRECOGNIZED = "UNRECOGNIZED",
}

export function referee_StageFromJSON(object: any): Referee_Stage {
  switch (object) {
    case 0:
    case "NORMAL_FIRST_HALF_PRE":
      return Referee_Stage.NORMAL_FIRST_HALF_PRE;
    case 1:
    case "NORMAL_FIRST_HALF":
      return Referee_Stage.NORMAL_FIRST_HALF;
    case 2:
    case "NORMAL_HALF_TIME":
      return Referee_Stage.NORMAL_HALF_TIME;
    case 3:
    case "NORMAL_SECOND_HALF_PRE":
      return Referee_Stage.NORMAL_SECOND_HALF_PRE;
    case 4:
    case "NORMAL_SECOND_HALF":
      return Referee_Stage.NORMAL_SECOND_HALF;
    case 5:
    case "EXTRA_TIME_BREAK":
      return Referee_Stage.EXTRA_TIME_BREAK;
    case 6:
    case "EXTRA_FIRST_HALF_PRE":
      return Referee_Stage.EXTRA_FIRST_HALF_PRE;
    case 7:
    case "EXTRA_FIRST_HALF":
      return Referee_Stage.EXTRA_FIRST_HALF;
    case 8:
    case "EXTRA_HALF_TIME":
      return Referee_Stage.EXTRA_HALF_TIME;
    case 9:
    case "EXTRA_SECOND_HALF_PRE":
      return Referee_Stage.EXTRA_SECOND_HALF_PRE;
    case 10:
    case "EXTRA_SECOND_HALF":
      return Referee_Stage.EXTRA_SECOND_HALF;
    case 11:
    case "PENALTY_SHOOTOUT_BREAK":
      return Referee_Stage.PENALTY_SHOOTOUT_BREAK;
    case 12:
    case "PENALTY_SHOOTOUT":
      return Referee_Stage.PENALTY_SHOOTOUT;
    case 13:
    case "POST_GAME":
      return Referee_Stage.POST_GAME;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Referee_Stage.UNRECOGNIZED;
  }
}

export function referee_StageToJSON(object: Referee_Stage): string {
  switch (object) {
    case Referee_Stage.NORMAL_FIRST_HALF_PRE:
      return "NORMAL_FIRST_HALF_PRE";
    case Referee_Stage.NORMAL_FIRST_HALF:
      return "NORMAL_FIRST_HALF";
    case Referee_Stage.NORMAL_HALF_TIME:
      return "NORMAL_HALF_TIME";
    case Referee_Stage.NORMAL_SECOND_HALF_PRE:
      return "NORMAL_SECOND_HALF_PRE";
    case Referee_Stage.NORMAL_SECOND_HALF:
      return "NORMAL_SECOND_HALF";
    case Referee_Stage.EXTRA_TIME_BREAK:
      return "EXTRA_TIME_BREAK";
    case Referee_Stage.EXTRA_FIRST_HALF_PRE:
      return "EXTRA_FIRST_HALF_PRE";
    case Referee_Stage.EXTRA_FIRST_HALF:
      return "EXTRA_FIRST_HALF";
    case Referee_Stage.EXTRA_HALF_TIME:
      return "EXTRA_HALF_TIME";
    case Referee_Stage.EXTRA_SECOND_HALF_PRE:
      return "EXTRA_SECOND_HALF_PRE";
    case Referee_Stage.EXTRA_SECOND_HALF:
      return "EXTRA_SECOND_HALF";
    case Referee_Stage.PENALTY_SHOOTOUT_BREAK:
      return "PENALTY_SHOOTOUT_BREAK";
    case Referee_Stage.PENALTY_SHOOTOUT:
      return "PENALTY_SHOOTOUT";
    case Referee_Stage.POST_GAME:
      return "POST_GAME";
    case Referee_Stage.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** These are the "fine" states of play on the field. */
export enum Referee_Command {
  /** HALT - All robots should completely stop moving. */
  HALT = "HALT",
  /** STOP - Robots must keep 50 cm from the ball. */
  STOP = "STOP",
  /** NORMAL_START - A prepared kickoff or penalty may now be taken. */
  NORMAL_START = "NORMAL_START",
  /** FORCE_START - The ball is dropped and free for either team. */
  FORCE_START = "FORCE_START",
  /** PREPARE_KICKOFF_YELLOW - The yellow team may move into kickoff position. */
  PREPARE_KICKOFF_YELLOW = "PREPARE_KICKOFF_YELLOW",
  /** PREPARE_KICKOFF_BLUE - The blue team may move into kickoff position. */
  PREPARE_KICKOFF_BLUE = "PREPARE_KICKOFF_BLUE",
  /** PREPARE_PENALTY_YELLOW - The yellow team may move into penalty position. */
  PREPARE_PENALTY_YELLOW = "PREPARE_PENALTY_YELLOW",
  /** PREPARE_PENALTY_BLUE - The blue team may move into penalty position. */
  PREPARE_PENALTY_BLUE = "PREPARE_PENALTY_BLUE",
  /** DIRECT_FREE_YELLOW - The yellow team may take a direct free kick. */
  DIRECT_FREE_YELLOW = "DIRECT_FREE_YELLOW",
  /** DIRECT_FREE_BLUE - The blue team may take a direct free kick. */
  DIRECT_FREE_BLUE = "DIRECT_FREE_BLUE",
  /**
   * INDIRECT_FREE_YELLOW - The yellow team may take an indirect free kick.
   *
   * @deprecated
   */
  INDIRECT_FREE_YELLOW = "INDIRECT_FREE_YELLOW",
  /**
   * INDIRECT_FREE_BLUE - The blue team may take an indirect free kick.
   *
   * @deprecated
   */
  INDIRECT_FREE_BLUE = "INDIRECT_FREE_BLUE",
  /** TIMEOUT_YELLOW - The yellow team is currently in a timeout. */
  TIMEOUT_YELLOW = "TIMEOUT_YELLOW",
  /** TIMEOUT_BLUE - The blue team is currently in a timeout. */
  TIMEOUT_BLUE = "TIMEOUT_BLUE",
  /**
   * GOAL_YELLOW - The yellow team just scored a goal.
   * For information only.
   * Deprecated: Use the score field from the team infos instead. That way, you can also detect revoked goals.
   *
   * @deprecated
   */
  GOAL_YELLOW = "GOAL_YELLOW",
  /**
   * GOAL_BLUE - The blue team just scored a goal. See also GOAL_YELLOW.
   *
   * @deprecated
   */
  GOAL_BLUE = "GOAL_BLUE",
  /**
   * BALL_PLACEMENT_YELLOW - Equivalent to STOP, but the yellow team must pick up the ball and
   * drop it in the Designated Position.
   */
  BALL_PLACEMENT_YELLOW = "BALL_PLACEMENT_YELLOW",
  /**
   * BALL_PLACEMENT_BLUE - Equivalent to STOP, but the blue team must pick up the ball and drop
   * it in the Designated Position.
   */
  BALL_PLACEMENT_BLUE = "BALL_PLACEMENT_BLUE",
  UNRECOGNIZED = "UNRECOGNIZED",
}

export function referee_CommandFromJSON(object: any): Referee_Command {
  switch (object) {
    case 0:
    case "HALT":
      return Referee_Command.HALT;
    case 1:
    case "STOP":
      return Referee_Command.STOP;
    case 2:
    case "NORMAL_START":
      return Referee_Command.NORMAL_START;
    case 3:
    case "FORCE_START":
      return Referee_Command.FORCE_START;
    case 4:
    case "PREPARE_KICKOFF_YELLOW":
      return Referee_Command.PREPARE_KICKOFF_YELLOW;
    case 5:
    case "PREPARE_KICKOFF_BLUE":
      return Referee_Command.PREPARE_KICKOFF_BLUE;
    case 6:
    case "PREPARE_PENALTY_YELLOW":
      return Referee_Command.PREPARE_PENALTY_YELLOW;
    case 7:
    case "PREPARE_PENALTY_BLUE":
      return Referee_Command.PREPARE_PENALTY_BLUE;
    case 8:
    case "DIRECT_FREE_YELLOW":
      return Referee_Command.DIRECT_FREE_YELLOW;
    case 9:
    case "DIRECT_FREE_BLUE":
      return Referee_Command.DIRECT_FREE_BLUE;
    case 10:
    case "INDIRECT_FREE_YELLOW":
      return Referee_Command.INDIRECT_FREE_YELLOW;
    case 11:
    case "INDIRECT_FREE_BLUE":
      return Referee_Command.INDIRECT_FREE_BLUE;
    case 12:
    case "TIMEOUT_YELLOW":
      return Referee_Command.TIMEOUT_YELLOW;
    case 13:
    case "TIMEOUT_BLUE":
      return Referee_Command.TIMEOUT_BLUE;
    case 14:
    case "GOAL_YELLOW":
      return Referee_Command.GOAL_YELLOW;
    case 15:
    case "GOAL_BLUE":
      return Referee_Command.GOAL_BLUE;
    case 16:
    case "BALL_PLACEMENT_YELLOW":
      return Referee_Command.BALL_PLACEMENT_YELLOW;
    case 17:
    case "BALL_PLACEMENT_BLUE":
      return Referee_Command.BALL_PLACEMENT_BLUE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Referee_Command.UNRECOGNIZED;
  }
}

export function referee_CommandToJSON(object: Referee_Command): string {
  switch (object) {
    case Referee_Command.HALT:
      return "HALT";
    case Referee_Command.STOP:
      return "STOP";
    case Referee_Command.NORMAL_START:
      return "NORMAL_START";
    case Referee_Command.FORCE_START:
      return "FORCE_START";
    case Referee_Command.PREPARE_KICKOFF_YELLOW:
      return "PREPARE_KICKOFF_YELLOW";
    case Referee_Command.PREPARE_KICKOFF_BLUE:
      return "PREPARE_KICKOFF_BLUE";
    case Referee_Command.PREPARE_PENALTY_YELLOW:
      return "PREPARE_PENALTY_YELLOW";
    case Referee_Command.PREPARE_PENALTY_BLUE:
      return "PREPARE_PENALTY_BLUE";
    case Referee_Command.DIRECT_FREE_YELLOW:
      return "DIRECT_FREE_YELLOW";
    case Referee_Command.DIRECT_FREE_BLUE:
      return "DIRECT_FREE_BLUE";
    case Referee_Command.INDIRECT_FREE_YELLOW:
      return "INDIRECT_FREE_YELLOW";
    case Referee_Command.INDIRECT_FREE_BLUE:
      return "INDIRECT_FREE_BLUE";
    case Referee_Command.TIMEOUT_YELLOW:
      return "TIMEOUT_YELLOW";
    case Referee_Command.TIMEOUT_BLUE:
      return "TIMEOUT_BLUE";
    case Referee_Command.GOAL_YELLOW:
      return "GOAL_YELLOW";
    case Referee_Command.GOAL_BLUE:
      return "GOAL_BLUE";
    case Referee_Command.BALL_PLACEMENT_YELLOW:
      return "BALL_PLACEMENT_YELLOW";
    case Referee_Command.BALL_PLACEMENT_BLUE:
      return "BALL_PLACEMENT_BLUE";
    case Referee_Command.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Information about a single team. */
export interface Referee_TeamInfo {
  /** The team's name (empty string if operator has not typed anything). */
  name?:
    | string
    | undefined;
  /** The number of goals scored by the team during normal play and overtime. */
  score?:
    | number
    | undefined;
  /** The number of red cards issued to the team since the beginning of the game. */
  redCards?:
    | number
    | undefined;
  /**
   * The amount of time (in microseconds) left on each yellow card issued to the team.
   * If no yellow cards are issued, this array has no elements.
   * Otherwise, times are ordered from smallest to largest.
   */
  yellowCardTimes?:
    | number[]
    | undefined;
  /** The total number of yellow cards ever issued to the team. */
  yellowCards?:
    | number
    | undefined;
  /**
   * The number of timeouts this team can still call.
   * If in a timeout right now, that timeout is excluded.
   */
  timeouts?:
    | number
    | undefined;
  /** The number of microseconds of timeout this team can use. */
  timeoutTime?:
    | number
    | undefined;
  /** The pattern number of this team's goalkeeper. */
  goalkeeper?:
    | number
    | undefined;
  /** The total number of countable fouls that act towards yellow cards */
  foulCounter?:
    | number
    | undefined;
  /** The number of consecutive ball placement failures of this team */
  ballPlacementFailures?:
    | number
    | undefined;
  /** Indicate if the team is able and allowed to place the ball */
  canPlaceBall?:
    | boolean
    | undefined;
  /** The maximum number of bots allowed on the field based on division and cards */
  maxAllowedBots?:
    | number
    | undefined;
  /** The team has submitted an intent to substitute one or more robots at the next chance */
  botSubstitutionIntent?:
    | boolean
    | undefined;
  /** Indicate if the team reached the maximum allowed ball placement failures and is thus not allowed to place the ball anymore */
  ballPlacementFailuresReached?:
    | boolean
    | undefined;
  /** The team is allowed to substitute one or more robots currently */
  botSubstitutionAllowed?: boolean | undefined;
}

/**
 * The coordinates of the Designated Position. These are measured in
 * millimetres and correspond to SSL-Vision coordinates. These fields are
 * always either both present (in the case of a ball placement command) or
 * both absent (in the case of any other command).
 */
export interface Referee_Point {
  x?: number | undefined;
  y?: number | undefined;
}

/** List of matching proposals */
export interface GameEventProposalGroup {
  /** Unique ID of this group */
  id?:
    | string
    | undefined;
  /** The proposed game events */
  gameEvents?:
    | GameEvent[]
    | undefined;
  /** Whether the proposal group was accepted */
  accepted?: boolean | undefined;
}

export const Referee = {
  fromJSON(object: any): Referee {
    return {
      sourceIdentifier: isSet(object.sourceIdentifier) ? globalThis.String(object.sourceIdentifier) : undefined,
      matchType: isSet(object.matchType) ? matchTypeFromJSON(object.matchType) : undefined,
      packetTimestamp: isSet(object.packetTimestamp) ? globalThis.Number(object.packetTimestamp) : undefined,
      stage: isSet(object.stage) ? referee_StageFromJSON(object.stage) : undefined,
      stageTimeLeft: isSet(object.stageTimeLeft) ? globalThis.Number(object.stageTimeLeft) : undefined,
      command: isSet(object.command) ? referee_CommandFromJSON(object.command) : undefined,
      commandCounter: isSet(object.commandCounter) ? globalThis.Number(object.commandCounter) : undefined,
      commandTimestamp: isSet(object.commandTimestamp) ? globalThis.Number(object.commandTimestamp) : undefined,
      yellow: isSet(object.yellow) ? Referee_TeamInfo.fromJSON(object.yellow) : undefined,
      blue: isSet(object.blue) ? Referee_TeamInfo.fromJSON(object.blue) : undefined,
      designatedPosition: isSet(object.designatedPosition)
        ? Referee_Point.fromJSON(object.designatedPosition)
        : undefined,
      blueTeamOnPositiveHalf: isSet(object.blueTeamOnPositiveHalf)
        ? globalThis.Boolean(object.blueTeamOnPositiveHalf)
        : undefined,
      nextCommand: isSet(object.nextCommand) ? referee_CommandFromJSON(object.nextCommand) : undefined,
      gameEvents: globalThis.Array.isArray(object?.gameEvents)
        ? object.gameEvents.map((e: any) => GameEvent.fromJSON(e))
        : undefined,
      gameEventProposals: globalThis.Array.isArray(object?.gameEventProposals)
        ? object.gameEventProposals.map((e: any) => GameEventProposalGroup.fromJSON(e))
        : undefined,
      currentActionTimeRemaining: isSet(object.currentActionTimeRemaining)
        ? globalThis.Number(object.currentActionTimeRemaining)
        : undefined,
    };
  },

  toJSON(message: Referee): unknown {
    const obj: any = {};
    if (message.sourceIdentifier !== undefined && message.sourceIdentifier !== "") {
      obj.sourceIdentifier = message.sourceIdentifier;
    }
    if (message.matchType !== undefined && message.matchType !== MatchType.UNKNOWN_MATCH) {
      obj.matchType = matchTypeToJSON(message.matchType);
    }
    if (message.packetTimestamp !== undefined && message.packetTimestamp !== 0) {
      obj.packetTimestamp = Math.round(message.packetTimestamp);
    }
    if (message.stage !== undefined && message.stage !== Referee_Stage.NORMAL_FIRST_HALF_PRE) {
      obj.stage = referee_StageToJSON(message.stage);
    }
    if (message.stageTimeLeft !== undefined && message.stageTimeLeft !== 0) {
      obj.stageTimeLeft = Math.round(message.stageTimeLeft);
    }
    if (message.command !== undefined && message.command !== Referee_Command.HALT) {
      obj.command = referee_CommandToJSON(message.command);
    }
    if (message.commandCounter !== undefined && message.commandCounter !== 0) {
      obj.commandCounter = Math.round(message.commandCounter);
    }
    if (message.commandTimestamp !== undefined && message.commandTimestamp !== 0) {
      obj.commandTimestamp = Math.round(message.commandTimestamp);
    }
    if (message.yellow !== undefined) {
      obj.yellow = Referee_TeamInfo.toJSON(message.yellow);
    }
    if (message.blue !== undefined) {
      obj.blue = Referee_TeamInfo.toJSON(message.blue);
    }
    if (message.designatedPosition !== undefined) {
      obj.designatedPosition = Referee_Point.toJSON(message.designatedPosition);
    }
    if (message.blueTeamOnPositiveHalf === true) {
      obj.blueTeamOnPositiveHalf = message.blueTeamOnPositiveHalf;
    }
    if (message.nextCommand !== undefined && message.nextCommand !== Referee_Command.HALT) {
      obj.nextCommand = referee_CommandToJSON(message.nextCommand);
    }
    if (message.gameEvents?.length) {
      obj.gameEvents = message.gameEvents.map((e) => GameEvent.toJSON(e));
    }
    if (message.gameEventProposals?.length) {
      obj.gameEventProposals = message.gameEventProposals.map((e) => GameEventProposalGroup.toJSON(e));
    }
    if (message.currentActionTimeRemaining !== undefined && message.currentActionTimeRemaining !== 0) {
      obj.currentActionTimeRemaining = Math.round(message.currentActionTimeRemaining);
    }
    return obj;
  },
};

export const Referee_TeamInfo = {
  fromJSON(object: any): Referee_TeamInfo {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : undefined,
      score: isSet(object.score) ? globalThis.Number(object.score) : undefined,
      redCards: isSet(object.redCards) ? globalThis.Number(object.redCards) : undefined,
      yellowCardTimes: globalThis.Array.isArray(object?.yellowCardTimes)
        ? object.yellowCardTimes.map((e: any) => globalThis.Number(e))
        : undefined,
      yellowCards: isSet(object.yellowCards) ? globalThis.Number(object.yellowCards) : undefined,
      timeouts: isSet(object.timeouts) ? globalThis.Number(object.timeouts) : undefined,
      timeoutTime: isSet(object.timeoutTime) ? globalThis.Number(object.timeoutTime) : undefined,
      goalkeeper: isSet(object.goalkeeper) ? globalThis.Number(object.goalkeeper) : undefined,
      foulCounter: isSet(object.foulCounter) ? globalThis.Number(object.foulCounter) : undefined,
      ballPlacementFailures: isSet(object.ballPlacementFailures)
        ? globalThis.Number(object.ballPlacementFailures)
        : undefined,
      canPlaceBall: isSet(object.canPlaceBall) ? globalThis.Boolean(object.canPlaceBall) : undefined,
      maxAllowedBots: isSet(object.maxAllowedBots) ? globalThis.Number(object.maxAllowedBots) : undefined,
      botSubstitutionIntent: isSet(object.botSubstitutionIntent)
        ? globalThis.Boolean(object.botSubstitutionIntent)
        : undefined,
      ballPlacementFailuresReached: isSet(object.ballPlacementFailuresReached)
        ? globalThis.Boolean(object.ballPlacementFailuresReached)
        : undefined,
      botSubstitutionAllowed: isSet(object.botSubstitutionAllowed)
        ? globalThis.Boolean(object.botSubstitutionAllowed)
        : undefined,
    };
  },

  toJSON(message: Referee_TeamInfo): unknown {
    const obj: any = {};
    if (message.name !== undefined && message.name !== "") {
      obj.name = message.name;
    }
    if (message.score !== undefined && message.score !== 0) {
      obj.score = Math.round(message.score);
    }
    if (message.redCards !== undefined && message.redCards !== 0) {
      obj.redCards = Math.round(message.redCards);
    }
    if (message.yellowCardTimes?.length) {
      obj.yellowCardTimes = message.yellowCardTimes.map((e) => Math.round(e));
    }
    if (message.yellowCards !== undefined && message.yellowCards !== 0) {
      obj.yellowCards = Math.round(message.yellowCards);
    }
    if (message.timeouts !== undefined && message.timeouts !== 0) {
      obj.timeouts = Math.round(message.timeouts);
    }
    if (message.timeoutTime !== undefined && message.timeoutTime !== 0) {
      obj.timeoutTime = Math.round(message.timeoutTime);
    }
    if (message.goalkeeper !== undefined && message.goalkeeper !== 0) {
      obj.goalkeeper = Math.round(message.goalkeeper);
    }
    if (message.foulCounter !== undefined && message.foulCounter !== 0) {
      obj.foulCounter = Math.round(message.foulCounter);
    }
    if (message.ballPlacementFailures !== undefined && message.ballPlacementFailures !== 0) {
      obj.ballPlacementFailures = Math.round(message.ballPlacementFailures);
    }
    if (message.canPlaceBall === true) {
      obj.canPlaceBall = message.canPlaceBall;
    }
    if (message.maxAllowedBots !== undefined && message.maxAllowedBots !== 0) {
      obj.maxAllowedBots = Math.round(message.maxAllowedBots);
    }
    if (message.botSubstitutionIntent === true) {
      obj.botSubstitutionIntent = message.botSubstitutionIntent;
    }
    if (message.ballPlacementFailuresReached === true) {
      obj.ballPlacementFailuresReached = message.ballPlacementFailuresReached;
    }
    if (message.botSubstitutionAllowed === true) {
      obj.botSubstitutionAllowed = message.botSubstitutionAllowed;
    }
    return obj;
  },
};

export const Referee_Point = {
  fromJSON(object: any): Referee_Point {
    return {
      x: isSet(object.x) ? globalThis.Number(object.x) : undefined,
      y: isSet(object.y) ? globalThis.Number(object.y) : undefined,
    };
  },

  toJSON(message: Referee_Point): unknown {
    const obj: any = {};
    if (message.x !== undefined && message.x !== 0) {
      obj.x = message.x;
    }
    if (message.y !== undefined && message.y !== 0) {
      obj.y = message.y;
    }
    return obj;
  },
};

export const GameEventProposalGroup = {
  fromJSON(object: any): GameEventProposalGroup {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : undefined,
      gameEvents: globalThis.Array.isArray(object?.gameEvents)
        ? object.gameEvents.map((e: any) => GameEvent.fromJSON(e))
        : undefined,
      accepted: isSet(object.accepted) ? globalThis.Boolean(object.accepted) : undefined,
    };
  },

  toJSON(message: GameEventProposalGroup): unknown {
    const obj: any = {};
    if (message.id !== undefined && message.id !== "") {
      obj.id = message.id;
    }
    if (message.gameEvents?.length) {
      obj.gameEvents = message.gameEvents.map((e) => GameEvent.toJSON(e));
    }
    if (message.accepted === true) {
      obj.accepted = message.accepted;
    }
    return obj;
  },
};

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
