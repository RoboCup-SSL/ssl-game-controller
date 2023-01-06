import {defineStore} from "pinia";
import {GcState} from "@/proto/ssl_gc_engine";

export const useGcStateStore = defineStore('gcState', {
  state: () => {
    return {
      gcState: GcState.fromJSON({})
    }
  },
  getters: {},
  actions: {
    update(newState: GcState) {
      this.gcState = newState
    },
  },
})
