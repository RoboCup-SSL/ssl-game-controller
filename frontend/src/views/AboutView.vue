<template>
  <div class="about">
    <FullState/>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
<script setup lang="ts">
import FullState from "@/components/FullState.vue";
</script>
