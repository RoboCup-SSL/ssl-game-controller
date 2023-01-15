<script setup lang="ts">

defineProps<{
  model: any,
  options: string[],
  optionLabel?: (v: any) => string,
  label?: string,
}>()
const emit = defineEmits(['onUpdate'])

const updateValue = (value: any) => {
  emit('onUpdate', value)
}
</script>

<template>
  <q-select
    :options="options"
    :option-label="optionLabel"
    :label="label"
    :model-value="model"
    @update:modelValue="updateValue"
  />
</template>
