<script setup lang="ts">
import {computed} from "vue";
import {useGcStateStore} from "@/store/gcState";
import ContinueAction from "@/components/ContinueAction.vue";

const store = useGcStateStore()

const actions = computed(() => {
  return store.gcState.continueActions
})

</script>

<template>
  <div class="column">
    <ContinueAction class="col" :action="action" v-for="action in actions"/>
  </div>
</template>
