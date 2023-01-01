/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Duration } from "./google/protobuf/duration";
import { Change } from "./ssl_gc_change";
import { ContinueAction, GcState } from "./ssl_gc_engine";
import { Config } from "./ssl_gc_engine_config";
import { State } from "./ssl_gc_state";

export const protobufPackage = "";

/** Message format that is pushed from the GC to the client */
export interface Output {
  /** The current match state */
  matchState?: State;
  /** The current GC state */
  gcState?: GcState;
  /** The protocol */
  protocol?: Protocol;
  /** The engine config */
  config?: Config;
}

/** The game protocol */
export interface Protocol {
  /**
   * Is this a delta only?
   * Entries that were already sent are not sent again, because the protocol is immutable anyway.
   * But if the game is reset, the whole protocol must be replaced. That's what this flag is for.
   */
  delta: boolean;
  /** The (delta) list of entries */
  entry: ProtocolEntry[];
}

/** A protocol entry of a change */
export interface ProtocolEntry {
  /** Id of the entry */
  id: number;
  /** The change that was made */
  change?: Change;
  /** The match time elapsed when this change was made */
  matchTimeElapsed?: Duration;
  /** The stage time elapsed when this change was made */
  stageTimeElapsed?: Duration;
}

/** Message format that can be send from the client to the GC */
export interface Input {
  /** A change to be enqueued into the GC engine */
  change?: Change;
  /** Reset the match */
  resetMatch: boolean;
  /** An updated config delta */
  configDelta?: Config;
  /** Continue with action */
  continueAction?: ContinueAction;
}

function createBaseOutput(): Output {
  return { matchState: undefined, gcState: undefined, protocol: undefined, config: undefined };
}

