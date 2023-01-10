<script setup lang="ts">
import {computed, ref, watch} from "vue";

const props = defineProps<{
  model: number,
  suffix?: string,
}>()
const emit = defineEmits(['onUpdate'])

const model = ref(structuredClone(props.model))
const value = computed(() => props.model)
watch(value, (newValue) => {
  model.value = newValue
})

const onBlur = () => {
  if (model.value !== value.value) {
    emit('onUpdate', model.value)
    model.value = structuredClone(value.value)
  }
}
</script>

<template>
  <q-input
    input-class="text-center"
    rounded outlined
    dense
    :suffix="suffix"
    type="number"
    v-model="model"
    @blur="onBlur"
  />
</template>
