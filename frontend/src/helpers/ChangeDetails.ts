import {commandName, gameEventName, gameStateName, stageName} from "@/helpers/texts";
import {formatDurationJson, gameEventForTeam} from "@/helpers/index";
import {
  type Change_UpdateConfigJson,
  type Change_UpdateTeamStateJson,
  type ChangeJson
} from "@/proto/statemachine/ssl_gc_change_pb";
import type {GameEventJson} from "@/proto/state/ssl_gc_game_event_pb";
import {type TeamJson} from "@/proto/state/ssl_gc_common_pb";

export interface ChangeDetails {
  typeName: string,
  title: string,
  gameEvent?: GameEventJson,
  forTeam?: TeamJson,
  icon: string,
}

export function changeDetails(change: ChangeJson): ChangeDetails {
  if (change.newCommandChange) {
    return {
      typeName: "Command",
      title: commandName(change.newCommandChange.command?.type!),
      forTeam: change.newCommandChange.command?.forTeam,
      icon: "terminal",
    }
  } else if (change.changeStageChange) {
    return {
      typeName: "Stage",
      title: stageName(change.changeStageChange.newStage!),
      icon: "gavel",
    }
  } else if (change.setBallPlacementPosChange) {
    return {
      typeName: "Ball Placement Pos",
      title: "Position: " + JSON.stringify(change.setBallPlacementPosChange.pos!),
      icon: "sports_soccer",
    }
  } else if (change.addYellowCardChange) {
    const details = change.addYellowCardChange;
    const cause = details.causedByGameEvent
    return {
      typeName: "Yellow Card",
      title: cause ? "Yellow card for " + gameEventName(cause.type) : "Yellow card",
      forTeam: details.forTeam,
      icon: "sim_card",
    }
  } else if (change.addRedCardChange) {
    const details = change.addRedCardChange;
    const gameEvent = details.causedByGameEvent
    return {
      typeName: "Red Card",
      title: gameEvent ? "Red card for " + gameEventName(gameEvent.type) : "Red card",
      forTeam: details.forTeam,
      gameEvent,
      icon: "sim_card",
    }
  } else if (change.yellowCardOverChange) {
    const details = change.yellowCardOverChange
    return {
      typeName: "Yellow Card Over",
      title: "Yellow Card Over",
      forTeam: details.forTeam,
      icon: "alarm",
    }
  } else if (change.addGameEventChange) {
    const details = change.addGameEventChange;
    const gameEvent = details.gameEvent!;
    return {
      typeName: "Game Event",
      title: gameEventName(gameEvent.type),
      forTeam: gameEventForTeam(gameEvent),
      icon: "warning",
      gameEvent,
    }
  } else if (change.addPassiveGameEventChange) {
    const details = change.addPassiveGameEventChange;
    const gameEvent = details.gameEvent!;
    return {
      typeName: "Game Event (passive)",
      title: "Passive: " + gameEventName(gameEvent.type),
      forTeam: gameEventForTeam(gameEvent),
      icon: "recycling",
      gameEvent,
    }
  } else if (change.addProposalChange) {
    const details = change.addProposalChange;
    const gameEvent = details.proposal!.gameEvent!;
    return {
      typeName: "Game Event Proposal",
      title: "Propose: " + gameEventName(gameEvent.type),
      forTeam: gameEventForTeam(gameEvent),
      icon: "front_hand",
      gameEvent,
    }
  } else if (change.updateConfigChange) {
    return {
      typeName: "Config",
      title: configChangeTitle(change.updateConfigChange),
      icon: "edit",
    }
  } else if (change.updateTeamStateChange) {
    const details = change.updateTeamStateChange
    return {
      typeName: "Team State",
      title: teamStateChangeTitle(details),
      forTeam: details.forTeam,
      icon: "edit",
    }
  } else if (change.switchColorsChange) {
    return {
      typeName: "Switch Colors",
      title: "Switch Colors",
      icon: "edit",
    }
  } else if (change.revertChange) {
    return {
      typeName: "Revert",
      title: `Revert to ${change.revertChange.changeId}`,
      icon: "undo",
    }
  } else if (change.newGameStateChange) {
    const details = change.newGameStateChange;
    return {
      typeName: "Game State",
      title: gameStateName(details.gameState?.type!),
      forTeam: details.gameState?.forTeam,
      icon: "gavel",
    }
  } else if (change.acceptProposalGroupChange) {
    const details = change.acceptProposalGroupChange;
    return {
      typeName: "Proposals accepted",
      title: `Proposal accepted by ${details.acceptedBy}: '${details.groupId}'`,
      icon: "check_circle_outline",
    }
  } else if (change.setStatusMessageChange) {
    const details = change.setStatusMessageChange;
    let title
    if (details.statusMessage) {
      title = `Status Message: ${details.statusMessage}`
    } else {
      title = 'Status Message cleared'
    }
    return {
      typeName: "Status Message",
      title: title,
      icon: "message",
    }
  } else {
    return {
      typeName: "-",
      title: "-",
      icon: "help_outline",
    }
  }
}

function configChangeTitle(config: Change_UpdateConfigJson): string {
  if (config.firstKickoffTeam !== undefined && config.firstKickoffTeam !== 'UNKNOWN') {
    return `First kick-off team: ${config.firstKickoffTeam}`
  } else if (config.division !== undefined && config.division !== 'DIV_UNKNOWN') {
    return `Division: ${config.division}`
  } else if (config.maxRobotsPerTeam !== undefined) {
    return `Max Robots: ${config.maxRobotsPerTeam}`
  } else if (config.matchType !== undefined) {
    return `Match type: ${config.matchType}`
  }
  return "Unknown config change"
}

function teamStateChangeTitle(change: Change_UpdateTeamStateJson): string {
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
    const timeRemaining = formatDurationJson(change.yellowCard.timeRemaining!)
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
  } else if (change.botSubstitutionsLeft !== undefined) {
    return `Bot substitutions left: ${change.botSubstitutionsLeft}`
  } else if (change.hullColor !== undefined) {
    return `Change hull color: ${change.hullColor}`
  }
  return "Unknown team state change: " + JSON.stringify(change)
}
