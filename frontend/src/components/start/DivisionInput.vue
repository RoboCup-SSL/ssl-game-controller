<script setup lang="ts">
import {computed, inject} from "vue";
import ButtonToggleInput from "@/components/common/ButtonToggleInput.vue";
import {useMatchStateStore} from "@/store/matchState";
import {Division} from "@/proto/ssl_gc_common";
import type {ControlApi} from "@/providers/controlApi/ControlApi";

const store = useMatchStateStore()
const control = inject<ControlApi>('control-api')

const model = computed(() => {
  return store.matchState.division
})
const options = [
  {label: 'Division A', value: Division.DIV_A},
  {label: 'Division B', value: Division.DIV_B}
]

const onChange = (newValue: Division) => {
  control?.UpdateMatchConfig({division: newValue})
}
</script>

<template>
  <ButtonToggleInput
    :modelValue="model"
    :options="options"
    @update:model-value="onChange"
  />
</template>
