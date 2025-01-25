<script setup lang="ts">
import {type AutoRefConfig_BehaviorJson} from "@/proto/engine/ssl_gc_engine_config_pb";

defineProps<{
  modelValue: AutoRefConfig_BehaviorJson
}>()
const emit = defineEmits(['update:model-value'])

const options = [
  {value: 'BEHAVIOR_ACCEPT', label: "Accept"},
  {value: 'BEHAVIOR_LOG', label: "Log"},
  {value: 'BEHAVIOR_IGNORE', label: "Ignore"},
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
