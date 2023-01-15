<script setup lang="ts">

defineProps<{
  modelValue?: boolean,
  label?: string,
  disable?: boolean,
}>()
const emit = defineEmits(['update:modelValue'])

const updateValue = (value: boolean) => {
  emit('update:modelValue', value)
}
</script>

<template>
  <q-toggle
    :label="label"
    :disable="disable"
    :model-value="modelValue"
    @update:model-value="updateValue"
  />
</template>
