import type {InputJson, OutputJson} from "@/proto/api/ssl_gc_api_pb";
import {OutputSchema} from "@/proto/api/ssl_gc_api_pb";
import type {
  Change_UpdateConfigJson,
  Change_UpdateTeamStateJson,
  ChangeJson
} from "@/proto/statemachine/ssl_gc_change_pb";
import type {Command_TypeJson, CommandJson, ProposalJson} from "@/proto/state/ssl_gc_state_pb";
import {type GameEventJson} from "@/proto/state/ssl_gc_game_event_pb";
import {type ContinueActionJson} from "@/proto/engine/ssl_gc_engine_pb";
import type {ConfigJson} from "@/proto/engine/ssl_gc_engine_config_pb";
import {fromJsonString, toJson} from "@bufbuild/protobuf";
import {type TeamJson} from "@/proto/state/ssl_gc_common_pb";

export class ControlApi {
  private readonly apiPath = '/api/control'
  private ws ?: WebSocket
  private readonly consumer: ((message: OutputJson) => void)[] = []
  private latestOutput ?: OutputJson

  constructor() {
    this.connect()
  }


  public NewCommandNeutral(type: Command_TypeJson) {
    this.newCommand({type, forTeam: 'UNKNOWN'})
  }

  public NewCommandForTeam(type: Command_TypeJson, forTeam: TeamJson) {
    this.newCommand({type, forTeam})
  }

  private newCommand(command: CommandJson) {
    this.SubmitChange({
      newCommandChange: {
        command
      }
    })
  }

  public AddGameEvent(gameEvent: GameEventJson) {
    if (gameEvent.origin?.length === 0) {
      gameEvent.origin = ["UI"]
    }
    this.SubmitChange({
      addGameEventChange: {
        gameEvent
      }
    })
  }

  public ProposeGameEvent(proposal: ProposalJson) {
    if (proposal.gameEvent?.origin?.length === 0) {
      proposal.gameEvent.origin = ["UI"]
    }
    this.SubmitChange({
      addProposalChange: {
        proposal
      }
    })
  }

  public UpdateMatchConfig(updateConfigChange: Change_UpdateConfigJson) {
    this.SubmitChange({
      updateConfigChange
    })
  }

  public UpdateTeamState(updateTeamStateChange: Change_UpdateTeamStateJson) {
    this.SubmitChange({
      updateTeamStateChange
    })
  }

  public AcceptProposalGroup(groupId: string) {
    this.SubmitChange({
      acceptProposalGroupChange: {
        groupId,
        acceptedBy: "UI"
      }
    })
  }

  public ChangeConfig(configDelta: ConfigJson) {
    this.Send({
      configDelta
    })
  }

  public ResetMatch() {
    this.Send({
      resetMatch: true
    })
  }

  public Revert(id: number) {
    this.SubmitChange({
      revertChange: {
        changeId: id,
      }
    })
  }

  public Continue(continueAction: ContinueActionJson) {
    if (continueAction.state === 'READY_AUTO'
      || continueAction.state === 'READY_MANUAL'
      || continueAction.state === 'WAITING'
      || continueAction.state === 'BLOCKED') {
      this.Send({
        continueAction
      })
    }
  }

  public SubmitChange(change: ChangeJson) {
    if (!change.origin) {
      change.origin = "UI"
    }
    this.Send({
      change
    })
  }

  public Send(request: InputJson) {
    const ws = this.ws
    if (ws) {
      const json = JSON.stringify(request)
      ws.send(json)
    } else {
      console.warn("No WebSocket connection. Dropping ", request)
    }
  }

  public RegisterConsumer(cb: ((output: OutputJson) => void)) {
    this.consumer.push(cb)
    if (this.latestOutput) {
      cb(this.latestOutput)
    }
  }

  private determineWebSocketAddress() {
    const protocol = window.location.protocol === 'http:' ? 'ws:' : 'wss:';
    return protocol + '//' + window.location.hostname + ':' + window.location.port + this.apiPath
  }

  private connect() {
    const ws = new WebSocket(this.determineWebSocketAddress());

    ws.onmessage = (e) => {
      this.latestOutput = toJson(OutputSchema, fromJsonString(OutputSchema, e.data))
      for (const callback of this.consumer) {
        callback(this.latestOutput)
      }
    };

    ws.onclose = () => {
      this.ws = undefined
      setTimeout(() => {
        this.connect()
      }, 1000);
    };

    ws.onerror = () => {
      ws.close()
    };

    this.ws = ws;
  }
}
