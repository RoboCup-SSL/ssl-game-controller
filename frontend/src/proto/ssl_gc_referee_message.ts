/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { GameEvent } from "./ssl_gc_game_event";

export const protobufPackage = "";

/** MatchType is a meta information about the current match for easier log processing */
export enum MatchType {
  /** UNKNOWN_MATCH - not set */
  UNKNOWN_MATCH = 0,
  /** GROUP_PHASE - match is part of the group phase */
  GROUP_PHASE = 1,
  /** ELIMINATION_PHASE - match is part of the elimination phase */
  ELIMINATION_PHASE = 2,
  /** FRIENDLY - a friendly match, not part of a tournament */
  FRIENDLY = 3,
  UNRECOGNIZED = -1,
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
  sourceIdentifier: string;
  /** The match type is a meta information about the current match that helps to process the logs after a competition */
  matchType: MatchType;
  /**
   * The UNIX timestamp when the packet was sent, in microseconds.
   * Divide by 1,000,000 to get a time_t.
   */
  packetTimestamp: number;
  stage: Referee_Stage;
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
  stageTimeLeft: number;
  command: Referee_Command;
  /** The number of commands issued since startup (mod 2^32). */
  commandCounter: number;
  /**
   * The UNIX timestamp when the command was issued, in microseconds.
   * This value changes only when a new command is issued, not on each packet.
   */
  commandTimestamp: number;
  /** Information about the two teams. */
  yellow?: Referee_TeamInfo;
  blue?: Referee_TeamInfo;
  designatedPosition?: Referee_Point;
  /**
   * Information about the direction of play.
   * True, if the blue team will have it's goal on the positive x-axis of the ssl-vision coordinate system.
   * Obviously, the yellow team will play on the opposite half.
   */
  blueTeamOnPositiveHalf: boolean;
  /** The command that will be issued after the current stoppage and ball placement to continue the game. */
  nextCommand: Referee_Command;
  gameEvents: GameEvent[];
  gameEventProposals: GameEventProposalGroup[];
  /**
   * The time in microseconds that is remaining until the current action times out
   * The time will not be reset. It can get negative.
   * An autoRef would raise an appropriate event, if the time gets negative.
   * Possible actions where this time is relevant:
   *  * free kicks
   *  * kickoff, penalty kick, force start
   *  * ball placement
   */
  currentActionTimeRemaining: number;
}

