import {Input, Output} from "@/proto/ssl_gc_api";

export class ControlApi {
  private readonly apiPath = '/api/control'
  private ws ?: WebSocket
  private consumer: ((message: Output) => any)[] = []
  private latestOutput ?: Output

  constructor() {
    this.connect()
  }

  public Send(request: Input) {
    const ws = this.ws
    if (ws) {
      const json = JSON.stringify(request)
      ws.send(json)
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
