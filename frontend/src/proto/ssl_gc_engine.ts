/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Timestamp } from "./google/protobuf/timestamp";
import { RobotId, Team, teamFromJSON, teamToJSON } from "./ssl_gc_common";
import { Vector2, Vector3 } from "./ssl_gc_geometry";

export const protobufPackage = "";

/** The GC state contains settings and state independent of the match state */
export interface GcState {
  /** the state of each team */
  teamState: { [key: string]: GcStateTeam };
  /** the states of the auto referees */
  autoRefState: { [key: string]: GcStateAutoRef };
  /** the attached trackers (uuid -> source_name) */
  trackers: { [key: string]: string };
  /** the next actions that can be executed when continuing */
  continueActions: ContinueAction[];
}

export interface GcState_TeamStateEntry {
  key: string;
  value?: GcStateTeam;
}

export interface GcState_AutoRefStateEntry {
  key: string;
  value?: GcStateAutoRef;
}

export interface GcState_TrackersEntry {
  key: string;
  value: string;
}

/** The GC state for a single team */
export interface GcStateTeam {
  /** true: The team is connected */
  connected: boolean;
  /** true: The team connected via TLS with a verified certificate */
  connectionVerified: boolean;
  /** true: The remote control for the team is connected */
  remoteControlConnected: boolean;
  /** true: The remote control for the team connected via TLS with a verified certificate */
  remoteControlConnectionVerified: boolean;
  /** the advantage choice of the team */
  advantageChoice?: TeamAdvantageChoice;
}

/** The choice from a team regarding the advantage rule */
export interface TeamAdvantageChoice {
  /** the choice of the team */
  choice: TeamAdvantageChoice_AdvantageChoice;
}

/** possible advantage choices */
export enum TeamAdvantageChoice_AdvantageChoice {
  /** STOP - stop the game */
  STOP = 0,
  /** CONTINUE - keep the match running */
  CONTINUE = 1,
  UNRECOGNIZED = -1,
}

export function teamAdvantageChoice_AdvantageChoiceFromJSON(object: any): TeamAdvantageChoice_AdvantageChoice {
  switch (object) {
    case 0:
    case "STOP":
      return TeamAdvantageChoice_AdvantageChoice.STOP;
    case 1:
    case "CONTINUE":
      return TeamAdvantageChoice_AdvantageChoice.CONTINUE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return TeamAdvantageChoice_AdvantageChoice.UNRECOGNIZED;
  }
}

