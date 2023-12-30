/* eslint-disable */
import { Duration } from "./google/protobuf/duration";
import { Change } from "./ssl_gc_change";
import { ContinueAction, GcState } from "./ssl_gc_engine";
import { Config } from "./ssl_gc_engine_config";
import { State } from "./ssl_gc_state";

/** Message format that is pushed from the GC to the client */
export interface Output {
  /** The current match state */
  matchState?:
    | State
    | undefined;
  /** The current GC state */
  gcState?:
    | GcState
    | undefined;
  /** The protocol */
  protocol?:
    | Protocol
    | undefined;
  /** The engine config */
  config?: Config | undefined;
}

/** The game protocol */
export interface Protocol {
  /**
   * Is this a delta only?
   * Entries that were already sent are not sent again, because the protocol is immutable anyway.
   * But if the game is reset, the whole protocol must be replaced. That's what this flag is for.
   */
  delta?:
    | boolean
    | undefined;
  /** The (delta) list of entries */
  entry?: ProtocolEntry[] | undefined;
}

/** A protocol entry of a change */
export interface ProtocolEntry {
  /** Id of the entry */
  id?:
    | number
    | undefined;
  /** The change that was made */
  change?:
    | Change
    | undefined;
  /** The match time elapsed when this change was made */
  matchTimeElapsed?:
    | Duration
    | undefined;
  /** The stage time elapsed when this change was made */
  stageTimeElapsed?: Duration | undefined;
}

/** Message format that can be send from the client to the GC */
export interface Input {
  /** A change to be enqueued into the GC engine */
  change?:
    | Change
    | undefined;
  /** Reset the match */
  resetMatch?:
    | boolean
    | undefined;
  /** An updated config delta */
  configDelta?:
    | Config
    | undefined;
  /** Continue with action */
  continueAction?: ContinueAction | undefined;
}

export const Output = {
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
    if (message.matchState !== undefined) {
      obj.matchState = State.toJSON(message.matchState);
    }
    if (message.gcState !== undefined) {
      obj.gcState = GcState.toJSON(message.gcState);
    }
    if (message.protocol !== undefined) {
      obj.protocol = Protocol.toJSON(message.protocol);
    }
    if (message.config !== undefined) {
      obj.config = Config.toJSON(message.config);
    }
    return obj;
  },
};

export const Protocol = {
  fromJSON(object: any): Protocol {
    return {
      delta: isSet(object.delta) ? globalThis.Boolean(object.delta) : undefined,
      entry: globalThis.Array.isArray(object?.entry)
        ? object.entry.map((e: any) => ProtocolEntry.fromJSON(e))
        : undefined,
    };
  },

  toJSON(message: Protocol): unknown {
    const obj: any = {};
    if (message.delta === true) {
      obj.delta = message.delta;
    }
    if (message.entry?.length) {
      obj.entry = message.entry.map((e) => ProtocolEntry.toJSON(e));
    }
    return obj;
  },
};

export const ProtocolEntry = {
  fromJSON(object: any): ProtocolEntry {
    return {
      id: isSet(object.id) ? globalThis.Number(object.id) : undefined,
      change: isSet(object.change) ? Change.fromJSON(object.change) : undefined,
      matchTimeElapsed: isSet(object.matchTimeElapsed) ? Duration.fromJSON(object.matchTimeElapsed) : undefined,
      stageTimeElapsed: isSet(object.stageTimeElapsed) ? Duration.fromJSON(object.stageTimeElapsed) : undefined,
    };
  },

  toJSON(message: ProtocolEntry): unknown {
    const obj: any = {};
    if (message.id !== undefined && message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    if (message.change !== undefined) {
      obj.change = Change.toJSON(message.change);
    }
    if (message.matchTimeElapsed !== undefined) {
      obj.matchTimeElapsed = Duration.toJSON(message.matchTimeElapsed);
    }
    if (message.stageTimeElapsed !== undefined) {
      obj.stageTimeElapsed = Duration.toJSON(message.stageTimeElapsed);
    }
    return obj;
  },
};

export const Input = {
  fromJSON(object: any): Input {
    return {
      change: isSet(object.change) ? Change.fromJSON(object.change) : undefined,
      resetMatch: isSet(object.resetMatch) ? globalThis.Boolean(object.resetMatch) : undefined,
      configDelta: isSet(object.configDelta) ? Config.fromJSON(object.configDelta) : undefined,
      continueAction: isSet(object.continueAction) ? ContinueAction.fromJSON(object.continueAction) : undefined,
    };
  },

  toJSON(message: Input): unknown {
    const obj: any = {};
    if (message.change !== undefined) {
      obj.change = Change.toJSON(message.change);
    }
    if (message.resetMatch === true) {
      obj.resetMatch = message.resetMatch;
    }
    if (message.configDelta !== undefined) {
      obj.configDelta = Config.toJSON(message.configDelta);
    }
    if (message.continueAction !== undefined) {
      obj.continueAction = ContinueAction.toJSON(message.continueAction);
    }
    return obj;
  },
};

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
