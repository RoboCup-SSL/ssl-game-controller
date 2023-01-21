<script setup lang="ts">
import {computed} from "vue";
import {useGcStateStore} from "@/store/gcState";

const store = useGcStateStore()

const numTrackerSource = computed(() => {
  return Object.keys(store.gcState.trackers!).length
})
const numAutoRefs = computed(() => {
  return Object.keys(store.gcState.autoRefState!).length
})
const warn = computed(() => {
  return numTrackerSource.value === 0 || numAutoRefs.value === 0
})
</script>

<template>
  <span :class="{'text-warning': warn}">
  Auto-Referees: {{ numAutoRefs }} | Tracker Sources: {{ numTrackerSource }}
  </span>
</template>
