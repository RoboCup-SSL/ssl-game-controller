<script setup lang="ts">
import {Config_Behavior} from "@/proto/ssl_gc_engine_config";

defineProps<{
  modelValue: Config_Behavior
}>()
const emit = defineEmits(['update:model-value'])

const options = [
  {value: Config_Behavior.BEHAVIOR_ACCEPT, label: "Accept"},
  {value: Config_Behavior.BEHAVIOR_ACCEPT_MAJORITY, label: "Majority"},
  {value: Config_Behavior.BEHAVIOR_PROPOSE_ONLY, label: "Propose"},
  {value: Config_Behavior.BEHAVIOR_LOG, label: "Log"},
  {value: Config_Behavior.BEHAVIOR_IGNORE, label: "Ignore"},
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
