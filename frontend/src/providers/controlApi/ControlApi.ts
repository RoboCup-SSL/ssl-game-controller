import {Input, Output} from "@/proto/ssl_gc_api";
import type {Change, Change_UpdateConfig, Change_UpdateTeamState} from "@/proto/ssl_gc_change";
import type {Command, Command_Type, Proposal} from "@/proto/ssl_gc_state";
import type {GameEvent} from "@/proto/ssl_gc_game_event";
import type {ContinueAction} from "@/proto/ssl_gc_engine";
import type {Config} from "@/proto/ssl_gc_engine_config";
import {Team} from "@/proto/ssl_gc_common";

export class ControlApi {
  private readonly apiPath = '/api/control'
  private ws ?: WebSocket
  private consumer: ((message: Output) => any)[] = []
  private latestOutput ?: Output

  constructor() {
    this.connect()
  }


  public NewCommandNeutral(type: Command_Type) {
    this.newCommand({type, forTeam: Team.UNKNOWN})
  }

  public NewCommandForTeam(type: Command_Type, forTeam: Team) {
    this.newCommand({type, forTeam})
  }

  private newCommand(command: Command) {
    this.SubmitChange({
      change: {
        $case: 'newCommandChange',
        newCommandChange: {
          command
        }
      }
    })
  }

  public AddGameEvent(gameEvent: GameEvent) {
    if (gameEvent.origin?.length === 0) {
      gameEvent.origin = ["UI"]
    }
    this.SubmitChange({
      change: {
        $case: 'addGameEventChange',
        addGameEventChange: {
          gameEvent
        }
      }
    })
  }

  public ProposeGameEvent(proposal: Proposal) {
    if (proposal.gameEvent?.origin?.length === 0) {
      proposal.gameEvent.origin = ["UI"]
    }
    this.SubmitChange({
      change: {
        $case: 'addProposalChange',
        addProposalChange: {
          proposal
        }
      }
    })
  }

  public UpdateMatchConfig(updateConfigChange: Change_UpdateConfig) {
    this.SubmitChange({
      change: {
        $case: 'updateConfigChange',
        updateConfigChange
      }
    })
  }

  public UpdateTeamState(updateTeamStateChange: Change_UpdateTeamState) {
    this.SubmitChange({
      change: {
        $case: 'updateTeamStateChange',
        updateTeamStateChange
      }
    })
  }

  public AcceptProposalGroup(groupId: string) {
    this.SubmitChange({
      change: {
        $case: 'acceptProposalGroupChange',
        acceptProposalGroupChange: {
          groupId,
          acceptedBy: "UI"
        }
      }
    })
  }

  public ChangeConfig(configDelta: Config) {
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
      change: {
        $case: "revertChange",
        revertChange: {
          changeId: id,
        }
      }
    })
  }

  public Continue(continueAction: ContinueAction) {
    this.Send({
      continueAction
    })
  }

  public SubmitChange(change: Change) {
    if (!change.origin) {
      change.origin = "UI"
    }
    this.Send({
      change
    })
  }

  public Send(request: Input) {
    const ws = this.ws
    if (ws) {
      const json = JSON.stringify(Input.toJSON(request))
      ws.send(json)
    } else {
      console.warn("No WebSocket connection. Dropping ", request)
    }
  }

  public RegisterConsumer(cb: ((output: Output) => any)) {
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
      this.latestOutput = Output.fromJSON(JSON.parse(e.data))
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
