import {type MatchTypeJson, type Referee_StageJson} from "@/proto/state/ssl_gc_referee_message_pb";
import {type Command_TypeJson, type CommandJson, type GameState_TypeJson} from "@/proto/state/ssl_gc_state_pb";
import {type GameEvent_TypeJson} from "@/proto/state/ssl_gc_game_event_pb";
import {type ContinueAction_TypeJson} from "@/proto/engine/ssl_gc_engine_pb";

export function stageName(stage: Referee_StageJson): string {
  switch (stage) {
    case 'NORMAL_FIRST_HALF_PRE':
      return 'Pre-First Half'
    case 'NORMAL_FIRST_HALF':
      return 'First Half'
    case 'NORMAL_HALF_TIME':
      return 'Half Time'
    case 'NORMAL_SECOND_HALF_PRE':
      return 'Pre-Second Half'
    case 'NORMAL_SECOND_HALF':
      return 'Second Half'
    case 'EXTRA_TIME_BREAK':
      return 'Overtime Break'
    case 'EXTRA_FIRST_HALF_PRE':
      return 'Pre-Overtime First Half'
    case 'EXTRA_FIRST_HALF':
      return 'Overtime First Half'
    case 'EXTRA_HALF_TIME':
      return 'Overtime Half Time'
    case 'EXTRA_SECOND_HALF_PRE':
      return 'Pre-Overtime Second Half'
    case 'EXTRA_SECOND_HALF':
      return 'Overtime Second Half'
    case 'PENALTY_SHOOTOUT_BREAK':
      return 'Shootout Break'
    case 'PENALTY_SHOOTOUT':
      return 'Shootout'
    case 'POST_GAME':
      return 'End of Game'
  }
}

export function commandName(type: Command_TypeJson): string {
  switch (type) {
    case 'HALT':
      return 'Halt'
    case 'STOP':
      return 'Stop'
    case 'NORMAL_START':
      return 'Normal Start'
    case 'FORCE_START':
      return 'Force Start'
    case 'DIRECT':
      return 'Free Kick'
    case 'KICKOFF':
      return 'Kick-Off'
    case 'PENALTY':
      return 'Penalty'
    case 'TIMEOUT':
      return 'Timeout'
    case 'BALL_PLACEMENT':
      return 'Ball Placement'
    case 'UNKNOWN':
      return 'Unknown'
  }
}

export function gameStateName(type: GameState_TypeJson): string {
  switch (type) {
    case 'HALT':
      return "Halt"
    case 'STOP':
      return "Stop"
    case 'RUNNING':
      return "Running"
    case 'FREE_KICK':
      return "Free Kick"
    case 'KICKOFF':
      return "Kick-Off"
    case 'PENALTY':
      return "Penalty"
    case 'TIMEOUT':
      return "Timeout"
    case 'BALL_PLACEMENT':
      return "Ball Placement"
    case 'UNKNOWN':
      return "Unknown"
  }
}

