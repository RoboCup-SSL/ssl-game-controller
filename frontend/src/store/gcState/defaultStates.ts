import {
  ContinueAction_State,
  ContinueAction_Type,
  GcState,
  TeamAdvantageChoice_AdvantageChoice
} from "@/proto/ssl_gc_engine";
import type {Config} from "@/proto/ssl_gc_engine_config";

export const emptyGcState: GcState = {
  teamState: {
    YELLOW: {
      connected: false,
      connectionVerified: false,
      remoteControlConnected: false,
      remoteControlConnectionVerified: false,
      advantageChoice: {
        choice: TeamAdvantageChoice_AdvantageChoice.UNRECOGNIZED,
      },
    },
    BLUE: {
      connected: false,
      connectionVerified: false,
      remoteControlConnected: false,
      remoteControlConnectionVerified: false,
      advantageChoice: {
        choice: TeamAdvantageChoice_AdvantageChoice.UNRECOGNIZED,
      },
    },
  },
  autoRefState: {},
  trackers: {},
  continueActions: [],
}

export const mockedGcState: GcState = {
  teamState: {
    YELLOW: {
      connected: false,
      connectionVerified: false,
      remoteControlConnected: false,
      remoteControlConnectionVerified: false,
      advantageChoice: {
        choice: TeamAdvantageChoice_AdvantageChoice.UNRECOGNIZED,
      },
    },
    BLUE: {
      connected: false,
      connectionVerified: false,
      remoteControlConnected: false,
      remoteControlConnectionVerified: false,
      advantageChoice: {
        choice: TeamAdvantageChoice_AdvantageChoice.UNRECOGNIZED,
      },
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
}

export const emptyConfig = {
  autoContinue: false,
  teams: [],
  activeTrackerSource: undefined,
} as Config

export const mockedConfig = {
  autoContinue: false,
  teams: [
    "Team1", "Team2"
  ],
  activeTrackerSource: "Foo",
  gameEventBehavior: {},
  autoRefConfigs: {},
} as Config
