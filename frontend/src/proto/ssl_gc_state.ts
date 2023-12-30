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
  id?: number | undefined;
  causedByGameEvent?: GameEvent | undefined;
  timeRemaining?: Duration | undefined;
}

export interface RedCard {
  id?: number | undefined;
  causedByGameEvent?: GameEvent | undefined;
}

export interface Foul {
  id?: number | undefined;
  causedByGameEvent?: GameEvent | undefined;
  timestamp?: Date | undefined;
}

export interface Command {
  type?: Command_Type | undefined;
  forTeam?: Team | undefined;
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
  type?: GameState_Type | undefined;
  forTeam?: Team | undefined;
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
  timestamp?:
    | Date
    | undefined;
  /** The proposed game event. */
  gameEvent?: GameEvent | undefined;
}

export interface ProposalGroup {
  /** Unique ID of this group */
  id?:
    | string
    | undefined;
  /** The proposals in this group */
  proposals?:
    | Proposal[]
    | undefined;
  /** Whether the proposal group was accepted */
  accepted?: boolean | undefined;
}

export interface TeamInfo {
  name?: string | undefined;
  goals?: number | undefined;
  goalkeeper?: number | undefined;
  yellowCards?: YellowCard[] | undefined;
  redCards?: RedCard[] | undefined;
  timeoutsLeft?: number | undefined;
  timeoutTimeLeft?: Duration | undefined;
  onPositiveHalf?: boolean | undefined;
  fouls?: Foul[] | undefined;
  ballPlacementFailures?: number | undefined;
  ballPlacementFailuresReached?: boolean | undefined;
  canPlaceBall?: boolean | undefined;
  maxAllowedBots?: number | undefined;
  requestsBotSubstitutionSince?: Date | undefined;
  requestsTimeoutSince?: Date | undefined;
  requestsEmergencyStopSince?: Date | undefined;
  challengeFlags?: number | undefined;
  botSubstitutionAllowed?: boolean | undefined;
}

export interface State {
  stage?: Referee_Stage | undefined;
  command?: Command | undefined;
  gameState?: GameState | undefined;
  stageTimeElapsed?: Duration | undefined;
  stageTimeLeft?: Duration | undefined;
  matchTimeStart?: Date | undefined;
  teamState?: { [key: string]: TeamInfo } | undefined;
  placementPos?: Vector2 | undefined;
  nextCommand?: Command | undefined;
  currentActionTimeRemaining?: Duration | undefined;
  gameEvents?: GameEvent[] | undefined;
  proposalGroups?: ProposalGroup[] | undefined;
  division?: Division | undefined;
  firstKickoffTeam?: Team | undefined;
  matchType?: MatchType | undefined;
  readyContinueTime?: Date | undefined;
  shootoutState?: ShootoutState | undefined;
}

export interface State_TeamStateEntry {
  key: string;
  value?: TeamInfo | undefined;
}

export interface ShootoutState {
  nextTeam?: Team | undefined;
  numberOfAttempts?: { [key: string]: number } | undefined;
}

export interface ShootoutState_NumberOfAttemptsEntry {
  key: string;
  value: number;
}

