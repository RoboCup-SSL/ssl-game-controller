/* eslint-disable */
import _m0 from "protobufjs/minimal";
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

export const protobufPackage = "";

/** A state change */
export interface StateChange {
  /** A unique increasing id */
  id: number;
  /** The previous state */
  statePre?: State;
  /** The state after the change was applied */
  state?: State;
  /** The change itself */
  change?: Change;
  /** The timestamp when the change was triggered */
  timestamp?: Date;
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
  command?: Command;
}

/** Switch to a new stage */
export interface Change_ChangeStage {
  /** The new stage */
  newStage: Referee_Stage;
}

/** Set the ball placement pos */
export interface Change_SetBallPlacementPos {
  /** The position in [m] */
  pos?: Vector2;
}

/** Add a new yellow card */
export interface Change_AddYellowCard {
  /** The team that the card is for */
  forTeam: Team;
  /** The game event that caused the card */
  causedByGameEvent?: GameEvent;
}

/** Add a new red card */
export interface Change_AddRedCard {
  /** The team that the card is for */
  forTeam: Team;
  /** The game event that caused the card */
  causedByGameEvent?: GameEvent;
}

/** Trigger when a yellow card timed out */
export interface Change_YellowCardOver {
  /** The team that the card was for */
  forTeam: Team;
}

/** Add a new game event */
export interface Change_AddGameEvent {
  /** The game event */
  gameEvent?: GameEvent;
}

/** Add a new passive game event (that is only logged, but does not automatically trigger anything) */
export interface Change_AddPassiveGameEvent {
  /** The game event */
  gameEvent?: GameEvent;
}

/** Add a new proposal (i.e. from an auto referee for majority voting) */
export interface Change_AddProposal {
  /** The proposal */
  proposal?: Proposal;
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
  yellowCard?: YellowCard;
  /** Update a certain red card of the team */
  redCard?: RedCard;
  /** Update a certain foul of the team */
  foul?: Foul;
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
  gameState?: GameState;
}

function createBaseStateChange(): StateChange {
  return { id: 0, statePre: undefined, state: undefined, change: undefined, timestamp: undefined };
}

