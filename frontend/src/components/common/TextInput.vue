<script setup lang="ts">

import {inject} from "vue";
import type {Shortcuts} from "@/providers/shortcuts";

defineProps<{
  modelValue?: string,
  label?: string,
  clearable?: boolean,
}>()

const emit = defineEmits<(event: 'update:modelValue', payload: string | undefined) => void>();

const shortcuts = inject<Shortcuts>('shortcuts')!
const onFocusin = () => shortcuts.disable()
const onFocusout = () => shortcuts.enable()

const updateValue = (v: string | number | null) => {
  if (v) {
    if (typeof v === 'number') {
      emit('update:modelValue', v.toString())
    } else {
      emit('update:modelValue', v)
    }
  } else {
    emit('update:modelValue', undefined)
  }
}

</script>

<template>
  <q-input
    :label="label"
    :model-value="modelValue"
    @update:model-value="updateValue"
    @focusin="onFocusin"
    @focusout="onFocusout"
  >
    <template v-slot:prepend v-if="clearable">
      <q-icon name="clear" @click="updateValue(null)"/>
    </template>
  </q-input>
</template>
