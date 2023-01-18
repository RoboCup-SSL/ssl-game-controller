import {ControlApi} from "@/providers/controlApi/ControlApi";
import {useMatchStateStore} from "@/store/matchState";
import type {Output} from "@/proto/ssl_gc_api";
import {useGcStateStore} from "@/store/gcState";
import type {App} from "vue";
import {Command_Type, GameState_Type} from "@/proto/ssl_gc_state";
import {useProtocolStore} from "@/store/protocolState";

export const control = {
  install(app: App) {
    const controlApi = new ControlApi()
    app.provide('control-api', controlApi)

    const matchStateStore = useMatchStateStore()
    controlApi.RegisterConsumer((output: Output) => {
      if (output.matchState) {
        matchStateStore.updateGcState(output.matchState)
      }
    })

    const gcStateStore = useGcStateStore()
    controlApi.RegisterConsumer((output: Output) => {
      if (output.gcState) {
        gcStateStore.updateGcState(output.gcState)
      }
      if (output.config) {
        gcStateStore.updateConfig(output.config)
      }
    })

    const protocolStore = useProtocolStore()
    controlApi.RegisterConsumer((output: Output) => {
      if (output.protocol) {
        protocolStore.updateProtocol(output.protocol)
      }
    })

    const keyListenerHalt = function (e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (matchStateStore.matchState.gameState?.type !== GameState_Type.HALT) {
          controlApi.NewCommandNeutral(Command_Type.HALT)
        }
      }
    };
    document.addEventListener('keydown', keyListenerHalt)
  }
}
