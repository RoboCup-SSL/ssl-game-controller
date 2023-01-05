<script setup lang="ts">
import {computed, inject} from "vue";
import {ControlApi} from "@/providers/controlApi/ControlApi";
import {Command} from "@/proto/ssl_gc_state";
import ControlButton from "@/components/control/buttons/ControlButton.vue";
import {useMatchStateStore} from "@/store/matchState";
import {Team} from "@/proto/ssl_gc_common";
import Type = Command.Type;

const props = defineProps<{
  team: Team,
}>()

const store = useMatchStateStore()
const control = inject<ControlApi>('control-api')

const sendCommand = () => {
  control?.NewCommandForTeam(Type.PENALTY, props.team)
}

const disable = computed(() => {
  return !store.isStop
})

</script>

<template>
  <ControlButton label="Penalty" :disable="disable" :action="sendCommand"/>
</template>
