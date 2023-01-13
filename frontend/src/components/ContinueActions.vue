<script setup lang="ts">
import {computed} from "vue";
import ContinueAction from "@/components/ContinueAction.vue";
import {useGcStateStore} from "@/store/gcState";

const store = useGcStateStore()

const actions = computed(() => {
  return store.gcState.continueActions!
})

</script>

<template>
  <div class="column">
    <ContinueAction class="col" :action="action" v-for="(action, key) in actions" :key="key"/>
  </div>
</template>
