<script setup lang="ts">
import {useMatchStateStore} from "@/store/matchState";
import {Team} from "@/proto/ssl_gc_common";
import FreeKickButton from "@/components/control/buttons/FreeKickButton.vue";
import KickoffButton from "@/components/control/buttons/KickoffButton.vue";
import PenaltyButton from "@/components/control/buttons/PenaltyButton.vue";
import YellowCardButton from "@/components/control/buttons/YellowCardButton.vue";
import RedCardButton from "@/components/control/buttons/RedCardButton.vue";
import GoalButton from "@/components/control/buttons/GoalButton.vue";
import TimeoutButton from "@/components/control/buttons/TimeoutButton.vue";

defineProps<{
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

const store = useMatchStateStore()
</script>

<template>
  <div>

    <div class="column nowrap">
      <div class="header">
        <q-icon class="team-icon" name="smart_toy" :color="teamColor(team)"/>
        {{ Team[team] }}
      </div>
      <FreeKickButton :team="team" class="q-my-sm"/>
      <KickoffButton :team="team" class="q-my-sm"/>
      <PenaltyButton :team="team" class="q-my-sm"/>
      <q-separator spaced/>
      <YellowCardButton :team="team" class="q-my-sm"/>
      <RedCardButton :team="team" class="q-my-sm"/>
      <GoalButton :team="team" class="q-my-sm"/>
      <TimeoutButton :team="team" class="q-my-sm"/>
    </div>
  </div>
</template>

<style scoped>
.header {
  text-align: center;
  font-size: medium;
}
</style>
