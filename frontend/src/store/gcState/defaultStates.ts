import type {GcStateJson} from "@/proto/engine/ssl_gc_engine_pb";
import type {ConfigJson} from "@/proto/engine/ssl_gc_engine_config_pb";

export const emptyGcState: GcStateJson = {
  teamState: {
    YELLOW: {
      connected: false,
      connectionVerified: false,
      remoteControlConnected: false,
      remoteControlConnectionVerified: false,
      advantageChoice: {},
    },
    BLUE: {
      connected: false,
      connectionVerified: false,
      remoteControlConnected: false,
      remoteControlConnectionVerified: false,
      advantageChoice: {},
    },
  },
  autoRefState: {},
  trackers: {},
  continueActions: [],
}

export const mockedGcState: GcStateJson = {
  teamState: {
    YELLOW: {
      connected: false,
      connectionVerified: false,
      remoteControlConnected: false,
      remoteControlConnectionVerified: false,
      advantageChoice: {},
    },
    BLUE: {
      connected: false,
      connectionVerified: false,
      remoteControlConnected: false,
      remoteControlConnectionVerified: false,
      advantageChoice: {},
    },
  },
  autoRefState: {},
  trackers: {},
  continueActions: [
    {
      type: 'RESUME_FROM_HALT',
      state: 'READY_AUTO',
    },
    {
      type: 'STOP_GAME',
      state: 'BLOCKED',
      continuationIssues: [
        "Issue 1",
        "Issue 2"
      ]
    },
    {
      type: 'HALT',
      state: 'READY_MANUAL',
    }
  ],
}

export const emptyConfig: ConfigJson = {
  autoContinue: false,
  teams: [],
  activeTrackerSource: undefined,
}

export const mockedConfig: ConfigJson = {
  autoContinue: false,
  teams: [
    "Team1", "Team2"
  ],
  activeTrackerSource: "Foo",
  gameEventBehavior: {},
  autoRefConfigs: {},
}
