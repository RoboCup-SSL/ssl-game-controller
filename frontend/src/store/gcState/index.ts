import {defineStore} from "pinia";
import {GcState, TeamAdvantageChoice_AdvantageChoice} from "@/proto/ssl_gc_engine";

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
      } as GcState
    }
  },
  getters: {},
  actions: {
    update(newState: GcState) {
      this.gcState = newState
    },
  },
})
