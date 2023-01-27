<script setup lang="ts">
import {computed, inject} from "vue";
import ToggleInput from "@/components/common/ToggleInput.vue";
import {useGcStateStore} from "@/store/gcState";
import type {ControlApi} from "@/providers/controlApi/ControlApi";

const store = useGcStateStore()
const control = inject<ControlApi>('control-api')

const model = computed(() => {
  return store.config.autoContinue || false
})

const onChange = () => {
  control?.ChangeConfig({autoContinue: !model.value})
}
</script>

<template>
  <ToggleInput
    :modelValue="model"
    label="Continue automatically (Ctrl+Space)"
    @update:model-value="onChange"
  />
</template>
