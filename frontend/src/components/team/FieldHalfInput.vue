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
  return store.matchState.teamState![props.team].onPositiveHalf!
})

const updateValue = (value: boolean) => {
  control?.UpdateTeamState({
    forTeam: props.team,
    onPositiveHalf: value,
  })
}
</script>

<template>
  <ToggleInput
    :modelValue="model"
    label="Goal on positive field half"
    @update:model-value="updateValue"
  />
</template>
