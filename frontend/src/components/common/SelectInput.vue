<script setup lang="ts">

defineProps<{
  modelValue: any,
  options: string[],
  optionLabel?: (v: any) => string,
  label?: string,
}>()
const emit = defineEmits(['update:model-value'])

const updateValue = (value: any) => {
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
