<script setup lang="ts">
import {computed, inject} from "vue";
import {ControlApi} from "@/providers/controlApi/ControlApi";
import ControlButton from "@/components/control/buttons/ControlButton.vue";
import {useMatchStateStore} from "@/store/matchState";
import {Team} from "@/proto/ssl_gc_common";
import {isPausedStage} from "@/helpers";
import {Command} from "@/proto/ssl_gc_state";

const props = defineProps<{
  team: Team,
}>()

const store = useMatchStateStore()
const control = inject<ControlApi>('control-api')

const timeoutRunning = computed(() => {
  return store.isTimeout && store.matchState.gameState.forTeam.toString() === Team[props.team]
})

const label = computed(() => {
  if (timeoutRunning.value) {
    return "Stop Timeout"
  }
  return "Start Timeout"
})

const toggle = () => {
  if (timeoutRunning.value) {
    control?.NewCommandNeutral(Command.Type.STOP)
  } else {
    control?.NewCommandForTeam(Command.Type.TIMEOUT, props.team)
  }
}

const disable = computed(() => {
  return isPausedStage(store.matchState.stage)
})

</script>

<template>
  <ControlButton :label="label" :disable="disable" :action="toggle"/>
</template>
