<script setup lang="ts">
import {computed, inject} from "vue";
import ToggleInput from "@/components/common/ToggleInput.vue";
import {useMatchStateStore} from "@/store/matchState";
import type {ControlApi} from "@/providers/controlApi/ControlApi";
import type {Team} from "@/proto/ssl_gc_common";

const props = defineProps<{
  team: Team,
}>()

const store = useMatchStateStore()
const control = inject<ControlApi>('control-api')

const model = computed(() => {
  return store.matchState.teamState![props.team].requestsTimeoutSince !== undefined
})

const disable = computed(() => {
  return store.matchState.teamState![props.team].timeoutsLeft! <= 0
})

const onChange = (newValue: boolean) => {
  control?.UpdateTeamState({
    forTeam: props.team,
    requestsTimeout: newValue
  })
}
</script>

<template>
  <ToggleInput
    :modelValue="model"
    :disable="disable"
    label="Timeout request"
    @update:model-value="onChange"
  />
</template>
