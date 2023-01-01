/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Duration } from "./google/protobuf/duration";
import { Timestamp } from "./google/protobuf/timestamp";
import { Division, divisionFromJSON, divisionToJSON, Team, teamFromJSON, teamToJSON } from "./ssl_gc_common";
import { GameEvent } from "./ssl_gc_game_event";
import { Vector2 } from "./ssl_gc_geometry";
import {
  MatchType,
  matchTypeFromJSON,
  matchTypeToJSON,
  Referee_Stage,
  referee_StageFromJSON,
  referee_StageToJSON,
} from "./ssl_gc_referee_message";

export const protobufPackage = "";

export interface YellowCard {
  id: number;
  causedByGameEvent?: GameEvent;
  timeRemaining?: Duration;
}

export interface RedCard {
  id: number;
  causedByGameEvent?: GameEvent;
}

export interface Foul {
  id: number;
  causedByGameEvent?: GameEvent;
  timestamp?: Date;
}

export interface Command {
  type: Command_Type;
  forTeam: Team;
}

export enum Command_Type {
  UNKNOWN = 0,
  HALT = 1,
  STOP = 2,
  NORMAL_START = 3,
  FORCE_START = 4,
  DIRECT = 5,
  KICKOFF = 7,
  PENALTY = 8,
  TIMEOUT = 9,
  BALL_PLACEMENT = 10,
  UNRECOGNIZED = -1,
}

export function command_TypeFromJSON(object: any): Command_Type {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return Command_Type.UNKNOWN;
    case 1:
    case "HALT":
      return Command_Type.HALT;
    case 2:
    case "STOP":
      return Command_Type.STOP;
    case 3:
    case "NORMAL_START":
      return Command_Type.NORMAL_START;
    case 4:
    case "FORCE_START":
      return Command_Type.FORCE_START;
    case 5:
    case "DIRECT":
      return Command_Type.DIRECT;
    case 7:
    case "KICKOFF":
      return Command_Type.KICKOFF;
    case 8:
    case "PENALTY":
      return Command_Type.PENALTY;
    case 9:
    case "TIMEOUT":
      return Command_Type.TIMEOUT;
    case 10:
    case "BALL_PLACEMENT":
      return Command_Type.BALL_PLACEMENT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Command_Type.UNRECOGNIZED;
  }
}

