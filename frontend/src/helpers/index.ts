import {Referee} from "@/proto/ssl_gc_referee_message";
import Stage = Referee.Stage;

export const stageNames = new Map<Stage, string>([
  [Stage.NORMAL_FIRST_HALF_PRE, 'Pre-First Half'],
  [Stage.NORMAL_FIRST_HALF, 'First Half'],
  [Stage.NORMAL_HALF_TIME, 'Half Time'],
  [Stage.NORMAL_SECOND_HALF_PRE, 'Pre-Second Half'],
  [Stage.NORMAL_SECOND_HALF, 'Second Half'],
  [Stage.EXTRA_TIME_BREAK, 'Overtime Break'],
  [Stage.EXTRA_FIRST_HALF_PRE, 'Pre-Overtime First Half'],
  [Stage.EXTRA_FIRST_HALF, 'Overtime First Half'],
  [Stage.EXTRA_HALF_TIME, 'Overtime Half Time'],
  [Stage.EXTRA_SECOND_HALF_PRE, 'Pre-Overtime Second Half'],
  [Stage.EXTRA_SECOND_HALF, 'Overtime Second Half'],
  [Stage.PENALTY_SHOOTOUT_BREAK, 'Shootout Break'],
  [Stage.PENALTY_SHOOTOUT, 'Shootout'],
  [Stage.POST_GAME, 'End of Game'],
]);

export const getNextStage = function (stage: Stage): Stage {
  if (stage < Stage.POST_GAME) {
    return stage + 1
  }
  return stage
};

export const isPausedStage = function (stage: Stage): boolean {
  return stage.toString() === Stage[Stage.NORMAL_HALF_TIME]
    || stage.toString() === Stage[Stage.EXTRA_TIME_BREAK]
    || stage.toString() === Stage[Stage.EXTRA_HALF_TIME]
    || stage.toString() === Stage[Stage.PENALTY_SHOOTOUT_BREAK]
    || stage.toString() === Stage[Stage.POST_GAME]
}

export const isRunningStage = function (stage: Stage): boolean {
  return stage.toString() === Stage[Stage.NORMAL_FIRST_HALF]
    || stage.toString() === Stage[Stage.NORMAL_SECOND_HALF]
    || stage.toString() === Stage[Stage.EXTRA_FIRST_HALF]
    || stage.toString() === Stage[Stage.EXTRA_SECOND_HALF]
    || stage.toString() === Stage[Stage.PENALTY_SHOOTOUT]
};

export const isPreStage = function (stage: Stage): boolean {
  return stage.toString() === Stage[Stage.NORMAL_FIRST_HALF_PRE]
    || stage.toString() === Stage[Stage.NORMAL_SECOND_HALF_PRE]
    || stage.toString() === Stage[Stage.EXTRA_FIRST_HALF_PRE]
    || stage.toString() === Stage[Stage.EXTRA_SECOND_HALF_PRE]
};
