<script setup lang="ts">
import {computed, inject} from "vue";
import ControlButton from "@/components/control/ControlButton.vue";
import {useMatchStateStore} from "@/store/matchState";
import {isRunningStage} from "@/helpers";
import {Command_Type} from "@/proto/ssl_gc_state";
import type {ControlApi} from "@/providers/controlApi/ControlApi";

const store = useMatchStateStore()
const control = inject<ControlApi>('control-api')

const sendCommand = () => {
  control?.NewCommandNeutral(Command_Type.FORCE_START)
}

const disable = computed(() => {
  return !store.isStop || !store.matchState.stage || !isRunningStage(store.matchState.stage)
})

</script>

<template>
  <ControlButton label="Force Start" :disable="disable" :action="sendCommand" />
</template>
