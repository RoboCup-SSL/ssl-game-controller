import type {State} from "@/proto/ssl_gc_state";
import {Command_Type, GameState_Type} from "@/proto/ssl_gc_state";
import {MatchType, Referee_Stage} from "@/proto/ssl_gc_referee_message";
import {Division, Team} from "@/proto/ssl_gc_common";
import {GameEvent_Type} from "@/proto/ssl_gc_game_event";

export const emptyState: State = {
  stage: Referee_Stage.POST_GAME,
  command: {
    type: Command_Type.HALT,
    forTeam: Team.UNKNOWN,
  },
  gameState: {
    type: GameState_Type.HALT,
    forTeam: Team.UNKNOWN,
  },
  stageTimeElapsed: {
    seconds: 0,
  },
  stageTimeLeft: {
    seconds: 0,
  },
  matchTimeStart: new Date(),
  currentActionTimeRemaining: {
    seconds: 0,
  },
  gameEvents: [],
  proposalGroups: [],
  division: Division.DIV_A,
  firstKickoffTeam: Team.YELLOW,
  matchType: MatchType.UNKNOWN_MATCH,
  readyContinueTime: new Date(),
  teamState: {
    [Team.YELLOW]: {
      name: "Unknown",
      goals: 0,
      goalkeeper: 0,
      yellowCards: [],
      redCards: [],
      timeoutsLeft: 0,
      timeoutTimeLeft: {
        seconds: 0,
      },
      onPositiveHalf: true,
      fouls: [],
      ballPlacementFailures: 0,
      ballPlacementFailuresReached: false,
      canPlaceBall: false,
      maxAllowedBots: 0,
      challengeFlags: 0,
    },
    [Team.BLUE]: {
      name: "Unknown",
      goals: 0,
      goalkeeper: 0,
      yellowCards: [],
      redCards: [],
      timeoutsLeft: 0,
      timeoutTimeLeft: {
        seconds: 0,
      },
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

export const defaultStates: State = {
  stage: Referee_Stage.POST_GAME,
  command: {
    type: Command_Type.HALT,
    forTeam: Team.UNKNOWN,
  },
  gameState: {
    type: GameState_Type.HALT,
    forTeam: Team.UNKNOWN,
  },
  stageTimeElapsed: {
    seconds: 0,
  },
  stageTimeLeft: {
    seconds: 0,
  },
  matchTimeStart: new Date(),
  currentActionTimeRemaining: {
    seconds: -5,
  },
  gameEvents: [
    {
      type: GameEvent_Type.NO_PROGRESS_IN_GAME,
      origin: [
        "TIGERs AutoRef"
      ],
      event: {
        $case: "noProgressInGame",
        noProgressInGame: {
          time: 4,
        }
      }
    },
    {
      type: GameEvent_Type.DEFENDER_TOO_CLOSE_TO_KICK_POINT,
      origin: [
        "TIGERs AutoRef"
      ],
      event: {
        $case: "defenderTooCloseToKickPoint",
        defenderTooCloseToKickPoint: {
          byBot: 15,
          byTeam: Team.BLUE,
          location: {
            x: -2,
            y: 5,
          },
          distance: 2.3,
        }
      }
    },
  ],
  proposalGroups: [
    {
      accepted: true,
      proposals: [
        {
          timestamp: new Date(),
          gameEvent: {
            type: GameEvent_Type.ATTACKER_TOUCHED_BALL_IN_DEFENSE_AREA,
            origin: [
              "TIGERs AutoRef"
            ],
            event: {
              $case: "attackerTouchedBallInDefenseArea",
              attackerTouchedBallInDefenseArea: {
                byBot: 15,
                byTeam: Team.YELLOW,
                distance: 2.3,
                location: {
                  x: 3,
                  y: -2.3,
                }
              }
            }
          }
        },
        {
          timestamp: new Date(),
          gameEvent: {
            type: GameEvent_Type.ATTACKER_TOUCHED_BALL_IN_DEFENSE_AREA,
            origin: [
              "ER-Force"
            ],
            event: {
              $case: "attackerTouchedBallInDefenseArea",
              attackerTouchedBallInDefenseArea: {
                byBot: 15,
                byTeam: Team.YELLOW,
                distance: 2.3,
                location: {
                  x: 3,
                  y: -2.3,
                }
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
          timestamp: new Date(),
          gameEvent: {
            type: GameEvent_Type.BALL_LEFT_FIELD_TOUCH_LINE,
            origin: [
              "ER-Force", "GC"
            ],
            event: {
              $case: "ballLeftFieldTouchLine",
              ballLeftFieldTouchLine: {
                byBot: 4,
                byTeam: Team.BLUE,
                location: {
                  x: 1,
                  y: 2,
                }
              }
            }
          }
        },
        {
          timestamp: new Date(),
          gameEvent: {
            type: GameEvent_Type.BALL_LEFT_FIELD_GOAL_LINE,
            origin: [
              "TIGERs AutoRef", "Unknown"
            ],
            event: {
              $case: "ballLeftFieldGoalLine",
              ballLeftFieldGoalLine: {
                byBot: 4,
                byTeam: Team.YELLOW,
                location: {
                  x: 1,
                  y: 2,
                }
              }
            }
          }
        }
      ]
    }
  ],
  division: Division.DIV_A,
  firstKickoffTeam: Team.YELLOW,
  matchType: MatchType.UNKNOWN_MATCH,
  readyContinueTime: new Date(),
  teamState: {
    [Team.YELLOW]: {
      name: "Unknown",
      goals: 0,
      goalkeeper: 5,
      yellowCards: [],
      redCards: [],
      timeoutsLeft: 4,
      timeoutTimeLeft: {
        seconds: 61,
      },
      onPositiveHalf: true,
      fouls: [],
      ballPlacementFailures: 0,
      ballPlacementFailuresReached: false,
      canPlaceBall: false,
      maxAllowedBots: 5,
      challengeFlags: 3,
    },
    [Team.BLUE]: {
      name: "Unknown",
      goals: 2,
      goalkeeper: 15,
      yellowCards: [],
      redCards: [],
      timeoutsLeft: 4,
      timeoutTimeLeft: {
        seconds: 61,
      },
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
