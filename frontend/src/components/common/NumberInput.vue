<script setup lang="ts">
import {computed, ref, watch} from "vue";

const props = defineProps<{
  value: number,
  onUpdate: (value: number) => any
}>()

const model = ref(structuredClone(props.value))
const value = computed(() => props.value)
watch(value, (newValue) => {
  model.value = newValue
})

const onBlur = () => {
  if (model.value !== value.value) {
    props.onUpdate(model.value)
    model.value = structuredClone(value.value)
  }
}
</script>

<template>
  <q-input
    filled
    type="number"
    v-model="model"
    @blur="onBlur"
  />
</template>
