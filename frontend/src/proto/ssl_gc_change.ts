/* eslint-disable */
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
import { Command, Foul, GameState, Proposal, RedCard, State, YellowCard } from "./ssl_gc_state";

/** A state change */
export interface StateChange {
  /** A unique increasing id */
  id?:
    | number
    | undefined;
  /** The previous state */
  statePre?:
    | State
    | undefined;
  /** The state after the change was applied */
  state?:
    | State
    | undefined;
  /** The change itself */
  change?:
    | Change
    | undefined;
  /** The timestamp when the change was triggered */
  timestamp?: Date | undefined;
}

/** A certain change */
export interface Change {
  /** An identifier of the origin that triggered the change */
  origin?:
    | string
    | undefined;
  /** Is this change revertible? */
  revertible?: boolean | undefined;
  change?:
    | { $case: "newCommandChange"; newCommandChange: Change_NewCommand }
    | { $case: "changeStageChange"; changeStageChange: Change_ChangeStage }
    | { $case: "setBallPlacementPosChange"; setBallPlacementPosChange: Change_SetBallPlacementPos }
    | { $case: "addYellowCardChange"; addYellowCardChange: Change_AddYellowCard }
    | { $case: "addRedCardChange"; addRedCardChange: Change_AddRedCard }
    | { $case: "yellowCardOverChange"; yellowCardOverChange: Change_YellowCardOver }
    | { $case: "addGameEventChange"; addGameEventChange: Change_AddGameEvent }
    | { $case: "addPassiveGameEventChange"; addPassiveGameEventChange: Change_AddPassiveGameEvent }
    | { $case: "addProposalChange"; addProposalChange: Change_AddProposal }
    | { $case: "updateConfigChange"; updateConfigChange: Change_UpdateConfig }
    | { $case: "updateTeamStateChange"; updateTeamStateChange: Change_UpdateTeamState }
    | { $case: "switchColorsChange"; switchColorsChange: Change_SwitchColors }
    | { $case: "revertChange"; revertChange: Change_Revert }
    | { $case: "newGameStateChange"; newGameStateChange: Change_NewGameState }
    | { $case: "acceptProposalGroupChange"; acceptProposalGroupChange: Change_AcceptProposalGroup }
    | undefined;
}

/** New referee command */
export interface Change_NewCommand {
  /** The command */
  command?: Command | undefined;
}

/** Switch to a new stage */
export interface Change_ChangeStage {
  /** The new stage */
  newStage?: Referee_Stage | undefined;
}

/** Set the ball placement pos */
export interface Change_SetBallPlacementPos {
  /** The position in [m] */
  pos?: Vector2 | undefined;
}

/** Add a new yellow card */
export interface Change_AddYellowCard {
  /** The team that the card is for */
  forTeam?:
    | Team
    | undefined;
  /** The game event that caused the card */
  causedByGameEvent?: GameEvent | undefined;
}

/** Add a new red card */
export interface Change_AddRedCard {
  /** The team that the card is for */
  forTeam?:
    | Team
    | undefined;
  /** The game event that caused the card */
  causedByGameEvent?: GameEvent | undefined;
}

/** Trigger when a yellow card timed out */
export interface Change_YellowCardOver {
  /** The team that the card was for */
  forTeam?: Team | undefined;
}

/** Add a new game event */
export interface Change_AddGameEvent {
  /** The game event */
  gameEvent?: GameEvent | undefined;
}

/** Add a new passive game event (that is only logged, but does not automatically trigger anything) */
export interface Change_AddPassiveGameEvent {
  /** The game event */
  gameEvent?: GameEvent | undefined;
}

/** Add a new proposal (i.e. from an auto referee for majority voting) */
export interface Change_AddProposal {
  /** The proposal */
  proposal?: Proposal | undefined;
}

/** Accept a proposal group (that contain one or more proposals of the same type) */
export interface Change_AcceptProposalGroup {
  /** The id of the group */
  groupId?:
    | string
    | undefined;
  /** An identifier of the acceptor */
  acceptedBy?: string | undefined;
}

/** Update some configuration */
export interface Change_UpdateConfig {
  /** The division to play with */
  division?:
    | Division
    | undefined;
  /** the team that does/did the first kick off */
  firstKickoffTeam?:
    | Team
    | undefined;
  /** The match type */
  matchType?: MatchType | undefined;
}

