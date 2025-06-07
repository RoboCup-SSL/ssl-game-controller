<script setup lang="ts" generic="T">

defineProps<{
  modelValue?: T,
  options: {
    label?: string;
    value: T;
  }[]
}>()
const emit = defineEmits(['update:model-value'])

const updateValue = (value: T) => {
  emit('update:model-value', value)
}
</script>

<template>
  <q-btn-toggle
    :options="options"
    :model-value="modelValue"
    @update:modelValue="updateValue"
  />
</template>
