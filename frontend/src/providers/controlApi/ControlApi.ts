import {Input, Output} from "@/proto/ssl_gc_api";
import type {Change} from "@/proto/ssl_gc_change";
import type {Command, Command_Type} from "@/proto/ssl_gc_state";
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
    this.NewCommand({type, forTeam: Team.UNKNOWN})
  }

  public NewCommandForTeam(type: Command_Type, forTeam: Team) {
    this.NewCommand({type, forTeam})
  }

  public NewCommand(command: Command) {
    this.SubmitChange({
      origin: "UI",
      revertible: true,
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
      origin: "UI",
      revertible: true,
      change: {
        $case: 'addGameEventChange',
        addGameEventChange: {
          gameEvent
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

  public Continue(continueAction: ContinueAction) {
    this.Send({
      continueAction
    })
  }

  public SubmitChange(change: Change) {
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
