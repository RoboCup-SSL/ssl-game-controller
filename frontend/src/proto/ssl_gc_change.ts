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
  id: number;
  /** The previous state */
  statePre:
    | State
    | undefined;
  /** The state after the change was applied */
  state:
    | State
    | undefined;
  /** The change itself */
  change:
    | Change
    | undefined;
  /** The timestamp when the change was triggered */
  timestamp: Date | undefined;
}

/** A certain change */
export interface Change {
  /** An identifier of the origin that triggered the change */
  origin: string;
  /** Is this change revertible? */
  revertible: boolean;
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
    | { $case: "acceptProposalGroupChange"; acceptProposalGroupChange: Change_AcceptProposalGroup };
}

/** New referee command */
export interface Change_NewCommand {
  /** The command */
  command: Command | undefined;
}

/** Switch to a new stage */
export interface Change_ChangeStage {
  /** The new stage */
  newStage: Referee_Stage;
}

/** Set the ball placement pos */
export interface Change_SetBallPlacementPos {
  /** The position in [m] */
  pos: Vector2 | undefined;
}

/** Add a new yellow card */
export interface Change_AddYellowCard {
  /** The team that the card is for */
  forTeam: Team;
  /** The game event that caused the card */
  causedByGameEvent: GameEvent | undefined;
}

/** Add a new red card */
export interface Change_AddRedCard {
  /** The team that the card is for */
  forTeam: Team;
  /** The game event that caused the card */
  causedByGameEvent: GameEvent | undefined;
}

/** Trigger when a yellow card timed out */
export interface Change_YellowCardOver {
  /** The team that the card was for */
  forTeam: Team;
}

/** Add a new game event */
export interface Change_AddGameEvent {
  /** The game event */
  gameEvent: GameEvent | undefined;
}

/** Add a new passive game event (that is only logged, but does not automatically trigger anything) */
export interface Change_AddPassiveGameEvent {
  /** The game event */
  gameEvent: GameEvent | undefined;
}

/** Add a new proposal (i.e. from an auto referee for majority voting) */
export interface Change_AddProposal {
  /** The proposal */
  proposal: Proposal | undefined;
}

/** Accept a proposal group (that contain one or more proposals of the same type) */
export interface Change_AcceptProposalGroup {
  /** The id of the group */
  groupId: number;
  /** An identifier of the acceptor */
  acceptedBy: string;
}

/** Update some configuration */
export interface Change_UpdateConfig {
  /** The division to play with */
  division: Division;
  /** the team that does/did the first kick off */
  firstKickoffTeam: Team;
  /** The match type */
  matchType: MatchType;
}

/** Update the current state of a team (all fields that should be updated are set) */
export interface Change_UpdateTeamState {
  /** The team */
  forTeam: Team;
  /** Change the name of the team */
  teamName: string;
  /** Change the number of goals that the teams has at the moment */
  goals: number;
  /** The id of the goal keeper */
  goalkeeper: number;
  /** The number of timeouts that the team has left */
  timeoutsLeft: number;
  /** The timeout time that the team has left */
  timeoutTimeLeft: string;
  /** Does the team play on the positive or the negative half (in ssl-vision coordinates)? */
  onPositiveHalf: boolean;
  /** The number of ball placement failures */
  ballPlacementFailures: number;
  /** Can the team place the ball, or is ball placement for this team disabled and should be skipped? */
  canPlaceBall: boolean;
  /** The number of challenge flags that the team has left */
  challengeFlagsLeft: number;
  /** Does the team want to substitute a robot in the next possible situation? */
  requestsBotSubstitution: boolean;
  /** Does the team want to take a timeout in the next possible situation? */
  requestsTimeout: boolean;
  /** Does the team want to challenge a recent decision of the referee? */
  requestsChallenge: boolean;
  /** Does the team want to request an emergency stop? */
  requestsEmergencyStop: boolean;
  /** Update a certain yellow card of the team */
  yellowCard:
    | YellowCard
    | undefined;
  /** Update a certain red card of the team */
  redCard:
    | RedCard
    | undefined;
  /** Update a certain foul of the team */
  foul:
    | Foul
    | undefined;
  /** Remove the yellow card with this id */
  removeYellowCard: number;
  /** Remove the red card with this id */
  removeRedCard: number;
  /** Remove the foul with this id */
  removeFoul: number;
}

