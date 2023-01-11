import {defineStore} from "pinia";
import {GameState_Type, State} from "@/proto/ssl_gc_state";
import {mockedState} from "@/store/matchState/mockedState";

export const useMatchStateStore = defineStore('matchState', {
  state: () => {
    return {
      matchState: mockedState
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
    },
  },
})
