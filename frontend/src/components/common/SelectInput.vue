<script setup lang="ts">
import {computed, ref, watch} from "vue";

const props = defineProps<{
  model: string,
  options: string[],
}>()
const emit = defineEmits(['onUpdate'])

const model = ref(structuredClone(props.model))
const value = computed(() => props.model)
watch(value, (newValue) => {
  model.value = newValue
})

const onUpdate = () => {
  if (model.value !== value.value) {
    emit('onUpdate', model.value)
    model.value = structuredClone(value.value)
  }
}
</script>

<template>
  <q-select v-model="model" :options="options" @click="onUpdate"/>
</template>
