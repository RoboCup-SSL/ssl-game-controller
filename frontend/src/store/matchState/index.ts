import {defineStore} from "pinia";
import {GameState, State} from "@/proto/ssl_gc_state";
import Type = GameState.Type;

export const useMatchStateStore = defineStore('matchState', {
  state: () => {
    return {
      matchState: new State()
    }
  },
  getters: {
    isKickoff: (state) => {
      return state.matchState.gameState.type.toString() === Type[Type.KICKOFF]
    },
    isPenalty: (state) => {
      return state.matchState.gameState.type.toString() === Type[Type.PENALTY]
    },
    isStop: (state) => {
      return state.matchState.gameState.type.toString() === Type[Type.STOP]
    },
    isTimeout: (state) => {
      return state.matchState.gameState.type.toString() === Type[Type.TIMEOUT]
    },
  },
  actions: {
    update(newState: State) {
      this.matchState = newState
    },
  },
})
