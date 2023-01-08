<script setup lang="ts">
import {Team} from "@/proto/ssl_gc_common";

defineProps<{
  label: string,
  action: () => any,
  disable?: boolean,
  team?: Team,
}>()

</script>

<template>
  <q-btn class="q-mx-md q-my-xs" color="primary" @click="action()" :disable="disable" :label="label">
    <q-badge v-if="team === Team.YELLOW" color="team-yellow" floating>Yellow</q-badge>
    <q-badge v-else-if="team === Team.BLUE" color="team-blue" floating>Blue</q-badge>
  </q-btn>
</template>