/** Update the current state of a team (all fields that should be updated are set) */
export interface Change_UpdateTeamState {
  /** The team */
  forTeam?:
    | Team
    | undefined;
  /** Change the name of the team */
  teamName?:
    | string
    | undefined;
  /** Change the number of goals that the teams has at the moment */
  goals?:
    | number
    | undefined;
  /** The id of the goal keeper */
  goalkeeper?:
    | number
    | undefined;
  /** The number of timeouts that the team has left */
  timeoutsLeft?:
    | number
    | undefined;
  /** The timeout time that the team has left */
  timeoutTimeLeft?:
    | string
    | undefined;
  /** Does the team play on the positive or the negative half (in ssl-vision coordinates)? */
  onPositiveHalf?:
    | boolean
    | undefined;
  /** The number of ball placement failures */
  ballPlacementFailures?:
    | number
    | undefined;
  /** Can the team place the ball, or is ball placement for this team disabled and should be skipped? */
  canPlaceBall?:
    | boolean
    | undefined;
  /** The number of challenge flags that the team has left */
  challengeFlagsLeft?:
    | number
    | undefined;
  /** Does the team want to substitute a robot in the next possible situation? */
  requestsBotSubstitution?:
    | boolean
    | undefined;
  /** Does the team want to take a timeout in the next possible situation? */
  requestsTimeout?:
    | boolean
    | undefined;
  /** Does the team want to challenge a recent decision of the referee? */
  requestsChallenge?:
    | boolean
    | undefined;
  /** Does the team want to request an emergency stop? */
  requestsEmergencyStop?:
    | boolean
    | undefined;
  /** Update a certain yellow card of the team */
  yellowCard?:
    | YellowCard
    | undefined;
  /** Update a certain red card of the team */
  redCard?:
    | RedCard
    | undefined;
  /** Update a certain foul of the team */
  foul?:
    | Foul
    | undefined;
  /** Remove the yellow card with this id */
  removeYellowCard?:
    | number
    | undefined;
  /** Remove the red card with this id */
  removeRedCard?:
    | number
    | undefined;
  /** Remove the foul with this id */
  removeFoul?: number | undefined;
}

/** Switch the team colors */
export interface Change_SwitchColors {
}

/** Revert a certain change */
export interface Change_Revert {
  /** The id of the change */
  changeId?: number | undefined;
}

/** Change the current game state */
export interface Change_NewGameState {
  /** The new game state */
  gameState?: GameState | undefined;
}

