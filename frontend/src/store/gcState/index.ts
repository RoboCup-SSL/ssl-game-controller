import {defineStore} from "pinia";
import {
  ContinueAction_State,
  ContinueAction_Type,
  GcState,
  TeamAdvantageChoice_AdvantageChoice
} from "@/proto/ssl_gc_engine";
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
        continueActions: [
          {
            type: ContinueAction_Type.RESUME_FROM_HALT,
            state: ContinueAction_State.READY_AUTO,
          },
          {
            type: ContinueAction_Type.STOP_GAME,
            state: ContinueAction_State.BLOCKED,
            continuationIssues: [
              "Issue 1",
              "Issue 2"
            ]
          },
          {
            type: ContinueAction_Type.HALT,
            state: ContinueAction_State.READY_MANUAL,
          }
        ],
      } as GcState,
      config: {
        autoContinue: false,
        teams: [
          "Team1", "Team2"
        ],
        activeTrackerSource: "Foo",
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
