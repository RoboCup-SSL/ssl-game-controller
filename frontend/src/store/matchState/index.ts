import {defineStore} from "pinia";
import {Command_Type, GameState_Type, State} from "@/proto/ssl_gc_state";
import {Division, Team} from "@/proto/ssl_gc_common";
import {MatchType, Referee_Stage} from "@/proto/ssl_gc_referee_message";

export const useMatchStateStore = defineStore('matchState', {
  state: () => {
    return {
      matchState: {
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
      } as State
    }
  },
  getters: {
    isKickoff: (state) => {
      return state.matchState.gameState?.type === GameState_Type.KICKOFF
    },
    isPenalty: (state) => {
      return state.matchState.gameState?.type?.toString() === GameState_Type.PENALTY
    },
    isStop: (state) => {
      return state.matchState.gameState?.type?.toString() === GameState_Type.STOP
    },
    isTimeout: (state) => {
      return state.matchState.gameState?.type?.toString() === GameState_Type.TIMEOUT
    },
  },
  actions: {
    update(newState: State) {
      this.matchState = newState
    },
  },
})