export const Output = {
  encode(message: Output, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.matchState !== undefined) {
      State.encode(message.matchState, writer.uint32(10).fork()).ldelim();
    }
    if (message.gcState !== undefined) {
      GcState.encode(message.gcState, writer.uint32(18).fork()).ldelim();
    }
    if (message.protocol !== undefined) {
      Protocol.encode(message.protocol, writer.uint32(26).fork()).ldelim();
    }
    if (message.config !== undefined) {
      Config.encode(message.config, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Output {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOutput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.matchState = State.decode(reader, reader.uint32());
          break;
        case 2:
          message.gcState = GcState.decode(reader, reader.uint32());
          break;
        case 3:
          message.protocol = Protocol.decode(reader, reader.uint32());
          break;
        case 4:
          message.config = Config.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Output {
    return {
      matchState: isSet(object.matchState) ? State.fromJSON(object.matchState) : undefined,
      gcState: isSet(object.gcState) ? GcState.fromJSON(object.gcState) : undefined,
      protocol: isSet(object.protocol) ? Protocol.fromJSON(object.protocol) : undefined,
      config: isSet(object.config) ? Config.fromJSON(object.config) : undefined,
    };
  },

  toJSON(message: Output): unknown {
    const obj: any = {};
    message.matchState !== undefined &&
      (obj.matchState = message.matchState ? State.toJSON(message.matchState) : undefined);
    message.gcState !== undefined && (obj.gcState = message.gcState ? GcState.toJSON(message.gcState) : undefined);
    message.protocol !== undefined && (obj.protocol = message.protocol ? Protocol.toJSON(message.protocol) : undefined);
    message.config !== undefined && (obj.config = message.config ? Config.toJSON(message.config) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Output>, I>>(object: I): Output {
    const message = createBaseOutput();
    message.matchState = (object.matchState !== undefined && object.matchState !== null)
      ? State.fromPartial(object.matchState)
      : undefined;
    message.gcState = (object.gcState !== undefined && object.gcState !== null)
      ? GcState.fromPartial(object.gcState)
      : undefined;
    message.protocol = (object.protocol !== undefined && object.protocol !== null)
      ? Protocol.fromPartial(object.protocol)
      : undefined;
    message.config = (object.config !== undefined && object.config !== null)
      ? Config.fromPartial(object.config)
      : undefined;
    return message;
  },
};

function createBaseProtocol(): Protocol {
  return { delta: false, entry: [] };
}

export const Protocol = {
  encode(message: Protocol, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.delta === true) {
      writer.uint32(8).bool(message.delta);
    }
    for (const v of message.entry) {
      ProtocolEntry.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Protocol {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProtocol();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delta = reader.bool();
          break;
        case 2:
          message.entry.push(ProtocolEntry.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Protocol {
    return {
      delta: isSet(object.delta) ? Boolean(object.delta) : false,
      entry: Array.isArray(object?.entry) ? object.entry.map((e: any) => ProtocolEntry.fromJSON(e)) : [],
    };
  },

  toJSON(message: Protocol): unknown {
    const obj: any = {};
    message.delta !== undefined && (obj.delta = message.delta);
    if (message.entry) {
      obj.entry = message.entry.map((e) => e ? ProtocolEntry.toJSON(e) : undefined);
    } else {
      obj.entry = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Protocol>, I>>(object: I): Protocol {
    const message = createBaseProtocol();
    message.delta = object.delta ?? false;
    message.entry = object.entry?.map((e) => ProtocolEntry.fromPartial(e)) || [];
    return message;
  },
};

function createBaseProtocolEntry(): ProtocolEntry {
  return { id: 0, change: undefined, matchTimeElapsed: undefined, stageTimeElapsed: undefined };
}

export const ProtocolEntry = {
  encode(message: ProtocolEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    if (message.change !== undefined) {
      Change.encode(message.change, writer.uint32(18).fork()).ldelim();
    }
    if (message.matchTimeElapsed !== undefined) {
      Duration.encode(message.matchTimeElapsed, writer.uint32(26).fork()).ldelim();
    }
    if (message.stageTimeElapsed !== undefined) {
      Duration.encode(message.stageTimeElapsed, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProtocolEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProtocolEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.int32();
          break;
        case 2:
          message.change = Change.decode(reader, reader.uint32());
          break;
        case 3:
          message.matchTimeElapsed = Duration.decode(reader, reader.uint32());
          break;
        case 4:
          message.stageTimeElapsed = Duration.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ProtocolEntry {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      change: isSet(object.change) ? Change.fromJSON(object.change) : undefined,
      matchTimeElapsed: isSet(object.matchTimeElapsed) ? Duration.fromJSON(object.matchTimeElapsed) : undefined,
      stageTimeElapsed: isSet(object.stageTimeElapsed) ? Duration.fromJSON(object.stageTimeElapsed) : undefined,
    };
  },

  toJSON(message: ProtocolEntry): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.change !== undefined && (obj.change = message.change ? Change.toJSON(message.change) : undefined);
    message.matchTimeElapsed !== undefined &&
      (obj.matchTimeElapsed = message.matchTimeElapsed ? Duration.toJSON(message.matchTimeElapsed) : undefined);
    message.stageTimeElapsed !== undefined &&
      (obj.stageTimeElapsed = message.stageTimeElapsed ? Duration.toJSON(message.stageTimeElapsed) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ProtocolEntry>, I>>(object: I): ProtocolEntry {
    const message = createBaseProtocolEntry();
    message.id = object.id ?? 0;
    message.change = (object.change !== undefined && object.change !== null)
      ? Change.fromPartial(object.change)
      : undefined;
    message.matchTimeElapsed = (object.matchTimeElapsed !== undefined && object.matchTimeElapsed !== null)
      ? Duration.fromPartial(object.matchTimeElapsed)
      : undefined;
    message.stageTimeElapsed = (object.stageTimeElapsed !== undefined && object.stageTimeElapsed !== null)
      ? Duration.fromPartial(object.stageTimeElapsed)
      : undefined;
    return message;
  },
};

function createBaseInput(): Input {
  return { change: undefined, resetMatch: false, configDelta: undefined, continueAction: undefined };
}

export const Input = {
  encode(message: Input, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.change !== undefined) {
      Change.encode(message.change, writer.uint32(10).fork()).ldelim();
    }
    if (message.resetMatch === true) {
      writer.uint32(16).bool(message.resetMatch);
    }
    if (message.configDelta !== undefined) {
      Config.encode(message.configDelta, writer.uint32(26).fork()).ldelim();
    }
    if (message.continueAction !== undefined) {
      ContinueAction.encode(message.continueAction, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Input {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.change = Change.decode(reader, reader.uint32());
          break;
        case 2:
          message.resetMatch = reader.bool();
          break;
        case 3:
          message.configDelta = Config.decode(reader, reader.uint32());
          break;
        case 4:
          message.continueAction = ContinueAction.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Input {
    return {
      change: isSet(object.change) ? Change.fromJSON(object.change) : undefined,
      resetMatch: isSet(object.resetMatch) ? Boolean(object.resetMatch) : false,
      configDelta: isSet(object.configDelta) ? Config.fromJSON(object.configDelta) : undefined,
      continueAction: isSet(object.continueAction) ? ContinueAction.fromJSON(object.continueAction) : undefined,
    };
  },

  toJSON(message: Input): unknown {
    const obj: any = {};
    message.change !== undefined && (obj.change = message.change ? Change.toJSON(message.change) : undefined);
    message.resetMatch !== undefined && (obj.resetMatch = message.resetMatch);
    message.configDelta !== undefined &&
      (obj.configDelta = message.configDelta ? Config.toJSON(message.configDelta) : undefined);
    message.continueAction !== undefined &&
      (obj.continueAction = message.continueAction ? ContinueAction.toJSON(message.continueAction) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Input>, I>>(object: I): Input {
    const message = createBaseInput();
    message.change = (object.change !== undefined && object.change !== null)
      ? Change.fromPartial(object.change)
      : undefined;
    message.resetMatch = object.resetMatch ?? false;
    message.configDelta = (object.configDelta !== undefined && object.configDelta !== null)
      ? Config.fromPartial(object.configDelta)
      : undefined;
    message.continueAction = (object.continueAction !== undefined && object.continueAction !== null)
      ? ContinueAction.fromPartial(object.continueAction)
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
