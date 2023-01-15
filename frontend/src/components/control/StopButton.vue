<script setup lang="ts">
import {computed, inject} from "vue";
import ControlButton from "@/components/control/ControlButton.vue";
import {useMatchStateStore} from "@/store/matchState";
import {isPausedStage} from "@/helpers";
import {Command_Type} from "@/proto/ssl_gc_state";
import type {ControlApi} from "@/providers/controlApi/ControlApi";

const store = useMatchStateStore()
const control = inject<ControlApi>('control-api')

const sendCommand = () => {
  control?.NewCommandNeutral(Command_Type.STOP)
}

const disable = computed(() => {
  return store.matchState.command?.type === Command_Type.STOP
    || !store.matchState.stage
    || isPausedStage(store.matchState.stage)
})

</script>

<template>
  <ControlButton label="Stop" :disable="disable" :action="sendCommand"/>
</template>
