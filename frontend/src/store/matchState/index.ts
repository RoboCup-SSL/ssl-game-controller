import {defineStore} from "pinia";
import {State} from "@/proto/ssl_gc_state";

export const useMatchStateStore = defineStore('matchState', {
  state: () => {
    return {
      matchState: new State()
    }
  },
  getters: {},
  actions: {
    update(newState: State) {
      this.matchState = newState
    },
  },
})
