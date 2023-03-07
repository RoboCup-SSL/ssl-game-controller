/* eslint-disable */

/** The engine config */
export interface Config {
  /** The behavior for each game event */
  gameEventBehavior?: { [key: string]: Config_Behavior };
  /** The config for each auto referee */
  autoRefConfigs?: { [key: string]: AutoRefConfig };
  /** The selected tracker source */
  activeTrackerSource?: string;
  /** The list of available teams */
  teams?: string[];
  /** Enable or disable auto continuation */
  autoContinue?: boolean;
}

/** Behaviors for each game event */
export enum Config_Behavior {
  /** BEHAVIOR_UNKNOWN - Not set or unknown */
  BEHAVIOR_UNKNOWN = "BEHAVIOR_UNKNOWN",
  /** BEHAVIOR_ACCEPT - Always accept the game event */
  BEHAVIOR_ACCEPT = "BEHAVIOR_ACCEPT",
  /** BEHAVIOR_ACCEPT_MAJORITY - Accept the game event if was reported by a majority */
  BEHAVIOR_ACCEPT_MAJORITY = "BEHAVIOR_ACCEPT_MAJORITY",
  /** BEHAVIOR_PROPOSE_ONLY - Only propose the game event (can be accepted in the UI by a human) */
  BEHAVIOR_PROPOSE_ONLY = "BEHAVIOR_PROPOSE_ONLY",
  /** BEHAVIOR_LOG - Only log the game event to the protocol */
  BEHAVIOR_LOG = "BEHAVIOR_LOG",
  /** BEHAVIOR_IGNORE - Silently ignore the game event */
  BEHAVIOR_IGNORE = "BEHAVIOR_IGNORE",
  UNRECOGNIZED = "UNRECOGNIZED",
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
  gameEventBehavior?: { [key: string]: AutoRefConfig_Behavior };
}

/** Behaviors for the game events reported by this auto referee */
export enum AutoRefConfig_Behavior {
  /** BEHAVIOR_UNKNOWN - Not set or unknown */
  BEHAVIOR_UNKNOWN = "BEHAVIOR_UNKNOWN",
  /** BEHAVIOR_ACCEPT - Accept the game event */
  BEHAVIOR_ACCEPT = "BEHAVIOR_ACCEPT",
  /** BEHAVIOR_LOG - Log the game event */
  BEHAVIOR_LOG = "BEHAVIOR_LOG",
  /** BEHAVIOR_IGNORE - Silently ignore the game event */
  BEHAVIOR_IGNORE = "BEHAVIOR_IGNORE",
  UNRECOGNIZED = "UNRECOGNIZED",
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

export const Config = {
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
      teams: Array.isArray(object?.teams)
        ? object.teams.map((e: any) => String(e))
        : [],
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
};

export const Config_GameEventBehaviorEntry = {
  fromJSON(object: any): Config_GameEventBehaviorEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? config_BehaviorFromJSON(object.value) : Config_Behavior.BEHAVIOR_UNKNOWN,
    };
  },

  toJSON(message: Config_GameEventBehaviorEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = config_BehaviorToJSON(message.value));
    return obj;
  },
};

export const Config_AutoRefConfigsEntry = {
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
};

export const AutoRefConfig = {
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
};

export const AutoRefConfig_GameEventBehaviorEntry = {
  fromJSON(object: any): AutoRefConfig_GameEventBehaviorEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value)
        ? autoRefConfig_BehaviorFromJSON(object.value)
        : AutoRefConfig_Behavior.BEHAVIOR_UNKNOWN,
    };
  },

  toJSON(message: AutoRefConfig_GameEventBehaviorEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = autoRefConfig_BehaviorToJSON(message.value));
    return obj;
  },
};

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
