<script setup lang="ts">
import {computed, inject} from "vue";
import {ControlApi} from "@/providers/controlApi/ControlApi";
import {Command} from "@/proto/ssl_gc_state";
import ControlButton from "@/components/control/buttons/ControlButton.vue";
import {useMatchStateStore} from "@/store/matchState";
import Type = Command.Type;

const store = useMatchStateStore()
const control = inject<ControlApi>('control-api')

const sendCommand = () => {
  control?.NewCommandNeutral(Type.NORMAL_START)
}

const disable = computed(() => {
  return !store.isKickoff && !store.isPenalty
})

</script>

<template>
  <ControlButton label="Normal Start" :disable="disable" :action="sendCommand" />
</template>
