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

const currentKeeperId = computed(() => {
  return store.matchState.teamState?.[props.team].goalkeeper!
})

const updateValue = (value: number | undefined) => {
  if (value !== undefined) {
    control?.UpdateTeamState({
      forTeam: props.team,
      goalkeeper: value,
    })
  }
}

</script>

<template>
  <NumberInput
    :modelValue="currentKeeperId"
    @update:model-value="updateValue"
    label="Keeper id"
  />
</template>
