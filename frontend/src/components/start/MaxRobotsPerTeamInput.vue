<script setup lang="ts">
import {computed, inject} from "vue";
import NumberInput from "@/components/common/NumberInput.vue";
import {useMatchStateStore} from "@/store/matchState";
import type {ControlApi} from "@/providers/controlApi";

const store = useMatchStateStore()
const control = inject<ControlApi>('control-api')

const model = computed(() => {
  return store.matchState.maxBotsPerTeam
})

const updateValue = (value: number | undefined) => {
  if (value !== undefined) {
    control?.UpdateMatchConfig({
      maxRobotsPerTeam: value,
    })
  }
}

</script>

<template>
  <NumberInput
      :modelValue="model"
      label="Max robots"
      @update:model-value="updateValue"
  />
</template>
