<script setup lang="ts">
import TeamBadge from "@/components/common/TeamBadge.vue";
import type {Team} from "@/proto/ssl_gc_common";

defineProps<{
  label: string,
  action: () => any,
  disable?: boolean,
  team?: Team,
}>()

</script>

<template>
  <q-btn class="q-mx-md q-my-xs" color="primary" @click="action" :disable="disable" :label="label">
    <TeamBadge :team="team" floating/>
  </q-btn>
</template>
