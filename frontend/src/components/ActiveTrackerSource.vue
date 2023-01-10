<script setup lang="ts">
import {computed} from "vue";
import {useGcStateStore} from "@/store/gcState";

const store = useGcStateStore()

const activeTrackerSource = computed(() => {
  return store.config.activeTrackerSource
})
</script>

<template>
  <span v-if="activeTrackerSource">
    Tracker source: {{ activeTrackerSource}}
  </span>
  <span v-else class="text-warning">
    No tracker source connected
  </span>
</template>
