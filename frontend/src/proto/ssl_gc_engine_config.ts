/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "";

/** The engine config */
export interface Config {
  /** The behavior for each game event */
  gameEventBehavior: { [key: string]: Config_Behavior };
  /** The config for each auto referee */
  autoRefConfigs: { [key: string]: AutoRefConfig };
  /** The selected tracker source */
  activeTrackerSource: string;
  /** The list of available teams */
  teams: string[];
  /** Enable or disable auto continuation */
  autoContinue: boolean;
}

/** Behaviors for each game event */
export enum Config_Behavior {
  /** BEHAVIOR_UNKNOWN - Not set or unknown */
  BEHAVIOR_UNKNOWN = 0,
  /** BEHAVIOR_ACCEPT - Always accept the game event */
  BEHAVIOR_ACCEPT = 1,
  /** BEHAVIOR_ACCEPT_MAJORITY - Accept the game event if was reported by a majority */
  BEHAVIOR_ACCEPT_MAJORITY = 2,
  /** BEHAVIOR_PROPOSE_ONLY - Only propose the game event (can be accepted in the UI by a human) */
  BEHAVIOR_PROPOSE_ONLY = 3,
  /** BEHAVIOR_LOG - Only log the game event to the protocol */
  BEHAVIOR_LOG = 4,
  /** BEHAVIOR_IGNORE - Silently ignore the game event */
  BEHAVIOR_IGNORE = 5,
  UNRECOGNIZED = -1,
}

export function config_BehaviorFromJSON(object: any): Config_Behavior {
  switch (object) {
    case 0:
    case "BEHAVIOR_UNKNOWN":
      return Config_Behavior.BEHAVIOR_UNKNOWN;
    case 1:
    case "BEHAVIOR_ACCEPT":
      return Config_Behavior.BEHAVIOR_ACCEPT;
    case 2:
    case "BEHAVIOR_ACCEPT_MAJORITY":
      return Config_Behavior.BEHAVIOR_ACCEPT_MAJORITY;
    case 3:
    case "BEHAVIOR_PROPOSE_ONLY":
      return Config_Behavior.BEHAVIOR_PROPOSE_ONLY;
    case 4:
    case "BEHAVIOR_LOG":
      return Config_Behavior.BEHAVIOR_LOG;
    case 5:
    case "BEHAVIOR_IGNORE":
      return Config_Behavior.BEHAVIOR_IGNORE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Config_Behavior.UNRECOGNIZED;
  }
}

