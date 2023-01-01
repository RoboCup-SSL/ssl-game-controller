import {createApp} from 'vue'
import App from './App.vue'
import './assets/main.css'

import {createPinia} from "pinia";
import router from './router'

import type {Output} from "@/proto/ssl_gc_api";
import {ControlApi} from "@/providers/controlApi/ControlApi";
import {useMatchStateStore} from "@/store/matchState";
import {useGcStateStore} from "@/store/gcState";

const pinia = createPinia()
const app = createApp(App)
const controlApi = new ControlApi()

app.use(router)
app.use(pinia)
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

app.mount('#app')
