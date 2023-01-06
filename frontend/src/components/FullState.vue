<script setup lang="ts">
import {useMatchStateStore} from "@/store/matchState";

const store = useMatchStateStore()
</script>

<template>
  <main>
    <div class="full-state">
      <pre>{{ JSON.stringify(store.matchState, null, 2) }}</pre>
    </div>
  </main>
</template>

<style scoped>
.full-state {
  margin: 10px
}
</style>