/** These are the "coarse" stages of the game. */
export enum Referee_Stage {
  /**
   * NORMAL_FIRST_HALF_PRE - The first half is about to start.
   * A kickoff is called within this stage.
   * This stage ends with the NORMAL_START.
   */
  NORMAL_FIRST_HALF_PRE = 0,
  /** NORMAL_FIRST_HALF - The first half of the normal game, before half time. */
  NORMAL_FIRST_HALF = 1,
  /** NORMAL_HALF_TIME - Half time between first and second halves. */
  NORMAL_HALF_TIME = 2,
  /**
   * NORMAL_SECOND_HALF_PRE - The second half is about to start.
   * A kickoff is called within this stage.
   * This stage ends with the NORMAL_START.
   */
  NORMAL_SECOND_HALF_PRE = 3,
  /** NORMAL_SECOND_HALF - The second half of the normal game, after half time. */
  NORMAL_SECOND_HALF = 4,
  /** EXTRA_TIME_BREAK - The break before extra time. */
  EXTRA_TIME_BREAK = 5,
  /**
   * EXTRA_FIRST_HALF_PRE - The first half of extra time is about to start.
   * A kickoff is called within this stage.
   * This stage ends with the NORMAL_START.
   */
  EXTRA_FIRST_HALF_PRE = 6,
  /** EXTRA_FIRST_HALF - The first half of extra time. */
  EXTRA_FIRST_HALF = 7,
  /** EXTRA_HALF_TIME - Half time between first and second extra halves. */
  EXTRA_HALF_TIME = 8,
  /**
   * EXTRA_SECOND_HALF_PRE - The second half of extra time is about to start.
   * A kickoff is called within this stage.
   * This stage ends with the NORMAL_START.
   */
  EXTRA_SECOND_HALF_PRE = 9,
  /** EXTRA_SECOND_HALF - The second half of extra time. */
  EXTRA_SECOND_HALF = 10,
  /** PENALTY_SHOOTOUT_BREAK - The break before penalty shootout. */
  PENALTY_SHOOTOUT_BREAK = 11,
  /** PENALTY_SHOOTOUT - The penalty shootout. */
  PENALTY_SHOOTOUT = 12,
  /** POST_GAME - The game is over. */
  POST_GAME = 13,
  UNRECOGNIZED = -1,
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
  HALT = 0,
  /** STOP - Robots must keep 50 cm from the ball. */
  STOP = 1,
  /** NORMAL_START - A prepared kickoff or penalty may now be taken. */
  NORMAL_START = 2,
  /** FORCE_START - The ball is dropped and free for either team. */
  FORCE_START = 3,
  /** PREPARE_KICKOFF_YELLOW - The yellow team may move into kickoff position. */
  PREPARE_KICKOFF_YELLOW = 4,
  /** PREPARE_KICKOFF_BLUE - The blue team may move into kickoff position. */
  PREPARE_KICKOFF_BLUE = 5,
  /** PREPARE_PENALTY_YELLOW - The yellow team may move into penalty position. */
  PREPARE_PENALTY_YELLOW = 6,
  /** PREPARE_PENALTY_BLUE - The blue team may move into penalty position. */
  PREPARE_PENALTY_BLUE = 7,
  /** DIRECT_FREE_YELLOW - The yellow team may take a direct free kick. */
  DIRECT_FREE_YELLOW = 8,
  /** DIRECT_FREE_BLUE - The blue team may take a direct free kick. */
  DIRECT_FREE_BLUE = 9,
  /**
   * INDIRECT_FREE_YELLOW - The yellow team may take an indirect free kick.
   *
   * @deprecated
   */
  INDIRECT_FREE_YELLOW = 10,
  /**
   * INDIRECT_FREE_BLUE - The blue team may take an indirect free kick.
   *
   * @deprecated
   */
  INDIRECT_FREE_BLUE = 11,
  /** TIMEOUT_YELLOW - The yellow team is currently in a timeout. */
  TIMEOUT_YELLOW = 12,
  /** TIMEOUT_BLUE - The blue team is currently in a timeout. */
  TIMEOUT_BLUE = 13,
  /**
   * GOAL_YELLOW - The yellow team just scored a goal.
   * For information only.
   * For rules compliance, teams must treat as STOP.
   * Deprecated: Use the score field from the team infos instead. That way, you can also detect revoked goals.
   *
   * @deprecated
   */
  GOAL_YELLOW = 14,
  /**
   * GOAL_BLUE - The blue team just scored a goal. See also GOAL_YELLOW.
   *
   * @deprecated
   */
  GOAL_BLUE = 15,
  /**
   * BALL_PLACEMENT_YELLOW - Equivalent to STOP, but the yellow team must pick up the ball and
   * drop it in the Designated Position.
   */
  BALL_PLACEMENT_YELLOW = 16,
  /**
   * BALL_PLACEMENT_BLUE - Equivalent to STOP, but the blue team must pick up the ball and drop
   * it in the Designated Position.
   */
  BALL_PLACEMENT_BLUE = 17,
  UNRECOGNIZED = -1,
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
  name: string;
  /** The number of goals scored by the team during normal play and overtime. */
  score: number;
  /** The number of red cards issued to the team since the beginning of the game. */
  redCards: number;
  /**
   * The amount of time (in microseconds) left on each yellow card issued to the team.
   * If no yellow cards are issued, this array has no elements.
   * Otherwise, times are ordered from smallest to largest.
   */
  yellowCardTimes: number[];
  /** The total number of yellow cards ever issued to the team. */
  yellowCards: number;
  /**
   * The number of timeouts this team can still call.
   * If in a timeout right now, that timeout is excluded.
   */
  timeouts: number;
  /** The number of microseconds of timeout this team can use. */
  timeoutTime: number;
  /** The pattern number of this team's goalkeeper. */
  goalkeeper: number;
  /** The total number of countable fouls that act towards yellow cards */
  foulCounter: number;
  /** The number of consecutive ball placement failures of this team */
  ballPlacementFailures: number;
  /** Indicate if the team is able and allowed to place the ball */
  canPlaceBall: boolean;
  /** The maximum number of bots allowed on the field based on division and cards */
  maxAllowedBots: number;
  /** The team has submitted an intent to substitute one or more robots at the next chance */
  botSubstitutionIntent: boolean;
  /** Indicate if the team reached the maximum allowed ball placement failures and is thus not allowed to place the ball anymore */
  ballPlacementFailuresReached: boolean;
}

/**
 * The coordinates of the Designated Position. These are measured in
 * millimetres and correspond to SSL-Vision coordinates. These fields are
 * always either both present (in the case of a ball placement command) or
 * both absent (in the case of any other command).
 */
export interface Referee_Point {
  x: number;
  y: number;
}

