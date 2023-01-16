<script setup lang="ts">

import TextInput from "@/components/common/TextInput.vue";

defineProps<{
  modelValue?: string,
  label?: string,
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', payload: string | undefined): void;
}>();

const updateValue = (v: string | undefined) => {
  emit('update:modelValue', v)
}

</script>

<template>
  <q-item>
    <q-item-section>
      <TextInput
        :label="label"
        :model-value="modelValue"
        @update:model-value="updateValue"
      />
    </q-item-section>
  </q-item>
</template>
