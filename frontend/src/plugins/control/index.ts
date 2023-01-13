import {ControlApi} from "@/providers/controlApi/ControlApi";
import {useMatchStateStore} from "@/store/matchState";
import type {Output} from "@/proto/ssl_gc_api";
import {useGcStateStore} from "@/store/gcState";
import type {App} from "vue";

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
  }
}
