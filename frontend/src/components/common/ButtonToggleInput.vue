<script setup lang="ts">

defineProps<{
  modelValue?: any,
  options: {
    label?: string;
    value: any;
  }[]
}>()
const emit = defineEmits(['update:model-value'])

const updateValue = (value: string) => {
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
