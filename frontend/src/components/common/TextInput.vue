<script setup lang="ts">

defineProps<{
  modelValue?: string,
  label?: string,
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', payload: string | undefined): void;
}>();

const updateValue = (v: string | number | null) => {
  if (v) {
    if (typeof v === 'number') {
      emit('update:modelValue', v.toString())
    } else {
      emit('update:modelValue', v)
    }
  } else {
    emit('update:modelValue', undefined)
  }
}

</script>

<template>
  <q-input
    :label="label"
    :model-value="modelValue"
    @update:model-value="updateValue"
  >
    <template v-slot:prepend>
      <q-icon name="close" @click="updateValue(null)"/>
    </template>
  </q-input>
</template>
