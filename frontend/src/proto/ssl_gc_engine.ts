/* eslint-disable */
import { Timestamp } from "./google/protobuf/timestamp";
import { RobotId, Team, teamFromJSON, teamToJSON } from "./ssl_gc_common";
import { Vector2, Vector3 } from "./ssl_gc_geometry";

/** The GC state contains settings and state independent of the match state */
export interface GcState {
  /** the state of each team */
  teamState?:
    | { [key: string]: GcStateTeam }
    | undefined;
  /** the states of the auto referees */
  autoRefState?:
    | { [key: string]: GcStateAutoRef }
    | undefined;
  /** the attached trackers (uuid -> source_name) */
  trackers?:
    | { [key: string]: string }
    | undefined;
  /** the next actions that can be executed when continuing */
  continueActions?:
    | ContinueAction[]
    | undefined;
  /** the next actions that can be executed when continuing */
  continueHints?: ContinueHint[] | undefined;
}

export interface GcState_TeamStateEntry {
  key: string;
  value?: GcStateTeam | undefined;
}

export interface GcState_AutoRefStateEntry {
  key: string;
  value?: GcStateAutoRef | undefined;
}

export interface GcState_TrackersEntry {
  key: string;
  value: string;
}

/** The GC state for a single team */
export interface GcStateTeam {
  /** true: The team is connected */
  connected?:
    | boolean
    | undefined;
  /** true: The team connected via TLS with a verified certificate */
  connectionVerified?:
    | boolean
    | undefined;
  /** true: The remote control for the team is connected */
  remoteControlConnected?:
    | boolean
    | undefined;
  /** true: The remote control for the team connected via TLS with a verified certificate */
  remoteControlConnectionVerified?:
    | boolean
    | undefined;
  /** the advantage choice of the team */
  advantageChoice?: TeamAdvantageChoice | undefined;
}

/** The choice from a team regarding the advantage rule */
export interface TeamAdvantageChoice {
  /** the choice of the team */
  choice?: TeamAdvantageChoice_AdvantageChoice | undefined;
}

/** possible advantage choices */
export enum TeamAdvantageChoice_AdvantageChoice {
  /** STOP - stop the game */
  STOP = "STOP",
  /** CONTINUE - keep the match running */
  CONTINUE = "CONTINUE",
  UNRECOGNIZED = "UNRECOGNIZED",
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
  connectionVerified?: boolean | undefined;
}

/** GC state of a tracker */
export interface GcStateTracker {
  /** Name of the source */
  sourceName?:
    | string
    | undefined;
  /** UUID of the source */
  uuid?:
    | string
    | undefined;
  /** Current ball */
  ball?:
    | Ball
    | undefined;
  /** Current robots */
  robots?: Robot[] | undefined;
}

/** The ball state */
export interface Ball {
  /** ball position [m] */
  pos?:
    | Vector3
    | undefined;
  /** ball velocity [m/s] */
  vel?: Vector3 | undefined;
}

/** The robot state */
export interface Robot {
  /** robot id and team */
  id?:
    | RobotId
    | undefined;
  /** robot position [m] */
  pos?: Vector2 | undefined;
}

export interface ContinueAction {
  /** type of action that will be performed next */
  type?:
    | ContinueAction_Type
    | undefined;
  /** for which team (if team specific) */
  forTeam?:
    | Team
    | undefined;
  /** list of issues that hinders the game from continuing */
  continuationIssues?:
    | string[]
    | undefined;
  /** timestamp at which the action will be ready (to give some preparation time) */
  readyAt?:
    | Date
    | undefined;
  /** state of the action */
  state?: ContinueAction_State | undefined;
}