/** Switch the team colors */
export interface Change_SwitchColors {
}

/** Revert a certain change */
export interface Change_Revert {
  /** The id of the change */
  changeId: number;
}

/** Change the current game state */
export interface Change_NewGameState {
  /** The new game state */
  gameState: GameState | undefined;
}

function createBaseStateChange(): StateChange {
  return { id: 0, statePre: undefined, state: undefined, change: undefined, timestamp: undefined };
}

export const StateChange = {
  fromJSON(object: any): StateChange {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      statePre: isSet(object.statePre) ? State.fromJSON(object.statePre) : undefined,
      state: isSet(object.state) ? State.fromJSON(object.state) : undefined,
      change: isSet(object.change) ? Change.fromJSON(object.change) : undefined,
      timestamp: isSet(object.timestamp) ? fromJsonTimestamp(object.timestamp) : undefined,
    };
  },

  toJSON(message: StateChange): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.statePre !== undefined && (obj.statePre = message.statePre ? State.toJSON(message.statePre) : undefined);
    message.state !== undefined && (obj.state = message.state ? State.toJSON(message.state) : undefined);
    message.change !== undefined && (obj.change = message.change ? Change.toJSON(message.change) : undefined);
    message.timestamp !== undefined && (obj.timestamp = message.timestamp.toISOString());
    return obj;
  },
};

function createBaseChange(): Change {
  return { origin: "", revertible: false, change: undefined };
}

