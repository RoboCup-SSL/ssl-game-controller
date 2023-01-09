import {defineStore} from "pinia";
import {GameState_Type, State} from "@/proto/ssl_gc_state";
import {Team} from "@/proto/ssl_gc_common";

export const useMatchStateStore = defineStore('matchState', {
  state: () => {
    return {
      matchState: {
        teamState: {
          [Team.YELLOW]: {
            goalkeeper: 5
          },
          [Team.BLUE]: {
            goalkeeper: 15
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
