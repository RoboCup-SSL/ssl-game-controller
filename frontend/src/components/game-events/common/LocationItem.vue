<script setup lang="ts">
import type {Vector2Json} from "@/proto/geom/ssl_gc_geometry_pb";
import NumberInput from "@/components/common/NumberInput.vue";

const props = defineProps<{
  modelValue?: Vector2Json,
  label?: string,
}>()

const emit = defineEmits<(event: 'update:modelValue', payload: Vector2Json | undefined) => void>();

const updateValue = (v: Vector2Json | undefined) => {
  emit('update:modelValue', v)
}
const updateX = (x: number | undefined) => {
  if (x !== null) {
    const y = props.modelValue?.y || 0
    updateValue({x, y})
  } else {
    updateValue(undefined)
  }
}
const updateY = (y: number | undefined) => {
  if (y !== null) {
    const x = props.modelValue?.x || 0
    updateValue({x, y})
  } else {
    updateValue(undefined)
  }
}

</script>

<template>
  <q-item>
    <q-item-section>
      <NumberInput
        :label="(label || 'location') + ' x (m)'"
        :model-value="modelValue?.x"
        @update:model-value="updateX"
      >
        <template v-slot:prepend>
          <q-icon name="close" @click="updateX(undefined)"/>
        </template>
      </NumberInput>
    </q-item-section>
    <q-item-section>
      <NumberInput
        :label="(label || 'location') + ' y (m)'"
        :model-value="modelValue?.y"
        @update:model-value="updateY"
      >
        <template v-slot:prepend>
          <q-icon name="close" @click="updateY(undefined)"/>
        </template>
      </NumberInput>
    </q-item-section>
  </q-item>
</template>
