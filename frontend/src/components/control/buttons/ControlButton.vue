<script setup lang="ts">
defineProps<{
  label: string,
  action: () => any,
  disable: boolean,
}>()

</script>

<template>
  <q-btn class="control-btn" color="primary" @click="action()" :disable="disable" :label="label" />
</template>
