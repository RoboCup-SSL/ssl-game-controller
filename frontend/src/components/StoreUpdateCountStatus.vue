<script setup lang="ts">
import {useMatchStateStore} from "@/store/matchState";
import {useGcStateStore} from "@/store/gcState";

const store = useMatchStateStore()
const gcStore = useGcStateStore()

</script>

<template>
  <div class="row">
    <div class="q-mx-xs">
      {{ store.matchStateUpdateCount }}
    </div>
    <div class="q-mx-xs">
      {{ gcStore.gcStateUpdateCount }}
    </div>
    <div class="q-mx-xs">
      {{ gcStore.configUpdateCount }}
    </div>
  </div>
</template>
