<script setup lang="ts">
import TeamBadge from "@/components/common/TeamBadge.vue";
import {Team} from "@/proto/ssl_gc_common";
import GoalKeeperId from "@/components/team/GoalKeeperId.vue";
import {useMatchStateStore} from "@/store/matchState";
import TimeoutsLeft from "@/components/team/TimeoutsLeft.vue";
import TimeoutTimeLeft from "@/components/team/TimeoutTimeLeft.vue";
import PlacementFailures from "@/components/team/PlacementFailures.vue";
import ChallengeFlags from "@/components/team/ChallengeFlags.vue";

const store = useMatchStateStore()

const teamName = (team: Team) => {
  return store.matchState.teamState?.[team].name!
}
const teams = [Team.YELLOW, Team.BLUE]
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
      </tbody>
    </q-markup-table>
  </div>
</template>