/** List of matching proposals */
export interface GameEventProposalGroup {
  /** The proposed game event. */
  gameEvent: GameEvent[];
  /** Whether the proposal group was accepted */
  accepted: boolean;
}

function createBaseReferee(): Referee {
  return {
    sourceIdentifier: "",
    matchType: 0,
    packetTimestamp: 0,
    stage: 0,
    stageTimeLeft: 0,
    command: 0,
    commandCounter: 0,
    commandTimestamp: 0,
    yellow: undefined,
    blue: undefined,
    designatedPosition: undefined,
    blueTeamOnPositiveHalf: false,
    nextCommand: 0,
    gameEvents: [],
    gameEventProposals: [],
    currentActionTimeRemaining: 0,
  };
}

export const Referee = {
  encode(message: Referee, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sourceIdentifier !== "") {
      writer.uint32(146).string(message.sourceIdentifier);
    }
    if (message.matchType !== 0) {
      writer.uint32(152).int32(message.matchType);
    }
    if (message.packetTimestamp !== 0) {
      writer.uint32(8).uint64(message.packetTimestamp);
    }
    if (message.stage !== 0) {
      writer.uint32(16).int32(message.stage);
    }
    if (message.stageTimeLeft !== 0) {
      writer.uint32(24).sint32(message.stageTimeLeft);
    }
    if (message.command !== 0) {
      writer.uint32(32).int32(message.command);
    }
    if (message.commandCounter !== 0) {
      writer.uint32(40).uint32(message.commandCounter);
    }
    if (message.commandTimestamp !== 0) {
      writer.uint32(48).uint64(message.commandTimestamp);
    }
    if (message.yellow !== undefined) {
      Referee_TeamInfo.encode(message.yellow, writer.uint32(58).fork()).ldelim();
    }
    if (message.blue !== undefined) {
      Referee_TeamInfo.encode(message.blue, writer.uint32(66).fork()).ldelim();
    }
    if (message.designatedPosition !== undefined) {
      Referee_Point.encode(message.designatedPosition, writer.uint32(74).fork()).ldelim();
    }
    if (message.blueTeamOnPositiveHalf === true) {
      writer.uint32(80).bool(message.blueTeamOnPositiveHalf);
    }
    if (message.nextCommand !== 0) {
      writer.uint32(96).int32(message.nextCommand);
    }
    for (const v of message.gameEvents) {
      GameEvent.encode(v!, writer.uint32(130).fork()).ldelim();
    }
    for (const v of message.gameEventProposals) {
      GameEventProposalGroup.encode(v!, writer.uint32(138).fork()).ldelim();
    }
    if (message.currentActionTimeRemaining !== 0) {
      writer.uint32(120).int32(message.currentActionTimeRemaining);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Referee {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReferee();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 18:
          message.sourceIdentifier = reader.string();
          break;
        case 19:
          message.matchType = reader.int32() as any;
          break;
        case 1:
          message.packetTimestamp = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.stage = reader.int32() as any;
          break;
        case 3:
          message.stageTimeLeft = reader.sint32();
          break;
        case 4:
          message.command = reader.int32() as any;
          break;
        case 5:
          message.commandCounter = reader.uint32();
          break;
        case 6:
          message.commandTimestamp = longToNumber(reader.uint64() as Long);
          break;
        case 7:
          message.yellow = Referee_TeamInfo.decode(reader, reader.uint32());
          break;
        case 8:
          message.blue = Referee_TeamInfo.decode(reader, reader.uint32());
          break;
        case 9:
          message.designatedPosition = Referee_Point.decode(reader, reader.uint32());
          break;
        case 10:
          message.blueTeamOnPositiveHalf = reader.bool();
          break;
        case 12:
          message.nextCommand = reader.int32() as any;
          break;
        case 16:
          message.gameEvents.push(GameEvent.decode(reader, reader.uint32()));
          break;
        case 17:
          message.gameEventProposals.push(GameEventProposalGroup.decode(reader, reader.uint32()));
          break;
        case 15:
          message.currentActionTimeRemaining = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Referee {
    return {
      sourceIdentifier: isSet(object.sourceIdentifier) ? String(object.sourceIdentifier) : "",
      matchType: isSet(object.matchType) ? matchTypeFromJSON(object.matchType) : 0,
      packetTimestamp: isSet(object.packetTimestamp) ? Number(object.packetTimestamp) : 0,
      stage: isSet(object.stage) ? referee_StageFromJSON(object.stage) : 0,
      stageTimeLeft: isSet(object.stageTimeLeft) ? Number(object.stageTimeLeft) : 0,
      command: isSet(object.command) ? referee_CommandFromJSON(object.command) : 0,
      commandCounter: isSet(object.commandCounter) ? Number(object.commandCounter) : 0,
      commandTimestamp: isSet(object.commandTimestamp) ? Number(object.commandTimestamp) : 0,
      yellow: isSet(object.yellow) ? Referee_TeamInfo.fromJSON(object.yellow) : undefined,
      blue: isSet(object.blue) ? Referee_TeamInfo.fromJSON(object.blue) : undefined,
      designatedPosition: isSet(object.designatedPosition)
        ? Referee_Point.fromJSON(object.designatedPosition)
        : undefined,
      blueTeamOnPositiveHalf: isSet(object.blueTeamOnPositiveHalf) ? Boolean(object.blueTeamOnPositiveHalf) : false,
      nextCommand: isSet(object.nextCommand) ? referee_CommandFromJSON(object.nextCommand) : 0,
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

  fromPartial<I extends Exact<DeepPartial<Referee>, I>>(object: I): Referee {
    const message = createBaseReferee();
    message.sourceIdentifier = object.sourceIdentifier ?? "";
    message.matchType = object.matchType ?? 0;
    message.packetTimestamp = object.packetTimestamp ?? 0;
    message.stage = object.stage ?? 0;
    message.stageTimeLeft = object.stageTimeLeft ?? 0;
    message.command = object.command ?? 0;
    message.commandCounter = object.commandCounter ?? 0;
    message.commandTimestamp = object.commandTimestamp ?? 0;
    message.yellow = (object.yellow !== undefined && object.yellow !== null)
      ? Referee_TeamInfo.fromPartial(object.yellow)
      : undefined;
    message.blue = (object.blue !== undefined && object.blue !== null)
      ? Referee_TeamInfo.fromPartial(object.blue)
      : undefined;
    message.designatedPosition = (object.designatedPosition !== undefined && object.designatedPosition !== null)
      ? Referee_Point.fromPartial(object.designatedPosition)
      : undefined;
    message.blueTeamOnPositiveHalf = object.blueTeamOnPositiveHalf ?? false;
    message.nextCommand = object.nextCommand ?? 0;
    message.gameEvents = object.gameEvents?.map((e) => GameEvent.fromPartial(e)) || [];
    message.gameEventProposals = object.gameEventProposals?.map((e) => GameEventProposalGroup.fromPartial(e)) || [];
    message.currentActionTimeRemaining = object.currentActionTimeRemaining ?? 0;
    return message;
  },
};

function createBaseReferee_TeamInfo(): Referee_TeamInfo {
  return {
    name: "",
    score: 0,
    redCards: 0,
    yellowCardTimes: [],
    yellowCards: 0,
    timeouts: 0,
    timeoutTime: 0,
    goalkeeper: 0,
    foulCounter: 0,
    ballPlacementFailures: 0,
    canPlaceBall: false,
    maxAllowedBots: 0,
    botSubstitutionIntent: false,
    ballPlacementFailuresReached: false,
  };
}

export const Referee_TeamInfo = {
  encode(message: Referee_TeamInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.score !== 0) {
      writer.uint32(16).uint32(message.score);
    }
    if (message.redCards !== 0) {
      writer.uint32(24).uint32(message.redCards);
    }
    writer.uint32(34).fork();
    for (const v of message.yellowCardTimes) {
      writer.uint32(v);
    }
    writer.ldelim();
    if (message.yellowCards !== 0) {
      writer.uint32(40).uint32(message.yellowCards);
    }
    if (message.timeouts !== 0) {
      writer.uint32(48).uint32(message.timeouts);
    }
    if (message.timeoutTime !== 0) {
      writer.uint32(56).uint32(message.timeoutTime);
    }
    if (message.goalkeeper !== 0) {
      writer.uint32(64).uint32(message.goalkeeper);
    }
    if (message.foulCounter !== 0) {
      writer.uint32(72).uint32(message.foulCounter);
    }
    if (message.ballPlacementFailures !== 0) {
      writer.uint32(80).uint32(message.ballPlacementFailures);
    }
    if (message.canPlaceBall === true) {
      writer.uint32(96).bool(message.canPlaceBall);
    }
    if (message.maxAllowedBots !== 0) {
      writer.uint32(104).uint32(message.maxAllowedBots);
    }
    if (message.botSubstitutionIntent === true) {
      writer.uint32(112).bool(message.botSubstitutionIntent);
    }
    if (message.ballPlacementFailuresReached === true) {
      writer.uint32(120).bool(message.ballPlacementFailuresReached);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Referee_TeamInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReferee_TeamInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.score = reader.uint32();
          break;
        case 3:
          message.redCards = reader.uint32();
          break;
        case 4:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.yellowCardTimes.push(reader.uint32());
            }
          } else {
            message.yellowCardTimes.push(reader.uint32());
          }
          break;
        case 5:
          message.yellowCards = reader.uint32();
          break;
        case 6:
          message.timeouts = reader.uint32();
          break;
        case 7:
          message.timeoutTime = reader.uint32();
          break;
        case 8:
          message.goalkeeper = reader.uint32();
          break;
        case 9:
          message.foulCounter = reader.uint32();
          break;
        case 10:
          message.ballPlacementFailures = reader.uint32();
          break;
        case 12:
          message.canPlaceBall = reader.bool();
          break;
        case 13:
          message.maxAllowedBots = reader.uint32();
          break;
        case 14:
          message.botSubstitutionIntent = reader.bool();
          break;
        case 15:
          message.ballPlacementFailuresReached = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Referee_TeamInfo {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      score: isSet(object.score) ? Number(object.score) : 0,
      redCards: isSet(object.redCards) ? Number(object.redCards) : 0,
      yellowCardTimes: Array.isArray(object?.yellowCardTimes) ? object.yellowCardTimes.map((e: any) => Number(e)) : [],
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
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Referee_TeamInfo>, I>>(object: I): Referee_TeamInfo {
    const message = createBaseReferee_TeamInfo();
    message.name = object.name ?? "";
    message.score = object.score ?? 0;
    message.redCards = object.redCards ?? 0;
    message.yellowCardTimes = object.yellowCardTimes?.map((e) => e) || [];
    message.yellowCards = object.yellowCards ?? 0;
    message.timeouts = object.timeouts ?? 0;
    message.timeoutTime = object.timeoutTime ?? 0;
    message.goalkeeper = object.goalkeeper ?? 0;
    message.foulCounter = object.foulCounter ?? 0;
    message.ballPlacementFailures = object.ballPlacementFailures ?? 0;
    message.canPlaceBall = object.canPlaceBall ?? false;
    message.maxAllowedBots = object.maxAllowedBots ?? 0;
    message.botSubstitutionIntent = object.botSubstitutionIntent ?? false;
    message.ballPlacementFailuresReached = object.ballPlacementFailuresReached ?? false;
    return message;
  },
};

function createBaseReferee_Point(): Referee_Point {
  return { x: 0, y: 0 };
}

export const Referee_Point = {
  encode(message: Referee_Point, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.x !== 0) {
      writer.uint32(13).float(message.x);
    }
    if (message.y !== 0) {
      writer.uint32(21).float(message.y);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Referee_Point {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReferee_Point();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.x = reader.float();
          break;
        case 2:
          message.y = reader.float();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Referee_Point {
    return { x: isSet(object.x) ? Number(object.x) : 0, y: isSet(object.y) ? Number(object.y) : 0 };
  },

  toJSON(message: Referee_Point): unknown {
    const obj: any = {};
    message.x !== undefined && (obj.x = message.x);
    message.y !== undefined && (obj.y = message.y);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Referee_Point>, I>>(object: I): Referee_Point {
    const message = createBaseReferee_Point();
    message.x = object.x ?? 0;
    message.y = object.y ?? 0;
    return message;
  },
};

function createBaseGameEventProposalGroup(): GameEventProposalGroup {
  return { gameEvent: [], accepted: false };
}

export const GameEventProposalGroup = {
  encode(message: GameEventProposalGroup, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.gameEvent) {
      GameEvent.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.accepted === true) {
      writer.uint32(16).bool(message.accepted);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GameEventProposalGroup {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGameEventProposalGroup();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.gameEvent.push(GameEvent.decode(reader, reader.uint32()));
          break;
        case 2:
          message.accepted = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GameEventProposalGroup {
    return {
      gameEvent: Array.isArray(object?.gameEvent) ? object.gameEvent.map((e: any) => GameEvent.fromJSON(e)) : [],
      accepted: isSet(object.accepted) ? Boolean(object.accepted) : false,
    };
  },

  toJSON(message: GameEventProposalGroup): unknown {
    const obj: any = {};
    if (message.gameEvent) {
      obj.gameEvent = message.gameEvent.map((e) => e ? GameEvent.toJSON(e) : undefined);
    } else {
      obj.gameEvent = [];
    }
    message.accepted !== undefined && (obj.accepted = message.accepted);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GameEventProposalGroup>, I>>(object: I): GameEventProposalGroup {
    const message = createBaseGameEventProposalGroup();
    message.gameEvent = object.gameEvent?.map((e) => GameEvent.fromPartial(e)) || [];
    message.accepted = object.accepted ?? false;
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
