import {commandName, gameEventNames, gameStateName, stageName} from "@/helpers/texts";
import {gameEventForTeam} from "@/helpers/index";
import formatDuration from "format-duration";
import type {Change, Change_UpdateConfig, Change_UpdateTeamState} from "@/proto/ssl_gc_change";
import type {GameEvent} from "@/proto/ssl_gc_game_event";
import type {Team} from "@/proto/ssl_gc_common";

interface ChangeDetails {
  typeName: string,
  title: string,
  gameEvent?: GameEvent,
  forTeam?: Team,
  icon: string,
}

export function changeDetails(change: Change): ChangeDetails {
  const changeDetails = change.change!;
  if (changeDetails.$case === "newCommandChange") {
    return {
      typeName: "Command",
      title: commandName(changeDetails.newCommandChange.command?.type!),
      forTeam: changeDetails.newCommandChange.command?.forTeam,
      icon: "terminal",
    }
  } else if (changeDetails.$case === "changeStageChange") {
    return {
      typeName: "Stage",
      title: stageName(changeDetails.changeStageChange.newStage!),
      icon: "gavel",
    }
  } else if (changeDetails.$case === "setBallPlacementPosChange") {
    return {
      typeName: "Ball Placement Pos",
      title: "Position: " + JSON.stringify(changeDetails.setBallPlacementPosChange.pos!),
      icon: "sports_soccer",
    }
  } else if (changeDetails.$case === "addYellowCardChange") {
    const details = changeDetails.addYellowCardChange;
    const cause = details.causedByGameEvent
    return {
      typeName: "Yellow Card",
      title: cause ? "Yellow card for " + gameEventNames.get(cause.type!)! : "Yellow card",
      forTeam: details.forTeam,
      icon: "sim_card",
    }
  } else if (changeDetails.$case === "addRedCardChange") {
    const details = changeDetails.addRedCardChange;
    const gameEvent = details.causedByGameEvent
    return {
      typeName: "Red Card",
      title: gameEvent ? "Red card for " + gameEventNames.get(gameEvent.type!)! : "Red card",
      forTeam: details.forTeam,
      gameEvent,
      icon: "sim_card",
    }
  } else if (changeDetails.$case === "yellowCardOverChange") {
    const details = changeDetails.yellowCardOverChange
    return {
      typeName: "Yellow Card Over",
      title: "Yellow Card Over",
      forTeam: details.forTeam,
      icon: "alarm",
    }
  } else if (changeDetails.$case === "addGameEventChange") {
    const details = changeDetails.addGameEventChange;
    const gameEvent = details.gameEvent!;
    return {
      typeName: "Game Event",
      title: gameEventNames.get(gameEvent.type!)!,
      forTeam: gameEventForTeam(gameEvent),
      icon: "warning",
      gameEvent,
    }
  } else if (changeDetails.$case === "addPassiveGameEventChange") {
    const details = changeDetails.addPassiveGameEventChange;
    const gameEvent = details.gameEvent!;
    return {
      typeName: "Game Event (passive)",
      title: "Passive: " + gameEventNames.get(gameEvent.type!)!,
      forTeam: gameEventForTeam(gameEvent),
      icon: "recycling",
      gameEvent,
    }
  } else if (changeDetails.$case === "addProposalChange") {
    const details = changeDetails.addProposalChange;
    const gameEvent = details.proposal!.gameEvent!;
    return {
      typeName: "Game Event Proposal",
      title: "Propose: " + gameEventNames.get(gameEvent.type!)!,
      forTeam: gameEventForTeam(gameEvent),
      icon: "front_hand",
      gameEvent,
    }
  } else if (changeDetails.$case === "updateConfigChange") {
    return {
      typeName: "Config",
      title: configChangeTitle(changeDetails.updateConfigChange),
      icon: "edit",
    }
  } else if (changeDetails.$case === "updateTeamStateChange") {
    const details = changeDetails.updateTeamStateChange
    return {
      typeName: "Team State",
      title: teamStateChangeTitle(details),
      forTeam: details.forTeam,
      icon: "edit",
    }
  } else if (changeDetails.$case === "switchColorsChange") {
    return {
      typeName: "Switch Colors",
      title: "Switch Colors",
      icon: "edit",
    }
  } else if (changeDetails.$case === "revertChange") {
    return {
      typeName: "Revert",
      title: `Revert to ${changeDetails.revertChange.changeId}`,
      icon: "undo",
    }
  } else if (changeDetails.$case === "newGameStateChange") {
    const details = changeDetails.newGameStateChange;
    return {
      typeName: "Game State",
      title: gameStateName(details.gameState?.type!),
      forTeam: details.gameState?.forTeam,
      icon: "gavel",
    }
  } else if (changeDetails.$case === "acceptProposalGroupChange") {
    const details = changeDetails.acceptProposalGroupChange;
    return {
      typeName: "Proposals accepted",
      title: `Proposal accepted by ${details.acceptedBy}: '${details.groupId!}'`,
      icon: "check_circle_outline",
    }
  }
  return {
    typeName: "-",
    title: "-",
    icon: "help_outline",
  }
}

