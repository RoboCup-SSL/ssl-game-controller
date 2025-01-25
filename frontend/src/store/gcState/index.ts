import {defineStore} from "pinia";
import type {GcStateJson} from "@/proto/engine/ssl_gc_engine_pb";
import type {ConfigJson} from "@/proto/engine/ssl_gc_engine_config_pb";
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
    updateGcState(gcState: GcStateJson) {
      this.gcState = gcState
      this.gcStateUpdateCount++
    },
    updateConfig(config: ConfigJson) {
      this.config = config
      this.configUpdateCount++
    },
  },
})
