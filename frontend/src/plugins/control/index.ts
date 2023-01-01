import {ControlApi} from "@/providers/controlApi/ControlApi";
import {useMatchStateStore} from "@/store/matchState";
import type {Output} from "@/proto/ssl_gc_api";
import {useGcStateStore} from "@/store/gcState";
import type {App} from "@vue/runtime-core";

export const control = {
  install(app: App) {
    const controlApi = new ControlApi()
    app.provide('control-api', controlApi)

    const matchStateStore = useMatchStateStore()
    controlApi.RegisterConsumer((output: Output) => {
      if (output.matchState) {
        matchStateStore.update(output.matchState)
      }
    })

    const gcStateStore = useGcStateStore()
    controlApi.RegisterConsumer((output: Output) => {
      if (output.gcState) {
        gcStateStore.update(output.gcState)
      }
    })
  }
}
