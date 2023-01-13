import {defineStore} from "pinia";
import type {State} from "@/proto/ssl_gc_state";
import {GameState_Type} from "@/proto/ssl_gc_state";
import {emptyState, defaultStates} from "@/store/matchState/defaultStates";

export const useMatchStateStore = defineStore('matchState', {
  state: () => {
    return {
      matchState: import.meta.env.DEV ? defaultStates : emptyState,
      matchStateUpdateCount: 0,
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
    updateGcState(newState: State) {
      this.matchState = newState
      this.matchStateUpdateCount++
    },
  },
})
