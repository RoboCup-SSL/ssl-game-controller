<script setup lang="ts">
import NumberInput from "@/components/common/NumberInput.vue";

defineProps<{
  modelValue?: number,
  label?: string,
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', payload: number | undefined): void;
}>();

const updateValue = (v: number | undefined) => {
  emit('update:modelValue', v)
}

</script>

<template>
  <q-item>
    <q-item-section>
      <NumberInput
        :label="label"
        :model-value="modelValue"
        @update:model-value="updateValue"
      />
    </q-item-section>
  </q-item>
</template>
