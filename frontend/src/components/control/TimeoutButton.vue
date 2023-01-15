<script setup lang="ts">
import {computed, inject} from "vue";
import ControlButton from "@/components/control/ControlButton.vue";
import {useMatchStateStore} from "@/store/matchState";
import {isPausedStage} from "@/helpers";
import {Command_Type} from "@/proto/ssl_gc_state";
import type {ControlApi} from "@/providers/controlApi/ControlApi";
import type {Team} from "@/proto/ssl_gc_common";

const props = defineProps<{
  team: Team,
}>()

const store = useMatchStateStore()
const control = inject<ControlApi>('control-api')

const timeoutRunning = computed(() => {
  return store.isTimeout && store.matchState.gameState?.forTeam === props.team
})

const label = computed(() => {
  if (timeoutRunning.value) {
    return "Stop Timeout"
  }
  return "Start Timeout"
})

const toggle = () => {
  if (timeoutRunning.value) {
    control?.NewCommandNeutral(Command_Type.STOP)
  } else {
    control?.NewCommandForTeam(Command_Type.TIMEOUT, props.team)
  }
}

const disable = computed(() => {
  return !store.matchState.stage || isPausedStage(store.matchState.stage)
})

</script>

<template>
  <ControlButton :label="label" :disable="disable" :action="toggle" :team="team"/>
</template>
