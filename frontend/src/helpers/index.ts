import {Referee_Stage} from "@/proto/ssl_gc_referee_message";
import {Team} from "@/proto/ssl_gc_common";

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
