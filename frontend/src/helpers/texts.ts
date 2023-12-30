import {MatchType, Referee_Stage} from "@/proto/ssl_gc_referee_message";
import {Command_Type, GameState_Type} from "@/proto/ssl_gc_state";
import {GameEvent_Type} from "@/proto/ssl_gc_game_event";

export function stageName(stage: Referee_Stage): string {
  switch (stage) {
    case Referee_Stage.NORMAL_FIRST_HALF_PRE:
      return 'Pre-First Half'
    case Referee_Stage.NORMAL_FIRST_HALF:
      return 'First Half'
    case Referee_Stage.NORMAL_HALF_TIME:
      return 'Half Time'
    case Referee_Stage.NORMAL_SECOND_HALF_PRE:
      return 'Pre-Second Half'
    case Referee_Stage.NORMAL_SECOND_HALF:
      return 'Second Half'
    case Referee_Stage.EXTRA_TIME_BREAK:
      return 'Overtime Break'
    case Referee_Stage.EXTRA_FIRST_HALF_PRE:
      return 'Pre-Overtime First Half'
    case Referee_Stage.EXTRA_FIRST_HALF:
      return 'Overtime First Half'
    case Referee_Stage.EXTRA_HALF_TIME:
      return 'Overtime Half Time'
    case Referee_Stage.EXTRA_SECOND_HALF_PRE:
      return 'Pre-Overtime Second Half'
    case Referee_Stage.EXTRA_SECOND_HALF:
      return 'Overtime Second Half'
    case Referee_Stage.PENALTY_SHOOTOUT_BREAK:
      return 'Shootout Break'
    case Referee_Stage.PENALTY_SHOOTOUT:
      return 'Shootout'
    case Referee_Stage.POST_GAME:
      return 'End of Game'
    case Referee_Stage.UNRECOGNIZED:
      return 'Unknown'
  }
}

export function commandName(type: Command_Type): string {
  switch (type) {
    case Command_Type.HALT:
      return 'Halt'
    case Command_Type.STOP:
      return 'Stop'
    case Command_Type.NORMAL_START:
      return 'Normal Start'
    case Command_Type.FORCE_START:
      return 'Force Start'
    case Command_Type.DIRECT:
      return 'Free Kick'
    case Command_Type.KICKOFF:
      return 'Kick-Off'
    case Command_Type.PENALTY:
      return 'Penalty'
    case Command_Type.TIMEOUT:
      return 'Timeout'
    case Command_Type.BALL_PLACEMENT:
      return 'Ball Placement'
    case Command_Type.UNRECOGNIZED:
    case Command_Type.UNKNOWN:
      return 'Unknown'
  }
}

export function gameStateName(type: GameState_Type): string {
  switch (type) {
    case GameState_Type.HALT:
      return "Halt"
    case GameState_Type.STOP:
      return "Stop"
    case GameState_Type.RUNNING:
      return "Running"
    case GameState_Type.FREE_KICK:
      return "Free Kick"
    case GameState_Type.KICKOFF:
      return "Kick-Off"
    case GameState_Type.PENALTY:
      return "Penalty"
    case GameState_Type.TIMEOUT:
      return "Timeout"
    case GameState_Type.BALL_PLACEMENT:
      return "Ball Placement"
    case GameState_Type.UNKNOWN:
    case GameState_Type.UNRECOGNIZED:
      return "Unknown"
  }
}

export const gameEventNames = new Map<GameEvent_Type, string>([
  [GameEvent_Type.BALL_LEFT_FIELD_TOUCH_LINE, "Ball left field via touch line"],
  [GameEvent_Type.BALL_LEFT_FIELD_GOAL_LINE, "Ball left field via goal line"],
  [GameEvent_Type.AIMLESS_KICK, "Ball kicked aimlessly"],
  [GameEvent_Type.ATTACKER_TOO_CLOSE_TO_DEFENSE_AREA, "Attacker too close to defense area"],
  [GameEvent_Type.DEFENDER_IN_DEFENSE_AREA, "Defender inside own defense area"],
  [GameEvent_Type.BOUNDARY_CROSSING, "Ball chipped over field boundaries"],
  [GameEvent_Type.KEEPER_HELD_BALL, "Ball held deliberately by keeper"],
  [GameEvent_Type.BOT_DRIBBLED_BALL_TOO_FAR, "Ball dribbled too far"],
  [GameEvent_Type.BOT_PUSHED_BOT, "Bot pushed opponent bot"],
  [GameEvent_Type.BOT_HELD_BALL_DELIBERATELY, "Ball held deliberately by bot"],
  [GameEvent_Type.BOT_TIPPED_OVER, "Bot tipped over"],
  [GameEvent_Type.BOT_DROPPED_PARTS, "Bot dropped parts"],
  [GameEvent_Type.ATTACKER_TOUCHED_BALL_IN_DEFENSE_AREA, "Attacker touched ball inside opponent defense area"],
  [GameEvent_Type.BOT_KICKED_BALL_TOO_FAST, "Ball kicked too fast"],
  [GameEvent_Type.BOT_CRASH_UNIQUE, "Bot crashed into opponent bot"],
  [GameEvent_Type.BOT_CRASH_DRAWN, "Bots crashed into each other"],
  [GameEvent_Type.DEFENDER_TOO_CLOSE_TO_KICK_POINT, "Defender too close to kick point"],
  [GameEvent_Type.BOT_TOO_FAST_IN_STOP, "Bot too fast in stop"],
  [GameEvent_Type.BOT_INTERFERED_PLACEMENT, "Bot interfered ball placement"],
  [GameEvent_Type.POSSIBLE_GOAL, "Goal might been scored"],
  [GameEvent_Type.GOAL, "Goal scored"],
  [GameEvent_Type.INVALID_GOAL, "Goal invalid"],
  [GameEvent_Type.ATTACKER_DOUBLE_TOUCHED_BALL, "Ball touched twice by attacker"],
  [GameEvent_Type.PLACEMENT_SUCCEEDED, "Ball placement succeeded"],
  [GameEvent_Type.PENALTY_KICK_FAILED, "Penalty kick failed"],
  [GameEvent_Type.NO_PROGRESS_IN_GAME, "No progress in game"],
  [GameEvent_Type.PLACEMENT_FAILED, "Ball placement failed"],
  [GameEvent_Type.MULTIPLE_CARDS, "Multiple cards"],
  [GameEvent_Type.MULTIPLE_FOULS, "Multiple fouls"],
  [GameEvent_Type.BOT_SUBSTITUTION, "Bot substitution"],
  [GameEvent_Type.TOO_MANY_ROBOTS, "Too many bots on field"],
  [GameEvent_Type.CHALLENGE_FLAG, "Challenge flag"],
  [GameEvent_Type.CHALLENGE_FLAG_HANDLED, "Challenge flag handled"],
  [GameEvent_Type.EMERGENCY_STOP, "Emergency stop"],
  [GameEvent_Type.UNSPORTING_BEHAVIOR_MINOR, "Unsporting behavior (minor)"],
  [GameEvent_Type.UNSPORTING_BEHAVIOR_MAJOR, "Unsporting behavior (major)"],
])

export function matchTypeName(matchType: MatchType): string {
  switch (matchType) {
    case MatchType.UNKNOWN_MATCH:
    case MatchType.UNRECOGNIZED:
      return "Unknown"
    case MatchType.GROUP_PHASE:
      return "Group Phase"
    case MatchType.ELIMINATION_PHASE:
      return "Elimination Phase"
    case MatchType.FRIENDLY:
      return "Friendly"
  }
}
