import {defineStore} from "pinia";
import type {StateJson} from "@/proto/state/ssl_gc_state_pb";
import {defaultStates, emptyState} from "@/store/matchState/defaultStates";

export const useMatchStateStore = defineStore('matchState', {
  state: () => {
    return {
      matchState: import.meta.env.DEV ? defaultStates : emptyState,
      matchStateUpdateCount: 0,
    }
  },
  getters: {
    isKickoff: (state) => {
      return state.matchState.gameState?.type === 'KICKOFF'
    },
    isPenalty: (state) => {
      return state.matchState.gameState?.type === 'PENALTY'
    },
    isStop: (state) => {
      return state.matchState.gameState?.type === 'STOP'
    },
    isHalt: (state) => {
      return state.matchState.gameState?.type === 'HALT'
    },
    isTimeout: (state) => {
      return state.matchState.gameState?.type === 'TIMEOUT'
    },
  },
  actions: {
    updateGcState(newState: StateJson) {
      this.matchState = newState
      this.matchStateUpdateCount++
    },
  },
})
