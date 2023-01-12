<script setup lang="ts">
import {computed, inject} from "vue";
import {ControlApi} from "@/providers/controlApi/ControlApi";
import ToggleInput from "@/components/common/ToggleInput.vue";
import {Team} from "@/proto/ssl_gc_common";
import {useMatchStateStore} from "@/store/matchState";

const props = defineProps<{
  team: Team,
}>()

const store = useMatchStateStore()
const control = inject<ControlApi>('control-api')

const model = computed(() => {
  return store.matchState.teamState![props.team].requestsTimeoutSince !== undefined
})

const onChange = (newValue: boolean) => {
  control?.UpdateTeamState({
    forTeam: props.team,
    requestsTimeout: newValue
  })
}
</script>

<template>
  <ToggleInput :model="model" @onUpdate="onChange"/>
</template>
