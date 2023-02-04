<script setup lang="ts">
import {computed, inject} from "vue";
import NumberInput from "@/components/common/NumberInput.vue";
import {useMatchStateStore} from "@/store/matchState";
import type {Team} from "@/proto/ssl_gc_common";
import type {ControlApi} from "@/providers/controlApi/ControlApi";

const props = defineProps<{
  team: Team,
}>()

const store = useMatchStateStore()
const control = inject<ControlApi>('control-api')

const model = computed(() => {
  return store.matchState.teamState?.[props.team].goals!
})

const updateValue = (value: number | undefined) => {
  if (value !== undefined) {
    control?.UpdateTeamState({
      forTeam: props.team,
      goals: value,
    })
  }
}

</script>

<template>
  <NumberInput
    :modelValue="model"
    label="Goals"
    @update:model-value="updateValue"
  />
</template>
