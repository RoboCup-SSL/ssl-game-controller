<script setup lang="ts">
import {teamOptions} from "@/helpers";
import type {TeamJson} from "@/proto/state/ssl_gc_common_pb";

defineProps<{
  modelValue?: TeamJson,
}>()

const emit = defineEmits<(event: 'update:modelValue', payload: TeamJson) => void>();

const updateValue = (v: TeamJson) => {
  emit('update:modelValue', v)
}

</script>

<template>
  <q-btn-toggle
    spread no-wrap
    :options="teamOptions"
    :model-value="modelValue"
    @update:model-value="updateValue"
  />
</template>
