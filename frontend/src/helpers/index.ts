import {Referee_Stage} from "@/proto/ssl_gc_referee_message";
import {Command_Type} from "@/proto/ssl_gc_state";

export const stageNames = new Map<Referee_Stage, string>([
  [Referee_Stage.NORMAL_FIRST_HALF_PRE, 'Pre-First Half'],
  [Referee_Stage.NORMAL_FIRST_HALF, 'First Half'],
  [Referee_Stage.NORMAL_HALF_TIME, 'Half Time'],
  [Referee_Stage.NORMAL_SECOND_HALF_PRE, 'Pre-Second Half'],
  [Referee_Stage.NORMAL_SECOND_HALF, 'Second Half'],
  [Referee_Stage.EXTRA_TIME_BREAK, 'Overtime Break'],
  [Referee_Stage.EXTRA_FIRST_HALF_PRE, 'Pre-Overtime First Half'],
  [Referee_Stage.EXTRA_FIRST_HALF, 'Overtime First Half'],
  [Referee_Stage.EXTRA_HALF_TIME, 'Overtime Half Time'],
  [Referee_Stage.EXTRA_SECOND_HALF_PRE, 'Pre-Overtime Second Half'],
  [Referee_Stage.EXTRA_SECOND_HALF, 'Overtime Second Half'],
  [Referee_Stage.PENALTY_SHOOTOUT_BREAK, 'Shootout Break'],
  [Referee_Stage.PENALTY_SHOOTOUT, 'Shootout'],
  [Referee_Stage.POST_GAME, 'End of Game'],
]);

export const commandNames = new Map<Command_Type, string>([
  [Command_Type.HALT, 'Halt'],
  [Command_Type.STOP, 'Stop'],
  [Command_Type.NORMAL_START, 'Normal Start'],
  [Command_Type.FORCE_START, 'Force Start'],
  [Command_Type.DIRECT, 'Free kick'],
  [Command_Type.KICKOFF, 'Kick-off'],
  [Command_Type.PENALTY, 'Penalty kick'],
  [Command_Type.TIMEOUT, 'Timeout'],
  [Command_Type.BALL_PLACEMENT, 'Ball Placement'],
])

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
