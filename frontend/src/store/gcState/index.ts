import {defineStore} from "pinia";
import type {GcState} from "@/proto/ssl_gc_engine";
import type {Config} from "@/proto/ssl_gc_engine_config";
import {emptyConfig, emptyGcState, mockedConfig, mockedGcState} from "@/store/gcState/defaultStates";

export const useGcStateStore = defineStore('gcState', {
  state: () => {
    return {
      gcState: import.meta.env.DEV ? mockedGcState : emptyGcState,
      gcStateUpdateCount: 0,
      config: import.meta.env.DEV ? mockedConfig : emptyConfig,
      configUpdateCount: 0,
    }
  },
  getters: {},
  actions: {
    updateGcState(gcState: GcState) {
      this.gcState = gcState
      this.gcStateUpdateCount++
    },
    updateConfig(config: Config) {
      this.config = config
      this.configUpdateCount++
    },
  },
})
