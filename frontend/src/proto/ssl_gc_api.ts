/* eslint-disable */
import { Duration } from "./google/protobuf/duration";
import { Change } from "./ssl_gc_change";
import { ContinueAction, GcState } from "./ssl_gc_engine";
import { Config } from "./ssl_gc_engine_config";
import { State } from "./ssl_gc_state";

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
  delta?: boolean;
  /** The (delta) list of entries */
  entry?: ProtocolEntry[];
}

/** A protocol entry of a change */
export interface ProtocolEntry {
  /** Id of the entry */
  id?: number;
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
  resetMatch?: boolean;
  /** An updated config delta */
  configDelta?: Config;
  /** Continue with action */
  continueAction?: ContinueAction;
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
    message.matchState !== undefined &&
      (obj.matchState = message.matchState ? State.toJSON(message.matchState) : undefined);
    message.gcState !== undefined && (obj.gcState = message.gcState ? GcState.toJSON(message.gcState) : undefined);
    message.protocol !== undefined && (obj.protocol = message.protocol ? Protocol.toJSON(message.protocol) : undefined);
    message.config !== undefined && (obj.config = message.config ? Config.toJSON(message.config) : undefined);
    return obj;
  },
};

export const Protocol = {
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
};

export const ProtocolEntry = {
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
};

export const Input = {
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
};

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