export function teamAdvantageChoice_AdvantageChoiceToJSON(object: TeamAdvantageChoice_AdvantageChoice): string {
  switch (object) {
    case TeamAdvantageChoice_AdvantageChoice.STOP:
      return "STOP";
    case TeamAdvantageChoice_AdvantageChoice.CONTINUE:
      return "CONTINUE";
    case TeamAdvantageChoice_AdvantageChoice.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** The GC state of an auto referee */
export interface GcStateAutoRef {
  /** true: The autoRef connected via TLS with a verified certificate */
  connectionVerified: boolean;
}

/** GC state of a tracker */
export interface GcStateTracker {
  /** Name of the source */
  sourceName: string;
  /** UUID of the source */
  uuid: string;
  /** Current ball */
  ball?: Ball;
  /** Current robots */
  robots: Robot[];
}

/** The ball state */
export interface Ball {
  /** ball position [m] */
  pos?: Vector3;
  /** ball velocity [m/s] */
  vel?: Vector3;
}

/** The robot state */
export interface Robot {
  /** robot id and team */
  id?: RobotId;
  /** robot position [m] */
  pos?: Vector2;
}

export interface ContinueAction {
  /** type of action that will be performed next */
  type: ContinueAction_Type;
  /** for which team (if team specific) */
  forTeam: Team;
  /** list of issues that hinders the game from continuing */
  continuationIssues: string[];
  /** timestamp at which the action will be ready (to give some preparation time) */
  readyAt?: Date;
  /** state of the action */
  state: ContinueAction_State;
}

export enum ContinueAction_Type {
  TYPE_UNKNOWN = 0,
  HALT = 1,
  RESUME_FROM_HALT = 10,
  STOP_GAME = 2,
  RESUME_FROM_STOP = 11,
  NEXT_COMMAND = 3,
  BALL_PLACEMENT_START = 4,
  BALL_PLACEMENT_CANCEL = 9,
  TIMEOUT_START = 5,
  TIMEOUT_STOP = 6,
  BOT_SUBSTITUTION = 7,
  NEXT_STAGE = 8,
  UNRECOGNIZED = -1,
}

export function continueAction_TypeFromJSON(object: any): ContinueAction_Type {
  switch (object) {
    case 0:
    case "TYPE_UNKNOWN":
      return ContinueAction_Type.TYPE_UNKNOWN;
    case 1:
    case "HALT":
      return ContinueAction_Type.HALT;
    case 10:
    case "RESUME_FROM_HALT":
      return ContinueAction_Type.RESUME_FROM_HALT;
    case 2:
    case "STOP_GAME":
      return ContinueAction_Type.STOP_GAME;
    case 11:
    case "RESUME_FROM_STOP":
      return ContinueAction_Type.RESUME_FROM_STOP;
    case 3:
    case "NEXT_COMMAND":
      return ContinueAction_Type.NEXT_COMMAND;
    case 4:
    case "BALL_PLACEMENT_START":
      return ContinueAction_Type.BALL_PLACEMENT_START;
    case 9:
    case "BALL_PLACEMENT_CANCEL":
      return ContinueAction_Type.BALL_PLACEMENT_CANCEL;
    case 5:
    case "TIMEOUT_START":
      return ContinueAction_Type.TIMEOUT_START;
    case 6:
    case "TIMEOUT_STOP":
      return ContinueAction_Type.TIMEOUT_STOP;
    case 7:
    case "BOT_SUBSTITUTION":
      return ContinueAction_Type.BOT_SUBSTITUTION;
    case 8:
    case "NEXT_STAGE":
      return ContinueAction_Type.NEXT_STAGE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ContinueAction_Type.UNRECOGNIZED;
  }
}

export function continueAction_TypeToJSON(object: ContinueAction_Type): string {
  switch (object) {
    case ContinueAction_Type.TYPE_UNKNOWN:
      return "TYPE_UNKNOWN";
    case ContinueAction_Type.HALT:
      return "HALT";
    case ContinueAction_Type.RESUME_FROM_HALT:
      return "RESUME_FROM_HALT";
    case ContinueAction_Type.STOP_GAME:
      return "STOP_GAME";
    case ContinueAction_Type.RESUME_FROM_STOP:
      return "RESUME_FROM_STOP";
    case ContinueAction_Type.NEXT_COMMAND:
      return "NEXT_COMMAND";
    case ContinueAction_Type.BALL_PLACEMENT_START:
      return "BALL_PLACEMENT_START";
    case ContinueAction_Type.BALL_PLACEMENT_CANCEL:
      return "BALL_PLACEMENT_CANCEL";
    case ContinueAction_Type.TIMEOUT_START:
      return "TIMEOUT_START";
    case ContinueAction_Type.TIMEOUT_STOP:
      return "TIMEOUT_STOP";
    case ContinueAction_Type.BOT_SUBSTITUTION:
      return "BOT_SUBSTITUTION";
    case ContinueAction_Type.NEXT_STAGE:
      return "NEXT_STAGE";
    case ContinueAction_Type.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum ContinueAction_State {
  STATE_UNKNOWN = 0,
  BLOCKED = 1,
  WAITING = 2,
  READY_AUTO = 3,
  READY_MANUAL = 4,
  UNRECOGNIZED = -1,
}

export function continueAction_StateFromJSON(object: any): ContinueAction_State {
  switch (object) {
    case 0:
    case "STATE_UNKNOWN":
      return ContinueAction_State.STATE_UNKNOWN;
    case 1:
    case "BLOCKED":
      return ContinueAction_State.BLOCKED;
    case 2:
    case "WAITING":
      return ContinueAction_State.WAITING;
    case 3:
    case "READY_AUTO":
      return ContinueAction_State.READY_AUTO;
    case 4:
    case "READY_MANUAL":
      return ContinueAction_State.READY_MANUAL;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ContinueAction_State.UNRECOGNIZED;
  }
}

export function continueAction_StateToJSON(object: ContinueAction_State): string {
  switch (object) {
    case ContinueAction_State.STATE_UNKNOWN:
      return "STATE_UNKNOWN";
    case ContinueAction_State.BLOCKED:
      return "BLOCKED";
    case ContinueAction_State.WAITING:
      return "WAITING";
    case ContinueAction_State.READY_AUTO:
      return "READY_AUTO";
    case ContinueAction_State.READY_MANUAL:
      return "READY_MANUAL";
    case ContinueAction_State.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

function createBaseGcState(): GcState {
  return { teamState: {}, autoRefState: {}, trackers: {}, continueActions: [] };
}

export const GcState = {
  encode(message: GcState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    Object.entries(message.teamState).forEach(([key, value]) => {
      GcState_TeamStateEntry.encode({ key: key as any, value }, writer.uint32(10).fork()).ldelim();
    });
    Object.entries(message.autoRefState).forEach(([key, value]) => {
      GcState_AutoRefStateEntry.encode({ key: key as any, value }, writer.uint32(18).fork()).ldelim();
    });
    Object.entries(message.trackers).forEach(([key, value]) => {
      GcState_TrackersEntry.encode({ key: key as any, value }, writer.uint32(26).fork()).ldelim();
    });
    for (const v of message.continueActions) {
      ContinueAction.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GcState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGcState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          const entry1 = GcState_TeamStateEntry.decode(reader, reader.uint32());
          if (entry1.value !== undefined) {
            message.teamState[entry1.key] = entry1.value;
          }
          break;
        case 2:
          const entry2 = GcState_AutoRefStateEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.autoRefState[entry2.key] = entry2.value;
          }
          break;
        case 3:
          const entry3 = GcState_TrackersEntry.decode(reader, reader.uint32());
          if (entry3.value !== undefined) {
            message.trackers[entry3.key] = entry3.value;
          }
          break;
        case 4:
          message.continueActions.push(ContinueAction.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GcState {
    return {
      teamState: isObject(object.teamState)
        ? Object.entries(object.teamState).reduce<{ [key: string]: GcStateTeam }>((acc, [key, value]) => {
          acc[key] = GcStateTeam.fromJSON(value);
          return acc;
        }, {})
        : {},
      autoRefState: isObject(object.autoRefState)
        ? Object.entries(object.autoRefState).reduce<{ [key: string]: GcStateAutoRef }>((acc, [key, value]) => {
          acc[key] = GcStateAutoRef.fromJSON(value);
          return acc;
        }, {})
        : {},
      trackers: isObject(object.trackers)
        ? Object.entries(object.trackers).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
      continueActions: Array.isArray(object?.continueActions)
        ? object.continueActions.map((e: any) => ContinueAction.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GcState): unknown {
    const obj: any = {};
    obj.teamState = {};
    if (message.teamState) {
      Object.entries(message.teamState).forEach(([k, v]) => {
        obj.teamState[k] = GcStateTeam.toJSON(v);
      });
    }
    obj.autoRefState = {};
    if (message.autoRefState) {
      Object.entries(message.autoRefState).forEach(([k, v]) => {
        obj.autoRefState[k] = GcStateAutoRef.toJSON(v);
      });
    }
    obj.trackers = {};
    if (message.trackers) {
      Object.entries(message.trackers).forEach(([k, v]) => {
        obj.trackers[k] = v;
      });
    }
    if (message.continueActions) {
      obj.continueActions = message.continueActions.map((e) => e ? ContinueAction.toJSON(e) : undefined);
    } else {
      obj.continueActions = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GcState>, I>>(object: I): GcState {
    const message = createBaseGcState();
    message.teamState = Object.entries(object.teamState ?? {}).reduce<{ [key: string]: GcStateTeam }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = GcStateTeam.fromPartial(value);
        }
        return acc;
      },
      {},
    );
    message.autoRefState = Object.entries(object.autoRefState ?? {}).reduce<{ [key: string]: GcStateAutoRef }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = GcStateAutoRef.fromPartial(value);
        }
        return acc;
      },
      {},
    );
    message.trackers = Object.entries(object.trackers ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
      }
      return acc;
    }, {});
    message.continueActions = object.continueActions?.map((e) => ContinueAction.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGcState_TeamStateEntry(): GcState_TeamStateEntry {
  return { key: "", value: undefined };
}

export const GcState_TeamStateEntry = {
  encode(message: GcState_TeamStateEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      GcStateTeam.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GcState_TeamStateEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGcState_TeamStateEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = GcStateTeam.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GcState_TeamStateEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? GcStateTeam.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: GcState_TeamStateEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value ? GcStateTeam.toJSON(message.value) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GcState_TeamStateEntry>, I>>(object: I): GcState_TeamStateEntry {
    const message = createBaseGcState_TeamStateEntry();
    message.key = object.key ?? "";
    message.value = (object.value !== undefined && object.value !== null)
      ? GcStateTeam.fromPartial(object.value)
      : undefined;
    return message;
  },
};

function createBaseGcState_AutoRefStateEntry(): GcState_AutoRefStateEntry {
  return { key: "", value: undefined };
}

export const GcState_AutoRefStateEntry = {
  encode(message: GcState_AutoRefStateEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      GcStateAutoRef.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GcState_AutoRefStateEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGcState_AutoRefStateEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = GcStateAutoRef.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GcState_AutoRefStateEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? GcStateAutoRef.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: GcState_AutoRefStateEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value ? GcStateAutoRef.toJSON(message.value) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GcState_AutoRefStateEntry>, I>>(object: I): GcState_AutoRefStateEntry {
    const message = createBaseGcState_AutoRefStateEntry();
    message.key = object.key ?? "";
    message.value = (object.value !== undefined && object.value !== null)
      ? GcStateAutoRef.fromPartial(object.value)
      : undefined;
    return message;
  },
};

function createBaseGcState_TrackersEntry(): GcState_TrackersEntry {
  return { key: "", value: "" };
}

export const GcState_TrackersEntry = {
  encode(message: GcState_TrackersEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GcState_TrackersEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGcState_TrackersEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GcState_TrackersEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: GcState_TrackersEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GcState_TrackersEntry>, I>>(object: I): GcState_TrackersEntry {
    const message = createBaseGcState_TrackersEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseGcStateTeam(): GcStateTeam {
  return {
    connected: false,
    connectionVerified: false,
    remoteControlConnected: false,
    remoteControlConnectionVerified: false,
    advantageChoice: undefined,
  };
}

export const GcStateTeam = {
  encode(message: GcStateTeam, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.connected === true) {
      writer.uint32(8).bool(message.connected);
    }
    if (message.connectionVerified === true) {
      writer.uint32(16).bool(message.connectionVerified);
    }
    if (message.remoteControlConnected === true) {
      writer.uint32(24).bool(message.remoteControlConnected);
    }
    if (message.remoteControlConnectionVerified === true) {
      writer.uint32(32).bool(message.remoteControlConnectionVerified);
    }
    if (message.advantageChoice !== undefined) {
      TeamAdvantageChoice.encode(message.advantageChoice, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GcStateTeam {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGcStateTeam();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.connected = reader.bool();
          break;
        case 2:
          message.connectionVerified = reader.bool();
          break;
        case 3:
          message.remoteControlConnected = reader.bool();
          break;
        case 4:
          message.remoteControlConnectionVerified = reader.bool();
          break;
        case 5:
          message.advantageChoice = TeamAdvantageChoice.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GcStateTeam {
    return {
      connected: isSet(object.connected) ? Boolean(object.connected) : false,
      connectionVerified: isSet(object.connectionVerified) ? Boolean(object.connectionVerified) : false,
      remoteControlConnected: isSet(object.remoteControlConnected) ? Boolean(object.remoteControlConnected) : false,
      remoteControlConnectionVerified: isSet(object.remoteControlConnectionVerified)
        ? Boolean(object.remoteControlConnectionVerified)
        : false,
      advantageChoice: isSet(object.advantageChoice) ? TeamAdvantageChoice.fromJSON(object.advantageChoice) : undefined,
    };
  },

  toJSON(message: GcStateTeam): unknown {
    const obj: any = {};
    message.connected !== undefined && (obj.connected = message.connected);
    message.connectionVerified !== undefined && (obj.connectionVerified = message.connectionVerified);
    message.remoteControlConnected !== undefined && (obj.remoteControlConnected = message.remoteControlConnected);
    message.remoteControlConnectionVerified !== undefined &&
      (obj.remoteControlConnectionVerified = message.remoteControlConnectionVerified);
    message.advantageChoice !== undefined &&
      (obj.advantageChoice = message.advantageChoice ? TeamAdvantageChoice.toJSON(message.advantageChoice) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GcStateTeam>, I>>(object: I): GcStateTeam {
    const message = createBaseGcStateTeam();
    message.connected = object.connected ?? false;
    message.connectionVerified = object.connectionVerified ?? false;
    message.remoteControlConnected = object.remoteControlConnected ?? false;
    message.remoteControlConnectionVerified = object.remoteControlConnectionVerified ?? false;
    message.advantageChoice = (object.advantageChoice !== undefined && object.advantageChoice !== null)
      ? TeamAdvantageChoice.fromPartial(object.advantageChoice)
      : undefined;
    return message;
  },
};

function createBaseTeamAdvantageChoice(): TeamAdvantageChoice {
  return { choice: 0 };
}

export const TeamAdvantageChoice = {
  encode(message: TeamAdvantageChoice, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.choice !== 0) {
      writer.uint32(8).int32(message.choice);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TeamAdvantageChoice {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTeamAdvantageChoice();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.choice = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TeamAdvantageChoice {
    return { choice: isSet(object.choice) ? teamAdvantageChoice_AdvantageChoiceFromJSON(object.choice) : 0 };
  },

  toJSON(message: TeamAdvantageChoice): unknown {
    const obj: any = {};
    message.choice !== undefined && (obj.choice = teamAdvantageChoice_AdvantageChoiceToJSON(message.choice));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TeamAdvantageChoice>, I>>(object: I): TeamAdvantageChoice {
    const message = createBaseTeamAdvantageChoice();
    message.choice = object.choice ?? 0;
    return message;
  },
};

function createBaseGcStateAutoRef(): GcStateAutoRef {
  return { connectionVerified: false };
}

export const GcStateAutoRef = {
  encode(message: GcStateAutoRef, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.connectionVerified === true) {
      writer.uint32(8).bool(message.connectionVerified);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GcStateAutoRef {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGcStateAutoRef();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.connectionVerified = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GcStateAutoRef {
    return { connectionVerified: isSet(object.connectionVerified) ? Boolean(object.connectionVerified) : false };
  },

  toJSON(message: GcStateAutoRef): unknown {
    const obj: any = {};
    message.connectionVerified !== undefined && (obj.connectionVerified = message.connectionVerified);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GcStateAutoRef>, I>>(object: I): GcStateAutoRef {
    const message = createBaseGcStateAutoRef();
    message.connectionVerified = object.connectionVerified ?? false;
    return message;
  },
};

function createBaseGcStateTracker(): GcStateTracker {
  return { sourceName: "", uuid: "", ball: undefined, robots: [] };
}

export const GcStateTracker = {
  encode(message: GcStateTracker, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sourceName !== "") {
      writer.uint32(10).string(message.sourceName);
    }
    if (message.uuid !== "") {
      writer.uint32(34).string(message.uuid);
    }
    if (message.ball !== undefined) {
      Ball.encode(message.ball, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.robots) {
      Robot.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GcStateTracker {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGcStateTracker();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sourceName = reader.string();
          break;
        case 4:
          message.uuid = reader.string();
          break;
        case 2:
          message.ball = Ball.decode(reader, reader.uint32());
          break;
        case 3:
          message.robots.push(Robot.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GcStateTracker {
    return {
      sourceName: isSet(object.sourceName) ? String(object.sourceName) : "",
      uuid: isSet(object.uuid) ? String(object.uuid) : "",
      ball: isSet(object.ball) ? Ball.fromJSON(object.ball) : undefined,
      robots: Array.isArray(object?.robots) ? object.robots.map((e: any) => Robot.fromJSON(e)) : [],
    };
  },

  toJSON(message: GcStateTracker): unknown {
    const obj: any = {};
    message.sourceName !== undefined && (obj.sourceName = message.sourceName);
    message.uuid !== undefined && (obj.uuid = message.uuid);
    message.ball !== undefined && (obj.ball = message.ball ? Ball.toJSON(message.ball) : undefined);
    if (message.robots) {
      obj.robots = message.robots.map((e) => e ? Robot.toJSON(e) : undefined);
    } else {
      obj.robots = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GcStateTracker>, I>>(object: I): GcStateTracker {
    const message = createBaseGcStateTracker();
    message.sourceName = object.sourceName ?? "";
    message.uuid = object.uuid ?? "";
    message.ball = (object.ball !== undefined && object.ball !== null) ? Ball.fromPartial(object.ball) : undefined;
    message.robots = object.robots?.map((e) => Robot.fromPartial(e)) || [];
    return message;
  },
};

function createBaseBall(): Ball {
  return { pos: undefined, vel: undefined };
}

export const Ball = {
  encode(message: Ball, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pos !== undefined) {
      Vector3.encode(message.pos, writer.uint32(10).fork()).ldelim();
    }
    if (message.vel !== undefined) {
      Vector3.encode(message.vel, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Ball {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBall();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pos = Vector3.decode(reader, reader.uint32());
          break;
        case 2:
          message.vel = Vector3.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Ball {
    return {
      pos: isSet(object.pos) ? Vector3.fromJSON(object.pos) : undefined,
      vel: isSet(object.vel) ? Vector3.fromJSON(object.vel) : undefined,
    };
  },

  toJSON(message: Ball): unknown {
    const obj: any = {};
    message.pos !== undefined && (obj.pos = message.pos ? Vector3.toJSON(message.pos) : undefined);
    message.vel !== undefined && (obj.vel = message.vel ? Vector3.toJSON(message.vel) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Ball>, I>>(object: I): Ball {
    const message = createBaseBall();
    message.pos = (object.pos !== undefined && object.pos !== null) ? Vector3.fromPartial(object.pos) : undefined;
    message.vel = (object.vel !== undefined && object.vel !== null) ? Vector3.fromPartial(object.vel) : undefined;
    return message;
  },
};

function createBaseRobot(): Robot {
  return { id: undefined, pos: undefined };
}

export const Robot = {
  encode(message: Robot, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined) {
      RobotId.encode(message.id, writer.uint32(10).fork()).ldelim();
    }
    if (message.pos !== undefined) {
      Vector2.encode(message.pos, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Robot {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRobot();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = RobotId.decode(reader, reader.uint32());
          break;
        case 2:
          message.pos = Vector2.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Robot {
    return {
      id: isSet(object.id) ? RobotId.fromJSON(object.id) : undefined,
      pos: isSet(object.pos) ? Vector2.fromJSON(object.pos) : undefined,
    };
  },

  toJSON(message: Robot): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id ? RobotId.toJSON(message.id) : undefined);
    message.pos !== undefined && (obj.pos = message.pos ? Vector2.toJSON(message.pos) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Robot>, I>>(object: I): Robot {
    const message = createBaseRobot();
    message.id = (object.id !== undefined && object.id !== null) ? RobotId.fromPartial(object.id) : undefined;
    message.pos = (object.pos !== undefined && object.pos !== null) ? Vector2.fromPartial(object.pos) : undefined;
    return message;
  },
};

function createBaseContinueAction(): ContinueAction {
  return { type: 0, forTeam: 0, continuationIssues: [], readyAt: undefined, state: 0 };
}

export const ContinueAction = {
  encode(message: ContinueAction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.forTeam !== 0) {
      writer.uint32(16).int32(message.forTeam);
    }
    for (const v of message.continuationIssues) {
      writer.uint32(26).string(v!);
    }
    if (message.readyAt !== undefined) {
      Timestamp.encode(toTimestamp(message.readyAt), writer.uint32(34).fork()).ldelim();
    }
    if (message.state !== 0) {
      writer.uint32(40).int32(message.state);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ContinueAction {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseContinueAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.int32() as any;
          break;
        case 2:
          message.forTeam = reader.int32() as any;
          break;
        case 3:
          message.continuationIssues.push(reader.string());
          break;
        case 4:
          message.readyAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 5:
          message.state = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ContinueAction {
    return {
      type: isSet(object.type) ? continueAction_TypeFromJSON(object.type) : 0,
      forTeam: isSet(object.forTeam) ? teamFromJSON(object.forTeam) : 0,
      continuationIssues: Array.isArray(object?.continuationIssues)
        ? object.continuationIssues.map((e: any) => String(e))
        : [],
      readyAt: isSet(object.readyAt) ? fromJsonTimestamp(object.readyAt) : undefined,
      state: isSet(object.state) ? continueAction_StateFromJSON(object.state) : 0,
    };
  },

  toJSON(message: ContinueAction): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = continueAction_TypeToJSON(message.type));
    message.forTeam !== undefined && (obj.forTeam = teamToJSON(message.forTeam));
    if (message.continuationIssues) {
      obj.continuationIssues = message.continuationIssues.map((e) => e);
    } else {
      obj.continuationIssues = [];
    }
    message.readyAt !== undefined && (obj.readyAt = message.readyAt.toISOString());
    message.state !== undefined && (obj.state = continueAction_StateToJSON(message.state));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ContinueAction>, I>>(object: I): ContinueAction {
    const message = createBaseContinueAction();
    message.type = object.type ?? 0;
    message.forTeam = object.forTeam ?? 0;
    message.continuationIssues = object.continuationIssues?.map((e) => e) || [];
    message.readyAt = object.readyAt ?? undefined;
    message.state = object.state ?? 0;
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