function configChangeTitle(config: Change_UpdateConfig): string {
  if (config.firstKickoffTeam) {
    return `First kick-off team: ${config.firstKickoffTeam}`
  } else if (config.matchType) {
    return `Match type: ${config.matchType}`
  } else if (config.division) {
    return `Division: ${config.division}`
  }
  return "Unknown config change"
}

function teamStateChangeTitle(change: Change_UpdateTeamState): string {
  if (change.teamName !== undefined) {
    return `Team name: ${change.teamName}`
  } else if (change.goals !== undefined) {
    return `Goals: ${change.goals}`
  } else if (change.goalkeeper !== undefined) {
    return `Keeper: ${change.goalkeeper}`
  } else if (change.timeoutsLeft !== undefined) {
    return `Timeouts left: ${change.timeoutsLeft}`
  } else if (change.timeoutTimeLeft !== undefined) {
    return `Timeout time left: ${change.timeoutTimeLeft}`
  } else if (change.onPositiveHalf !== undefined) {
    if (change.onPositiveHalf) {
      return "Goal is on positive half"
    }
    return "Goal is on negative half"
  } else if (change.ballPlacementFailures !== undefined) {
    return `Ball placement failures: ${change.ballPlacementFailures}`
  } else if (change.canPlaceBall !== undefined) {
    return `Can place ball: ${change.canPlaceBall}`
  } else if (change.challengeFlagsLeft !== undefined) {
    return `Challenge flags left: ${change.challengeFlagsLeft}`
  } else if (change.requestsBotSubstitution !== undefined) {
    if (change.requestsBotSubstitution) {
      return "Request bot substitution"
    }
    return "Revoke bot substitution request"
  } else if (change.requestsTimeout !== undefined) {
    if (change.requestsTimeout) {
      return "Request timeout"
    }
    return "Revoke timeout request"
  } else if (change.requestsChallenge !== undefined) {
    if (change.requestsChallenge) {
      return "Request challenge"
    }
    return "Revoke challenge request"
  } else if (change.requestsEmergencyStop !== undefined) {
    if (change.requestsEmergencyStop) {
      return "Request emergency stop"
    }
    return "Revoke emergency stop request"
  } else if (change.yellowCard !== undefined) {
    const timeRemaining = formatDuration(change.yellowCard.timeRemaining?.seconds! * 1000)
    return `Change yellow card ${change.yellowCard.id} (${timeRemaining} s left)`
  } else if (change.redCard !== undefined) {
    return `Change red card ${change.redCard.id}`
  } else if (change.foul !== undefined) {
    return `Change foul ${change.foul.id}`
  } else if (change.removeYellowCard !== undefined) {
    return `Remove yellow card ${change.removeYellowCard}`
  } else if (change.removeRedCard !== undefined) {
    return `Remove red card ${change.removeRedCard}`
  } else if (change.removeFoul !== undefined) {
    return `Remove foul ${change.removeFoul}`
  }
  return "Unknown team state change: " + JSON.stringify(change)
}
