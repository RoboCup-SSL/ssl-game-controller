import {defineStore} from "pinia";
import {GcState, TeamAdvantageChoice_AdvantageChoice} from "@/proto/ssl_gc_engine";
import type {Config} from "@/proto/ssl_gc_engine_config";

export const useGcStateStore = defineStore('gcState', {
  state: () => {
    return {
      gcState: {
        teamState: {
          YELLOW: {
            connected: false,
            connectionVerified: false,
            remoteControlConnected: false,
            remoteControlConnectionVerified: false,
            advantageChoice: TeamAdvantageChoice_AdvantageChoice.UNRECOGNIZED,
          },
          BLUE: {
            connected: false,
            connectionVerified: false,
            remoteControlConnected: false,
            remoteControlConnectionVerified: false,
            advantageChoice: TeamAdvantageChoice_AdvantageChoice.UNRECOGNIZED,
          },
        },
        autoRefState: {},
        trackers: {},
        continueActions: [],
      } as GcState,
      config: {
      } as Config
    }
  },
  getters: {},
  actions: {
    updateGcState(gcState: GcState) {
      this.gcState = gcState
    },
    updateConfig(config: Config) {
      this.config = config
    },
  },
})
