<script setup lang="ts">
import {computed, inject} from "vue";
import {ControlApi} from "@/providers/controlApi/ControlApi";
import {Command} from "@/proto/ssl_gc_state";
import ControlButton from "@/components/control/buttons/ControlButton.vue";
import {useMatchStateStore} from "@/store/matchState";
import Type = Command.Type;
import {isRunningStage} from "@/helpers";

const store = useMatchStateStore()
const control = inject<ControlApi>('control-api')

const sendCommand = () => {
  control?.NewCommandNeutral(Type.FORCE_START)
}

const disable = computed(() => {
  return !store.isStop || !isRunningStage(store.matchState.stage)
})

</script>

<template>
  <ControlButton label="Force Start" :disable="disable" :action="sendCommand" />
</template>
