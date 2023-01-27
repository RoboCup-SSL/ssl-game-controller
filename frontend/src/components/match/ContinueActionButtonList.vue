<script setup lang="ts">
import {computed} from "vue";
import ContinueActionButton from "@/components/match/ContinueActionButton.vue";
import {useGcStateStore} from "@/store/gcState";

const store = useGcStateStore()

const actions = computed(() => {
  return store.gcState.continueActions!
})
</script>

<template>
  <div class="column">
    <ContinueActionButton
      v-for="(action, index) in actions"
      :key="index"
      :action="action"
      :id="index"
      class="col"
    />
  </div>
</template>