export const YellowCard = {
  fromJSON(object: any): YellowCard {
    return {
      id: isSet(object.id) ? globalThis.Number(object.id) : undefined,
      causedByGameEvent: isSet(object.causedByGameEvent) ? GameEvent.fromJSON(object.causedByGameEvent) : undefined,
      timeRemaining: isSet(object.timeRemaining) ? Duration.fromJSON(object.timeRemaining) : undefined,
    };
  },

  toJSON(message: YellowCard): unknown {
    const obj: any = {};
    if (message.id !== undefined && message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    if (message.causedByGameEvent !== undefined) {
      obj.causedByGameEvent = GameEvent.toJSON(message.causedByGameEvent);
    }
    if (message.timeRemaining !== undefined) {
      obj.timeRemaining = Duration.toJSON(message.timeRemaining);
    }
    return obj;
  },
};

export const RedCard = {
  fromJSON(object: any): RedCard {
    return {
      id: isSet(object.id) ? globalThis.Number(object.id) : undefined,
      causedByGameEvent: isSet(object.causedByGameEvent) ? GameEvent.fromJSON(object.causedByGameEvent) : undefined,
    };
  },

  toJSON(message: RedCard): unknown {
    const obj: any = {};
    if (message.id !== undefined && message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    if (message.causedByGameEvent !== undefined) {
      obj.causedByGameEvent = GameEvent.toJSON(message.causedByGameEvent);
    }
    return obj;
  },
};

export const Foul = {
  fromJSON(object: any): Foul {
    return {
      id: isSet(object.id) ? globalThis.Number(object.id) : undefined,
      causedByGameEvent: isSet(object.causedByGameEvent) ? GameEvent.fromJSON(object.causedByGameEvent) : undefined,
      timestamp: isSet(object.timestamp) ? fromJsonTimestamp(object.timestamp) : undefined,
    };
  },

  toJSON(message: Foul): unknown {
    const obj: any = {};
    if (message.id !== undefined && message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    if (message.causedByGameEvent !== undefined) {
      obj.causedByGameEvent = GameEvent.toJSON(message.causedByGameEvent);
    }
    if (message.timestamp !== undefined) {
      obj.timestamp = message.timestamp.toISOString();
    }
    return obj;
  },
};

export const Command = {
  fromJSON(object: any): Command {
    return {
      type: isSet(object.type) ? command_TypeFromJSON(object.type) : undefined,
      forTeam: isSet(object.forTeam) ? teamFromJSON(object.forTeam) : undefined,
    };
  },

  toJSON(message: Command): unknown {
    const obj: any = {};
    if (message.type !== undefined && message.type !== Command_Type.UNKNOWN) {
      obj.type = command_TypeToJSON(message.type);
    }
    if (message.forTeam !== undefined && message.forTeam !== Team.UNKNOWN) {
      obj.forTeam = teamToJSON(message.forTeam);
    }
    return obj;
  },
};

export const GameState = {
  fromJSON(object: any): GameState {
    return {
      type: isSet(object.type) ? gameState_TypeFromJSON(object.type) : undefined,
      forTeam: isSet(object.forTeam) ? teamFromJSON(object.forTeam) : undefined,
    };
  },

  toJSON(message: GameState): unknown {
    const obj: any = {};
    if (message.type !== undefined && message.type !== GameState_Type.UNKNOWN) {
      obj.type = gameState_TypeToJSON(message.type);
    }
    if (message.forTeam !== undefined && message.forTeam !== Team.UNKNOWN) {
      obj.forTeam = teamToJSON(message.forTeam);
    }
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
    if (message.timestamp !== undefined) {
      obj.timestamp = message.timestamp.toISOString();
    }
    if (message.gameEvent !== undefined) {
      obj.gameEvent = GameEvent.toJSON(message.gameEvent);
    }
    return obj;
  },
};

export const ProposalGroup = {
  fromJSON(object: any): ProposalGroup {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : undefined,
      proposals: globalThis.Array.isArray(object?.proposals)
        ? object.proposals.map((e: any) => Proposal.fromJSON(e))
        : undefined,
      accepted: isSet(object.accepted) ? globalThis.Boolean(object.accepted) : undefined,
    };
  },

  toJSON(message: ProposalGroup): unknown {
    const obj: any = {};
    if (message.id !== undefined && message.id !== "") {
      obj.id = message.id;
    }
    if (message.proposals?.length) {
      obj.proposals = message.proposals.map((e) => Proposal.toJSON(e));
    }
    if (message.accepted === true) {
      obj.accepted = message.accepted;
    }
    return obj;
  },
};

export const TeamInfo = {
  fromJSON(object: any): TeamInfo {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : undefined,
      goals: isSet(object.goals) ? globalThis.Number(object.goals) : undefined,
      goalkeeper: isSet(object.goalkeeper) ? globalThis.Number(object.goalkeeper) : undefined,
      yellowCards: globalThis.Array.isArray(object?.yellowCards)
        ? object.yellowCards.map((e: any) => YellowCard.fromJSON(e))
        : undefined,
      redCards: globalThis.Array.isArray(object?.redCards)
        ? object.redCards.map((e: any) => RedCard.fromJSON(e))
        : undefined,
      timeoutsLeft: isSet(object.timeoutsLeft) ? globalThis.Number(object.timeoutsLeft) : undefined,
      timeoutTimeLeft: isSet(object.timeoutTimeLeft) ? Duration.fromJSON(object.timeoutTimeLeft) : undefined,
      onPositiveHalf: isSet(object.onPositiveHalf) ? globalThis.Boolean(object.onPositiveHalf) : undefined,
      fouls: globalThis.Array.isArray(object?.fouls) ? object.fouls.map((e: any) => Foul.fromJSON(e)) : undefined,
      ballPlacementFailures: isSet(object.ballPlacementFailures)
        ? globalThis.Number(object.ballPlacementFailures)
        : undefined,
      ballPlacementFailuresReached: isSet(object.ballPlacementFailuresReached)
        ? globalThis.Boolean(object.ballPlacementFailuresReached)
        : undefined,
      canPlaceBall: isSet(object.canPlaceBall) ? globalThis.Boolean(object.canPlaceBall) : undefined,
      maxAllowedBots: isSet(object.maxAllowedBots) ? globalThis.Number(object.maxAllowedBots) : undefined,
      requestsBotSubstitutionSince: isSet(object.requestsBotSubstitutionSince)
        ? fromJsonTimestamp(object.requestsBotSubstitutionSince)
        : undefined,
      requestsTimeoutSince: isSet(object.requestsTimeoutSince)
        ? fromJsonTimestamp(object.requestsTimeoutSince)
        : undefined,
      requestsEmergencyStopSince: isSet(object.requestsEmergencyStopSince)
        ? fromJsonTimestamp(object.requestsEmergencyStopSince)
        : undefined,
      challengeFlags: isSet(object.challengeFlags) ? globalThis.Number(object.challengeFlags) : undefined,
      botSubstitutionAllowed: isSet(object.botSubstitutionAllowed)
        ? globalThis.Boolean(object.botSubstitutionAllowed)
        : undefined,
    };
  },

  toJSON(message: TeamInfo): unknown {
    const obj: any = {};
    if (message.name !== undefined && message.name !== "") {
      obj.name = message.name;
    }
    if (message.goals !== undefined && message.goals !== 0) {
      obj.goals = Math.round(message.goals);
    }
    if (message.goalkeeper !== undefined && message.goalkeeper !== 0) {
      obj.goalkeeper = Math.round(message.goalkeeper);
    }
    if (message.yellowCards?.length) {
      obj.yellowCards = message.yellowCards.map((e) => YellowCard.toJSON(e));
    }
    if (message.redCards?.length) {
      obj.redCards = message.redCards.map((e) => RedCard.toJSON(e));
    }
    if (message.timeoutsLeft !== undefined && message.timeoutsLeft !== 0) {
      obj.timeoutsLeft = Math.round(message.timeoutsLeft);
    }
    if (message.timeoutTimeLeft !== undefined) {
      obj.timeoutTimeLeft = Duration.toJSON(message.timeoutTimeLeft);
    }
    if (message.onPositiveHalf === true) {
      obj.onPositiveHalf = message.onPositiveHalf;
    }
    if (message.fouls?.length) {
      obj.fouls = message.fouls.map((e) => Foul.toJSON(e));
    }
    if (message.ballPlacementFailures !== undefined && message.ballPlacementFailures !== 0) {
      obj.ballPlacementFailures = Math.round(message.ballPlacementFailures);
    }
    if (message.ballPlacementFailuresReached === true) {
      obj.ballPlacementFailuresReached = message.ballPlacementFailuresReached;
    }
    if (message.canPlaceBall === true) {
      obj.canPlaceBall = message.canPlaceBall;
    }
    if (message.maxAllowedBots !== undefined && message.maxAllowedBots !== 0) {
      obj.maxAllowedBots = Math.round(message.maxAllowedBots);
    }
    if (message.requestsBotSubstitutionSince !== undefined) {
      obj.requestsBotSubstitutionSince = message.requestsBotSubstitutionSince.toISOString();
    }
    if (message.requestsTimeoutSince !== undefined) {
      obj.requestsTimeoutSince = message.requestsTimeoutSince.toISOString();
    }
    if (message.requestsEmergencyStopSince !== undefined) {
      obj.requestsEmergencyStopSince = message.requestsEmergencyStopSince.toISOString();
    }
    if (message.challengeFlags !== undefined && message.challengeFlags !== 0) {
      obj.challengeFlags = Math.round(message.challengeFlags);
    }
    if (message.botSubstitutionAllowed === true) {
      obj.botSubstitutionAllowed = message.botSubstitutionAllowed;
    }
    return obj;
  },
};

export const State = {
  fromJSON(object: any): State {
    return {
      stage: isSet(object.stage) ? referee_StageFromJSON(object.stage) : undefined,
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
        : undefined,
      placementPos: isSet(object.placementPos) ? Vector2.fromJSON(object.placementPos) : undefined,
      nextCommand: isSet(object.nextCommand) ? Command.fromJSON(object.nextCommand) : undefined,
      currentActionTimeRemaining: isSet(object.currentActionTimeRemaining)
        ? Duration.fromJSON(object.currentActionTimeRemaining)
        : undefined,
      gameEvents: globalThis.Array.isArray(object?.gameEvents)
        ? object.gameEvents.map((e: any) => GameEvent.fromJSON(e))
        : undefined,
      proposalGroups: globalThis.Array.isArray(object?.proposalGroups)
        ? object.proposalGroups.map((e: any) => ProposalGroup.fromJSON(e))
        : undefined,
      division: isSet(object.division) ? divisionFromJSON(object.division) : undefined,
      firstKickoffTeam: isSet(object.firstKickoffTeam) ? teamFromJSON(object.firstKickoffTeam) : undefined,
      matchType: isSet(object.matchType) ? matchTypeFromJSON(object.matchType) : undefined,
      readyContinueTime: isSet(object.readyContinueTime) ? fromJsonTimestamp(object.readyContinueTime) : undefined,
      shootoutState: isSet(object.shootoutState) ? ShootoutState.fromJSON(object.shootoutState) : undefined,
    };
  },

  toJSON(message: State): unknown {
    const obj: any = {};
    if (message.stage !== undefined && message.stage !== Referee_Stage.NORMAL_FIRST_HALF_PRE) {
      obj.stage = referee_StageToJSON(message.stage);
    }
    if (message.command !== undefined) {
      obj.command = Command.toJSON(message.command);
    }
    if (message.gameState !== undefined) {
      obj.gameState = GameState.toJSON(message.gameState);
    }
    if (message.stageTimeElapsed !== undefined) {
      obj.stageTimeElapsed = Duration.toJSON(message.stageTimeElapsed);
    }
    if (message.stageTimeLeft !== undefined) {
      obj.stageTimeLeft = Duration.toJSON(message.stageTimeLeft);
    }
    if (message.matchTimeStart !== undefined) {
      obj.matchTimeStart = message.matchTimeStart.toISOString();
    }
    if (message.teamState) {
      const entries = Object.entries(message.teamState);
      if (entries.length > 0) {
        obj.teamState = {};
        entries.forEach(([k, v]) => {
          obj.teamState[k] = TeamInfo.toJSON(v);
        });
      }
    }
    if (message.placementPos !== undefined) {
      obj.placementPos = Vector2.toJSON(message.placementPos);
    }
    if (message.nextCommand !== undefined) {
      obj.nextCommand = Command.toJSON(message.nextCommand);
    }
    if (message.currentActionTimeRemaining !== undefined) {
      obj.currentActionTimeRemaining = Duration.toJSON(message.currentActionTimeRemaining);
    }
    if (message.gameEvents?.length) {
      obj.gameEvents = message.gameEvents.map((e) => GameEvent.toJSON(e));
    }
    if (message.proposalGroups?.length) {
      obj.proposalGroups = message.proposalGroups.map((e) => ProposalGroup.toJSON(e));
    }
    if (message.division !== undefined && message.division !== Division.DIV_UNKNOWN) {
      obj.division = divisionToJSON(message.division);
    }
    if (message.firstKickoffTeam !== undefined && message.firstKickoffTeam !== Team.UNKNOWN) {
      obj.firstKickoffTeam = teamToJSON(message.firstKickoffTeam);
    }
    if (message.matchType !== undefined && message.matchType !== MatchType.UNKNOWN_MATCH) {
      obj.matchType = matchTypeToJSON(message.matchType);
    }
    if (message.readyContinueTime !== undefined) {
      obj.readyContinueTime = message.readyContinueTime.toISOString();
    }
    if (message.shootoutState !== undefined) {
      obj.shootoutState = ShootoutState.toJSON(message.shootoutState);
    }
    return obj;
  },
};

export const State_TeamStateEntry = {
  fromJSON(object: any): State_TeamStateEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? TeamInfo.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: State_TeamStateEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== undefined) {
      obj.value = TeamInfo.toJSON(message.value);
    }
    return obj;
  },
};

