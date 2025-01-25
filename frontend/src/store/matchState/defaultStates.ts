import type {StateJson} from "@/proto/state/ssl_gc_state_pb";

export const emptyState: StateJson = {
  stage: 'POST_GAME',
  command: {
    type: 'HALT',
    forTeam: 'UNKNOWN',
  },
  gameState: {
    type: 'HALT',
    forTeam: 'UNKNOWN',
  },
  stageTimeElapsed: '0s',
  stageTimeLeft: '0s',
  matchTimeStart: new Date().toISOString(),
  currentActionTimeRemaining: '0s',
  gameEvents: [],
  proposalGroups: [],
  division: 'DIV_A',
  firstKickoffTeam: 'YELLOW',
  matchType: 'UNKNOWN_MATCH',
  readyContinueTime: new Date().toISOString(),
  teamState: {
    ['YELLOW']: {
      name: "Unknown",
      goals: 0,
      goalkeeper: 0,
      yellowCards: [],
      redCards: [],
      timeoutsLeft: 0,
      timeoutTimeLeft: '0s',
      onPositiveHalf: true,
      fouls: [],
      ballPlacementFailures: 0,
      ballPlacementFailuresReached: false,
      canPlaceBall: false,
      maxAllowedBots: 0,
      challengeFlags: 0,
    },
    ['BLUE']: {
      name: "Unknown",
      goals: 0,
      goalkeeper: 0,
      yellowCards: [],
      redCards: [],
      timeoutsLeft: 0,
      timeoutTimeLeft: '0s',
      onPositiveHalf: false,
      fouls: [],
      ballPlacementFailures: 0,
      ballPlacementFailuresReached: false,
      canPlaceBall: false,
      maxAllowedBots: 0,
      challengeFlags: 0,
    }
  }
}

export const defaultStates: StateJson = {
  stage: 'POST_GAME',
  command: {
    type: 'HALT',
    forTeam: 'UNKNOWN',
  },
  gameState: {
    type: 'HALT',
    forTeam: 'UNKNOWN',
  },
  stageTimeElapsed: '',
  stageTimeLeft: '0s',
  matchTimeStart: new Date().toISOString(),
  currentActionTimeRemaining: '-5s',
  gameEvents: [
    {
      type: 'NO_PROGRESS_IN_GAME',
      origin: [
        "TIGERs AutoRef"
      ],
      noProgressInGame: {
        time: 4,
      }
    },
    {
      type: 'DEFENDER_TOO_CLOSE_TO_KICK_POINT',
      origin: [
        "TIGERs AutoRef"
      ],
      defenderTooCloseToKickPoint: {
        byBot: 15,
        byTeam: 'BLUE',
        location: {
          x: -2,
          y: 5,
        },
        distance: 2.3,
      }
    },
  ],
  proposalGroups: [
    {
      accepted: true,
      proposals: [
        {
          timestamp: new Date().toISOString(),
          gameEvent: {
            type: 'ATTACKER_TOUCHED_BALL_IN_DEFENSE_AREA',
            origin: [
              "TIGERs AutoRef"
            ],
            attackerTouchedBallInDefenseArea: {
              byBot: 15,
              byTeam: 'YELLOW',
              distance: 2.3,
              location: {
                x: 3,
                y: -2.3,
              }
            }
          }
        },
        {
          timestamp: new Date().toISOString(),
          gameEvent: {
            type: 'ATTACKER_TOUCHED_BALL_IN_DEFENSE_AREA',
            origin: [
              "ER-Force"
            ],
            attackerTouchedBallInDefenseArea: {
              byBot: 15,
              byTeam: 'YELLOW',
              distance: 2.3,
              location: {
                x: 3,
                y: -2.3,
              }
            }
          }
        }
      ]
    },
    {
      accepted: false,
      proposals: [
        {
          timestamp: new Date().toISOString(),
          gameEvent: {
            type: 'BALL_LEFT_FIELD_TOUCH_LINE',
            origin: [
              "ER-Force", "GC"
            ],
            ballLeftFieldTouchLine: {
              byBot: 4,
              byTeam: 'BLUE',
              location: {
                x: 1,
                y: 2,
              }
            }
          }
        },
        {
          timestamp: new Date().toISOString(),
          gameEvent: {
            type: 'BALL_LEFT_FIELD_GOAL_LINE',
            origin: [
              "TIGERs AutoRef", "Unknown"
            ],
            ballLeftFieldGoalLine: {
              byBot: 4,
              byTeam: 'YELLOW',
              location: {
                x: 1,
                y: 2,
              }
            }
          }
        }
      ]
    }
  ],
  division: 'DIV_A',
  firstKickoffTeam: 'YELLOW',
  matchType: 'UNKNOWN_MATCH',
  readyContinueTime: new Date().toISOString(),
  teamState: {
    ['YELLOW']: {
      name: "Unknown",
      goals: 0,
      goalkeeper: 5,
      yellowCards: [],
      redCards: [],
      timeoutsLeft: 4,
      timeoutTimeLeft: '61s',
      onPositiveHalf: true,
      fouls: [],
      ballPlacementFailures: 0,
      ballPlacementFailuresReached: false,
      canPlaceBall: false,
      maxAllowedBots: 5,
      challengeFlags: 3,
    },
    ['BLUE']: {
      name: "Unknown",
      goals: 2,
      goalkeeper: 15,
      yellowCards: [],
      redCards: [],
      timeoutsLeft: 4,
      timeoutTimeLeft: '61s',
      onPositiveHalf: false,
      fouls: [],
      ballPlacementFailures: 0,
      ballPlacementFailuresReached: false,
      canPlaceBall: false,
      maxAllowedBots: 5,
      challengeFlags: 3,
    }
  }
}
