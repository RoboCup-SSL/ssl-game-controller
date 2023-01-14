<script setup lang="ts">
import {computed, inject} from "vue";
import {useMatchStateStore} from "@/store/matchState";
import type {Team} from "@/proto/ssl_gc_common";
import type {ControlApi} from "@/providers/controlApi/ControlApi";
import SelectInput from "@/components/common/SelectInput.vue";
import {useGcStateStore} from "@/store/gcState";

const props = defineProps<{
  team: Team,
}>()

const store = useMatchStateStore()
const gcStore = useGcStateStore()
const control = inject<ControlApi>('control-api')

const model = computed(() => {
  return store.matchState.teamState![props.team].name
})
const options = computed(() => {
  return gcStore.config.teams || []
})

const onUpdate = (value: string) => {
  control?.UpdateTeamState({
    forTeam: props.team,
    teamName: value,
  })
}
</script>

<template>
  <SelectInput
    :options="options"
    :model="model"
    label="Team name"
    @onUpdate="onUpdate"
  />
</template>