export enum ContinueAction_Type {
  TYPE_UNKNOWN = "TYPE_UNKNOWN",
  HALT = "HALT",
  RESUME_FROM_HALT = "RESUME_FROM_HALT",
  STOP_GAME = "STOP_GAME",
  FORCE_START = "FORCE_START",
  FREE_KICK = "FREE_KICK",
  NEXT_COMMAND = "NEXT_COMMAND",
  BALL_PLACEMENT_START = "BALL_PLACEMENT_START",
  BALL_PLACEMENT_CANCEL = "BALL_PLACEMENT_CANCEL",
  BALL_PLACEMENT_COMPLETE = "BALL_PLACEMENT_COMPLETE",
  BALL_PLACEMENT_FAIL = "BALL_PLACEMENT_FAIL",
  TIMEOUT_START = "TIMEOUT_START",
  TIMEOUT_STOP = "TIMEOUT_STOP",
  BOT_SUBSTITUTION = "BOT_SUBSTITUTION",
  NEXT_STAGE = "NEXT_STAGE",
  END_GAME = "END_GAME",
  ACCEPT_GOAL = "ACCEPT_GOAL",
  NORMAL_START = "NORMAL_START",
  CHALLENGE_ACCEPT = "CHALLENGE_ACCEPT",
  CHALLENGE_REJECT = "CHALLENGE_REJECT",
  UNRECOGNIZED = "UNRECOGNIZED",
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
    case "FORCE_START":
      return ContinueAction_Type.FORCE_START;
    case 17:
    case "FREE_KICK":
      return ContinueAction_Type.FREE_KICK;
    case 3:
    case "NEXT_COMMAND":
      return ContinueAction_Type.NEXT_COMMAND;
    case 4:
    case "BALL_PLACEMENT_START":
      return ContinueAction_Type.BALL_PLACEMENT_START;
    case 9:
    case "BALL_PLACEMENT_CANCEL":
      return ContinueAction_Type.BALL_PLACEMENT_CANCEL;
    case 14:
    case "BALL_PLACEMENT_COMPLETE":
      return ContinueAction_Type.BALL_PLACEMENT_COMPLETE;
    case 15:
    case "BALL_PLACEMENT_FAIL":
      return ContinueAction_Type.BALL_PLACEMENT_FAIL;
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
    case 16:
    case "END_GAME":
      return ContinueAction_Type.END_GAME;
    case 12:
    case "ACCEPT_GOAL":
      return ContinueAction_Type.ACCEPT_GOAL;
    case 13:
    case "NORMAL_START":
      return ContinueAction_Type.NORMAL_START;
    case 18:
    case "CHALLENGE_ACCEPT":
      return ContinueAction_Type.CHALLENGE_ACCEPT;
    case 19:
    case "CHALLENGE_REJECT":
      return ContinueAction_Type.CHALLENGE_REJECT;
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
    case ContinueAction_Type.FORCE_START:
      return "FORCE_START";
    case ContinueAction_Type.FREE_KICK:
      return "FREE_KICK";
    case ContinueAction_Type.NEXT_COMMAND:
      return "NEXT_COMMAND";
    case ContinueAction_Type.BALL_PLACEMENT_START:
      return "BALL_PLACEMENT_START";
    case ContinueAction_Type.BALL_PLACEMENT_CANCEL:
      return "BALL_PLACEMENT_CANCEL";
    case ContinueAction_Type.BALL_PLACEMENT_COMPLETE:
      return "BALL_PLACEMENT_COMPLETE";
    case ContinueAction_Type.BALL_PLACEMENT_FAIL:
      return "BALL_PLACEMENT_FAIL";
    case ContinueAction_Type.TIMEOUT_START:
      return "TIMEOUT_START";
    case ContinueAction_Type.TIMEOUT_STOP:
      return "TIMEOUT_STOP";
    case ContinueAction_Type.BOT_SUBSTITUTION:
      return "BOT_SUBSTITUTION";
    case ContinueAction_Type.NEXT_STAGE:
      return "NEXT_STAGE";
    case ContinueAction_Type.END_GAME:
      return "END_GAME";
    case ContinueAction_Type.ACCEPT_GOAL:
      return "ACCEPT_GOAL";
    case ContinueAction_Type.NORMAL_START:
      return "NORMAL_START";
    case ContinueAction_Type.CHALLENGE_ACCEPT:
      return "CHALLENGE_ACCEPT";
    case ContinueAction_Type.CHALLENGE_REJECT:
      return "CHALLENGE_REJECT";
    case ContinueAction_Type.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum ContinueAction_State {
  STATE_UNKNOWN = "STATE_UNKNOWN",
  BLOCKED = "BLOCKED",
  WAITING = "WAITING",
  READY_AUTO = "READY_AUTO",
  READY_MANUAL = "READY_MANUAL",
  DISABLED = "DISABLED",
  UNRECOGNIZED = "UNRECOGNIZED",
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
    case 5:
    case "DISABLED":
      return ContinueAction_State.DISABLED;
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
    case ContinueAction_State.DISABLED:
      return "DISABLED";
    case ContinueAction_State.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface ContinueHint {
  message?: string | undefined;
}

export const GcState = {
  fromJSON(object: any): GcState {
    return {
      teamState: isObject(object.teamState)
        ? Object.entries(object.teamState).reduce<{ [key: string]: GcStateTeam }>((acc, [key, value]) => {
          acc[key] = GcStateTeam.fromJSON(value);
          return acc;
        }, {})
        : undefined,
      autoRefState: isObject(object.autoRefState)
        ? Object.entries(object.autoRefState).reduce<{ [key: string]: GcStateAutoRef }>((acc, [key, value]) => {
          acc[key] = GcStateAutoRef.fromJSON(value);
          return acc;
        }, {})
        : undefined,
      trackers: isObject(object.trackers)
        ? Object.entries(object.trackers).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : undefined,
      continueActions: globalThis.Array.isArray(object?.continueActions)
        ? object.continueActions.map((e: any) => ContinueAction.fromJSON(e))
        : undefined,
      continueHints: globalThis.Array.isArray(object?.continueHints)
        ? object.continueHints.map((e: any) => ContinueHint.fromJSON(e))
        : undefined,
    };
  },

  toJSON(message: GcState): unknown {
    const obj: any = {};
    if (message.teamState) {
      const entries = Object.entries(message.teamState);
      if (entries.length > 0) {
        obj.teamState = {};
        entries.forEach(([k, v]) => {
          obj.teamState[k] = GcStateTeam.toJSON(v);
        });
      }
    }
    if (message.autoRefState) {
      const entries = Object.entries(message.autoRefState);
      if (entries.length > 0) {
        obj.autoRefState = {};
        entries.forEach(([k, v]) => {
          obj.autoRefState[k] = GcStateAutoRef.toJSON(v);
        });
      }
    }
    if (message.trackers) {
      const entries = Object.entries(message.trackers);
      if (entries.length > 0) {
        obj.trackers = {};
        entries.forEach(([k, v]) => {
          obj.trackers[k] = v;
        });
      }
    }
    if (message.continueActions?.length) {
      obj.continueActions = message.continueActions.map((e) => ContinueAction.toJSON(e));
    }
    if (message.continueHints?.length) {
      obj.continueHints = message.continueHints.map((e) => ContinueHint.toJSON(e));
    }
    return obj;
  },
};

export const GcState_TeamStateEntry = {
  fromJSON(object: any): GcState_TeamStateEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? GcStateTeam.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: GcState_TeamStateEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== undefined) {
      obj.value = GcStateTeam.toJSON(message.value);
    }
    return obj;
  },
};

