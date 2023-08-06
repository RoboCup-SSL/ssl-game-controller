/* eslint-disable */
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

export interface YellowCard {
  id?: number;
  causedByGameEvent?: GameEvent;
  timeRemaining?: Duration;
}

export interface RedCard {
  id?: number;
  causedByGameEvent?: GameEvent;
}

export interface Foul {
  id?: number;
  causedByGameEvent?: GameEvent;
  timestamp?: Date;
}

export interface Command {
  type?: Command_Type;
  forTeam?: Team;
}

export enum Command_Type {
  UNKNOWN = "UNKNOWN",
  HALT = "HALT",
  STOP = "STOP",
  NORMAL_START = "NORMAL_START",
  FORCE_START = "FORCE_START",
  DIRECT = "DIRECT",
  KICKOFF = "KICKOFF",
  PENALTY = "PENALTY",
  TIMEOUT = "TIMEOUT",
  BALL_PLACEMENT = "BALL_PLACEMENT",
  UNRECOGNIZED = "UNRECOGNIZED",
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
  type?: GameState_Type;
  forTeam?: Team;
}

export enum GameState_Type {
  UNKNOWN = "UNKNOWN",
  HALT = "HALT",
  STOP = "STOP",
  RUNNING = "RUNNING",
  FREE_KICK = "FREE_KICK",
  KICKOFF = "KICKOFF",
  PENALTY = "PENALTY",
  TIMEOUT = "TIMEOUT",
  BALL_PLACEMENT = "BALL_PLACEMENT",
  UNRECOGNIZED = "UNRECOGNIZED",
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
  /** Unique ID of this group */
  id?: string;
  /** The proposals in this group */
  proposals?: Proposal[];
  /** Whether the proposal group was accepted */
  accepted?: boolean;
}

export interface TeamInfo {
  name?: string;
  goals?: number;
  goalkeeper?: number;
  yellowCards?: YellowCard[];
  redCards?: RedCard[];
  timeoutsLeft?: number;
  timeoutTimeLeft?: Duration;
  onPositiveHalf?: boolean;
  fouls?: Foul[];
  ballPlacementFailures?: number;
  ballPlacementFailuresReached?: boolean;
  canPlaceBall?: boolean;
  maxAllowedBots?: number;
  requestsBotSubstitutionSince?: Date;
  requestsTimeoutSince?: Date;
  requestsEmergencyStopSince?: Date;
  challengeFlags?: number;
  botSubstitutionAllowed?: boolean;
}

export interface State {
  stage?: Referee_Stage;
  command?: Command;
  gameState?: GameState;
  stageTimeElapsed?: Duration;
  stageTimeLeft?: Duration;
  matchTimeStart?: Date;
  teamState?: { [key: string]: TeamInfo };
  placementPos?: Vector2;
  nextCommand?: Command;
  currentActionTimeRemaining?: Duration;
  gameEvents?: GameEvent[];
  proposalGroups?: ProposalGroup[];
  division?: Division;
  firstKickoffTeam?: Team;
  matchType?: MatchType;
  readyContinueTime?: Date;
  shootoutState?: ShootoutState;
}

export interface State_TeamStateEntry {
  key: string;
  value?: TeamInfo;
}

export interface ShootoutState {
  nextTeam?: Team;
  numberOfAttempts?: { [key: string]: number };
}

export interface ShootoutState_NumberOfAttemptsEntry {
  key: string;
  value: number;
}

export const YellowCard = {
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
};

export const RedCard = {
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
};

export const Foul = {
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
};

export const Command = {
  fromJSON(object: any): Command {
    return {
      type: isSet(object.type) ? command_TypeFromJSON(object.type) : Command_Type.UNKNOWN,
      forTeam: isSet(object.forTeam) ? teamFromJSON(object.forTeam) : Team.UNKNOWN,
    };
  },

  toJSON(message: Command): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = command_TypeToJSON(message.type));
    message.forTeam !== undefined && (obj.forTeam = teamToJSON(message.forTeam));
    return obj;
  },
};

