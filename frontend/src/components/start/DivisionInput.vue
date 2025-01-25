<script setup lang="ts">
import {computed, inject} from "vue";
import ButtonToggleInput from "@/components/common/ButtonToggleInput.vue";
import {useMatchStateStore} from "@/store/matchState";
import {type DivisionJson} from "@/proto/state/ssl_gc_common_pb";
import type {ControlApi} from "@/providers/controlApi";

const store = useMatchStateStore()
const control = inject<ControlApi>('control-api')

const model = computed(() => {
  return store.matchState.division
})
const options = [
  {label: 'Division A', value: 'DIV_A'},
  {label: 'Division B', value: 'DIV_B'}
]

const onChange = (newValue: DivisionJson) => {
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
