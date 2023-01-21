<script setup lang="ts">
import {AutoRefConfig_Behavior} from "@/proto/ssl_gc_engine_config";

defineProps<{
  modelValue: AutoRefConfig_Behavior
}>()
const emit = defineEmits(['update:model-value'])

const options = [
  {value: AutoRefConfig_Behavior.BEHAVIOR_ACCEPT, label: "Accept"},
  {value: AutoRefConfig_Behavior.BEHAVIOR_LOG, label: "Log"},
  {value: AutoRefConfig_Behavior.BEHAVIOR_IGNORE, label: "Ignore"},
]

const updateValue = (value: any) => {
  emit('update:model-value', value)
}
</script>

<template>
  <q-btn-toggle
    :model-value="modelValue"
    :options="options"
    @update:model-value="updateValue"
  />
</template>