export const GcState_AutoRefStateEntry = {
  fromJSON(object: any): GcState_AutoRefStateEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? GcStateAutoRef.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: GcState_AutoRefStateEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== undefined) {
      obj.value = GcStateAutoRef.toJSON(message.value);
    }
    return obj;
  },
};

export const GcState_TrackersEntry = {
  fromJSON(object: any): GcState_TrackersEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? globalThis.String(object.value) : "",
    };
  },

  toJSON(message: GcState_TrackersEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },
};

export const GcStateTeam = {
  fromJSON(object: any): GcStateTeam {
    return {
      connected: isSet(object.connected) ? globalThis.Boolean(object.connected) : undefined,
      connectionVerified: isSet(object.connectionVerified) ? globalThis.Boolean(object.connectionVerified) : undefined,
      remoteControlConnected: isSet(object.remoteControlConnected)
        ? globalThis.Boolean(object.remoteControlConnected)
        : undefined,
      remoteControlConnectionVerified: isSet(object.remoteControlConnectionVerified)
        ? globalThis.Boolean(object.remoteControlConnectionVerified)
        : undefined,
      advantageChoice: isSet(object.advantageChoice) ? TeamAdvantageChoice.fromJSON(object.advantageChoice) : undefined,
    };
  },

  toJSON(message: GcStateTeam): unknown {
    const obj: any = {};
    if (message.connected === true) {
      obj.connected = message.connected;
    }
    if (message.connectionVerified === true) {
      obj.connectionVerified = message.connectionVerified;
    }
    if (message.remoteControlConnected === true) {
      obj.remoteControlConnected = message.remoteControlConnected;
    }
    if (message.remoteControlConnectionVerified === true) {
      obj.remoteControlConnectionVerified = message.remoteControlConnectionVerified;
    }
    if (message.advantageChoice !== undefined) {
      obj.advantageChoice = TeamAdvantageChoice.toJSON(message.advantageChoice);
    }
    return obj;
  },
};

export const TeamAdvantageChoice = {
  fromJSON(object: any): TeamAdvantageChoice {
    return { choice: isSet(object.choice) ? teamAdvantageChoice_AdvantageChoiceFromJSON(object.choice) : undefined };
  },

  toJSON(message: TeamAdvantageChoice): unknown {
    const obj: any = {};
    if (message.choice !== undefined && message.choice !== TeamAdvantageChoice_AdvantageChoice.STOP) {
      obj.choice = teamAdvantageChoice_AdvantageChoiceToJSON(message.choice);
    }
    return obj;
  },
};

