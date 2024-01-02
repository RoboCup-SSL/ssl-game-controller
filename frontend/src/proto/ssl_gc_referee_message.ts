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
  sourceIdentifier?: string;
  /** The match type is a meta information about the current match that helps to process the logs after a competition */
  matchType?: MatchType;
  /**
   * The UNIX timestamp when the packet was sent, in microseconds.
   * Divide by 1,000,000 to get a time_t.
   */
  packetTimestamp?: number;
  stage?: Referee_Stage;
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
  stageTimeLeft?: number;
  command?: Referee_Command;
  /** The number of commands issued since startup (mod 2^32). */
  commandCounter?: number;
  /**
   * The UNIX timestamp when the command was issued, in microseconds.
   * This value changes only when a new command is issued, not on each packet.
   */
  commandTimestamp?: number;
  /** Information about the two teams. */
  yellow?: Referee_TeamInfo;
  blue?: Referee_TeamInfo;
  designatedPosition?: Referee_Point;
  /**
   * Information about the direction of play.
   * True, if the blue team will have it's goal on the positive x-axis of the ssl-vision coordinate system.
   * Obviously, the yellow team will play on the opposite half.
   */
  blueTeamOnPositiveHalf?: boolean;
  /** The command that will be issued after the current stoppage and ball placement to continue the game. */
  nextCommand?: Referee_Command;
  gameEvents?: GameEvent[];
  gameEventProposals?: GameEventProposalGroup[];
  /**
   * The time in microseconds that is remaining until the current action times out
   * The time will not be reset. It can get negative.
   * An autoRef would raise an appropriate event, if the time gets negative.
   * Possible actions where this time is relevant:
   *  * free kicks
   *  * kickoff, penalty kick, force start
   *  * ball placement
   */
  currentActionTimeRemaining?: number;
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
  name?: string;
  /** The number of goals scored by the team during normal play and overtime. */
  score?: number;
  /** The number of red cards issued to the team since the beginning of the game. */
  redCards?: number;
  /**
   * The amount of time (in microseconds) left on each yellow card issued to the team.
   * If no yellow cards are issued, this array has no elements.
   * Otherwise, times are ordered from smallest to largest.
   */
  yellowCardTimes?: number[];
  /** The total number of yellow cards ever issued to the team. */
  yellowCards?: number;
  /**
   * The number of timeouts this team can still call.
   * If in a timeout right now, that timeout is excluded.
   */
  timeouts?: number;
  /** The number of microseconds of timeout this team can use. */
  timeoutTime?: number;
  /** The pattern number of this team's goalkeeper. */
  goalkeeper?: number;
  /** The total number of countable fouls that act towards yellow cards */
  foulCounter?: number;
  /** The number of consecutive ball placement failures of this team */
  ballPlacementFailures?: number;
  /** Indicate if the team is able and allowed to place the ball */
  canPlaceBall?: boolean;
  /** The maximum number of bots allowed on the field based on division and cards */
  maxAllowedBots?: number;
  /** The team has submitted an intent to substitute one or more robots at the next chance */
  botSubstitutionIntent?: boolean;
  /** Indicate if the team reached the maximum allowed ball placement failures and is thus not allowed to place the ball anymore */
  ballPlacementFailuresReached?: boolean;
  /** The team is allowed to substitute one or more robots currently */
  botSubstitutionAllowed?: boolean;
}

/**
 * The coordinates of the Designated Position. These are measured in
 * millimetres and correspond to SSL-Vision coordinates. These fields are
 * always either both present (in the case of a ball placement command) or
 * both absent (in the case of any other command).
 */
export interface Referee_Point {
  x?: number;
  y?: number;
}

/** List of matching proposals */
export interface GameEventProposalGroup {
  /** Unique ID of this group */
  id?: string;
  /** The proposed game events */
  gameEvents?: GameEvent[];
  /** Whether the proposal group was accepted */
  accepted?: boolean;
}

