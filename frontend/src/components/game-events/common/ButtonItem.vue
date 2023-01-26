<script setup lang="ts">

defineProps<{
  label?: string,
}>()

const emit = defineEmits(['click'])
const updateGameEvent = () => {
  emit('click')
}
</script>

<template>
  <q-item>
    <q-item-section>
      <q-btn
        dense
        :label="label"
        color="primary"
        @click="updateGameEvent"
      />
    </q-item-section>
  </q-item>
</template>
