<script setup lang="ts">

defineProps<{
  modelValue?: number,
  label?: string,
}>()
const emit = defineEmits<{
  (event: 'update:modelValue', payload: number | undefined): void;
}>();

const updateValue = (value: string | number | null) => {
  if (value !== null) {
    if (typeof value === 'string') {
      emit('update:modelValue', parseFloat(value))
    } else {
      emit('update:modelValue', value)
    }
  } else {
    emit('update:modelValue', undefined)
  }
}
</script>

<template>
  <q-input
    input-class="text-center"
    dense
    :label="label"
    type="number"
    :model-value="modelValue"
    @update:model-value="updateValue"
  >
    <template v-slot:prepend>
      <q-icon name="close" @click="updateValue(null)"/>
    </template>
  </q-input>
</template>