export const Referee = {
  fromJSON(object: any): Referee {
    return {
      sourceIdentifier: isSet(object.sourceIdentifier) ? String(object.sourceIdentifier) : "",
      matchType: isSet(object.matchType) ? matchTypeFromJSON(object.matchType) : MatchType.UNKNOWN_MATCH,
      packetTimestamp: isSet(object.packetTimestamp) ? Number(object.packetTimestamp) : 0,
      stage: isSet(object.stage) ? referee_StageFromJSON(object.stage) : Referee_Stage.NORMAL_FIRST_HALF_PRE,
      stageTimeLeft: isSet(object.stageTimeLeft) ? Number(object.stageTimeLeft) : 0,
      command: isSet(object.command) ? referee_CommandFromJSON(object.command) : Referee_Command.HALT,
      commandCounter: isSet(object.commandCounter) ? Number(object.commandCounter) : 0,
      commandTimestamp: isSet(object.commandTimestamp) ? Number(object.commandTimestamp) : 0,
      yellow: isSet(object.yellow) ? Referee_TeamInfo.fromJSON(object.yellow) : undefined,
      blue: isSet(object.blue) ? Referee_TeamInfo.fromJSON(object.blue) : undefined,
      designatedPosition: isSet(object.designatedPosition)
        ? Referee_Point.fromJSON(object.designatedPosition)
        : undefined,
      blueTeamOnPositiveHalf: isSet(object.blueTeamOnPositiveHalf) ? Boolean(object.blueTeamOnPositiveHalf) : false,
      nextCommand: isSet(object.nextCommand) ? referee_CommandFromJSON(object.nextCommand) : Referee_Command.HALT,
      gameEvents: Array.isArray(object?.gameEvents) ? object.gameEvents.map((e: any) => GameEvent.fromJSON(e)) : [],
      gameEventProposals: Array.isArray(object?.gameEventProposals)
        ? object.gameEventProposals.map((e: any) => GameEventProposalGroup.fromJSON(e))
        : [],
      currentActionTimeRemaining: isSet(object.currentActionTimeRemaining)
        ? Number(object.currentActionTimeRemaining)
        : 0,
    };
  },

  toJSON(message: Referee): unknown {
    const obj: any = {};
    message.sourceIdentifier !== undefined && (obj.sourceIdentifier = message.sourceIdentifier);
    message.matchType !== undefined && (obj.matchType = matchTypeToJSON(message.matchType));
    message.packetTimestamp !== undefined && (obj.packetTimestamp = Math.round(message.packetTimestamp));
    message.stage !== undefined && (obj.stage = referee_StageToJSON(message.stage));
    message.stageTimeLeft !== undefined && (obj.stageTimeLeft = Math.round(message.stageTimeLeft));
    message.command !== undefined && (obj.command = referee_CommandToJSON(message.command));
    message.commandCounter !== undefined && (obj.commandCounter = Math.round(message.commandCounter));
    message.commandTimestamp !== undefined && (obj.commandTimestamp = Math.round(message.commandTimestamp));
    message.yellow !== undefined && (obj.yellow = message.yellow ? Referee_TeamInfo.toJSON(message.yellow) : undefined);
    message.blue !== undefined && (obj.blue = message.blue ? Referee_TeamInfo.toJSON(message.blue) : undefined);
    message.designatedPosition !== undefined && (obj.designatedPosition = message.designatedPosition
      ? Referee_Point.toJSON(message.designatedPosition)
      : undefined);
    message.blueTeamOnPositiveHalf !== undefined && (obj.blueTeamOnPositiveHalf = message.blueTeamOnPositiveHalf);
    message.nextCommand !== undefined && (obj.nextCommand = referee_CommandToJSON(message.nextCommand));
    if (message.gameEvents) {
      obj.gameEvents = message.gameEvents.map((e) => e ? GameEvent.toJSON(e) : undefined);
    } else {
      obj.gameEvents = [];
    }
    if (message.gameEventProposals) {
      obj.gameEventProposals = message.gameEventProposals.map((e) => e ? GameEventProposalGroup.toJSON(e) : undefined);
    } else {
      obj.gameEventProposals = [];
    }
    message.currentActionTimeRemaining !== undefined &&
      (obj.currentActionTimeRemaining = Math.round(message.currentActionTimeRemaining));
    return obj;
  },
};