export function command_TypeToJSON(object: Command_Type): string {
  switch (object) {
    case Command_Type.UNKNOWN:
      return "UNKNOWN";
    case Command_Type.HALT:
      return "HALT";
    case Command_Type.STOP:
      return "STOP";
    case Command_Type.NORMAL_START:
      return "NORMAL_START";
    case Command_Type.FORCE_START:
      return "FORCE_START";
    case Command_Type.DIRECT:
      return "DIRECT";
    case Command_Type.KICKOFF:
      return "KICKOFF";
    case Command_Type.PENALTY:
      return "PENALTY";
    case Command_Type.TIMEOUT:
      return "TIMEOUT";
    case Command_Type.BALL_PLACEMENT:
      return "BALL_PLACEMENT";
    case Command_Type.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface GameState {
  type: GameState_Type;
  forTeam: Team;
}

export enum GameState_Type {
  UNKNOWN = 0,
  HALT = 1,
  STOP = 2,
  RUNNING = 3,
  FREE_KICK = 4,
  KICKOFF = 5,
  PENALTY = 6,
  TIMEOUT = 7,
  BALL_PLACEMENT = 8,
  UNRECOGNIZED = -1,
}

export function gameState_TypeFromJSON(object: any): GameState_Type {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return GameState_Type.UNKNOWN;
    case 1:
    case "HALT":
      return GameState_Type.HALT;
    case 2:
    case "STOP":
      return GameState_Type.STOP;
    case 3:
    case "RUNNING":
      return GameState_Type.RUNNING;
    case 4:
    case "FREE_KICK":
      return GameState_Type.FREE_KICK;
    case 5:
    case "KICKOFF":
      return GameState_Type.KICKOFF;
    case 6:
    case "PENALTY":
      return GameState_Type.PENALTY;
    case 7:
    case "TIMEOUT":
      return GameState_Type.TIMEOUT;
    case 8:
    case "BALL_PLACEMENT":
      return GameState_Type.BALL_PLACEMENT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return GameState_Type.UNRECOGNIZED;
  }
}

export function gameState_TypeToJSON(object: GameState_Type): string {
  switch (object) {
    case GameState_Type.UNKNOWN:
      return "UNKNOWN";
    case GameState_Type.HALT:
      return "HALT";
    case GameState_Type.STOP:
      return "STOP";
    case GameState_Type.RUNNING:
      return "RUNNING";
    case GameState_Type.FREE_KICK:
      return "FREE_KICK";
    case GameState_Type.KICKOFF:
      return "KICKOFF";
    case GameState_Type.PENALTY:
      return "PENALTY";
    case GameState_Type.TIMEOUT:
      return "TIMEOUT";
    case GameState_Type.BALL_PLACEMENT:
      return "BALL_PLACEMENT";
    case GameState_Type.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface Proposal {
  /** The timestamp when the game event proposal occurred */
  timestamp?: Date;
  /** The proposed game event. */
  gameEvent?: GameEvent;
}

export interface ProposalGroup {
  /** List of proposals in this group */
  proposals: Proposal[];
  /** Whether the proposal group was accepted */
  accepted: boolean;
}

export interface TeamInfo {
  name: string;
  goals: number;
  goalkeeper: number;
  yellowCards: YellowCard[];
  redCards: RedCard[];
  timeoutsLeft: number;
  timeoutTimeLeft?: Duration;
  onPositiveHalf: boolean;
  fouls: Foul[];
  ballPlacementFailures: number;
  ballPlacementFailuresReached: boolean;
  canPlaceBall: boolean;
  maxAllowedBots: number;
  requestsBotSubstitutionSince?: Date;
  requestsTimeoutSince?: Date;
  requestsEmergencyStopSince?: Date;
  challengeFlags: number;
}

export interface State {
  stage: Referee_Stage;
  command?: Command;
  gameState?: GameState;
  stageTimeElapsed?: Duration;
  stageTimeLeft?: Duration;
  matchTimeStart?: Date;
  teamState: { [key: string]: TeamInfo };
  placementPos?: Vector2;
  nextCommand?: Command;
  currentActionTimeRemaining?: Duration;
  gameEvents: GameEvent[];
  proposalGroups: ProposalGroup[];
  division: Division;
  firstKickoffTeam: Team;
  matchType: MatchType;
  readyContinueTime?: Date;
}

export interface State_TeamStateEntry {
  key: string;
  value?: TeamInfo;
}

function createBaseYellowCard(): YellowCard {
  return { id: 0, causedByGameEvent: undefined, timeRemaining: undefined };
}

export const YellowCard = {
  encode(message: YellowCard, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint32(message.id);
    }
    if (message.causedByGameEvent !== undefined) {
      GameEvent.encode(message.causedByGameEvent, writer.uint32(18).fork()).ldelim();
    }
    if (message.timeRemaining !== undefined) {
      Duration.encode(message.timeRemaining, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): YellowCard {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseYellowCard();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint32();
          break;
        case 2:
          message.causedByGameEvent = GameEvent.decode(reader, reader.uint32());
          break;
        case 3:
          message.timeRemaining = Duration.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): YellowCard {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      causedByGameEvent: isSet(object.causedByGameEvent) ? GameEvent.fromJSON(object.causedByGameEvent) : undefined,
      timeRemaining: isSet(object.timeRemaining) ? Duration.fromJSON(object.timeRemaining) : undefined,
    };
  },

  toJSON(message: YellowCard): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.causedByGameEvent !== undefined &&
      (obj.causedByGameEvent = message.causedByGameEvent ? GameEvent.toJSON(message.causedByGameEvent) : undefined);
    message.timeRemaining !== undefined &&
      (obj.timeRemaining = message.timeRemaining ? Duration.toJSON(message.timeRemaining) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<YellowCard>, I>>(object: I): YellowCard {
    const message = createBaseYellowCard();
    message.id = object.id ?? 0;
    message.causedByGameEvent = (object.causedByGameEvent !== undefined && object.causedByGameEvent !== null)
      ? GameEvent.fromPartial(object.causedByGameEvent)
      : undefined;
    message.timeRemaining = (object.timeRemaining !== undefined && object.timeRemaining !== null)
      ? Duration.fromPartial(object.timeRemaining)
      : undefined;
    return message;
  },
};

function createBaseRedCard(): RedCard {
  return { id: 0, causedByGameEvent: undefined };
}

export const RedCard = {
  encode(message: RedCard, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint32(message.id);
    }
    if (message.causedByGameEvent !== undefined) {
      GameEvent.encode(message.causedByGameEvent, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RedCard {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRedCard();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint32();
          break;
        case 2:
          message.causedByGameEvent = GameEvent.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RedCard {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      causedByGameEvent: isSet(object.causedByGameEvent) ? GameEvent.fromJSON(object.causedByGameEvent) : undefined,
    };
  },

  toJSON(message: RedCard): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.causedByGameEvent !== undefined &&
      (obj.causedByGameEvent = message.causedByGameEvent ? GameEvent.toJSON(message.causedByGameEvent) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RedCard>, I>>(object: I): RedCard {
    const message = createBaseRedCard();
    message.id = object.id ?? 0;
    message.causedByGameEvent = (object.causedByGameEvent !== undefined && object.causedByGameEvent !== null)
      ? GameEvent.fromPartial(object.causedByGameEvent)
      : undefined;
    return message;
  },
};

function createBaseFoul(): Foul {
  return { id: 0, causedByGameEvent: undefined, timestamp: undefined };
}

export const Foul = {
  encode(message: Foul, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint32(message.id);
    }
    if (message.causedByGameEvent !== undefined) {
      GameEvent.encode(message.causedByGameEvent, writer.uint32(18).fork()).ldelim();
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Foul {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFoul();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint32();
          break;
        case 2:
          message.causedByGameEvent = GameEvent.decode(reader, reader.uint32());
          break;
        case 3:
          message.timestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Foul {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      causedByGameEvent: isSet(object.causedByGameEvent) ? GameEvent.fromJSON(object.causedByGameEvent) : undefined,
      timestamp: isSet(object.timestamp) ? fromJsonTimestamp(object.timestamp) : undefined,
    };
  },

  toJSON(message: Foul): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.causedByGameEvent !== undefined &&
      (obj.causedByGameEvent = message.causedByGameEvent ? GameEvent.toJSON(message.causedByGameEvent) : undefined);
    message.timestamp !== undefined && (obj.timestamp = message.timestamp.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Foul>, I>>(object: I): Foul {
    const message = createBaseFoul();
    message.id = object.id ?? 0;
    message.causedByGameEvent = (object.causedByGameEvent !== undefined && object.causedByGameEvent !== null)
      ? GameEvent.fromPartial(object.causedByGameEvent)
      : undefined;
    message.timestamp = object.timestamp ?? undefined;
    return message;
  },
};

function createBaseCommand(): Command {
  return { type: 0, forTeam: 0 };
}

export const Command = {
  encode(message: Command, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.forTeam !== 0) {
      writer.uint32(16).int32(message.forTeam);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Command {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommand();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.int32() as any;
          break;
        case 2:
          message.forTeam = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Command {
    return {
      type: isSet(object.type) ? command_TypeFromJSON(object.type) : 0,
      forTeam: isSet(object.forTeam) ? teamFromJSON(object.forTeam) : 0,
    };
  },

  toJSON(message: Command): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = command_TypeToJSON(message.type));
    message.forTeam !== undefined && (obj.forTeam = teamToJSON(message.forTeam));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Command>, I>>(object: I): Command {
    const message = createBaseCommand();
    message.type = object.type ?? 0;
    message.forTeam = object.forTeam ?? 0;
    return message;
  },
};

function createBaseGameState(): GameState {
  return { type: 0, forTeam: 0 };
}

export const GameState = {
  encode(message: GameState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.forTeam !== 0) {
      writer.uint32(16).int32(message.forTeam);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GameState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGameState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.int32() as any;
          break;
        case 2:
          message.forTeam = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GameState {
    return {
      type: isSet(object.type) ? gameState_TypeFromJSON(object.type) : 0,
      forTeam: isSet(object.forTeam) ? teamFromJSON(object.forTeam) : 0,
    };
  },

  toJSON(message: GameState): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = gameState_TypeToJSON(message.type));
    message.forTeam !== undefined && (obj.forTeam = teamToJSON(message.forTeam));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GameState>, I>>(object: I): GameState {
    const message = createBaseGameState();
    message.type = object.type ?? 0;
    message.forTeam = object.forTeam ?? 0;
    return message;
  },
};

function createBaseProposal(): Proposal {
  return { timestamp: undefined, gameEvent: undefined };
}

export const Proposal = {
  encode(message: Proposal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.timestamp !== undefined) {
      Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(10).fork()).ldelim();
    }
    if (message.gameEvent !== undefined) {
      GameEvent.encode(message.gameEvent, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Proposal {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.timestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 2:
          message.gameEvent = GameEvent.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Proposal {
    return {
      timestamp: isSet(object.timestamp) ? fromJsonTimestamp(object.timestamp) : undefined,
      gameEvent: isSet(object.gameEvent) ? GameEvent.fromJSON(object.gameEvent) : undefined,
    };
  },

  toJSON(message: Proposal): unknown {
    const obj: any = {};
    message.timestamp !== undefined && (obj.timestamp = message.timestamp.toISOString());
    message.gameEvent !== undefined &&
      (obj.gameEvent = message.gameEvent ? GameEvent.toJSON(message.gameEvent) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Proposal>, I>>(object: I): Proposal {
    const message = createBaseProposal();
    message.timestamp = object.timestamp ?? undefined;
    message.gameEvent = (object.gameEvent !== undefined && object.gameEvent !== null)
      ? GameEvent.fromPartial(object.gameEvent)
      : undefined;
    return message;
  },
};

function createBaseProposalGroup(): ProposalGroup {
  return { proposals: [], accepted: false };
}

export const ProposalGroup = {
  encode(message: ProposalGroup, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.proposals) {
      Proposal.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.accepted === true) {
      writer.uint32(16).bool(message.accepted);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProposalGroup {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProposalGroup();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.proposals.push(Proposal.decode(reader, reader.uint32()));
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

  fromJSON(object: any): ProposalGroup {
    return {
      proposals: Array.isArray(object?.proposals) ? object.proposals.map((e: any) => Proposal.fromJSON(e)) : [],
      accepted: isSet(object.accepted) ? Boolean(object.accepted) : false,
    };
  },

  toJSON(message: ProposalGroup): unknown {
    const obj: any = {};
    if (message.proposals) {
      obj.proposals = message.proposals.map((e) => e ? Proposal.toJSON(e) : undefined);
    } else {
      obj.proposals = [];
    }
    message.accepted !== undefined && (obj.accepted = message.accepted);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ProposalGroup>, I>>(object: I): ProposalGroup {
    const message = createBaseProposalGroup();
    message.proposals = object.proposals?.map((e) => Proposal.fromPartial(e)) || [];
    message.accepted = object.accepted ?? false;
    return message;
  },
};

function createBaseTeamInfo(): TeamInfo {
  return {
    name: "",
    goals: 0,
    goalkeeper: 0,
    yellowCards: [],
    redCards: [],
    timeoutsLeft: 0,
    timeoutTimeLeft: undefined,
    onPositiveHalf: false,
    fouls: [],
    ballPlacementFailures: 0,
    ballPlacementFailuresReached: false,
    canPlaceBall: false,
    maxAllowedBots: 0,
    requestsBotSubstitutionSince: undefined,
    requestsTimeoutSince: undefined,
    requestsEmergencyStopSince: undefined,
    challengeFlags: 0,
  };
}

export const TeamInfo = {
  encode(message: TeamInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.goals !== 0) {
      writer.uint32(16).int32(message.goals);
    }
    if (message.goalkeeper !== 0) {
      writer.uint32(24).int32(message.goalkeeper);
    }
    for (const v of message.yellowCards) {
      YellowCard.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.redCards) {
      RedCard.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    if (message.timeoutsLeft !== 0) {
      writer.uint32(48).int32(message.timeoutsLeft);
    }
    if (message.timeoutTimeLeft !== undefined) {
      Duration.encode(message.timeoutTimeLeft, writer.uint32(58).fork()).ldelim();
    }
    if (message.onPositiveHalf === true) {
      writer.uint32(64).bool(message.onPositiveHalf);
    }
    for (const v of message.fouls) {
      Foul.encode(v!, writer.uint32(74).fork()).ldelim();
    }
    if (message.ballPlacementFailures !== 0) {
      writer.uint32(80).int32(message.ballPlacementFailures);
    }
    if (message.ballPlacementFailuresReached === true) {
      writer.uint32(88).bool(message.ballPlacementFailuresReached);
    }
    if (message.canPlaceBall === true) {
      writer.uint32(96).bool(message.canPlaceBall);
    }
    if (message.maxAllowedBots !== 0) {
      writer.uint32(104).int32(message.maxAllowedBots);
    }
    if (message.requestsBotSubstitutionSince !== undefined) {
      Timestamp.encode(toTimestamp(message.requestsBotSubstitutionSince), writer.uint32(114).fork()).ldelim();
    }
    if (message.requestsTimeoutSince !== undefined) {
      Timestamp.encode(toTimestamp(message.requestsTimeoutSince), writer.uint32(122).fork()).ldelim();
    }
    if (message.requestsEmergencyStopSince !== undefined) {
      Timestamp.encode(toTimestamp(message.requestsEmergencyStopSince), writer.uint32(130).fork()).ldelim();
    }
    if (message.challengeFlags !== 0) {
      writer.uint32(136).int32(message.challengeFlags);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TeamInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTeamInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.goals = reader.int32();
          break;
        case 3:
          message.goalkeeper = reader.int32();
          break;
        case 4:
          message.yellowCards.push(YellowCard.decode(reader, reader.uint32()));
          break;
        case 5:
          message.redCards.push(RedCard.decode(reader, reader.uint32()));
          break;
        case 6:
          message.timeoutsLeft = reader.int32();
          break;
        case 7:
          message.timeoutTimeLeft = Duration.decode(reader, reader.uint32());
          break;
        case 8:
          message.onPositiveHalf = reader.bool();
          break;
        case 9:
          message.fouls.push(Foul.decode(reader, reader.uint32()));
          break;
        case 10:
          message.ballPlacementFailures = reader.int32();
          break;
        case 11:
          message.ballPlacementFailuresReached = reader.bool();
          break;
        case 12:
          message.canPlaceBall = reader.bool();
          break;
        case 13:
          message.maxAllowedBots = reader.int32();
          break;
        case 14:
          message.requestsBotSubstitutionSince = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 15:
          message.requestsTimeoutSince = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 16:
          message.requestsEmergencyStopSince = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 17:
          message.challengeFlags = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TeamInfo {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      goals: isSet(object.goals) ? Number(object.goals) : 0,
      goalkeeper: isSet(object.goalkeeper) ? Number(object.goalkeeper) : 0,
      yellowCards: Array.isArray(object?.yellowCards) ? object.yellowCards.map((e: any) => YellowCard.fromJSON(e)) : [],
      redCards: Array.isArray(object?.redCards) ? object.redCards.map((e: any) => RedCard.fromJSON(e)) : [],
      timeoutsLeft: isSet(object.timeoutsLeft) ? Number(object.timeoutsLeft) : 0,
      timeoutTimeLeft: isSet(object.timeoutTimeLeft) ? Duration.fromJSON(object.timeoutTimeLeft) : undefined,
      onPositiveHalf: isSet(object.onPositiveHalf) ? Boolean(object.onPositiveHalf) : false,
      fouls: Array.isArray(object?.fouls) ? object.fouls.map((e: any) => Foul.fromJSON(e)) : [],
      ballPlacementFailures: isSet(object.ballPlacementFailures) ? Number(object.ballPlacementFailures) : 0,
      ballPlacementFailuresReached: isSet(object.ballPlacementFailuresReached)
        ? Boolean(object.ballPlacementFailuresReached)
        : false,
      canPlaceBall: isSet(object.canPlaceBall) ? Boolean(object.canPlaceBall) : false,
      maxAllowedBots: isSet(object.maxAllowedBots) ? Number(object.maxAllowedBots) : 0,
      requestsBotSubstitutionSince: isSet(object.requestsBotSubstitutionSince)
        ? fromJsonTimestamp(object.requestsBotSubstitutionSince)
        : undefined,
      requestsTimeoutSince: isSet(object.requestsTimeoutSince)
        ? fromJsonTimestamp(object.requestsTimeoutSince)
        : undefined,
      requestsEmergencyStopSince: isSet(object.requestsEmergencyStopSince)
        ? fromJsonTimestamp(object.requestsEmergencyStopSince)
        : undefined,
      challengeFlags: isSet(object.challengeFlags) ? Number(object.challengeFlags) : 0,
    };
  },

  toJSON(message: TeamInfo): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.goals !== undefined && (obj.goals = Math.round(message.goals));
    message.goalkeeper !== undefined && (obj.goalkeeper = Math.round(message.goalkeeper));
    if (message.yellowCards) {
      obj.yellowCards = message.yellowCards.map((e) => e ? YellowCard.toJSON(e) : undefined);
    } else {
      obj.yellowCards = [];
    }
    if (message.redCards) {
      obj.redCards = message.redCards.map((e) => e ? RedCard.toJSON(e) : undefined);
    } else {
      obj.redCards = [];
    }
    message.timeoutsLeft !== undefined && (obj.timeoutsLeft = Math.round(message.timeoutsLeft));
    message.timeoutTimeLeft !== undefined &&
      (obj.timeoutTimeLeft = message.timeoutTimeLeft ? Duration.toJSON(message.timeoutTimeLeft) : undefined);
    message.onPositiveHalf !== undefined && (obj.onPositiveHalf = message.onPositiveHalf);
    if (message.fouls) {
      obj.fouls = message.fouls.map((e) => e ? Foul.toJSON(e) : undefined);
    } else {
      obj.fouls = [];
    }
    message.ballPlacementFailures !== undefined &&
      (obj.ballPlacementFailures = Math.round(message.ballPlacementFailures));
    message.ballPlacementFailuresReached !== undefined &&
      (obj.ballPlacementFailuresReached = message.ballPlacementFailuresReached);
    message.canPlaceBall !== undefined && (obj.canPlaceBall = message.canPlaceBall);
    message.maxAllowedBots !== undefined && (obj.maxAllowedBots = Math.round(message.maxAllowedBots));
    message.requestsBotSubstitutionSince !== undefined &&
      (obj.requestsBotSubstitutionSince = message.requestsBotSubstitutionSince.toISOString());
    message.requestsTimeoutSince !== undefined &&
      (obj.requestsTimeoutSince = message.requestsTimeoutSince.toISOString());
    message.requestsEmergencyStopSince !== undefined &&
      (obj.requestsEmergencyStopSince = message.requestsEmergencyStopSince.toISOString());
    message.challengeFlags !== undefined && (obj.challengeFlags = Math.round(message.challengeFlags));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TeamInfo>, I>>(object: I): TeamInfo {
    const message = createBaseTeamInfo();
    message.name = object.name ?? "";
    message.goals = object.goals ?? 0;
    message.goalkeeper = object.goalkeeper ?? 0;
    message.yellowCards = object.yellowCards?.map((e) => YellowCard.fromPartial(e)) || [];
    message.redCards = object.redCards?.map((e) => RedCard.fromPartial(e)) || [];
    message.timeoutsLeft = object.timeoutsLeft ?? 0;
    message.timeoutTimeLeft = (object.timeoutTimeLeft !== undefined && object.timeoutTimeLeft !== null)
      ? Duration.fromPartial(object.timeoutTimeLeft)
      : undefined;
    message.onPositiveHalf = object.onPositiveHalf ?? false;
    message.fouls = object.fouls?.map((e) => Foul.fromPartial(e)) || [];
    message.ballPlacementFailures = object.ballPlacementFailures ?? 0;
    message.ballPlacementFailuresReached = object.ballPlacementFailuresReached ?? false;
    message.canPlaceBall = object.canPlaceBall ?? false;
    message.maxAllowedBots = object.maxAllowedBots ?? 0;
    message.requestsBotSubstitutionSince = object.requestsBotSubstitutionSince ?? undefined;
    message.requestsTimeoutSince = object.requestsTimeoutSince ?? undefined;
    message.requestsEmergencyStopSince = object.requestsEmergencyStopSince ?? undefined;
    message.challengeFlags = object.challengeFlags ?? 0;
    return message;
  },
};

function createBaseState(): State {
  return {
    stage: 0,
    command: undefined,
    gameState: undefined,
    stageTimeElapsed: undefined,
    stageTimeLeft: undefined,
    matchTimeStart: undefined,
    teamState: {},
    placementPos: undefined,
    nextCommand: undefined,
    currentActionTimeRemaining: undefined,
    gameEvents: [],
    proposalGroups: [],
    division: 0,
    firstKickoffTeam: 0,
    matchType: 0,
    readyContinueTime: undefined,
  };
}

export const State = {
  encode(message: State, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.stage !== 0) {
      writer.uint32(8).int32(message.stage);
    }
    if (message.command !== undefined) {
      Command.encode(message.command, writer.uint32(18).fork()).ldelim();
    }
    if (message.gameState !== undefined) {
      GameState.encode(message.gameState, writer.uint32(154).fork()).ldelim();
    }
    if (message.stageTimeElapsed !== undefined) {
      Duration.encode(message.stageTimeElapsed, writer.uint32(34).fork()).ldelim();
    }
    if (message.stageTimeLeft !== undefined) {
      Duration.encode(message.stageTimeLeft, writer.uint32(42).fork()).ldelim();
    }
    if (message.matchTimeStart !== undefined) {
      Timestamp.encode(toTimestamp(message.matchTimeStart), writer.uint32(50).fork()).ldelim();
    }
    Object.entries(message.teamState).forEach(([key, value]) => {
      State_TeamStateEntry.encode({ key: key as any, value }, writer.uint32(66).fork()).ldelim();
    });
    if (message.placementPos !== undefined) {
      Vector2.encode(message.placementPos, writer.uint32(74).fork()).ldelim();
    }
    if (message.nextCommand !== undefined) {
      Command.encode(message.nextCommand, writer.uint32(82).fork()).ldelim();
    }
    if (message.currentActionTimeRemaining !== undefined) {
      Duration.encode(message.currentActionTimeRemaining, writer.uint32(98).fork()).ldelim();
    }
    for (const v of message.gameEvents) {
      GameEvent.encode(v!, writer.uint32(106).fork()).ldelim();
    }
    for (const v of message.proposalGroups) {
      ProposalGroup.encode(v!, writer.uint32(114).fork()).ldelim();
    }
    if (message.division !== 0) {
      writer.uint32(120).int32(message.division);
    }
    if (message.firstKickoffTeam !== 0) {
      writer.uint32(136).int32(message.firstKickoffTeam);
    }
    if (message.matchType !== 0) {
      writer.uint32(144).int32(message.matchType);
    }
    if (message.readyContinueTime !== undefined) {
      Timestamp.encode(toTimestamp(message.readyContinueTime), writer.uint32(162).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): State {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.stage = reader.int32() as any;
          break;
        case 2:
          message.command = Command.decode(reader, reader.uint32());
          break;
        case 19:
          message.gameState = GameState.decode(reader, reader.uint32());
          break;
        case 4:
          message.stageTimeElapsed = Duration.decode(reader, reader.uint32());
          break;
        case 5:
          message.stageTimeLeft = Duration.decode(reader, reader.uint32());
          break;
        case 6:
          message.matchTimeStart = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 8:
          const entry8 = State_TeamStateEntry.decode(reader, reader.uint32());
          if (entry8.value !== undefined) {
            message.teamState[entry8.key] = entry8.value;
          }
          break;
        case 9:
          message.placementPos = Vector2.decode(reader, reader.uint32());
          break;
        case 10:
          message.nextCommand = Command.decode(reader, reader.uint32());
          break;
        case 12:
          message.currentActionTimeRemaining = Duration.decode(reader, reader.uint32());
          break;
        case 13:
          message.gameEvents.push(GameEvent.decode(reader, reader.uint32()));
          break;
        case 14:
          message.proposalGroups.push(ProposalGroup.decode(reader, reader.uint32()));
          break;
        case 15:
          message.division = reader.int32() as any;
          break;
        case 17:
          message.firstKickoffTeam = reader.int32() as any;
          break;
        case 18:
          message.matchType = reader.int32() as any;
          break;
        case 20:
          message.readyContinueTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): State {
    return {
      stage: isSet(object.stage) ? referee_StageFromJSON(object.stage) : 0,
      command: isSet(object.command) ? Command.fromJSON(object.command) : undefined,
      gameState: isSet(object.gameState) ? GameState.fromJSON(object.gameState) : undefined,
      stageTimeElapsed: isSet(object.stageTimeElapsed) ? Duration.fromJSON(object.stageTimeElapsed) : undefined,
      stageTimeLeft: isSet(object.stageTimeLeft) ? Duration.fromJSON(object.stageTimeLeft) : undefined,
      matchTimeStart: isSet(object.matchTimeStart) ? fromJsonTimestamp(object.matchTimeStart) : undefined,
      teamState: isObject(object.teamState)
        ? Object.entries(object.teamState).reduce<{ [key: string]: TeamInfo }>((acc, [key, value]) => {
          acc[key] = TeamInfo.fromJSON(value);
          return acc;
        }, {})
        : {},
      placementPos: isSet(object.placementPos) ? Vector2.fromJSON(object.placementPos) : undefined,
      nextCommand: isSet(object.nextCommand) ? Command.fromJSON(object.nextCommand) : undefined,
      currentActionTimeRemaining: isSet(object.currentActionTimeRemaining)
        ? Duration.fromJSON(object.currentActionTimeRemaining)
        : undefined,
      gameEvents: Array.isArray(object?.gameEvents) ? object.gameEvents.map((e: any) => GameEvent.fromJSON(e)) : [],
      proposalGroups: Array.isArray(object?.proposalGroups)
        ? object.proposalGroups.map((e: any) => ProposalGroup.fromJSON(e))
        : [],
      division: isSet(object.division) ? divisionFromJSON(object.division) : 0,
      firstKickoffTeam: isSet(object.firstKickoffTeam) ? teamFromJSON(object.firstKickoffTeam) : 0,
      matchType: isSet(object.matchType) ? matchTypeFromJSON(object.matchType) : 0,
      readyContinueTime: isSet(object.readyContinueTime) ? fromJsonTimestamp(object.readyContinueTime) : undefined,
    };
  },

  toJSON(message: State): unknown {
    const obj: any = {};
    message.stage !== undefined && (obj.stage = referee_StageToJSON(message.stage));
    message.command !== undefined && (obj.command = message.command ? Command.toJSON(message.command) : undefined);
    message.gameState !== undefined &&
      (obj.gameState = message.gameState ? GameState.toJSON(message.gameState) : undefined);
    message.stageTimeElapsed !== undefined &&
      (obj.stageTimeElapsed = message.stageTimeElapsed ? Duration.toJSON(message.stageTimeElapsed) : undefined);
    message.stageTimeLeft !== undefined &&
      (obj.stageTimeLeft = message.stageTimeLeft ? Duration.toJSON(message.stageTimeLeft) : undefined);
    message.matchTimeStart !== undefined && (obj.matchTimeStart = message.matchTimeStart.toISOString());
    obj.teamState = {};
    if (message.teamState) {
      Object.entries(message.teamState).forEach(([k, v]) => {
        obj.teamState[k] = TeamInfo.toJSON(v);
      });
    }
    message.placementPos !== undefined &&
      (obj.placementPos = message.placementPos ? Vector2.toJSON(message.placementPos) : undefined);
    message.nextCommand !== undefined &&
      (obj.nextCommand = message.nextCommand ? Command.toJSON(message.nextCommand) : undefined);
    message.currentActionTimeRemaining !== undefined &&
      (obj.currentActionTimeRemaining = message.currentActionTimeRemaining
        ? Duration.toJSON(message.currentActionTimeRemaining)
        : undefined);
    if (message.gameEvents) {
      obj.gameEvents = message.gameEvents.map((e) => e ? GameEvent.toJSON(e) : undefined);
    } else {
      obj.gameEvents = [];
    }
    if (message.proposalGroups) {
      obj.proposalGroups = message.proposalGroups.map((e) => e ? ProposalGroup.toJSON(e) : undefined);
    } else {
      obj.proposalGroups = [];
    }
    message.division !== undefined && (obj.division = divisionToJSON(message.division));
    message.firstKickoffTeam !== undefined && (obj.firstKickoffTeam = teamToJSON(message.firstKickoffTeam));
    message.matchType !== undefined && (obj.matchType = matchTypeToJSON(message.matchType));
    message.readyContinueTime !== undefined && (obj.readyContinueTime = message.readyContinueTime.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<State>, I>>(object: I): State {
    const message = createBaseState();
    message.stage = object.stage ?? 0;
    message.command = (object.command !== undefined && object.command !== null)
      ? Command.fromPartial(object.command)
      : undefined;
    message.gameState = (object.gameState !== undefined && object.gameState !== null)
      ? GameState.fromPartial(object.gameState)
      : undefined;
    message.stageTimeElapsed = (object.stageTimeElapsed !== undefined && object.stageTimeElapsed !== null)
      ? Duration.fromPartial(object.stageTimeElapsed)
      : undefined;
    message.stageTimeLeft = (object.stageTimeLeft !== undefined && object.stageTimeLeft !== null)
      ? Duration.fromPartial(object.stageTimeLeft)
      : undefined;
    message.matchTimeStart = object.matchTimeStart ?? undefined;
    message.teamState = Object.entries(object.teamState ?? {}).reduce<{ [key: string]: TeamInfo }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = TeamInfo.fromPartial(value);
        }
        return acc;
      },
      {},
    );
    message.placementPos = (object.placementPos !== undefined && object.placementPos !== null)
      ? Vector2.fromPartial(object.placementPos)
      : undefined;
    message.nextCommand = (object.nextCommand !== undefined && object.nextCommand !== null)
      ? Command.fromPartial(object.nextCommand)
      : undefined;
    message.currentActionTimeRemaining =
      (object.currentActionTimeRemaining !== undefined && object.currentActionTimeRemaining !== null)
        ? Duration.fromPartial(object.currentActionTimeRemaining)
        : undefined;
    message.gameEvents = object.gameEvents?.map((e) => GameEvent.fromPartial(e)) || [];
    message.proposalGroups = object.proposalGroups?.map((e) => ProposalGroup.fromPartial(e)) || [];
    message.division = object.division ?? 0;
    message.firstKickoffTeam = object.firstKickoffTeam ?? 0;
    message.matchType = object.matchType ?? 0;
    message.readyContinueTime = object.readyContinueTime ?? undefined;
    return message;
  },
};

function createBaseState_TeamStateEntry(): State_TeamStateEntry {
  return { key: "", value: undefined };
}

export const State_TeamStateEntry = {
  encode(message: State_TeamStateEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      TeamInfo.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): State_TeamStateEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseState_TeamStateEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = TeamInfo.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): State_TeamStateEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? TeamInfo.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: State_TeamStateEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value ? TeamInfo.toJSON(message.value) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<State_TeamStateEntry>, I>>(object: I): State_TeamStateEntry {
    const message = createBaseState_TeamStateEntry();
    message.key = object.key ?? "";
    message.value = (object.value !== undefined && object.value !== null)
      ? TeamInfo.fromPartial(object.value)
      : undefined;
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends { $case: string } ? { [K in keyof Omit<T, "$case">]?: DeepPartial<T[K]> } & { $case: T["$case"] }
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
