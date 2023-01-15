<script setup lang="ts">

defineProps<{
  model: boolean,
  label?: string,
  disable?: boolean,
}>()
const emit = defineEmits(['onUpdate'])

const updateValue = (value: boolean) => {
  emit('onUpdate', value)
}
</script>

<template>
  <q-toggle
    :label="label"
    :disable="disable"
    :model-value="model"
    @update:model-value="updateValue"
  />
</template>