export const Referee_TeamInfo = {
  fromJSON(object: any): Referee_TeamInfo {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      score: isSet(object.score) ? Number(object.score) : 0,
      redCards: isSet(object.redCards) ? Number(object.redCards) : 0,
      yellowCardTimes: Array.isArray(object?.yellowCardTimes)
        ? object.yellowCardTimes.map((e: any) => Number(e))
        : [],
      yellowCards: isSet(object.yellowCards) ? Number(object.yellowCards) : 0,
      timeouts: isSet(object.timeouts) ? Number(object.timeouts) : 0,
      timeoutTime: isSet(object.timeoutTime) ? Number(object.timeoutTime) : 0,
      goalkeeper: isSet(object.goalkeeper) ? Number(object.goalkeeper) : 0,
      foulCounter: isSet(object.foulCounter) ? Number(object.foulCounter) : 0,
      ballPlacementFailures: isSet(object.ballPlacementFailures) ? Number(object.ballPlacementFailures) : 0,
      canPlaceBall: isSet(object.canPlaceBall) ? Boolean(object.canPlaceBall) : false,
      maxAllowedBots: isSet(object.maxAllowedBots) ? Number(object.maxAllowedBots) : 0,
      botSubstitutionIntent: isSet(object.botSubstitutionIntent) ? Boolean(object.botSubstitutionIntent) : false,
      ballPlacementFailuresReached: isSet(object.ballPlacementFailuresReached)
        ? Boolean(object.ballPlacementFailuresReached)
        : false,
      botSubstitutionAllowed: isSet(object.botSubstitutionAllowed) ? Boolean(object.botSubstitutionAllowed) : false,
    };
  },

  toJSON(message: Referee_TeamInfo): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.score !== undefined && (obj.score = Math.round(message.score));
    message.redCards !== undefined && (obj.redCards = Math.round(message.redCards));
    if (message.yellowCardTimes) {
      obj.yellowCardTimes = message.yellowCardTimes.map((e) => Math.round(e));
    } else {
      obj.yellowCardTimes = [];
    }
    message.yellowCards !== undefined && (obj.yellowCards = Math.round(message.yellowCards));
    message.timeouts !== undefined && (obj.timeouts = Math.round(message.timeouts));
    message.timeoutTime !== undefined && (obj.timeoutTime = Math.round(message.timeoutTime));
    message.goalkeeper !== undefined && (obj.goalkeeper = Math.round(message.goalkeeper));
    message.foulCounter !== undefined && (obj.foulCounter = Math.round(message.foulCounter));
    message.ballPlacementFailures !== undefined &&
      (obj.ballPlacementFailures = Math.round(message.ballPlacementFailures));
    message.canPlaceBall !== undefined && (obj.canPlaceBall = message.canPlaceBall);
    message.maxAllowedBots !== undefined && (obj.maxAllowedBots = Math.round(message.maxAllowedBots));
    message.botSubstitutionIntent !== undefined && (obj.botSubstitutionIntent = message.botSubstitutionIntent);
    message.ballPlacementFailuresReached !== undefined &&
      (obj.ballPlacementFailuresReached = message.ballPlacementFailuresReached);
    message.botSubstitutionAllowed !== undefined && (obj.botSubstitutionAllowed = message.botSubstitutionAllowed);
    return obj;
  },
};

export const Referee_Point = {
  fromJSON(object: any): Referee_Point {
    return { x: isSet(object.x) ? Number(object.x) : 0, y: isSet(object.y) ? Number(object.y) : 0 };
  },

  toJSON(message: Referee_Point): unknown {
    const obj: any = {};
    message.x !== undefined && (obj.x = message.x);
    message.y !== undefined && (obj.y = message.y);
    return obj;
  },
};

export const GameEventProposalGroup = {
  fromJSON(object: any): GameEventProposalGroup {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      gameEvents: Array.isArray(object?.gameEvents) ? object.gameEvents.map((e: any) => GameEvent.fromJSON(e)) : [],
      accepted: isSet(object.accepted) ? Boolean(object.accepted) : false,
    };
  },

  toJSON(message: GameEventProposalGroup): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    if (message.gameEvents) {
      obj.gameEvents = message.gameEvents.map((e) => e ? GameEvent.toJSON(e) : undefined);
    } else {
      obj.gameEvents = [];
    }
    message.accepted !== undefined && (obj.accepted = message.accepted);
    return obj;
  },
};

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
