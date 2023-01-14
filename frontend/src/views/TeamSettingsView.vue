<script setup lang="ts">
import TeamBadge from "@/components/common/TeamBadge.vue";
import {Team} from "@/proto/ssl_gc_common";
import GoalKeeperId from "@/components/team/GoalKeeperId.vue";
import {useMatchStateStore} from "@/store/matchState";
import TimeoutsLeft from "@/components/team/TimeoutsLeft.vue";
import TimeoutTimeLeft from "@/components/team/TimeoutTimeLeft.vue";
import PlacementFailures from "@/components/team/PlacementFailures.vue";
import ChallengeFlags from "@/components/team/ChallengeFlags.vue";
import {useGcStateStore} from "@/store/gcState";
import GoalCount from "@/components/team/GoalCount.vue";

const store = useMatchStateStore()
const gcStore = useGcStateStore()

const teamName = (team: Team) => {
  return store.matchState.teamState?.[team].name!
}
const teams = [Team.YELLOW, Team.BLUE]

const remoteConnected = (team: Team) => {
  return gcStore.gcState.teamState![team].remoteControlConnected!
}
const teamConnected = (team: Team) => {
  return gcStore.gcState.teamState![team].connected!
}
const advantageChoice = (team: Team) => {
  return gcStore.gcState.teamState![team].advantageChoice?.choice!
}
const fouls = (team: Team) => {
  return store.matchState.teamState![team].fouls?.length
}
const yellowCards = (team: Team) => {
  return store.matchState.teamState![team].yellowCards?.length
}
const redCards = (team: Team) => {
  return store.matchState.teamState![team].redCards?.length
}
</script>

<template>
  <div class="q-ma-xl">
    <q-markup-table>
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
          Goals
        </td>
        <td class="text-center" v-for="team in teams" :key="team">
          <GoalCount :team="team"/>
        </td>
      </tr>
      <tr>
        <td class="text-left">
          Goal keeper id
        </td>
        <td class="text-center" v-for="team in teams" :key="team">
          <GoalKeeperId :team="team"/>
        </td>
      </tr>
      <tr>
        <td class="text-left">
          Timeouts left
        </td>
        <td class="text-center" v-for="team in teams" :key="team">
          <TimeoutsLeft :team="team"/>
        </td>
      </tr>
      <tr>
        <td class="text-left">
          Timeout time (seconds) left
        </td>
        <td class="text-center" v-for="team in teams" :key="team">
          <TimeoutTimeLeft :team="team"/>
        </td>
      </tr>
      <tr>
        <td class="text-left">
          Ball placement failures
        </td>
        <td class="text-center" v-for="team in teams" :key="team">
          <PlacementFailures :team="team"/>
        </td>
      </tr>
      <tr>
        <td class="text-left">
          Challenge flags
        </td>
        <td class="text-center" v-for="team in teams" :key="team">
          <ChallengeFlags :team="team"/>
        </td>
      </tr>
      <tr>
        <td class="text-left">
          Fouls
        </td>
        <td class="text-center" v-for="team in teams" :key="team">
          <router-link :to="'/team-settings/' + team + '/details'">
            {{ fouls(team) }}
          </router-link>
        </td>
      </tr>
      <tr>
        <td class="text-left">
          Yellow cards
        </td>
        <td class="text-center" v-for="team in teams" :key="team">
          <router-link :to="'/team-settings/' + team + '/details'">
            {{ yellowCards(team) }}
          </router-link>
        </td>
      </tr>
      <tr>
        <td class="text-left">
          Red cards
        </td>
        <td class="text-center" v-for="team in teams" :key="team">
          <router-link :to="'/team-settings/' + team + '/details'">
            {{ redCards(team) }}
          </router-link>
        </td>
      </tr>
      <tr>
        <td class="text-left">
          Remote control connected
        </td>
        <td class="text-center" v-for="team in teams" :key="team">
          <q-checkbox disable :model-value="remoteConnected(team)"/>
        </td>
      </tr>
      <tr>
        <td class="text-left">
          Team control connected
        </td>
        <td class="text-center" v-for="team in teams" :key="team">
          <q-checkbox disable :model-value="teamConnected(team)"/>
        </td>
      </tr>
      <tr>
        <td class="text-left">
          Advantage choice of team
        </td>
        <td class="text-center" v-for="team in teams" :key="team">
          {{ advantageChoice(team) }}
        </td>
      </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>
