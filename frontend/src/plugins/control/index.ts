import {ControlApi} from "@/providers/controlApi";
import {useMatchStateStore} from "@/store/matchState";
import type {OutputJson} from "@/proto/api/ssl_gc_api_pb";
import {useGcStateStore} from "@/store/gcState";
import type {App} from "vue";
import {useProtocolStore} from "@/store/protocolState";
import {ManualActions} from "@/providers/manualActions";
import {Shortcuts} from "@/providers/shortcuts";
import {GamepadController} from "@/providers/gamepadController";

export const control = {
  install(app: App) {
    const controlApi = new ControlApi()
    const manualActions = new ManualActions(controlApi)
    const shortcuts = new Shortcuts(manualActions, controlApi)
    const gamepadController = new GamepadController(manualActions, controlApi)
    app.provide('control-api', controlApi)
    app.provide('command-actions', manualActions)
    app.provide('shortcuts', shortcuts)
    app.provide('gamepad-controller', gamepadController)

    const matchStateStore = useMatchStateStore()
    controlApi.RegisterConsumer((output: OutputJson) => {
      if (output.matchState) {
        matchStateStore.updateGcState(output.matchState)
      }
    })

    const gcStateStore = useGcStateStore()
    controlApi.RegisterConsumer((output: OutputJson) => {
      if (output.gcState) {
        gcStateStore.updateGcState(output.gcState)
      }
      if (output.config) {
        gcStateStore.updateConfig(output.config)
      }
    })

    const protocolStore = useProtocolStore()
    controlApi.RegisterConsumer((output: OutputJson) => {
      if (output.protocol) {
        protocolStore.updateProtocol(output.protocol)
      }
    })

    window.addEventListener('keydown', (e) => shortcuts.keyListenerCommands(e))
  }
}
