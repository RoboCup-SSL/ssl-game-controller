<script setup lang="ts">

defineProps<{
  model: any,
  options: {
    label?: string;
    value: any;
  }[]
}>()
const emit = defineEmits(['onUpdate'])

const updateValue = (value: string) => {
  emit('onUpdate', value)
}
</script>

<template>
  <q-btn-toggle
    push
    glossy
    toggle-color="primary"
    color="white"
    text-color="primary"
    :options="options"
    :model-value="model"
    @update:modelValue="updateValue"
  />
</template>
