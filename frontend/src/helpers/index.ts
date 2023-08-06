import {Referee_Stage} from "@/proto/ssl_gc_referee_message";
import {Team} from "@/proto/ssl_gc_common";
import type {GameEvent} from "@/proto/ssl_gc_game_event";

export const teams = [Team.YELLOW, Team.BLUE]

export const opponent = (team: Team) => {
  switch (team) {
    case Team.BLUE:
      return Team.YELLOW
    case Team.YELLOW:
      return Team.BLUE
    default:
      return team
  }
}

export const teamOptions = [
  {label: 'Yellow', value: Team.YELLOW},
  {label: 'Blue', value: Team.BLUE}
]

export function gameEventForTeam(gameEvent: GameEvent): Team {
  const details = gameEventDetails(gameEvent)
  if (Object.prototype.hasOwnProperty.call(details, "byTeam")) {
    return details["byTeam"] as Team
  }
  return Team.UNKNOWN
}

export function gameEventDetails(gameEvent: GameEvent) {
  const event = gameEvent.event! as { [key: string]: any }
  const generalDetails: { [key: string]: any } = {
    "id": gameEvent.id,
    "createdTimestamp": gameEvent.createdTimestamp,
    "origins": gameEvent.origin,
  }
  const details = event[event.$case] as { [key: string]: any }
  return {...generalDetails, ...details}
}

export const originIcon = (origin: string) => {
  switch (origin) {
    case "TIGERs AutoRef":
      return "img:/icons/tigers-autoref.png"
    case "ER-Force":
      return "img:/icons/erforce-autoref.svg"
    case "GC":
      return "developer_board"
    case "UI":
      return "person_outline"
    case "Engine":
      return "two_wheeler"
    case "StateMachine":
      return "fork_right"
    case "Majority":
      return "group_add"
    case "Remote Control YELLOW":
    case "Remote Control BLUE":
      return "settings_remote"
    default:
      return "help_outline"
  }
}

const stages: Referee_Stage[] = [
  Referee_Stage.NORMAL_FIRST_HALF_PRE,
  Referee_Stage.NORMAL_FIRST_HALF,
  Referee_Stage.NORMAL_HALF_TIME,
  Referee_Stage.NORMAL_SECOND_HALF_PRE,
  Referee_Stage.NORMAL_SECOND_HALF,
  Referee_Stage.EXTRA_TIME_BREAK,
  Referee_Stage.EXTRA_FIRST_HALF_PRE,
  Referee_Stage.EXTRA_FIRST_HALF,
  Referee_Stage.EXTRA_HALF_TIME,
  Referee_Stage.EXTRA_SECOND_HALF_PRE,
  Referee_Stage.EXTRA_SECOND_HALF,
  Referee_Stage.PENALTY_SHOOTOUT_BREAK,
  Referee_Stage.PENALTY_SHOOTOUT,
  Referee_Stage.POST_GAME,
]

export const isPausedStage = function (stage: Referee_Stage): boolean {
  return stage.toString() === Referee_Stage[Referee_Stage.NORMAL_HALF_TIME]
    || stage.toString() === Referee_Stage[Referee_Stage.EXTRA_TIME_BREAK]
    || stage.toString() === Referee_Stage[Referee_Stage.EXTRA_HALF_TIME]
    || stage.toString() === Referee_Stage[Referee_Stage.PENALTY_SHOOTOUT_BREAK]
    || stage.toString() === Referee_Stage[Referee_Stage.POST_GAME]
}

export const isRunningStage = function (stage: Referee_Stage): boolean {
  return stage.toString() === Referee_Stage[Referee_Stage.NORMAL_FIRST_HALF]
    || stage.toString() === Referee_Stage[Referee_Stage.NORMAL_SECOND_HALF]
    || stage.toString() === Referee_Stage[Referee_Stage.EXTRA_FIRST_HALF]
    || stage.toString() === Referee_Stage[Referee_Stage.EXTRA_SECOND_HALF]
    || stage.toString() === Referee_Stage[Referee_Stage.PENALTY_SHOOTOUT]
};

export const isPreStage = function (stage: Referee_Stage): boolean {
  return stage.toString() === Referee_Stage[Referee_Stage.NORMAL_FIRST_HALF_PRE]
    || stage.toString() === Referee_Stage[Referee_Stage.NORMAL_SECOND_HALF_PRE]
    || stage.toString() === Referee_Stage[Referee_Stage.EXTRA_FIRST_HALF_PRE]
    || stage.toString() === Referee_Stage[Referee_Stage.EXTRA_SECOND_HALF_PRE]
};

export const getRemainingStages = function (fromStage: Referee_Stage): Referee_Stage[] {
  const idx = stages.indexOf(fromStage)
  return stages.slice(idx)
}
