<script setup lang="ts">
import {teamOptions} from "@/helpers";
import type {Team} from "@/proto/ssl_gc_common";

defineProps<{
  modelValue?: Team,
  label?: string,
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', payload: Team): void;
}>();

const updateValue = (v: Team) => {
  emit('update:modelValue', v)
}

</script>

<template>
  <q-btn-toggle
    glossy spread no-caps no-wrap
    :label="label"
    :options="teamOptions"
    :model-value="modelValue"
    @update:model-value="updateValue"
  />
</template>