export const StateChange = {
  fromJSON(object: any): StateChange {
    return {
      id: isSet(object.id) ? globalThis.Number(object.id) : undefined,
      statePre: isSet(object.statePre) ? State.fromJSON(object.statePre) : undefined,
      state: isSet(object.state) ? State.fromJSON(object.state) : undefined,
      change: isSet(object.change) ? Change.fromJSON(object.change) : undefined,
      timestamp: isSet(object.timestamp) ? fromJsonTimestamp(object.timestamp) : undefined,
    };
  },

  toJSON(message: StateChange): unknown {
    const obj: any = {};
    if (message.id !== undefined && message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    if (message.statePre !== undefined) {
      obj.statePre = State.toJSON(message.statePre);
    }
    if (message.state !== undefined) {
      obj.state = State.toJSON(message.state);
    }
    if (message.change !== undefined) {
      obj.change = Change.toJSON(message.change);
    }
    if (message.timestamp !== undefined) {
      obj.timestamp = message.timestamp.toISOString();
    }
    return obj;
  },
};

export const Change = {
  fromJSON(object: any): Change {
    return {
      origin: isSet(object.origin) ? globalThis.String(object.origin) : undefined,
      revertible: isSet(object.revertible) ? globalThis.Boolean(object.revertible) : undefined,
      change: isSet(object.newCommandChange)
        ? { $case: "newCommandChange", newCommandChange: Change_NewCommand.fromJSON(object.newCommandChange) }
        : isSet(object.changeStageChange)
        ? { $case: "changeStageChange", changeStageChange: Change_ChangeStage.fromJSON(object.changeStageChange) }
        : isSet(object.setBallPlacementPosChange)
        ? {
          $case: "setBallPlacementPosChange",
          setBallPlacementPosChange: Change_SetBallPlacementPos.fromJSON(object.setBallPlacementPosChange),
        }
        : isSet(object.addYellowCardChange)
        ? {
          $case: "addYellowCardChange",
          addYellowCardChange: Change_AddYellowCard.fromJSON(object.addYellowCardChange),
        }
        : isSet(object.addRedCardChange)
        ? { $case: "addRedCardChange", addRedCardChange: Change_AddRedCard.fromJSON(object.addRedCardChange) }
        : isSet(object.yellowCardOverChange)
        ? {
          $case: "yellowCardOverChange",
          yellowCardOverChange: Change_YellowCardOver.fromJSON(object.yellowCardOverChange),
        }
        : isSet(object.addGameEventChange)
        ? { $case: "addGameEventChange", addGameEventChange: Change_AddGameEvent.fromJSON(object.addGameEventChange) }
        : isSet(object.addPassiveGameEventChange)
        ? {
          $case: "addPassiveGameEventChange",
          addPassiveGameEventChange: Change_AddPassiveGameEvent.fromJSON(object.addPassiveGameEventChange),
        }
        : isSet(object.addProposalChange)
        ? { $case: "addProposalChange", addProposalChange: Change_AddProposal.fromJSON(object.addProposalChange) }
        : isSet(object.updateConfigChange)
        ? { $case: "updateConfigChange", updateConfigChange: Change_UpdateConfig.fromJSON(object.updateConfigChange) }
        : isSet(object.updateTeamStateChange)
        ? {
          $case: "updateTeamStateChange",
          updateTeamStateChange: Change_UpdateTeamState.fromJSON(object.updateTeamStateChange),
        }
        : isSet(object.switchColorsChange)
        ? { $case: "switchColorsChange", switchColorsChange: Change_SwitchColors.fromJSON(object.switchColorsChange) }
        : isSet(object.revertChange)
        ? { $case: "revertChange", revertChange: Change_Revert.fromJSON(object.revertChange) }
        : isSet(object.newGameStateChange)
        ? { $case: "newGameStateChange", newGameStateChange: Change_NewGameState.fromJSON(object.newGameStateChange) }
        : isSet(object.acceptProposalGroupChange)
        ? {
          $case: "acceptProposalGroupChange",
          acceptProposalGroupChange: Change_AcceptProposalGroup.fromJSON(object.acceptProposalGroupChange),
        }
        : undefined,
    };
  },

  toJSON(message: Change): unknown {
    const obj: any = {};
    if (message.origin !== undefined && message.origin !== "") {
      obj.origin = message.origin;
    }
    if (message.revertible === true) {
      obj.revertible = message.revertible;
    }
    if (message.change?.$case === "newCommandChange") {
      obj.newCommandChange = Change_NewCommand.toJSON(message.change.newCommandChange);
    }
    if (message.change?.$case === "changeStageChange") {
      obj.changeStageChange = Change_ChangeStage.toJSON(message.change.changeStageChange);
    }
    if (message.change?.$case === "setBallPlacementPosChange") {
      obj.setBallPlacementPosChange = Change_SetBallPlacementPos.toJSON(message.change.setBallPlacementPosChange);
    }
    if (message.change?.$case === "addYellowCardChange") {
      obj.addYellowCardChange = Change_AddYellowCard.toJSON(message.change.addYellowCardChange);
    }
    if (message.change?.$case === "addRedCardChange") {
      obj.addRedCardChange = Change_AddRedCard.toJSON(message.change.addRedCardChange);
    }
    if (message.change?.$case === "yellowCardOverChange") {
      obj.yellowCardOverChange = Change_YellowCardOver.toJSON(message.change.yellowCardOverChange);
    }
    if (message.change?.$case === "addGameEventChange") {
      obj.addGameEventChange = Change_AddGameEvent.toJSON(message.change.addGameEventChange);
    }
    if (message.change?.$case === "addPassiveGameEventChange") {
      obj.addPassiveGameEventChange = Change_AddPassiveGameEvent.toJSON(message.change.addPassiveGameEventChange);
    }
    if (message.change?.$case === "addProposalChange") {
      obj.addProposalChange = Change_AddProposal.toJSON(message.change.addProposalChange);
    }
    if (message.change?.$case === "updateConfigChange") {
      obj.updateConfigChange = Change_UpdateConfig.toJSON(message.change.updateConfigChange);
    }
    if (message.change?.$case === "updateTeamStateChange") {
      obj.updateTeamStateChange = Change_UpdateTeamState.toJSON(message.change.updateTeamStateChange);
    }
    if (message.change?.$case === "switchColorsChange") {
      obj.switchColorsChange = Change_SwitchColors.toJSON(message.change.switchColorsChange);
    }
    if (message.change?.$case === "revertChange") {
      obj.revertChange = Change_Revert.toJSON(message.change.revertChange);
    }
    if (message.change?.$case === "newGameStateChange") {
      obj.newGameStateChange = Change_NewGameState.toJSON(message.change.newGameStateChange);
    }
    if (message.change?.$case === "acceptProposalGroupChange") {
      obj.acceptProposalGroupChange = Change_AcceptProposalGroup.toJSON(message.change.acceptProposalGroupChange);
    }
    return obj;
  },
};

export const Change_NewCommand = {
  fromJSON(object: any): Change_NewCommand {
    return { command: isSet(object.command) ? Command.fromJSON(object.command) : undefined };
  },

  toJSON(message: Change_NewCommand): unknown {
    const obj: any = {};
    if (message.command !== undefined) {
      obj.command = Command.toJSON(message.command);
    }
    return obj;
  },
};

export const Change_ChangeStage = {
  fromJSON(object: any): Change_ChangeStage {
    return { newStage: isSet(object.newStage) ? referee_StageFromJSON(object.newStage) : undefined };
  },

  toJSON(message: Change_ChangeStage): unknown {
    const obj: any = {};
    if (message.newStage !== undefined && message.newStage !== Referee_Stage.NORMAL_FIRST_HALF_PRE) {
      obj.newStage = referee_StageToJSON(message.newStage);
    }
    return obj;
  },
};

export const Change_SetBallPlacementPos = {
  fromJSON(object: any): Change_SetBallPlacementPos {
    return { pos: isSet(object.pos) ? Vector2.fromJSON(object.pos) : undefined };
  },

  toJSON(message: Change_SetBallPlacementPos): unknown {
    const obj: any = {};
    if (message.pos !== undefined) {
      obj.pos = Vector2.toJSON(message.pos);
    }
    return obj;
  },
};

export const Change_AddYellowCard = {
  fromJSON(object: any): Change_AddYellowCard {
    return {
      forTeam: isSet(object.forTeam) ? teamFromJSON(object.forTeam) : undefined,
      causedByGameEvent: isSet(object.causedByGameEvent) ? GameEvent.fromJSON(object.causedByGameEvent) : undefined,
    };
  },

  toJSON(message: Change_AddYellowCard): unknown {
    const obj: any = {};
    if (message.forTeam !== undefined && message.forTeam !== Team.UNKNOWN) {
      obj.forTeam = teamToJSON(message.forTeam);
    }
    if (message.causedByGameEvent !== undefined) {
      obj.causedByGameEvent = GameEvent.toJSON(message.causedByGameEvent);
    }
    return obj;
  },
};

export const Change_AddRedCard = {
  fromJSON(object: any): Change_AddRedCard {
    return {
      forTeam: isSet(object.forTeam) ? teamFromJSON(object.forTeam) : undefined,
      causedByGameEvent: isSet(object.causedByGameEvent) ? GameEvent.fromJSON(object.causedByGameEvent) : undefined,
    };
  },

  toJSON(message: Change_AddRedCard): unknown {
    const obj: any = {};
    if (message.forTeam !== undefined && message.forTeam !== Team.UNKNOWN) {
      obj.forTeam = teamToJSON(message.forTeam);
    }
    if (message.causedByGameEvent !== undefined) {
      obj.causedByGameEvent = GameEvent.toJSON(message.causedByGameEvent);
    }
    return obj;
  },
};

export const Change_YellowCardOver = {
  fromJSON(object: any): Change_YellowCardOver {
    return { forTeam: isSet(object.forTeam) ? teamFromJSON(object.forTeam) : undefined };
  },

  toJSON(message: Change_YellowCardOver): unknown {
    const obj: any = {};
    if (message.forTeam !== undefined && message.forTeam !== Team.UNKNOWN) {
      obj.forTeam = teamToJSON(message.forTeam);
    }
    return obj;
  },
};

export const Change_AddGameEvent = {
  fromJSON(object: any): Change_AddGameEvent {
    return { gameEvent: isSet(object.gameEvent) ? GameEvent.fromJSON(object.gameEvent) : undefined };
  },

  toJSON(message: Change_AddGameEvent): unknown {
    const obj: any = {};
    if (message.gameEvent !== undefined) {
      obj.gameEvent = GameEvent.toJSON(message.gameEvent);
    }
    return obj;
  },
};

export const Change_AddPassiveGameEvent = {
  fromJSON(object: any): Change_AddPassiveGameEvent {
    return { gameEvent: isSet(object.gameEvent) ? GameEvent.fromJSON(object.gameEvent) : undefined };
  },

  toJSON(message: Change_AddPassiveGameEvent): unknown {
    const obj: any = {};
    if (message.gameEvent !== undefined) {
      obj.gameEvent = GameEvent.toJSON(message.gameEvent);
    }
    return obj;
  },
};

export const Change_AddProposal = {
  fromJSON(object: any): Change_AddProposal {
    return { proposal: isSet(object.proposal) ? Proposal.fromJSON(object.proposal) : undefined };
  },

  toJSON(message: Change_AddProposal): unknown {
    const obj: any = {};
    if (message.proposal !== undefined) {
      obj.proposal = Proposal.toJSON(message.proposal);
    }
    return obj;
  },
};

export const Change_AcceptProposalGroup = {
  fromJSON(object: any): Change_AcceptProposalGroup {
    return {
      groupId: isSet(object.groupId) ? globalThis.String(object.groupId) : undefined,
      acceptedBy: isSet(object.acceptedBy) ? globalThis.String(object.acceptedBy) : undefined,
    };
  },

  toJSON(message: Change_AcceptProposalGroup): unknown {
    const obj: any = {};
    if (message.groupId !== undefined && message.groupId !== "") {
      obj.groupId = message.groupId;
    }
    if (message.acceptedBy !== undefined && message.acceptedBy !== "") {
      obj.acceptedBy = message.acceptedBy;
    }
    return obj;
  },
};

export const Change_UpdateConfig = {
  fromJSON(object: any): Change_UpdateConfig {
    return {
      division: isSet(object.division) ? divisionFromJSON(object.division) : undefined,
      firstKickoffTeam: isSet(object.firstKickoffTeam) ? teamFromJSON(object.firstKickoffTeam) : undefined,
      matchType: isSet(object.matchType) ? matchTypeFromJSON(object.matchType) : undefined,
    };
  },

  toJSON(message: Change_UpdateConfig): unknown {
    const obj: any = {};
    if (message.division !== undefined && message.division !== Division.DIV_UNKNOWN) {
      obj.division = divisionToJSON(message.division);
    }
    if (message.firstKickoffTeam !== undefined && message.firstKickoffTeam !== Team.UNKNOWN) {
      obj.firstKickoffTeam = teamToJSON(message.firstKickoffTeam);
    }
    if (message.matchType !== undefined && message.matchType !== MatchType.UNKNOWN_MATCH) {
      obj.matchType = matchTypeToJSON(message.matchType);
    }
    return obj;
  },
};

export const Change_UpdateTeamState = {
  fromJSON(object: any): Change_UpdateTeamState {
    return {
      forTeam: isSet(object.forTeam) ? teamFromJSON(object.forTeam) : undefined,
      teamName: isSet(object.teamName) ? String(object.teamName) : undefined,
      goals: isSet(object.goals) ? Number(object.goals) : undefined,
      goalkeeper: isSet(object.goalkeeper) ? Number(object.goalkeeper) : undefined,
      timeoutsLeft: isSet(object.timeoutsLeft) ? Number(object.timeoutsLeft) : undefined,
      timeoutTimeLeft: isSet(object.timeoutTimeLeft) ? String(object.timeoutTimeLeft) : undefined,
      onPositiveHalf: isSet(object.onPositiveHalf) ? Boolean(object.onPositiveHalf) : undefined,
      ballPlacementFailures: isSet(object.ballPlacementFailures) ? Number(object.ballPlacementFailures) : undefined,
      canPlaceBall: isSet(object.canPlaceBall) ? Boolean(object.canPlaceBall) : undefined,
      challengeFlagsLeft: isSet(object.challengeFlagsLeft) ? Number(object.challengeFlagsLeft) : undefined,
      requestsBotSubstitution: isSet(object.requestsBotSubstitution)
        ? Boolean(object.requestsBotSubstitution)
        : undefined,
      requestsTimeout: isSet(object.requestsTimeout) ? Boolean(object.requestsTimeout) : undefined,
      requestsChallenge: isSet(object.requestsChallenge) ? Boolean(object.requestsChallenge) : undefined,
      requestsEmergencyStop: isSet(object.requestsEmergencyStop) ? Boolean(object.requestsEmergencyStop) : undefined,
      yellowCard: isSet(object.yellowCard) ? YellowCard.fromJSON(object.yellowCard) : undefined,
      redCard: isSet(object.redCard) ? RedCard.fromJSON(object.redCard) : undefined,
      foul: isSet(object.foul) ? Foul.fromJSON(object.foul) : undefined,
      removeYellowCard: isSet(object.removeYellowCard) ? Number(object.removeYellowCard) : undefined,
      removeRedCard: isSet(object.removeRedCard) ? Number(object.removeRedCard) : undefined,
      removeFoul: isSet(object.removeFoul) ? Number(object.removeFoul) : undefined,
    };
  },

  toJSON(message: Change_UpdateTeamState): unknown {
    const obj: any = {};
    if (message.forTeam !== undefined && message.forTeam !== Team.UNKNOWN) {
      obj.forTeam = teamToJSON(message.forTeam);
    }
    if (message.teamName !== undefined) {
      obj.teamName = message.teamName;
    }
    if (message.goals !== undefined) {
      obj.goals = message.goals;
    }
    if (message.goalkeeper !== undefined) {
      obj.goalkeeper = message.goalkeeper;
    }
    if (message.timeoutsLeft !== undefined) {
      obj.timeoutsLeft = message.timeoutsLeft;
    }
    if (message.timeoutTimeLeft !== undefined) {
      obj.timeoutTimeLeft = message.timeoutTimeLeft;
    }
    if (message.onPositiveHalf !== undefined) {
      obj.onPositiveHalf = message.onPositiveHalf;
    }
    if (message.ballPlacementFailures !== undefined) {
      obj.ballPlacementFailures = message.ballPlacementFailures;
    }
    if (message.canPlaceBall !== undefined) {
      obj.canPlaceBall = message.canPlaceBall;
    }
    if (message.challengeFlagsLeft !== undefined) {
      obj.challengeFlagsLeft = message.challengeFlagsLeft;
    }
    if (message.requestsBotSubstitution !== undefined) {
      obj.requestsBotSubstitution = message.requestsBotSubstitution;
    }
    if (message.requestsTimeout !== undefined) {
      obj.requestsTimeout = message.requestsTimeout;
    }
    if (message.requestsChallenge !== undefined) {
      obj.requestsChallenge = message.requestsChallenge;
    }
    if (message.requestsEmergencyStop !== undefined) {
      obj.requestsEmergencyStop = message.requestsEmergencyStop;
    }
    if (message.yellowCard !== undefined) {
      obj.yellowCard = YellowCard.toJSON(message.yellowCard);
    }
    if (message.redCard !== undefined) {
      obj.redCard = RedCard.toJSON(message.redCard);
    }
    if (message.foul !== undefined) {
      obj.foul = Foul.toJSON(message.foul);
    }
    if (message.removeYellowCard !== undefined) {
      obj.removeYellowCard = message.removeYellowCard;
    }
    if (message.removeRedCard !== undefined) {
      obj.removeRedCard = message.removeRedCard;
    }
    if (message.removeFoul !== undefined) {
      obj.removeFoul = message.removeFoul;
    }
    return obj;
  },
};

export const Change_SwitchColors = {
  fromJSON(_: any): Change_SwitchColors {
    return {};
  },

  toJSON(_: Change_SwitchColors): unknown {
    const obj: any = {};
    return obj;
  },
};

export const Change_Revert = {
  fromJSON(object: any): Change_Revert {
    return { changeId: isSet(object.changeId) ? globalThis.Number(object.changeId) : undefined };
  },

  toJSON(message: Change_Revert): unknown {
    const obj: any = {};
    if (message.changeId !== undefined && message.changeId !== 0) {
      obj.changeId = Math.round(message.changeId);
    }
    return obj;
  },
};

export const Change_NewGameState = {
  fromJSON(object: any): Change_NewGameState {
    return { gameState: isSet(object.gameState) ? GameState.fromJSON(object.gameState) : undefined };
  },

  toJSON(message: Change_NewGameState): unknown {
    const obj: any = {};
    if (message.gameState !== undefined) {
      obj.gameState = GameState.toJSON(message.gameState);
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
