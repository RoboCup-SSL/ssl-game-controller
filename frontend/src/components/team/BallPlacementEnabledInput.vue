<script setup lang="ts">
import {computed, inject} from "vue";
import ToggleInput from "@/components/common/ToggleInput.vue";
import {useMatchStateStore} from "@/store/matchState";
import type {ControlApi} from "@/providers/controlApi";
import type {TeamJson} from "@/proto/state/ssl_gc_common_pb";

const props = defineProps<{
  team: TeamJson,
}>()

const store = useMatchStateStore()
const control = inject<ControlApi>('control-api')

const model = computed(() => {
  return store.matchState.teamState![props.team].canPlaceBall!
})

const disable = computed(() => {
  return store.matchState.division === 'DIV_A'
})

const onChange = (newValue: boolean) => {
  control?.UpdateTeamState({
    forTeam: props.team,
    canPlaceBall: newValue
  })
}
</script>

<template>
  <ToggleInput
    :modelValue="model"
    label="Perform ball placement"
    :disable="disable"
    @update:model-value="onChange"
  />
</template>