export const gameEventNames = new Map<GameEvent_TypeJson, string>([
  ['BALL_LEFT_FIELD_TOUCH_LINE', "Ball left field via touch line"],
  ['BALL_LEFT_FIELD_GOAL_LINE', "Ball left field via goal line"],
  ['AIMLESS_KICK', "Ball kicked aimlessly"],
  ['ATTACKER_TOO_CLOSE_TO_DEFENSE_AREA', "Attacker too close to defense area"],
  ['DEFENDER_IN_DEFENSE_AREA', "Defender inside own defense area"],
  ['BOUNDARY_CROSSING', "Ball chipped over field boundaries"],
  ['KEEPER_HELD_BALL', "Ball held deliberately by keeper"],
  ['BOT_DRIBBLED_BALL_TOO_FAR', "Ball dribbled too far"],
  ['BOT_PUSHED_BOT', "Bot pushed opponent bot"],
  ['BOT_HELD_BALL_DELIBERATELY', "Ball held deliberately by bot"],
  ['BOT_TIPPED_OVER', "Bot tipped over"],
  ['BOT_DROPPED_PARTS', "Bot dropped parts"],
  ['ATTACKER_TOUCHED_BALL_IN_DEFENSE_AREA', "Attacker touched ball inside opponent defense area"],
  ['BOT_KICKED_BALL_TOO_FAST', "Ball kicked too fast"],
  ['BOT_CRASH_UNIQUE', "Bot crashed into opponent bot"],
  ['BOT_CRASH_DRAWN', "Bots crashed into each other"],
  ['DEFENDER_TOO_CLOSE_TO_KICK_POINT', "Defender too close to kick point"],
  ['BOT_TOO_FAST_IN_STOP', "Bot too fast in stop"],
  ['BOT_INTERFERED_PLACEMENT', "Bot interfered ball placement"],
  ['POSSIBLE_GOAL', "Goal might been scored"],
  ['GOAL', "Goal scored"],
  ['INVALID_GOAL', "Goal invalid"],
  ['ATTACKER_DOUBLE_TOUCHED_BALL', "Ball touched twice by attacker"],
  ['PLACEMENT_SUCCEEDED', "Ball placement succeeded"],
  ['PENALTY_KICK_FAILED', "Penalty kick failed"],
  ['NO_PROGRESS_IN_GAME', "No progress in game"],
  ['PLACEMENT_FAILED', "Ball placement failed"],
  ['MULTIPLE_CARDS', "Multiple cards"],
  ['MULTIPLE_FOULS', "Multiple fouls"],
  ['BOT_SUBSTITUTION', "Bot substitution"],
  ['EXCESSIVE_BOT_SUBSTITUTION', "Excessive bot substitution"],
  ['TOO_MANY_ROBOTS', "Too many bots on field"],
  ['CHALLENGE_FLAG', "Challenge flag"],
  ['CHALLENGE_FLAG_HANDLED', "Challenge flag handled"],
  ['EMERGENCY_STOP', "Emergency stop"],
  ['UNSPORTING_BEHAVIOR_MINOR', "Unsporting behavior (minor)"],
  ['UNSPORTING_BEHAVIOR_MAJOR', "Unsporting behavior (major)"],
])

export function gameEventName(type?: GameEvent_TypeJson): string {
  return gameEventNames.get(type!) ?? "Unknown"
}

export function matchTypeName(matchType: MatchTypeJson): string {
  switch (matchType) {
    case 'UNKNOWN_MATCH':
      return "Unknown"
    case 'GROUP_PHASE':
      return "Group Phase"
    case 'ELIMINATION_PHASE':
      return "Elimination Phase"
    case 'FRIENDLY':
      return "Friendly"
  }
}

export function continueActionLabel(type: ContinueAction_TypeJson, nextCommand?: CommandJson): string {
  switch (type) {
    case 'HALT':
      return 'Halt'
    case 'RESUME_FROM_HALT':
      return 'Resume (Halt -> Stop)'
    case 'STOP_GAME':
      return 'Stop'
    case 'FORCE_START':
      return 'Force Start (no next command)'
    case 'FREE_KICK':
      return 'Free Kick (no next command)'
    case 'NEXT_COMMAND':
      return commandName(nextCommand?.type || 'UNKNOWN')
    case 'BALL_PLACEMENT_START':
      return 'Start Ball Placement'
    case 'BALL_PLACEMENT_CANCEL':
      return 'Cancel Ball Placement'
    case 'BALL_PLACEMENT_COMPLETE':
      return 'Complete Ball Placement'
    case 'BALL_PLACEMENT_FAIL':
      return 'Fail Ball Placement'
    case 'TIMEOUT_START':
      return 'Start Timeout'
    case 'TIMEOUT_STOP':
      return 'Stop Timeout'
    case 'BOT_SUBSTITUTION':
      return 'Start Bot Substitution'
    case 'NEXT_STAGE':
      return 'Next Stage'
    case 'END_GAME':
      return 'End match'
    case 'ACCEPT_GOAL':
      return 'Accept Goal'
    case 'REJECT_GOAL':
      return 'Reject Goal'
    case 'NORMAL_START':
      return 'Normal Start'
    case 'CHALLENGE_ACCEPT':
      return 'Accept Challenge'
    case 'CHALLENGE_REJECT':
      return 'Reject Challenge'
    case 'TYPE_UNKNOWN':
      return 'Unknown'
  }
}
