<script setup lang="ts">
import {computed, inject} from "vue";
import type {ControlApi} from "@/providers/controlApi/ControlApi";
import {Command_Type} from "@/proto/ssl_gc_state";
import ControlButton from "@/components/control/buttons/ControlButton.vue";
import {useMatchStateStore} from "@/store/matchState";

const store = useMatchStateStore()
const control = inject<ControlApi>('control-api')

const sendCommand = () => {
  control?.NewCommandNeutral(Command_Type.HALT)
}

const disable = computed(() => {
  return store.matchState.command?.type === Command_Type.HALT
})

</script>

<template>
  <ControlButton label="Halt" :disable="disable" :action="sendCommand" />
</template>
