<script setup lang="ts">
import TeamInput from "@/components/common/TeamInput.vue";
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
