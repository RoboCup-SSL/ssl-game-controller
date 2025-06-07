<script setup lang="ts" generic="T">

defineProps<{
  modelValue: T,
  options: T[],
  optionLabel?: (v: T) => string,
  label?: string,
}>()
const emit = defineEmits(['update:model-value'])

const updateValue = (value: T) => {
  emit('update:model-value', value)
}
</script>

<template>
  <q-select
    :options="options"
    :option-label="optionLabel"
    :label="label"
    :model-value="modelValue"
    @update:modelValue="updateValue"
  />
</template>
