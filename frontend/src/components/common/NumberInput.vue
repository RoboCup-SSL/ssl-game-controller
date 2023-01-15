<script setup lang="ts">

defineProps<{
  value: number,
  label?: string,
}>()
const emit = defineEmits(['onUpdate'])

const updateValue = (value: string | number | null) => {
  emit('onUpdate', value)
}
</script>

<template>
  <q-input
    input-class="text-center"
    rounded outlined
    dense
    :label="label"
    type="number"
    :model-value="value"
    @update:model-value="updateValue"
  />
</template>