export const ShootoutState = {
  fromJSON(object: any): ShootoutState {
    return {
      nextTeam: isSet(object.nextTeam) ? teamFromJSON(object.nextTeam) : undefined,
      numberOfAttempts: isObject(object.numberOfAttempts)
        ? Object.entries(object.numberOfAttempts).reduce<{ [key: string]: number }>((acc, [key, value]) => {
          acc[key] = Number(value);
          return acc;
        }, {})
        : undefined,
    };
  },

  toJSON(message: ShootoutState): unknown {
    const obj: any = {};
    if (message.nextTeam !== undefined && message.nextTeam !== Team.UNKNOWN) {
      obj.nextTeam = teamToJSON(message.nextTeam);
    }
    if (message.numberOfAttempts) {
      const entries = Object.entries(message.numberOfAttempts);
      if (entries.length > 0) {
        obj.numberOfAttempts = {};
        entries.forEach(([k, v]) => {
          obj.numberOfAttempts[k] = Math.round(v);
        });
      }
    }
    return obj;
  },
};

export const ShootoutState_NumberOfAttemptsEntry = {
  fromJSON(object: any): ShootoutState_NumberOfAttemptsEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? globalThis.Number(object.value) : 0,
    };
  },

  toJSON(message: ShootoutState_NumberOfAttemptsEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== 0) {
      obj.value = Math.round(message.value);
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
