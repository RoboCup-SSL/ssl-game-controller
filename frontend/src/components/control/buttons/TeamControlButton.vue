<script setup lang="ts">
import {Team} from "@/proto/ssl_gc_common";

defineProps<{
  text: string,
  team: Team,
}>()

const teamColor = function (team: Team) {
  switch (team) {
    case Team.BLUE:
      return 'blue-9'
    case Team.YELLOW:
      return 'yellow'
    default:
      return 'black'
  }
}
</script>

<template>
  <q-btn class="control-btn" color="primary">
    {{ text }}
    <q-icon class="team-icon" name="smart_toy" :color="teamColor(team)"/>
    {{ Team[team] }}
  </q-btn>
</template>

<style scoped>
.team-icon {
  margin-left: 0.3em;
  margin-right: 0.3em;
}
</style>