export const GcStateAutoRef = {
  fromJSON(object: any): GcStateAutoRef {
    return {
      connectionVerified: isSet(object.connectionVerified) ? globalThis.Boolean(object.connectionVerified) : undefined,
    };
  },

  toJSON(message: GcStateAutoRef): unknown {
    const obj: any = {};
    if (message.connectionVerified === true) {
      obj.connectionVerified = message.connectionVerified;
    }
    return obj;
  },
};

export const GcStateTracker = {
  fromJSON(object: any): GcStateTracker {
    return {
      sourceName: isSet(object.sourceName) ? globalThis.String(object.sourceName) : undefined,
      uuid: isSet(object.uuid) ? globalThis.String(object.uuid) : undefined,
      ball: isSet(object.ball) ? Ball.fromJSON(object.ball) : undefined,
      robots: globalThis.Array.isArray(object?.robots) ? object.robots.map((e: any) => Robot.fromJSON(e)) : undefined,
    };
  },

  toJSON(message: GcStateTracker): unknown {
    const obj: any = {};
    if (message.sourceName !== undefined && message.sourceName !== "") {
      obj.sourceName = message.sourceName;
    }
    if (message.uuid !== undefined && message.uuid !== "") {
      obj.uuid = message.uuid;
    }
    if (message.ball !== undefined) {
      obj.ball = Ball.toJSON(message.ball);
    }
    if (message.robots?.length) {
      obj.robots = message.robots.map((e) => Robot.toJSON(e));
    }
    return obj;
  },
};

export const Ball = {
  fromJSON(object: any): Ball {
    return {
      pos: isSet(object.pos) ? Vector3.fromJSON(object.pos) : undefined,
      vel: isSet(object.vel) ? Vector3.fromJSON(object.vel) : undefined,
    };
  },

  toJSON(message: Ball): unknown {
    const obj: any = {};
    if (message.pos !== undefined) {
      obj.pos = Vector3.toJSON(message.pos);
    }
    if (message.vel !== undefined) {
      obj.vel = Vector3.toJSON(message.vel);
    }
    return obj;
  },
};

export const Robot = {
  fromJSON(object: any): Robot {
    return {
      id: isSet(object.id) ? RobotId.fromJSON(object.id) : undefined,
      pos: isSet(object.pos) ? Vector2.fromJSON(object.pos) : undefined,
    };
  },

  toJSON(message: Robot): unknown {
    const obj: any = {};
    if (message.id !== undefined) {
      obj.id = RobotId.toJSON(message.id);
    }
    if (message.pos !== undefined) {
      obj.pos = Vector2.toJSON(message.pos);
    }
    return obj;
  },
};

export const ContinueAction = {
  fromJSON(object: any): ContinueAction {
    return {
      type: isSet(object.type) ? continueAction_TypeFromJSON(object.type) : undefined,
      forTeam: isSet(object.forTeam) ? teamFromJSON(object.forTeam) : undefined,
      continuationIssues: globalThis.Array.isArray(object?.continuationIssues)
        ? object.continuationIssues.map((e: any) => globalThis.String(e))
        : undefined,
      readyAt: isSet(object.readyAt) ? fromJsonTimestamp(object.readyAt) : undefined,
      state: isSet(object.state) ? continueAction_StateFromJSON(object.state) : undefined,
    };
  },

  toJSON(message: ContinueAction): unknown {
    const obj: any = {};
    if (message.type !== undefined && message.type !== ContinueAction_Type.TYPE_UNKNOWN) {
      obj.type = continueAction_TypeToJSON(message.type);
    }
    if (message.forTeam !== undefined && message.forTeam !== Team.UNKNOWN) {
      obj.forTeam = teamToJSON(message.forTeam);
    }
    if (message.continuationIssues?.length) {
      obj.continuationIssues = message.continuationIssues;
    }
    if (message.readyAt !== undefined) {
      obj.readyAt = message.readyAt.toISOString();
    }
    if (message.state !== undefined && message.state !== ContinueAction_State.STATE_UNKNOWN) {
      obj.state = continueAction_StateToJSON(message.state);
    }
    return obj;
  },
};

export const ContinueHint = {
  fromJSON(object: any): ContinueHint {
    return { message: isSet(object.message) ? globalThis.String(object.message) : undefined };
  },

  toJSON(message: ContinueHint): unknown {
    const obj: any = {};
    if (message.message !== undefined && message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },
};

function fromTimestamp(t: Timestamp): Date {
  let millis = (t.seconds || 0) * 1_000;
  millis += (t.nanos || 0) / 1_000_000;
  return new globalThis.Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof globalThis.Date) {
    return o;
  } else if (typeof o === "string") {
    return new globalThis.Date(o);
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
