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
  return event[event.$case] as { [key: string]: any }
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

export const getNextStage = function (stage: Referee_Stage): Referee_Stage {
  switch (stage) {
    case Referee_Stage.NORMAL_FIRST_HALF_PRE:
      return Referee_Stage.NORMAL_FIRST_HALF
    case Referee_Stage.NORMAL_FIRST_HALF:
      return Referee_Stage.NORMAL_HALF_TIME
    case Referee_Stage.NORMAL_HALF_TIME:
      return Referee_Stage.NORMAL_SECOND_HALF_PRE
    case Referee_Stage.NORMAL_SECOND_HALF_PRE:
      return Referee_Stage.NORMAL_SECOND_HALF
    case Referee_Stage.NORMAL_SECOND_HALF:
      return Referee_Stage.EXTRA_TIME_BREAK
    case Referee_Stage.EXTRA_TIME_BREAK:
      return Referee_Stage.EXTRA_FIRST_HALF_PRE
    case Referee_Stage.EXTRA_FIRST_HALF_PRE:
      return Referee_Stage.EXTRA_FIRST_HALF
    case Referee_Stage.EXTRA_FIRST_HALF:
      return Referee_Stage.EXTRA_HALF_TIME
    case Referee_Stage.EXTRA_HALF_TIME:
      return Referee_Stage.EXTRA_SECOND_HALF_PRE
    case Referee_Stage.EXTRA_SECOND_HALF_PRE:
      return Referee_Stage.EXTRA_SECOND_HALF
    case Referee_Stage.EXTRA_SECOND_HALF:
      return Referee_Stage.PENALTY_SHOOTOUT_BREAK
    case Referee_Stage.PENALTY_SHOOTOUT_BREAK:
      return Referee_Stage.PENALTY_SHOOTOUT
    case Referee_Stage.PENALTY_SHOOTOUT:
      return Referee_Stage.POST_GAME
    case Referee_Stage.POST_GAME:
    case Referee_Stage.UNRECOGNIZED:
    default:
      return Referee_Stage.POST_GAME
  }
}

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