export function config_BehaviorToJSON(object: Config_Behavior): string {
  switch (object) {
    case Config_Behavior.BEHAVIOR_UNKNOWN:
      return "BEHAVIOR_UNKNOWN";
    case Config_Behavior.BEHAVIOR_ACCEPT:
      return "BEHAVIOR_ACCEPT";
    case Config_Behavior.BEHAVIOR_ACCEPT_MAJORITY:
      return "BEHAVIOR_ACCEPT_MAJORITY";
    case Config_Behavior.BEHAVIOR_PROPOSE_ONLY:
      return "BEHAVIOR_PROPOSE_ONLY";
    case Config_Behavior.BEHAVIOR_LOG:
      return "BEHAVIOR_LOG";
    case Config_Behavior.BEHAVIOR_IGNORE:
      return "BEHAVIOR_IGNORE";
    case Config_Behavior.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface Config_GameEventBehaviorEntry {
  key: string;
  value: Config_Behavior;
}

export interface Config_AutoRefConfigsEntry {
  key: string;
  value?: AutoRefConfig;
}

/** The config for an auto referee */
export interface AutoRefConfig {
  /** The game event behaviors for this auto referee */
  gameEventBehavior: { [key: string]: AutoRefConfig_Behavior };
}

/** Behaviors for the game events reported by this auto referee */
export enum AutoRefConfig_Behavior {
  /** BEHAVIOR_UNKNOWN - Not set or unknown */
  BEHAVIOR_UNKNOWN = 0,
  /** BEHAVIOR_ACCEPT - Accept the game event */
  BEHAVIOR_ACCEPT = 1,
  /** BEHAVIOR_LOG - Log the game event */
  BEHAVIOR_LOG = 2,
  /** BEHAVIOR_IGNORE - Silently ignore the game event */
  BEHAVIOR_IGNORE = 3,
  UNRECOGNIZED = -1,
}

export function autoRefConfig_BehaviorFromJSON(object: any): AutoRefConfig_Behavior {
  switch (object) {
    case 0:
    case "BEHAVIOR_UNKNOWN":
      return AutoRefConfig_Behavior.BEHAVIOR_UNKNOWN;
    case 1:
    case "BEHAVIOR_ACCEPT":
      return AutoRefConfig_Behavior.BEHAVIOR_ACCEPT;
    case 2:
    case "BEHAVIOR_LOG":
      return AutoRefConfig_Behavior.BEHAVIOR_LOG;
    case 3:
    case "BEHAVIOR_IGNORE":
      return AutoRefConfig_Behavior.BEHAVIOR_IGNORE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return AutoRefConfig_Behavior.UNRECOGNIZED;
  }
}

export function autoRefConfig_BehaviorToJSON(object: AutoRefConfig_Behavior): string {
  switch (object) {
    case AutoRefConfig_Behavior.BEHAVIOR_UNKNOWN:
      return "BEHAVIOR_UNKNOWN";
    case AutoRefConfig_Behavior.BEHAVIOR_ACCEPT:
      return "BEHAVIOR_ACCEPT";
    case AutoRefConfig_Behavior.BEHAVIOR_LOG:
      return "BEHAVIOR_LOG";
    case AutoRefConfig_Behavior.BEHAVIOR_IGNORE:
      return "BEHAVIOR_IGNORE";
    case AutoRefConfig_Behavior.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface AutoRefConfig_GameEventBehaviorEntry {
  key: string;
  value: AutoRefConfig_Behavior;
}

function createBaseConfig(): Config {
  return { gameEventBehavior: {}, autoRefConfigs: {}, activeTrackerSource: "", teams: [], autoContinue: false };
}

export const Config = {
  encode(message: Config, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    Object.entries(message.gameEventBehavior).forEach(([key, value]) => {
      Config_GameEventBehaviorEntry.encode({ key: key as any, value }, writer.uint32(10).fork()).ldelim();
    });
    Object.entries(message.autoRefConfigs).forEach(([key, value]) => {
      Config_AutoRefConfigsEntry.encode({ key: key as any, value }, writer.uint32(18).fork()).ldelim();
    });
    if (message.activeTrackerSource !== "") {
      writer.uint32(26).string(message.activeTrackerSource);
    }
    for (const v of message.teams) {
      writer.uint32(34).string(v!);
    }
    if (message.autoContinue === true) {
      writer.uint32(40).bool(message.autoContinue);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Config {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          const entry1 = Config_GameEventBehaviorEntry.decode(reader, reader.uint32());
          if (entry1.value !== undefined) {
            message.gameEventBehavior[entry1.key] = entry1.value;
          }
          break;
        case 2:
          const entry2 = Config_AutoRefConfigsEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.autoRefConfigs[entry2.key] = entry2.value;
          }
          break;
        case 3:
          message.activeTrackerSource = reader.string();
          break;
        case 4:
          message.teams.push(reader.string());
          break;
        case 5:
          message.autoContinue = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Config {
    return {
      gameEventBehavior: isObject(object.gameEventBehavior)
        ? Object.entries(object.gameEventBehavior).reduce<{ [key: string]: Config_Behavior }>((acc, [key, value]) => {
          acc[key] = config_BehaviorFromJSON(value);
          return acc;
        }, {})
        : {},
      autoRefConfigs: isObject(object.autoRefConfigs)
        ? Object.entries(object.autoRefConfigs).reduce<{ [key: string]: AutoRefConfig }>((acc, [key, value]) => {
          acc[key] = AutoRefConfig.fromJSON(value);
          return acc;
        }, {})
        : {},
      activeTrackerSource: isSet(object.activeTrackerSource) ? String(object.activeTrackerSource) : "",
      teams: Array.isArray(object?.teams) ? object.teams.map((e: any) => String(e)) : [],
      autoContinue: isSet(object.autoContinue) ? Boolean(object.autoContinue) : false,
    };
  },

  toJSON(message: Config): unknown {
    const obj: any = {};
    obj.gameEventBehavior = {};
    if (message.gameEventBehavior) {
      Object.entries(message.gameEventBehavior).forEach(([k, v]) => {
        obj.gameEventBehavior[k] = config_BehaviorToJSON(v);
      });
    }
    obj.autoRefConfigs = {};
    if (message.autoRefConfigs) {
      Object.entries(message.autoRefConfigs).forEach(([k, v]) => {
        obj.autoRefConfigs[k] = AutoRefConfig.toJSON(v);
      });
    }
    message.activeTrackerSource !== undefined && (obj.activeTrackerSource = message.activeTrackerSource);
    if (message.teams) {
      obj.teams = message.teams.map((e) => e);
    } else {
      obj.teams = [];
    }
    message.autoContinue !== undefined && (obj.autoContinue = message.autoContinue);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Config>, I>>(object: I): Config {
    const message = createBaseConfig();
    message.gameEventBehavior = Object.entries(object.gameEventBehavior ?? {}).reduce<
      { [key: string]: Config_Behavior }
    >((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = value as Config_Behavior;
      }
      return acc;
    }, {});
    message.autoRefConfigs = Object.entries(object.autoRefConfigs ?? {}).reduce<{ [key: string]: AutoRefConfig }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = AutoRefConfig.fromPartial(value);
        }
        return acc;
      },
      {},
    );
    message.activeTrackerSource = object.activeTrackerSource ?? "";
    message.teams = object.teams?.map((e) => e) || [];
    message.autoContinue = object.autoContinue ?? false;
    return message;
  },
};

function createBaseConfig_GameEventBehaviorEntry(): Config_GameEventBehaviorEntry {
  return { key: "", value: 0 };
}

export const Config_GameEventBehaviorEntry = {
  encode(message: Config_GameEventBehaviorEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== 0) {
      writer.uint32(16).int32(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Config_GameEventBehaviorEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConfig_GameEventBehaviorEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Config_GameEventBehaviorEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? config_BehaviorFromJSON(object.value) : 0,
    };
  },

  toJSON(message: Config_GameEventBehaviorEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = config_BehaviorToJSON(message.value));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Config_GameEventBehaviorEntry>, I>>(
    object: I,
  ): Config_GameEventBehaviorEntry {
    const message = createBaseConfig_GameEventBehaviorEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? 0;
    return message;
  },
};

function createBaseConfig_AutoRefConfigsEntry(): Config_AutoRefConfigsEntry {
  return { key: "", value: undefined };
}

export const Config_AutoRefConfigsEntry = {
  encode(message: Config_AutoRefConfigsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      AutoRefConfig.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Config_AutoRefConfigsEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConfig_AutoRefConfigsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = AutoRefConfig.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Config_AutoRefConfigsEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? AutoRefConfig.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: Config_AutoRefConfigsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value ? AutoRefConfig.toJSON(message.value) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Config_AutoRefConfigsEntry>, I>>(object: I): Config_AutoRefConfigsEntry {
    const message = createBaseConfig_AutoRefConfigsEntry();
    message.key = object.key ?? "";
    message.value = (object.value !== undefined && object.value !== null)
      ? AutoRefConfig.fromPartial(object.value)
      : undefined;
    return message;
  },
};

function createBaseAutoRefConfig(): AutoRefConfig {
  return { gameEventBehavior: {} };
}

export const AutoRefConfig = {
  encode(message: AutoRefConfig, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    Object.entries(message.gameEventBehavior).forEach(([key, value]) => {
      AutoRefConfig_GameEventBehaviorEntry.encode({ key: key as any, value }, writer.uint32(10).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AutoRefConfig {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAutoRefConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          const entry1 = AutoRefConfig_GameEventBehaviorEntry.decode(reader, reader.uint32());
          if (entry1.value !== undefined) {
            message.gameEventBehavior[entry1.key] = entry1.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AutoRefConfig {
    return {
      gameEventBehavior: isObject(object.gameEventBehavior)
        ? Object.entries(object.gameEventBehavior).reduce<{ [key: string]: AutoRefConfig_Behavior }>(
          (acc, [key, value]) => {
            acc[key] = autoRefConfig_BehaviorFromJSON(value);
            return acc;
          },
          {},
        )
        : {},
    };
  },

  toJSON(message: AutoRefConfig): unknown {
    const obj: any = {};
    obj.gameEventBehavior = {};
    if (message.gameEventBehavior) {
      Object.entries(message.gameEventBehavior).forEach(([k, v]) => {
        obj.gameEventBehavior[k] = autoRefConfig_BehaviorToJSON(v);
      });
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AutoRefConfig>, I>>(object: I): AutoRefConfig {
    const message = createBaseAutoRefConfig();
    message.gameEventBehavior = Object.entries(object.gameEventBehavior ?? {}).reduce<
      { [key: string]: AutoRefConfig_Behavior }
    >((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = value as AutoRefConfig_Behavior;
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseAutoRefConfig_GameEventBehaviorEntry(): AutoRefConfig_GameEventBehaviorEntry {
  return { key: "", value: 0 };
}

export const AutoRefConfig_GameEventBehaviorEntry = {
  encode(message: AutoRefConfig_GameEventBehaviorEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== 0) {
      writer.uint32(16).int32(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AutoRefConfig_GameEventBehaviorEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAutoRefConfig_GameEventBehaviorEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AutoRefConfig_GameEventBehaviorEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? autoRefConfig_BehaviorFromJSON(object.value) : 0,
    };
  },

  toJSON(message: AutoRefConfig_GameEventBehaviorEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = autoRefConfig_BehaviorToJSON(message.value));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AutoRefConfig_GameEventBehaviorEntry>, I>>(
    object: I,
  ): AutoRefConfig_GameEventBehaviorEntry {
    const message = createBaseAutoRefConfig_GameEventBehaviorEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? 0;
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

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
