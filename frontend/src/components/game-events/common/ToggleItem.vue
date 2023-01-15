<script setup lang="ts">
import ToggleInput from "@/components/common/ToggleInput.vue";

defineProps<{
  modelValue?: boolean,
  label?: string,
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', payload: boolean | undefined): void;
}>();

const updateValue = (v: boolean | undefined) => {
  emit('update:modelValue', v)
}

</script>

<template>
  <q-item>
    <q-item-section>
      <ToggleInput
        :label="label"
        :model-value="modelValue"
        @update:model-value="updateValue"
      />
    </q-item-section>
  </q-item>
</template>