export const StateChange = {
  encode(message: StateChange, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    if (message.statePre !== undefined) {
      State.encode(message.statePre, writer.uint32(18).fork()).ldelim();
    }
    if (message.state !== undefined) {
      State.encode(message.state, writer.uint32(26).fork()).ldelim();
    }
    if (message.change !== undefined) {
      Change.encode(message.change, writer.uint32(34).fork()).ldelim();
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StateChange {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStateChange();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.int32();
          break;
        case 2:
          message.statePre = State.decode(reader, reader.uint32());
          break;
        case 3:
          message.state = State.decode(reader, reader.uint32());
          break;
        case 4:
          message.change = Change.decode(reader, reader.uint32());
          break;
        case 5:
          message.timestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

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

  fromPartial<I extends Exact<DeepPartial<StateChange>, I>>(object: I): StateChange {
    const message = createBaseStateChange();
    message.id = object.id ?? 0;
    message.statePre = (object.statePre !== undefined && object.statePre !== null)
      ? State.fromPartial(object.statePre)
      : undefined;
    message.state = (object.state !== undefined && object.state !== null) ? State.fromPartial(object.state) : undefined;
    message.change = (object.change !== undefined && object.change !== null)
      ? Change.fromPartial(object.change)
      : undefined;
    message.timestamp = object.timestamp ?? undefined;
    return message;
  },
};

function createBaseChange(): Change {
  return { origin: "", revertible: false, change: undefined };
}

export const Change = {
  encode(message: Change, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.origin !== "") {
      writer.uint32(10).string(message.origin);
    }
    if (message.revertible === true) {
      writer.uint32(128).bool(message.revertible);
    }
    if (message.change?.$case === "newCommandChange") {
      Change_NewCommand.encode(message.change.newCommandChange, writer.uint32(18).fork()).ldelim();
    }
    if (message.change?.$case === "changeStageChange") {
      Change_ChangeStage.encode(message.change.changeStageChange, writer.uint32(26).fork()).ldelim();
    }
    if (message.change?.$case === "setBallPlacementPosChange") {
      Change_SetBallPlacementPos.encode(message.change.setBallPlacementPosChange, writer.uint32(34).fork()).ldelim();
    }
    if (message.change?.$case === "addYellowCardChange") {
      Change_AddYellowCard.encode(message.change.addYellowCardChange, writer.uint32(42).fork()).ldelim();
    }
    if (message.change?.$case === "addRedCardChange") {
      Change_AddRedCard.encode(message.change.addRedCardChange, writer.uint32(50).fork()).ldelim();
    }
    if (message.change?.$case === "yellowCardOverChange") {
      Change_YellowCardOver.encode(message.change.yellowCardOverChange, writer.uint32(58).fork()).ldelim();
    }
    if (message.change?.$case === "addGameEventChange") {
      Change_AddGameEvent.encode(message.change.addGameEventChange, writer.uint32(66).fork()).ldelim();
    }
    if (message.change?.$case === "addPassiveGameEventChange") {
      Change_AddPassiveGameEvent.encode(message.change.addPassiveGameEventChange, writer.uint32(154).fork()).ldelim();
    }
    if (message.change?.$case === "addProposalChange") {
      Change_AddProposal.encode(message.change.addProposalChange, writer.uint32(74).fork()).ldelim();
    }
    if (message.change?.$case === "updateConfigChange") {
      Change_UpdateConfig.encode(message.change.updateConfigChange, writer.uint32(98).fork()).ldelim();
    }
    if (message.change?.$case === "updateTeamStateChange") {
      Change_UpdateTeamState.encode(message.change.updateTeamStateChange, writer.uint32(106).fork()).ldelim();
    }
    if (message.change?.$case === "switchColorsChange") {
      Change_SwitchColors.encode(message.change.switchColorsChange, writer.uint32(114).fork()).ldelim();
    }
    if (message.change?.$case === "revertChange") {
      Change_Revert.encode(message.change.revertChange, writer.uint32(122).fork()).ldelim();
    }
    if (message.change?.$case === "newGameStateChange") {
      Change_NewGameState.encode(message.change.newGameStateChange, writer.uint32(138).fork()).ldelim();
    }
    if (message.change?.$case === "acceptProposalGroupChange") {
      Change_AcceptProposalGroup.encode(message.change.acceptProposalGroupChange, writer.uint32(146).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Change {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChange();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.origin = reader.string();
          break;
        case 16:
          message.revertible = reader.bool();
          break;
        case 2:
          message.change = {
            $case: "newCommandChange",
            newCommandChange: Change_NewCommand.decode(reader, reader.uint32()),
          };
          break;
        case 3:
          message.change = {
            $case: "changeStageChange",
            changeStageChange: Change_ChangeStage.decode(reader, reader.uint32()),
          };
          break;
        case 4:
          message.change = {
            $case: "setBallPlacementPosChange",
            setBallPlacementPosChange: Change_SetBallPlacementPos.decode(reader, reader.uint32()),
          };
          break;
        case 5:
          message.change = {
            $case: "addYellowCardChange",
            addYellowCardChange: Change_AddYellowCard.decode(reader, reader.uint32()),
          };
          break;
        case 6:
          message.change = {
            $case: "addRedCardChange",
            addRedCardChange: Change_AddRedCard.decode(reader, reader.uint32()),
          };
          break;
        case 7:
          message.change = {
            $case: "yellowCardOverChange",
            yellowCardOverChange: Change_YellowCardOver.decode(reader, reader.uint32()),
          };
          break;
        case 8:
          message.change = {
            $case: "addGameEventChange",
            addGameEventChange: Change_AddGameEvent.decode(reader, reader.uint32()),
          };
          break;
        case 19:
          message.change = {
            $case: "addPassiveGameEventChange",
            addPassiveGameEventChange: Change_AddPassiveGameEvent.decode(reader, reader.uint32()),
          };
          break;
        case 9:
          message.change = {
            $case: "addProposalChange",
            addProposalChange: Change_AddProposal.decode(reader, reader.uint32()),
          };
          break;
        case 12:
          message.change = {
            $case: "updateConfigChange",
            updateConfigChange: Change_UpdateConfig.decode(reader, reader.uint32()),
          };
          break;
        case 13:
          message.change = {
            $case: "updateTeamStateChange",
            updateTeamStateChange: Change_UpdateTeamState.decode(reader, reader.uint32()),
          };
          break;
        case 14:
          message.change = {
            $case: "switchColorsChange",
            switchColorsChange: Change_SwitchColors.decode(reader, reader.uint32()),
          };
          break;
        case 15:
          message.change = { $case: "revertChange", revertChange: Change_Revert.decode(reader, reader.uint32()) };
          break;
        case 17:
          message.change = {
            $case: "newGameStateChange",
            newGameStateChange: Change_NewGameState.decode(reader, reader.uint32()),
          };
          break;
        case 18:
          message.change = {
            $case: "acceptProposalGroupChange",
            acceptProposalGroupChange: Change_AcceptProposalGroup.decode(reader, reader.uint32()),
          };
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

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

  fromPartial<I extends Exact<DeepPartial<Change>, I>>(object: I): Change {
    const message = createBaseChange();
    message.origin = object.origin ?? "";
    message.revertible = object.revertible ?? false;
    if (
      object.change?.$case === "newCommandChange" &&
      object.change?.newCommandChange !== undefined &&
      object.change?.newCommandChange !== null
    ) {
      message.change = {
        $case: "newCommandChange",
        newCommandChange: Change_NewCommand.fromPartial(object.change.newCommandChange),
      };
    }
    if (
      object.change?.$case === "changeStageChange" &&
      object.change?.changeStageChange !== undefined &&
      object.change?.changeStageChange !== null
    ) {
      message.change = {
        $case: "changeStageChange",
        changeStageChange: Change_ChangeStage.fromPartial(object.change.changeStageChange),
      };
    }
    if (
      object.change?.$case === "setBallPlacementPosChange" &&
      object.change?.setBallPlacementPosChange !== undefined &&
      object.change?.setBallPlacementPosChange !== null
    ) {
      message.change = {
        $case: "setBallPlacementPosChange",
        setBallPlacementPosChange: Change_SetBallPlacementPos.fromPartial(object.change.setBallPlacementPosChange),
      };
    }
    if (
      object.change?.$case === "addYellowCardChange" &&
      object.change?.addYellowCardChange !== undefined &&
      object.change?.addYellowCardChange !== null
    ) {
      message.change = {
        $case: "addYellowCardChange",
        addYellowCardChange: Change_AddYellowCard.fromPartial(object.change.addYellowCardChange),
      };
    }
    if (
      object.change?.$case === "addRedCardChange" &&
      object.change?.addRedCardChange !== undefined &&
      object.change?.addRedCardChange !== null
    ) {
      message.change = {
        $case: "addRedCardChange",
        addRedCardChange: Change_AddRedCard.fromPartial(object.change.addRedCardChange),
      };
    }
    if (
      object.change?.$case === "yellowCardOverChange" &&
      object.change?.yellowCardOverChange !== undefined &&
      object.change?.yellowCardOverChange !== null
    ) {
      message.change = {
        $case: "yellowCardOverChange",
        yellowCardOverChange: Change_YellowCardOver.fromPartial(object.change.yellowCardOverChange),
      };
    }
    if (
      object.change?.$case === "addGameEventChange" &&
      object.change?.addGameEventChange !== undefined &&
      object.change?.addGameEventChange !== null
    ) {
      message.change = {
        $case: "addGameEventChange",
        addGameEventChange: Change_AddGameEvent.fromPartial(object.change.addGameEventChange),
      };
    }
    if (
      object.change?.$case === "addPassiveGameEventChange" &&
      object.change?.addPassiveGameEventChange !== undefined &&
      object.change?.addPassiveGameEventChange !== null
    ) {
      message.change = {
        $case: "addPassiveGameEventChange",
        addPassiveGameEventChange: Change_AddPassiveGameEvent.fromPartial(object.change.addPassiveGameEventChange),
      };
    }
    if (
      object.change?.$case === "addProposalChange" &&
      object.change?.addProposalChange !== undefined &&
      object.change?.addProposalChange !== null
    ) {
      message.change = {
        $case: "addProposalChange",
        addProposalChange: Change_AddProposal.fromPartial(object.change.addProposalChange),
      };
    }
    if (
      object.change?.$case === "updateConfigChange" &&
      object.change?.updateConfigChange !== undefined &&
      object.change?.updateConfigChange !== null
    ) {
      message.change = {
        $case: "updateConfigChange",
        updateConfigChange: Change_UpdateConfig.fromPartial(object.change.updateConfigChange),
      };
    }
    if (
      object.change?.$case === "updateTeamStateChange" &&
      object.change?.updateTeamStateChange !== undefined &&
      object.change?.updateTeamStateChange !== null
    ) {
      message.change = {
        $case: "updateTeamStateChange",
        updateTeamStateChange: Change_UpdateTeamState.fromPartial(object.change.updateTeamStateChange),
      };
    }
    if (
      object.change?.$case === "switchColorsChange" &&
      object.change?.switchColorsChange !== undefined &&
      object.change?.switchColorsChange !== null
    ) {
      message.change = {
        $case: "switchColorsChange",
        switchColorsChange: Change_SwitchColors.fromPartial(object.change.switchColorsChange),
      };
    }
    if (
      object.change?.$case === "revertChange" &&
      object.change?.revertChange !== undefined &&
      object.change?.revertChange !== null
    ) {
      message.change = { $case: "revertChange", revertChange: Change_Revert.fromPartial(object.change.revertChange) };
    }
    if (
      object.change?.$case === "newGameStateChange" &&
      object.change?.newGameStateChange !== undefined &&
      object.change?.newGameStateChange !== null
    ) {
      message.change = {
        $case: "newGameStateChange",
        newGameStateChange: Change_NewGameState.fromPartial(object.change.newGameStateChange),
      };
    }
    if (
      object.change?.$case === "acceptProposalGroupChange" &&
      object.change?.acceptProposalGroupChange !== undefined &&
      object.change?.acceptProposalGroupChange !== null
    ) {
      message.change = {
        $case: "acceptProposalGroupChange",
        acceptProposalGroupChange: Change_AcceptProposalGroup.fromPartial(object.change.acceptProposalGroupChange),
      };
    }
    return message;
  },
};

function createBaseChange_NewCommand(): Change_NewCommand {
  return { command: undefined };
}

export const Change_NewCommand = {
  encode(message: Change_NewCommand, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.command !== undefined) {
      Command.encode(message.command, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Change_NewCommand {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChange_NewCommand();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.command = Command.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Change_NewCommand {
    return { command: isSet(object.command) ? Command.fromJSON(object.command) : undefined };
  },

  toJSON(message: Change_NewCommand): unknown {
    const obj: any = {};
    message.command !== undefined && (obj.command = message.command ? Command.toJSON(message.command) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Change_NewCommand>, I>>(object: I): Change_NewCommand {
    const message = createBaseChange_NewCommand();
    message.command = (object.command !== undefined && object.command !== null)
      ? Command.fromPartial(object.command)
      : undefined;
    return message;
  },
};

function createBaseChange_ChangeStage(): Change_ChangeStage {
  return { newStage: 0 };
}

export const Change_ChangeStage = {
  encode(message: Change_ChangeStage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.newStage !== 0) {
      writer.uint32(8).int32(message.newStage);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Change_ChangeStage {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChange_ChangeStage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.newStage = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Change_ChangeStage {
    return { newStage: isSet(object.newStage) ? referee_StageFromJSON(object.newStage) : 0 };
  },

  toJSON(message: Change_ChangeStage): unknown {
    const obj: any = {};
    message.newStage !== undefined && (obj.newStage = referee_StageToJSON(message.newStage));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Change_ChangeStage>, I>>(object: I): Change_ChangeStage {
    const message = createBaseChange_ChangeStage();
    message.newStage = object.newStage ?? 0;
    return message;
  },
};

function createBaseChange_SetBallPlacementPos(): Change_SetBallPlacementPos {
  return { pos: undefined };
}

export const Change_SetBallPlacementPos = {
  encode(message: Change_SetBallPlacementPos, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pos !== undefined) {
      Vector2.encode(message.pos, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Change_SetBallPlacementPos {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChange_SetBallPlacementPos();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pos = Vector2.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Change_SetBallPlacementPos {
    return { pos: isSet(object.pos) ? Vector2.fromJSON(object.pos) : undefined };
  },

  toJSON(message: Change_SetBallPlacementPos): unknown {
    const obj: any = {};
    message.pos !== undefined && (obj.pos = message.pos ? Vector2.toJSON(message.pos) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Change_SetBallPlacementPos>, I>>(object: I): Change_SetBallPlacementPos {
    const message = createBaseChange_SetBallPlacementPos();
    message.pos = (object.pos !== undefined && object.pos !== null) ? Vector2.fromPartial(object.pos) : undefined;
    return message;
  },
};

function createBaseChange_AddYellowCard(): Change_AddYellowCard {
  return { forTeam: 0, causedByGameEvent: undefined };
}

export const Change_AddYellowCard = {
  encode(message: Change_AddYellowCard, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.forTeam !== 0) {
      writer.uint32(8).int32(message.forTeam);
    }
    if (message.causedByGameEvent !== undefined) {
      GameEvent.encode(message.causedByGameEvent, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Change_AddYellowCard {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChange_AddYellowCard();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.forTeam = reader.int32() as any;
          break;
        case 2:
          message.causedByGameEvent = GameEvent.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Change_AddYellowCard {
    return {
      forTeam: isSet(object.forTeam) ? teamFromJSON(object.forTeam) : 0,
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

  fromPartial<I extends Exact<DeepPartial<Change_AddYellowCard>, I>>(object: I): Change_AddYellowCard {
    const message = createBaseChange_AddYellowCard();
    message.forTeam = object.forTeam ?? 0;
    message.causedByGameEvent = (object.causedByGameEvent !== undefined && object.causedByGameEvent !== null)
      ? GameEvent.fromPartial(object.causedByGameEvent)
      : undefined;
    return message;
  },
};

function createBaseChange_AddRedCard(): Change_AddRedCard {
  return { forTeam: 0, causedByGameEvent: undefined };
}

export const Change_AddRedCard = {
  encode(message: Change_AddRedCard, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.forTeam !== 0) {
      writer.uint32(8).int32(message.forTeam);
    }
    if (message.causedByGameEvent !== undefined) {
      GameEvent.encode(message.causedByGameEvent, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Change_AddRedCard {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChange_AddRedCard();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.forTeam = reader.int32() as any;
          break;
        case 2:
          message.causedByGameEvent = GameEvent.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Change_AddRedCard {
    return {
      forTeam: isSet(object.forTeam) ? teamFromJSON(object.forTeam) : 0,
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

  fromPartial<I extends Exact<DeepPartial<Change_AddRedCard>, I>>(object: I): Change_AddRedCard {
    const message = createBaseChange_AddRedCard();
    message.forTeam = object.forTeam ?? 0;
    message.causedByGameEvent = (object.causedByGameEvent !== undefined && object.causedByGameEvent !== null)
      ? GameEvent.fromPartial(object.causedByGameEvent)
      : undefined;
    return message;
  },
};

function createBaseChange_YellowCardOver(): Change_YellowCardOver {
  return { forTeam: 0 };
}

export const Change_YellowCardOver = {
  encode(message: Change_YellowCardOver, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.forTeam !== 0) {
      writer.uint32(8).int32(message.forTeam);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Change_YellowCardOver {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChange_YellowCardOver();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.forTeam = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Change_YellowCardOver {
    return { forTeam: isSet(object.forTeam) ? teamFromJSON(object.forTeam) : 0 };
  },

  toJSON(message: Change_YellowCardOver): unknown {
    const obj: any = {};
    message.forTeam !== undefined && (obj.forTeam = teamToJSON(message.forTeam));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Change_YellowCardOver>, I>>(object: I): Change_YellowCardOver {
    const message = createBaseChange_YellowCardOver();
    message.forTeam = object.forTeam ?? 0;
    return message;
  },
};

function createBaseChange_AddGameEvent(): Change_AddGameEvent {
  return { gameEvent: undefined };
}

export const Change_AddGameEvent = {
  encode(message: Change_AddGameEvent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.gameEvent !== undefined) {
      GameEvent.encode(message.gameEvent, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Change_AddGameEvent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChange_AddGameEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.gameEvent = GameEvent.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Change_AddGameEvent {
    return { gameEvent: isSet(object.gameEvent) ? GameEvent.fromJSON(object.gameEvent) : undefined };
  },

  toJSON(message: Change_AddGameEvent): unknown {
    const obj: any = {};
    message.gameEvent !== undefined &&
      (obj.gameEvent = message.gameEvent ? GameEvent.toJSON(message.gameEvent) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Change_AddGameEvent>, I>>(object: I): Change_AddGameEvent {
    const message = createBaseChange_AddGameEvent();
    message.gameEvent = (object.gameEvent !== undefined && object.gameEvent !== null)
      ? GameEvent.fromPartial(object.gameEvent)
      : undefined;
    return message;
  },
};

function createBaseChange_AddPassiveGameEvent(): Change_AddPassiveGameEvent {
  return { gameEvent: undefined };
}

export const Change_AddPassiveGameEvent = {
  encode(message: Change_AddPassiveGameEvent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.gameEvent !== undefined) {
      GameEvent.encode(message.gameEvent, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Change_AddPassiveGameEvent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChange_AddPassiveGameEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.gameEvent = GameEvent.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Change_AddPassiveGameEvent {
    return { gameEvent: isSet(object.gameEvent) ? GameEvent.fromJSON(object.gameEvent) : undefined };
  },

  toJSON(message: Change_AddPassiveGameEvent): unknown {
    const obj: any = {};
    message.gameEvent !== undefined &&
      (obj.gameEvent = message.gameEvent ? GameEvent.toJSON(message.gameEvent) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Change_AddPassiveGameEvent>, I>>(object: I): Change_AddPassiveGameEvent {
    const message = createBaseChange_AddPassiveGameEvent();
    message.gameEvent = (object.gameEvent !== undefined && object.gameEvent !== null)
      ? GameEvent.fromPartial(object.gameEvent)
      : undefined;
    return message;
  },
};

function createBaseChange_AddProposal(): Change_AddProposal {
  return { proposal: undefined };
}

export const Change_AddProposal = {
  encode(message: Change_AddProposal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.proposal !== undefined) {
      Proposal.encode(message.proposal, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Change_AddProposal {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChange_AddProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.proposal = Proposal.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Change_AddProposal {
    return { proposal: isSet(object.proposal) ? Proposal.fromJSON(object.proposal) : undefined };
  },

  toJSON(message: Change_AddProposal): unknown {
    const obj: any = {};
    message.proposal !== undefined && (obj.proposal = message.proposal ? Proposal.toJSON(message.proposal) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Change_AddProposal>, I>>(object: I): Change_AddProposal {
    const message = createBaseChange_AddProposal();
    message.proposal = (object.proposal !== undefined && object.proposal !== null)
      ? Proposal.fromPartial(object.proposal)
      : undefined;
    return message;
  },
};

function createBaseChange_AcceptProposalGroup(): Change_AcceptProposalGroup {
  return { groupId: 0, acceptedBy: "" };
}

export const Change_AcceptProposalGroup = {
  encode(message: Change_AcceptProposalGroup, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.groupId !== 0) {
      writer.uint32(8).uint32(message.groupId);
    }
    if (message.acceptedBy !== "") {
      writer.uint32(18).string(message.acceptedBy);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Change_AcceptProposalGroup {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChange_AcceptProposalGroup();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.groupId = reader.uint32();
          break;
        case 2:
          message.acceptedBy = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

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

  fromPartial<I extends Exact<DeepPartial<Change_AcceptProposalGroup>, I>>(object: I): Change_AcceptProposalGroup {
    const message = createBaseChange_AcceptProposalGroup();
    message.groupId = object.groupId ?? 0;
    message.acceptedBy = object.acceptedBy ?? "";
    return message;
  },
};

function createBaseChange_UpdateConfig(): Change_UpdateConfig {
  return { division: 0, firstKickoffTeam: 0, matchType: 0 };
}

export const Change_UpdateConfig = {
  encode(message: Change_UpdateConfig, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.division !== 0) {
      writer.uint32(8).int32(message.division);
    }
    if (message.firstKickoffTeam !== 0) {
      writer.uint32(16).int32(message.firstKickoffTeam);
    }
    if (message.matchType !== 0) {
      writer.uint32(32).int32(message.matchType);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Change_UpdateConfig {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChange_UpdateConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.division = reader.int32() as any;
          break;
        case 2:
          message.firstKickoffTeam = reader.int32() as any;
          break;
        case 4:
          message.matchType = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Change_UpdateConfig {
    return {
      division: isSet(object.division) ? divisionFromJSON(object.division) : 0,
      firstKickoffTeam: isSet(object.firstKickoffTeam) ? teamFromJSON(object.firstKickoffTeam) : 0,
      matchType: isSet(object.matchType) ? matchTypeFromJSON(object.matchType) : 0,
    };
  },

  toJSON(message: Change_UpdateConfig): unknown {
    const obj: any = {};
    message.division !== undefined && (obj.division = divisionToJSON(message.division));
    message.firstKickoffTeam !== undefined && (obj.firstKickoffTeam = teamToJSON(message.firstKickoffTeam));
    message.matchType !== undefined && (obj.matchType = matchTypeToJSON(message.matchType));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Change_UpdateConfig>, I>>(object: I): Change_UpdateConfig {
    const message = createBaseChange_UpdateConfig();
    message.division = object.division ?? 0;
    message.firstKickoffTeam = object.firstKickoffTeam ?? 0;
    message.matchType = object.matchType ?? 0;
    return message;
  },
};

function createBaseChange_UpdateTeamState(): Change_UpdateTeamState {
  return {
    forTeam: 0,
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
  encode(message: Change_UpdateTeamState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.forTeam !== 0) {
      writer.uint32(8).int32(message.forTeam);
    }
    if (message.teamName !== "") {
      writer.uint32(18).string(message.teamName);
    }
    if (message.goals !== 0) {
      writer.uint32(24).int32(message.goals);
    }
    if (message.goalkeeper !== 0) {
      writer.uint32(32).int32(message.goalkeeper);
    }
    if (message.timeoutsLeft !== 0) {
      writer.uint32(40).int32(message.timeoutsLeft);
    }
    if (message.timeoutTimeLeft !== "") {
      writer.uint32(50).string(message.timeoutTimeLeft);
    }
    if (message.onPositiveHalf === true) {
      writer.uint32(56).bool(message.onPositiveHalf);
    }
    if (message.ballPlacementFailures !== 0) {
      writer.uint32(64).int32(message.ballPlacementFailures);
    }
    if (message.canPlaceBall === true) {
      writer.uint32(72).bool(message.canPlaceBall);
    }
    if (message.challengeFlagsLeft !== 0) {
      writer.uint32(168).int32(message.challengeFlagsLeft);
    }
    if (message.requestsBotSubstitution === true) {
      writer.uint32(80).bool(message.requestsBotSubstitution);
    }
    if (message.requestsTimeout === true) {
      writer.uint32(136).bool(message.requestsTimeout);
    }
    if (message.requestsChallenge === true) {
      writer.uint32(144).bool(message.requestsChallenge);
    }
    if (message.requestsEmergencyStop === true) {
      writer.uint32(152).bool(message.requestsEmergencyStop);
    }
    if (message.yellowCard !== undefined) {
      YellowCard.encode(message.yellowCard, writer.uint32(162).fork()).ldelim();
    }
    if (message.redCard !== undefined) {
      RedCard.encode(message.redCard, writer.uint32(98).fork()).ldelim();
    }
    if (message.foul !== undefined) {
      Foul.encode(message.foul, writer.uint32(106).fork()).ldelim();
    }
    if (message.removeYellowCard !== 0) {
      writer.uint32(112).uint32(message.removeYellowCard);
    }
    if (message.removeRedCard !== 0) {
      writer.uint32(120).uint32(message.removeRedCard);
    }
    if (message.removeFoul !== 0) {
      writer.uint32(128).uint32(message.removeFoul);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Change_UpdateTeamState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChange_UpdateTeamState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.forTeam = reader.int32() as any;
          break;
        case 2:
          message.teamName = reader.string();
          break;
        case 3:
          message.goals = reader.int32();
          break;
        case 4:
          message.goalkeeper = reader.int32();
          break;
        case 5:
          message.timeoutsLeft = reader.int32();
          break;
        case 6:
          message.timeoutTimeLeft = reader.string();
          break;
        case 7:
          message.onPositiveHalf = reader.bool();
          break;
        case 8:
          message.ballPlacementFailures = reader.int32();
          break;
        case 9:
          message.canPlaceBall = reader.bool();
          break;
        case 21:
          message.challengeFlagsLeft = reader.int32();
          break;
        case 10:
          message.requestsBotSubstitution = reader.bool();
          break;
        case 17:
          message.requestsTimeout = reader.bool();
          break;
        case 18:
          message.requestsChallenge = reader.bool();
          break;
        case 19:
          message.requestsEmergencyStop = reader.bool();
          break;
        case 20:
          message.yellowCard = YellowCard.decode(reader, reader.uint32());
          break;
        case 12:
          message.redCard = RedCard.decode(reader, reader.uint32());
          break;
        case 13:
          message.foul = Foul.decode(reader, reader.uint32());
          break;
        case 14:
          message.removeYellowCard = reader.uint32();
          break;
        case 15:
          message.removeRedCard = reader.uint32();
          break;
        case 16:
          message.removeFoul = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Change_UpdateTeamState {
    return {
      forTeam: isSet(object.forTeam) ? teamFromJSON(object.forTeam) : 0,
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

  fromPartial<I extends Exact<DeepPartial<Change_UpdateTeamState>, I>>(object: I): Change_UpdateTeamState {
    const message = createBaseChange_UpdateTeamState();
    message.forTeam = object.forTeam ?? 0;
    message.teamName = object.teamName ?? "";
    message.goals = object.goals ?? 0;
    message.goalkeeper = object.goalkeeper ?? 0;
    message.timeoutsLeft = object.timeoutsLeft ?? 0;
    message.timeoutTimeLeft = object.timeoutTimeLeft ?? "";
    message.onPositiveHalf = object.onPositiveHalf ?? false;
    message.ballPlacementFailures = object.ballPlacementFailures ?? 0;
    message.canPlaceBall = object.canPlaceBall ?? false;
    message.challengeFlagsLeft = object.challengeFlagsLeft ?? 0;
    message.requestsBotSubstitution = object.requestsBotSubstitution ?? false;
    message.requestsTimeout = object.requestsTimeout ?? false;
    message.requestsChallenge = object.requestsChallenge ?? false;
    message.requestsEmergencyStop = object.requestsEmergencyStop ?? false;
    message.yellowCard = (object.yellowCard !== undefined && object.yellowCard !== null)
      ? YellowCard.fromPartial(object.yellowCard)
      : undefined;
    message.redCard = (object.redCard !== undefined && object.redCard !== null)
      ? RedCard.fromPartial(object.redCard)
      : undefined;
    message.foul = (object.foul !== undefined && object.foul !== null) ? Foul.fromPartial(object.foul) : undefined;
    message.removeYellowCard = object.removeYellowCard ?? 0;
    message.removeRedCard = object.removeRedCard ?? 0;
    message.removeFoul = object.removeFoul ?? 0;
    return message;
  },
};

function createBaseChange_SwitchColors(): Change_SwitchColors {
  return {};
}

export const Change_SwitchColors = {
  encode(_: Change_SwitchColors, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Change_SwitchColors {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChange_SwitchColors();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): Change_SwitchColors {
    return {};
  },

  toJSON(_: Change_SwitchColors): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Change_SwitchColors>, I>>(_: I): Change_SwitchColors {
    const message = createBaseChange_SwitchColors();
    return message;
  },
};

function createBaseChange_Revert(): Change_Revert {
  return { changeId: 0 };
}

export const Change_Revert = {
  encode(message: Change_Revert, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.changeId !== 0) {
      writer.uint32(8).int32(message.changeId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Change_Revert {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChange_Revert();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.changeId = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Change_Revert {
    return { changeId: isSet(object.changeId) ? Number(object.changeId) : 0 };
  },

  toJSON(message: Change_Revert): unknown {
    const obj: any = {};
    message.changeId !== undefined && (obj.changeId = Math.round(message.changeId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Change_Revert>, I>>(object: I): Change_Revert {
    const message = createBaseChange_Revert();
    message.changeId = object.changeId ?? 0;
    return message;
  },
};

function createBaseChange_NewGameState(): Change_NewGameState {
  return { gameState: undefined };
}

export const Change_NewGameState = {
  encode(message: Change_NewGameState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.gameState !== undefined) {
      GameState.encode(message.gameState, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Change_NewGameState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChange_NewGameState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.gameState = GameState.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Change_NewGameState {
    return { gameState: isSet(object.gameState) ? GameState.fromJSON(object.gameState) : undefined };
  },

  toJSON(message: Change_NewGameState): unknown {
    const obj: any = {};
    message.gameState !== undefined &&
      (obj.gameState = message.gameState ? GameState.toJSON(message.gameState) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Change_NewGameState>, I>>(object: I): Change_NewGameState {
    const message = createBaseChange_NewGameState();
    message.gameState = (object.gameState !== undefined && object.gameState !== null)
      ? GameState.fromPartial(object.gameState)
      : undefined;
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

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

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