export const GameState = {
  fromJSON(object: any): GameState {
    return {
      type: isSet(object.type) ? gameState_TypeFromJSON(object.type) : GameState_Type.UNKNOWN,
      forTeam: isSet(object.forTeam) ? teamFromJSON(object.forTeam) : Team.UNKNOWN,
    };
  },

  toJSON(message: GameState): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = gameState_TypeToJSON(message.type));
    message.forTeam !== undefined && (obj.forTeam = teamToJSON(message.forTeam));
    return obj;
  },
};

export const Proposal = {
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
};

export const ProposalGroup = {
  fromJSON(object: any): ProposalGroup {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      proposals: Array.isArray(object?.proposals) ? object.proposals.map((e: any) => Proposal.fromJSON(e)) : [],
      accepted: isSet(object.accepted) ? Boolean(object.accepted) : false,
    };
  },

  toJSON(message: ProposalGroup): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    if (message.proposals) {
      obj.proposals = message.proposals.map((e) => e ? Proposal.toJSON(e) : undefined);
    } else {
      obj.proposals = [];
    }
    message.accepted !== undefined && (obj.accepted = message.accepted);
    return obj;
  },
};

export const TeamInfo = {
  fromJSON(object: any): TeamInfo {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      goals: isSet(object.goals) ? Number(object.goals) : 0,
      goalkeeper: isSet(object.goalkeeper) ? Number(object.goalkeeper) : 0,
      yellowCards: Array.isArray(object?.yellowCards)
        ? object.yellowCards.map((e: any) => YellowCard.fromJSON(e))
        : [],
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
      botSubstitutionAllowed: isSet(object.botSubstitutionAllowed) ? Boolean(object.botSubstitutionAllowed) : false,
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
    message.botSubstitutionAllowed !== undefined && (obj.botSubstitutionAllowed = message.botSubstitutionAllowed);
    return obj;
  },
};

export const State = {
  fromJSON(object: any): State {
    return {
      stage: isSet(object.stage) ? referee_StageFromJSON(object.stage) : Referee_Stage.NORMAL_FIRST_HALF_PRE,
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
      gameEvents: Array.isArray(object?.gameEvents)
        ? object.gameEvents.map((e: any) => GameEvent.fromJSON(e))
        : [],
      proposalGroups: Array.isArray(object?.proposalGroups)
        ? object.proposalGroups.map((e: any) => ProposalGroup.fromJSON(e))
        : [],
      division: isSet(object.division) ? divisionFromJSON(object.division) : Division.DIV_UNKNOWN,
      firstKickoffTeam: isSet(object.firstKickoffTeam) ? teamFromJSON(object.firstKickoffTeam) : Team.UNKNOWN,
      matchType: isSet(object.matchType) ? matchTypeFromJSON(object.matchType) : MatchType.UNKNOWN_MATCH,
      readyContinueTime: isSet(object.readyContinueTime) ? fromJsonTimestamp(object.readyContinueTime) : undefined,
      shootoutState: isSet(object.shootoutState) ? ShootoutState.fromJSON(object.shootoutState) : undefined,
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
    message.shootoutState !== undefined &&
      (obj.shootoutState = message.shootoutState ? ShootoutState.toJSON(message.shootoutState) : undefined);
    return obj;
  },
};

export const State_TeamStateEntry = {
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
};

export const ShootoutState = {
  fromJSON(object: any): ShootoutState {
    return {
      nextTeam: isSet(object.nextTeam) ? teamFromJSON(object.nextTeam) : Team.UNKNOWN,
      numberOfAttempts: isObject(object.numberOfAttempts)
        ? Object.entries(object.numberOfAttempts).reduce<{ [key: string]: number }>((acc, [key, value]) => {
          acc[key] = Number(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: ShootoutState): unknown {
    const obj: any = {};
    message.nextTeam !== undefined && (obj.nextTeam = teamToJSON(message.nextTeam));
    obj.numberOfAttempts = {};
    if (message.numberOfAttempts) {
      Object.entries(message.numberOfAttempts).forEach(([k, v]) => {
        obj.numberOfAttempts[k] = Math.round(v);
      });
    }
    return obj;
  },
};

export const ShootoutState_NumberOfAttemptsEntry = {
  fromJSON(object: any): ShootoutState_NumberOfAttemptsEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? Number(object.value) : 0 };
  },

  toJSON(message: ShootoutState_NumberOfAttemptsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = Math.round(message.value));
    return obj;
  },
};

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
