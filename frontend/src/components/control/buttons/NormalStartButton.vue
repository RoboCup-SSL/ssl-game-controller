<script setup lang="ts">
import {computed, inject} from "vue";
import type {ControlApi} from "@/providers/controlApi/ControlApi";
import {Command_Type} from "@/proto/ssl_gc_state";
import ControlButton from "@/components/control/buttons/ControlButton.vue";
import {useMatchStateStore} from "@/store/matchState";

const store = useMatchStateStore()
const control = inject<ControlApi>('control-api')

const sendCommand = () => {
  control?.NewCommandNeutral(Command_Type.NORMAL_START)
}

const disable = computed(() => {
  return store.matchState.command?.type === Command_Type.NORMAL_START || (!store.isKickoff && !store.isPenalty)
})

</script>

<template>
  <ControlButton label="Normal Start" :disable="disable" :action="sendCommand" />
</template>
