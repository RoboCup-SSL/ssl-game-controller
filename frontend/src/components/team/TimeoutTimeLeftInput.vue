<script setup lang="ts">
import {computed, inject} from "vue";
import NumberInput from "@/components/common/NumberInput.vue";
import {useMatchStateStore} from "@/store/matchState";
import type {TeamJson} from "@/proto/state/ssl_gc_common_pb";
import type {ControlApi} from "@/providers/controlApi";
import {durationSeconds} from "@/helpers";

const props = defineProps<{
  team: TeamJson,
}>()

const store = useMatchStateStore()
const control = inject<ControlApi>('control-api')

const model = computed(() => {
  return Math.round(durationSeconds(store.matchState.teamState![props.team].timeoutTimeLeft!))
})

const updateValue = (value: number | undefined) => {
  if (value !== undefined) {
    control?.UpdateTeamState({
      forTeam: props.team,
      timeoutTimeLeft: value.toString(),
    })
  }
}
</script>

<template>
  <NumberInput
    :modelValue="model"
    label="Timeout time left (seconds)"
    @update:model-value="updateValue"
  />
</template>
