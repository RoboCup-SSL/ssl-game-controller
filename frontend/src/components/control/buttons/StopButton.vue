<script setup lang="ts">
import {computed, inject} from "vue";
import {ControlApi} from "@/providers/controlApi/ControlApi";
import {Command} from "@/proto/ssl_gc_state";
import ControlButton from "@/components/control/buttons/ControlButton.vue";
import {useMatchStateStore} from "@/store/matchState";
import {isPausedStage} from "@/helpers";
import Type = Command.Type;

const store = useMatchStateStore()
const control = inject<ControlApi>('control-api')
const commandType = Type.STOP

const sendCommand = () => {
  control?.NewCommandNeutral(commandType)
}

const disable = computed(() => {
  return store.matchState.command.type.toString() === Type[commandType]
    || isPausedStage(store.matchState.stage)
})

</script>

<template>
  <ControlButton label="Stop" :disable="disable" :action="sendCommand"/>
</template>
