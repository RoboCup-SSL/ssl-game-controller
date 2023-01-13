<script setup lang="ts">
import {computed, ref, toRaw, watch} from "vue";

const props = defineProps<{
  model: boolean,
  label?: string,
  disable?: boolean,
}>()
const emit = defineEmits(['onUpdate'])

const model = ref(structuredClone(props.model))
const value = computed(() => props.model)
watch(value, (newValue) => {
  model.value = newValue
})

const click = () => {
  if (model.value !== value.value) {
    emit('onUpdate', model.value)
    model.value = structuredClone(toRaw(value.value))
  }
}
</script>

<template>
  <q-toggle
    v-model="model"
    :label="label"
    :disable="disable"
    @click="click"
  />
</template>