export const Change = {
  fromJSON(object: any): Change {
    return {
      origin: isSet(object.origin) ? String(object.origin) : "",
      revertible: isSet(object.revertible) ? Boolean(object.revertible) : false,
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
    message.origin !== undefined && (obj.origin = message.origin);
    message.revertible !== undefined && (obj.revertible = message.revertible);
    message.change?.$case === "newCommandChange" && (obj.newCommandChange = message.change?.newCommandChange
      ? Change_NewCommand.toJSON(message.change?.newCommandChange)
      : undefined);
    message.change?.$case === "changeStageChange" && (obj.changeStageChange = message.change?.changeStageChange
      ? Change_ChangeStage.toJSON(message.change?.changeStageChange)
      : undefined);
    message.change?.$case === "setBallPlacementPosChange" &&
      (obj.setBallPlacementPosChange = message.change?.setBallPlacementPosChange
        ? Change_SetBallPlacementPos.toJSON(message.change?.setBallPlacementPosChange)
        : undefined);
    message.change?.$case === "addYellowCardChange" && (obj.addYellowCardChange = message.change?.addYellowCardChange
      ? Change_AddYellowCard.toJSON(message.change?.addYellowCardChange)
      : undefined);
    message.change?.$case === "addRedCardChange" && (obj.addRedCardChange = message.change?.addRedCardChange
      ? Change_AddRedCard.toJSON(message.change?.addRedCardChange)
      : undefined);
    message.change?.$case === "yellowCardOverChange" && (obj.yellowCardOverChange = message.change?.yellowCardOverChange
      ? Change_YellowCardOver.toJSON(message.change?.yellowCardOverChange)
      : undefined);
    message.change?.$case === "addGameEventChange" && (obj.addGameEventChange = message.change?.addGameEventChange
      ? Change_AddGameEvent.toJSON(message.change?.addGameEventChange)
      : undefined);
    message.change?.$case === "addPassiveGameEventChange" &&
      (obj.addPassiveGameEventChange = message.change?.addPassiveGameEventChange
        ? Change_AddPassiveGameEvent.toJSON(message.change?.addPassiveGameEventChange)
        : undefined);
    message.change?.$case === "addProposalChange" && (obj.addProposalChange = message.change?.addProposalChange
      ? Change_AddProposal.toJSON(message.change?.addProposalChange)
      : undefined);
    message.change?.$case === "updateConfigChange" && (obj.updateConfigChange = message.change?.updateConfigChange
      ? Change_UpdateConfig.toJSON(message.change?.updateConfigChange)
      : undefined);
    message.change?.$case === "updateTeamStateChange" &&
      (obj.updateTeamStateChange = message.change?.updateTeamStateChange
        ? Change_UpdateTeamState.toJSON(message.change?.updateTeamStateChange)
        : undefined);
    message.change?.$case === "switchColorsChange" && (obj.switchColorsChange = message.change?.switchColorsChange
      ? Change_SwitchColors.toJSON(message.change?.switchColorsChange)
      : undefined);
    message.change?.$case === "revertChange" &&
      (obj.revertChange = message.change?.revertChange
        ? Change_Revert.toJSON(message.change?.revertChange)
        : undefined);
    message.change?.$case === "newGameStateChange" && (obj.newGameStateChange = message.change?.newGameStateChange
      ? Change_NewGameState.toJSON(message.change?.newGameStateChange)
      : undefined);
    message.change?.$case === "acceptProposalGroupChange" &&
      (obj.acceptProposalGroupChange = message.change?.acceptProposalGroupChange
        ? Change_AcceptProposalGroup.toJSON(message.change?.acceptProposalGroupChange)
        : undefined);
    return obj;
  },
};

function createBaseChange_NewCommand(): Change_NewCommand {
  return { command: undefined };
}

export const Change_NewCommand = {
  fromJSON(object: any): Change_NewCommand {
    return { command: isSet(object.command) ? Command.fromJSON(object.command) : undefined };
  },

  toJSON(message: Change_NewCommand): unknown {
    const obj: any = {};
    message.command !== undefined && (obj.command = message.command ? Command.toJSON(message.command) : undefined);
    return obj;
  },
};

function createBaseChange_ChangeStage(): Change_ChangeStage {
  return { newStage: Referee_Stage.NORMAL_FIRST_HALF_PRE };
}

export const Change_ChangeStage = {
  fromJSON(object: any): Change_ChangeStage {
    return {
      newStage: isSet(object.newStage) ? referee_StageFromJSON(object.newStage) : Referee_Stage.NORMAL_FIRST_HALF_PRE,
    };
  },

  toJSON(message: Change_ChangeStage): unknown {
    const obj: any = {};
    message.newStage !== undefined && (obj.newStage = referee_StageToJSON(message.newStage));
    return obj;
  },
};

function createBaseChange_SetBallPlacementPos(): Change_SetBallPlacementPos {
  return { pos: undefined };
}

export const Change_SetBallPlacementPos = {
  fromJSON(object: any): Change_SetBallPlacementPos {
    return { pos: isSet(object.pos) ? Vector2.fromJSON(object.pos) : undefined };
  },

  toJSON(message: Change_SetBallPlacementPos): unknown {
    const obj: any = {};
    message.pos !== undefined && (obj.pos = message.pos ? Vector2.toJSON(message.pos) : undefined);
    return obj;
  },
};

function createBaseChange_AddYellowCard(): Change_AddYellowCard {
  return { forTeam: Team.UNKNOWN, causedByGameEvent: undefined };
}

export const Change_AddYellowCard = {
  fromJSON(object: any): Change_AddYellowCard {
    return {
      forTeam: isSet(object.forTeam) ? teamFromJSON(object.forTeam) : Team.UNKNOWN,
      causedByGameEvent: isSet(object.causedByGameEvent) ? GameEvent.fromJSON(object.causedByGameEvent) : undefined,
    };
  },

  toJSON(message: Change_AddYellowCard): unknown {
    const obj: any = {};
    message.forTeam !== undefined && (obj.forTeam = teamToJSON(message.forTeam));
    message.causedByGameEvent !== undefined &&
      (obj.causedByGameEvent = message.causedByGameEvent ? GameEvent.toJSON(message.causedByGameEvent) : undefined);
    return obj;
  },
};

function createBaseChange_AddRedCard(): Change_AddRedCard {
  return { forTeam: Team.UNKNOWN, causedByGameEvent: undefined };
}

export const Change_AddRedCard = {
  fromJSON(object: any): Change_AddRedCard {
    return {
      forTeam: isSet(object.forTeam) ? teamFromJSON(object.forTeam) : Team.UNKNOWN,
      causedByGameEvent: isSet(object.causedByGameEvent) ? GameEvent.fromJSON(object.causedByGameEvent) : undefined,
    };
  },

  toJSON(message: Change_AddRedCard): unknown {
    const obj: any = {};
    message.forTeam !== undefined && (obj.forTeam = teamToJSON(message.forTeam));
    message.causedByGameEvent !== undefined &&
      (obj.causedByGameEvent = message.causedByGameEvent ? GameEvent.toJSON(message.causedByGameEvent) : undefined);
    return obj;
  },
};

function createBaseChange_YellowCardOver(): Change_YellowCardOver {
  return { forTeam: Team.UNKNOWN };
}

export const Change_YellowCardOver = {
  fromJSON(object: any): Change_YellowCardOver {
    return { forTeam: isSet(object.forTeam) ? teamFromJSON(object.forTeam) : Team.UNKNOWN };
  },

  toJSON(message: Change_YellowCardOver): unknown {
    const obj: any = {};
    message.forTeam !== undefined && (obj.forTeam = teamToJSON(message.forTeam));
    return obj;
  },
};

function createBaseChange_AddGameEvent(): Change_AddGameEvent {
  return { gameEvent: undefined };
}

export const Change_AddGameEvent = {
  fromJSON(object: any): Change_AddGameEvent {
    return { gameEvent: isSet(object.gameEvent) ? GameEvent.fromJSON(object.gameEvent) : undefined };
  },

  toJSON(message: Change_AddGameEvent): unknown {
    const obj: any = {};
    message.gameEvent !== undefined &&
      (obj.gameEvent = message.gameEvent ? GameEvent.toJSON(message.gameEvent) : undefined);
    return obj;
  },
};

function createBaseChange_AddPassiveGameEvent(): Change_AddPassiveGameEvent {
  return { gameEvent: undefined };
}

export const Change_AddPassiveGameEvent = {
  fromJSON(object: any): Change_AddPassiveGameEvent {
    return { gameEvent: isSet(object.gameEvent) ? GameEvent.fromJSON(object.gameEvent) : undefined };
  },

  toJSON(message: Change_AddPassiveGameEvent): unknown {
    const obj: any = {};
    message.gameEvent !== undefined &&
      (obj.gameEvent = message.gameEvent ? GameEvent.toJSON(message.gameEvent) : undefined);
    return obj;
  },
};

function createBaseChange_AddProposal(): Change_AddProposal {
  return { proposal: undefined };
}

export const Change_AddProposal = {
  fromJSON(object: any): Change_AddProposal {
    return { proposal: isSet(object.proposal) ? Proposal.fromJSON(object.proposal) : undefined };
  },

  toJSON(message: Change_AddProposal): unknown {
    const obj: any = {};
    message.proposal !== undefined && (obj.proposal = message.proposal ? Proposal.toJSON(message.proposal) : undefined);
    return obj;
  },
};

function createBaseChange_AcceptProposalGroup(): Change_AcceptProposalGroup {
  return { groupId: 0, acceptedBy: "" };
}

export const Change_AcceptProposalGroup = {
  fromJSON(object: any): Change_AcceptProposalGroup {
    return {
      groupId: isSet(object.groupId) ? Number(object.groupId) : 0,
      acceptedBy: isSet(object.acceptedBy) ? String(object.acceptedBy) : "",
    };
  },

  toJSON(message: Change_AcceptProposalGroup): unknown {
    const obj: any = {};
    message.groupId !== undefined && (obj.groupId = Math.round(message.groupId));
    message.acceptedBy !== undefined && (obj.acceptedBy = message.acceptedBy);
    return obj;
  },
};

function createBaseChange_UpdateConfig(): Change_UpdateConfig {
  return { division: Division.DIV_UNKNOWN, firstKickoffTeam: Team.UNKNOWN, matchType: MatchType.UNKNOWN_MATCH };
}

export const Change_UpdateConfig = {
  fromJSON(object: any): Change_UpdateConfig {
    return {
      division: isSet(object.division) ? divisionFromJSON(object.division) : Division.DIV_UNKNOWN,
      firstKickoffTeam: isSet(object.firstKickoffTeam) ? teamFromJSON(object.firstKickoffTeam) : Team.UNKNOWN,
      matchType: isSet(object.matchType) ? matchTypeFromJSON(object.matchType) : MatchType.UNKNOWN_MATCH,
    };
  },

  toJSON(message: Change_UpdateConfig): unknown {
    const obj: any = {};
    message.division !== undefined && (obj.division = divisionToJSON(message.division));
    message.firstKickoffTeam !== undefined && (obj.firstKickoffTeam = teamToJSON(message.firstKickoffTeam));
    message.matchType !== undefined && (obj.matchType = matchTypeToJSON(message.matchType));
    return obj;
  },
};

function createBaseChange_UpdateTeamState(): Change_UpdateTeamState {
  return {
    forTeam: Team.UNKNOWN,
    teamName: "",
    goals: 0,
    goalkeeper: 0,
    timeoutsLeft: 0,
    timeoutTimeLeft: "",
    onPositiveHalf: false,
    ballPlacementFailures: 0,
    canPlaceBall: false,
    challengeFlagsLeft: 0,
    requestsBotSubstitution: false,
    requestsTimeout: false,
    requestsChallenge: false,
    requestsEmergencyStop: false,
    yellowCard: undefined,
    redCard: undefined,
    foul: undefined,
    removeYellowCard: 0,
    removeRedCard: 0,
    removeFoul: 0,
  };
}

export const Change_UpdateTeamState = {
  fromJSON(object: any): Change_UpdateTeamState {
    return {
      forTeam: isSet(object.forTeam) ? teamFromJSON(object.forTeam) : Team.UNKNOWN,
      teamName: isSet(object.teamName) ? String(object.teamName) : "",
      goals: isSet(object.goals) ? Number(object.goals) : 0,
      goalkeeper: isSet(object.goalkeeper) ? Number(object.goalkeeper) : 0,
      timeoutsLeft: isSet(object.timeoutsLeft) ? Number(object.timeoutsLeft) : 0,
      timeoutTimeLeft: isSet(object.timeoutTimeLeft) ? String(object.timeoutTimeLeft) : "",
      onPositiveHalf: isSet(object.onPositiveHalf) ? Boolean(object.onPositiveHalf) : false,
      ballPlacementFailures: isSet(object.ballPlacementFailures) ? Number(object.ballPlacementFailures) : 0,
      canPlaceBall: isSet(object.canPlaceBall) ? Boolean(object.canPlaceBall) : false,
      challengeFlagsLeft: isSet(object.challengeFlagsLeft) ? Number(object.challengeFlagsLeft) : 0,
      requestsBotSubstitution: isSet(object.requestsBotSubstitution) ? Boolean(object.requestsBotSubstitution) : false,
      requestsTimeout: isSet(object.requestsTimeout) ? Boolean(object.requestsTimeout) : false,
      requestsChallenge: isSet(object.requestsChallenge) ? Boolean(object.requestsChallenge) : false,
      requestsEmergencyStop: isSet(object.requestsEmergencyStop) ? Boolean(object.requestsEmergencyStop) : false,
      yellowCard: isSet(object.yellowCard) ? YellowCard.fromJSON(object.yellowCard) : undefined,
      redCard: isSet(object.redCard) ? RedCard.fromJSON(object.redCard) : undefined,
      foul: isSet(object.foul) ? Foul.fromJSON(object.foul) : undefined,
      removeYellowCard: isSet(object.removeYellowCard) ? Number(object.removeYellowCard) : 0,
      removeRedCard: isSet(object.removeRedCard) ? Number(object.removeRedCard) : 0,
      removeFoul: isSet(object.removeFoul) ? Number(object.removeFoul) : 0,
    };
  },

  toJSON(message: Change_UpdateTeamState): unknown {
    const obj: any = {};
    message.forTeam !== undefined && (obj.forTeam = teamToJSON(message.forTeam));
    message.teamName !== undefined && (obj.teamName = message.teamName);
    message.goals !== undefined && (obj.goals = Math.round(message.goals));
    message.goalkeeper !== undefined && (obj.goalkeeper = Math.round(message.goalkeeper));
    message.timeoutsLeft !== undefined && (obj.timeoutsLeft = Math.round(message.timeoutsLeft));
    message.timeoutTimeLeft !== undefined && (obj.timeoutTimeLeft = message.timeoutTimeLeft);
    message.onPositiveHalf !== undefined && (obj.onPositiveHalf = message.onPositiveHalf);
    message.ballPlacementFailures !== undefined &&
      (obj.ballPlacementFailures = Math.round(message.ballPlacementFailures));
    message.canPlaceBall !== undefined && (obj.canPlaceBall = message.canPlaceBall);
    message.challengeFlagsLeft !== undefined && (obj.challengeFlagsLeft = Math.round(message.challengeFlagsLeft));
    message.requestsBotSubstitution !== undefined && (obj.requestsBotSubstitution = message.requestsBotSubstitution);
    message.requestsTimeout !== undefined && (obj.requestsTimeout = message.requestsTimeout);
    message.requestsChallenge !== undefined && (obj.requestsChallenge = message.requestsChallenge);
    message.requestsEmergencyStop !== undefined && (obj.requestsEmergencyStop = message.requestsEmergencyStop);
    message.yellowCard !== undefined &&
      (obj.yellowCard = message.yellowCard ? YellowCard.toJSON(message.yellowCard) : undefined);
    message.redCard !== undefined && (obj.redCard = message.redCard ? RedCard.toJSON(message.redCard) : undefined);
    message.foul !== undefined && (obj.foul = message.foul ? Foul.toJSON(message.foul) : undefined);
    message.removeYellowCard !== undefined && (obj.removeYellowCard = Math.round(message.removeYellowCard));
    message.removeRedCard !== undefined && (obj.removeRedCard = Math.round(message.removeRedCard));
    message.removeFoul !== undefined && (obj.removeFoul = Math.round(message.removeFoul));
    return obj;
  },
};

function createBaseChange_SwitchColors(): Change_SwitchColors {
  return {};
}

export const Change_SwitchColors = {
  fromJSON(_: any): Change_SwitchColors {
    return {};
  },

  toJSON(_: Change_SwitchColors): unknown {
    const obj: any = {};
    return obj;
  },
};

function createBaseChange_Revert(): Change_Revert {
  return { changeId: 0 };
}

export const Change_Revert = {
  fromJSON(object: any): Change_Revert {
    return { changeId: isSet(object.changeId) ? Number(object.changeId) : 0 };
  },

  toJSON(message: Change_Revert): unknown {
    const obj: any = {};
    message.changeId !== undefined && (obj.changeId = Math.round(message.changeId));
    return obj;
  },
};

function createBaseChange_NewGameState(): Change_NewGameState {
  return { gameState: undefined };
}

export const Change_NewGameState = {
  fromJSON(object: any): Change_NewGameState {
    return { gameState: isSet(object.gameState) ? GameState.fromJSON(object.gameState) : undefined };
  },

  toJSON(message: Change_NewGameState): unknown {
    const obj: any = {};
    message.gameState !== undefined &&
      (obj.gameState = message.gameState ? GameState.toJSON(message.gameState) : undefined);
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
