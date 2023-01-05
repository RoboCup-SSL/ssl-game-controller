<script setup lang="ts">
import {computed, inject} from "vue";
import {ControlApi} from "@/providers/controlApi/ControlApi";
import {Command} from "@/proto/ssl_gc_state";
import ControlButton from "@/components/control/buttons/ControlButton.vue";
import {useMatchStateStore} from "@/store/matchState";
import Type = Command.Type;

const store = useMatchStateStore()
const control = inject<ControlApi>('control-api')
const commandType = Type.HALT

const sendCommand = () => {
  control?.NewCommandNeutral(commandType)
}

const disable = computed(() => {
  return store.matchState.command.type.toString() === Type[commandType]
})

</script>

<template>
  <ControlButton label="Halt" :disable="disable" :action="sendCommand" />
</template>
