import {type Referee_StageJson} from "@/proto/state/ssl_gc_referee_message_pb";
import {type TeamJson} from "@/proto/state/ssl_gc_common_pb";
import {type GameEventJson} from "@/proto/state/ssl_gc_game_event_pb";
import {fromJson} from "@bufbuild/protobuf";
import {
  type DurationJson,
  DurationSchema,
  type TimestampJson,
  timestampMs,
  TimestampSchema
} from "@bufbuild/protobuf/wkt";
import formatDuration from "format-duration";
import dayjs from "dayjs";

export const teams: TeamJson[] = ['YELLOW', 'BLUE']

export const opponent = (team: TeamJson) => {
  switch (team) {
    case 'BLUE':
      return 'YELLOW'
    case 'YELLOW':
      return 'BLUE'
    default:
      return team
  }
}

export const teamOptions = [
  {label: 'Yellow', value: 'YELLOW'},
  {label: 'Blue', value: 'BLUE'}
]

export function gameEventForTeam(gameEvent: GameEventJson): TeamJson {
  for (const value of Object.values(gameEvent)) {
    if (typeof value === 'object') {
      const attr = value as Record<string, unknown>
      for (const key of Object.keys(attr)) {
        if (key === 'byTeam') {
          return attr['byTeam'] as TeamJson
        }
      }
    }
  }
  return 'UNKNOWN' as TeamJson
}

export function gameEventDetails(gameEventJson: GameEventJson): Record<string, unknown> {
  return gameEventJson as Record<string, unknown>
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
    case "CI":
      return "auto_awesome"
    default:
      return "help_outline"
  }
}

const stages: Referee_StageJson[] = [
  'NORMAL_FIRST_HALF_PRE',
  'NORMAL_FIRST_HALF',
  'NORMAL_HALF_TIME',
  'NORMAL_SECOND_HALF_PRE',
  'NORMAL_SECOND_HALF',
  'EXTRA_TIME_BREAK',
  'EXTRA_FIRST_HALF_PRE',
  'EXTRA_FIRST_HALF',
  'EXTRA_HALF_TIME',
  'EXTRA_SECOND_HALF_PRE',
  'EXTRA_SECOND_HALF',
  'PENALTY_SHOOTOUT_BREAK',
  'PENALTY_SHOOTOUT',
  'POST_GAME',
]

export const isPausedStage = function (stage: Referee_StageJson): boolean {
  return stage === 'NORMAL_HALF_TIME'
    || stage === 'EXTRA_TIME_BREAK'
    || stage === 'EXTRA_HALF_TIME'
    || stage === 'PENALTY_SHOOTOUT_BREAK'
    || stage === 'POST_GAME'
}

export const isRunningStage = function (stage: Referee_StageJson): boolean {
  return stage === 'NORMAL_FIRST_HALF'
    || stage === 'NORMAL_SECOND_HALF'
    || stage === 'EXTRA_FIRST_HALF'
    || stage === 'EXTRA_SECOND_HALF'
    || stage === 'PENALTY_SHOOTOUT'
};

export const isPreStage = function (stage: Referee_StageJson): boolean {
  return stage === 'NORMAL_FIRST_HALF_PRE'
    || stage === 'NORMAL_SECOND_HALF_PRE'
    || stage === 'EXTRA_FIRST_HALF_PRE'
    || stage === 'EXTRA_SECOND_HALF_PRE'
};

export const getRemainingStages = function (fromStage: Referee_StageJson): Referee_StageJson[] {
  const idx = stages.indexOf(fromStage)
  return stages.slice(idx)
}

export const formatDurationJson = function (duration: DurationJson, options: { ms: boolean } = {ms: false}): string {
  const dur = fromJson(DurationSchema, duration)
  const milliseconds = Number(dur.seconds) * 1000 + dur.nanos / 1000000
  return formatDuration(milliseconds, options)
}

export const durationSeconds = function (duration: DurationJson): number {
  const dur = fromJson(DurationSchema, duration)
  return Number(dur.seconds) + dur.nanos / 1000000000.0
}

export const timestampJsonMs = function (timestamp: TimestampJson): number {
  const ts = fromJson(TimestampSchema, timestamp)
  return timestampMs(ts)
}

export const formatTimestamp = function (timestamp: TimestampJson): string {
  return dayjs(timestamp).format("MMM, DD YYYY HH:mm:ss,SSS")
}

export const usToTimestampJson = function (timestampUs: number | string): TimestampJson {
  if (typeof timestampUs === 'string') {
    return new Date(Number(BigInt(timestampUs) / BigInt(1000))).toISOString()
  }
  return new Date(timestampUs / 1000).toISOString()
}
