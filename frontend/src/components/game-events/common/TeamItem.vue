<script setup lang="ts">
import TeamInput from "@/components/common/TeamInput.vue";
import type {TeamJson} from "@/proto/state/ssl_gc_common_pb";

defineProps<{
  modelValue?: TeamJson,
  label?: string,
}>()

const emit = defineEmits<(event: 'update:modelValue', payload: TeamJson) => void>();

const updateValue = (v: TeamJson) => {
  emit('update:modelValue', v)
}

</script>

<template>
  <q-item>
    <q-item-section>
      <q-item-label v-if="label" caption>{{ label }}</q-item-label>
      <TeamInput
        :model-value="modelValue"
        @update:model-value="updateValue"
      />
    </q-item-section>
  </q-item>
</template>
