/* eslint-disable */

/** Team is either blue or yellow */
export enum Team {
  /** UNKNOWN - team not set */
  UNKNOWN = "UNKNOWN",
  /** YELLOW - yellow team */
  YELLOW = "YELLOW",
  /** BLUE - blue team */
  BLUE = "BLUE",
  UNRECOGNIZED = "UNRECOGNIZED",
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
  DIV_UNKNOWN = "DIV_UNKNOWN",
  DIV_A = "DIV_A",
  DIV_B = "DIV_B",
  UNRECOGNIZED = "UNRECOGNIZED",
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
  id?: number;
  /** the team that the robot belongs to */
  team?: Team;
}

export const RobotId = {
  fromJSON(object: any): RobotId {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      team: isSet(object.team) ? teamFromJSON(object.team) : Team.UNKNOWN,
    };
  },

  toJSON(message: RobotId): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.team !== undefined && (obj.team = teamToJSON(message.team));
    return obj;
  },
};

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
