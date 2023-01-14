<script setup lang="ts">
import {computed} from "vue";
import ContinueActionButton from "@/components/ContinueActionButton.vue";
import {useGcStateStore} from "@/store/gcState";

const store = useGcStateStore()

const actions = computed(() => {
  return store.gcState.continueActions!
})
</script>

<template>
  <div class="column">
    <ContinueActionButton
      v-for="(action, key) in actions"
      :key="key"
      :action="action"
      class="col"
    />
  </div>
</template>
