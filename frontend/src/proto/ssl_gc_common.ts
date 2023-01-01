/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "";

/** Team is either blue or yellow */
export enum Team {
  /** UNKNOWN - team not set */
  UNKNOWN = 0,
  /** YELLOW - yellow team */
  YELLOW = 1,
  /** BLUE - blue team */
  BLUE = 2,
  UNRECOGNIZED = -1,
}

export function teamFromJSON(object: any): Team {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return Team.UNKNOWN;
    case 1:
    case "YELLOW":
      return Team.YELLOW;
    case 2:
    case "BLUE":
      return Team.BLUE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Team.UNRECOGNIZED;
  }
}

export function teamToJSON(object: Team): string {
  switch (object) {
    case Team.UNKNOWN:
      return "UNKNOWN";
    case Team.YELLOW:
      return "YELLOW";
    case Team.BLUE:
      return "BLUE";
    case Team.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Division denotes the current division, which influences some rules */
export enum Division {
  DIV_UNKNOWN = 0,
  DIV_A = 1,
  DIV_B = 2,
  UNRECOGNIZED = -1,
}

export function divisionFromJSON(object: any): Division {
  switch (object) {
    case 0:
    case "DIV_UNKNOWN":
      return Division.DIV_UNKNOWN;
    case 1:
    case "DIV_A":
      return Division.DIV_A;
    case 2:
    case "DIV_B":
      return Division.DIV_B;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Division.UNRECOGNIZED;
  }
}

export function divisionToJSON(object: Division): string {
  switch (object) {
    case Division.DIV_UNKNOWN:
      return "DIV_UNKNOWN";
    case Division.DIV_A:
      return "DIV_A";
    case Division.DIV_B:
      return "DIV_B";
    case Division.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** RobotId is the combination of a team and a robot id */
export interface RobotId {
  /** the robot number */
  id: number;
  /** the team that the robot belongs to */
  team: Team;
}

function createBaseRobotId(): RobotId {
  return { id: 0, team: 0 };
}

export const RobotId = {
  encode(message: RobotId, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint32(message.id);
    }
    if (message.team !== 0) {
      writer.uint32(16).int32(message.team);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RobotId {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRobotId();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint32();
          break;
        case 2:
          message.team = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RobotId {
    return { id: isSet(object.id) ? Number(object.id) : 0, team: isSet(object.team) ? teamFromJSON(object.team) : 0 };
  },

  toJSON(message: RobotId): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.team !== undefined && (obj.team = teamToJSON(message.team));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RobotId>, I>>(object: I): RobotId {
    const message = createBaseRobotId();
    message.id = object.id ?? 0;
    message.team = object.team ?? 0;
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
