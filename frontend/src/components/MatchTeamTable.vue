<script setup lang="ts">
import TeamBadge from "@/components/common/TeamBadge.vue";
import TimeoutRequestInput from "@/components/team/TimeoutRequestInput.vue";
import SubstitutionRequestInput from "@/components/team/SubstitutionRequestInput.vue";
import EmergencyRequestInput from "@/components/team/EmergencyRequestInput.vue";
import {useMatchStateStore} from "@/store/matchState";
import formatDuration from "format-duration";
import {Team} from "@/proto/ssl_gc_common";

const store = useMatchStateStore()

const teamName = (team: Team) => {
  return store.matchState.teamState?.[team].name!
}
const teams = [Team.YELLOW, Team.BLUE]

const activeCards = (team: Team) => {
  const numYellow = store.matchState.teamState?.[team].yellowCards?.filter(c => c.timeRemaining && c.timeRemaining.seconds > 0).length || 0
  const numRed = store.matchState.teamState?.[team].redCards?.length || 0
  return numYellow + numRed
}
const maxBots = (team: Team) => {
  return store.matchState.teamState?.[team].maxAllowedBots || 0
}
const nextYellowCardDue = (team: Team) => {
  const activeYellowCards = store.matchState.teamState?.[team].yellowCards
    ?.filter(c => c.timeRemaining && c.timeRemaining.seconds > 0)
    ?.sort((a, b) => a.timeRemaining?.seconds! - b.timeRemaining?.seconds!)
  if ((activeYellowCards?.length || 0) > 0) {
    return activeYellowCards![0].timeRemaining?.seconds!
  }
  return 0
}
</script>

<template>
  <q-markup-table dense>
    <thead>
    <tr>
      <th class="text-left" scope="col"></th>
      <th class="text-center" scope="col" v-for="team in teams" :key="team">
        {{ teamName(team) }}
        <TeamBadge :team="team"/>
      </th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td class="text-left">
        Request timeout
      </td>
      <td class="text-center" v-for="team in teams" :key="team">
        <TimeoutRequestInput :team="team"/>
      </td>
    </tr>
    <tr>
      <td class="text-left">
        Request bot substitution
      </td>
      <td class="text-center" v-for="team in teams" :key="team">
        <SubstitutionRequestInput :team="team"/>
      </td>
    </tr>
    <tr>
      <td class="text-left">
        Request emergency
      </td>
      <td class="text-center" v-for="team in teams" :key="team">
        <EmergencyRequestInput :team="team"/>
      </td>
    </tr>
    <tr>
      <td class="text-left">
        Active cards / max bots
      </td>
      <td class="text-center" v-for="team in teams" :key="team">
        {{ activeCards(team) }} &rArr; {{ maxBots(team) }}
      </td>
    </tr>
    <tr>
      <td class="text-left">
        Next yellow card due
      </td>
      <td class="text-center" v-for="team in teams" :key="team">
        {{ formatDuration(nextYellowCardDue(team) * 1000) }}
      </td>
    </tr>
    </tbody>
  </q-markup-table>
</template>
