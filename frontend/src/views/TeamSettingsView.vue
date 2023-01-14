<script setup lang="ts">
import TeamBadge from "@/components/common/TeamBadge.vue";
import GoalKeeperIdInput from "@/components/team/GoalKeeperIdInput.vue";
import GoalCountInput from "@/components/team/GoalCountInput.vue";
import TimeoutsLeftInput from "@/components/team/TimeoutsLeftInput.vue";
import TimeoutTimeLeftInput from "@/components/team/TimeoutTimeLeftInput.vue";
import PlacementFailuresInput from "@/components/team/PlacementFailuresInput.vue";
import ChallengeFlagsInput from "@/components/team/ChallengeFlagsInput.vue";
import {useMatchStateStore} from "@/store/matchState";
import {useGcStateStore} from "@/store/gcState";
import {teams} from "@/helpers";
import type {Team} from "@/proto/ssl_gc_common";

const store = useMatchStateStore()
const gcStore = useGcStateStore()

const teamName = (team: Team) => {
  return store.matchState.teamState?.[team].name!
}
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
  <div class="q-ma-md row justify-center q-gutter-md">
    <q-list bordered padding v-for="team in teams" :key="team">
      <q-item-label header>
        {{ teamName(team) }}
        <TeamBadge :team="team"/>
      </q-item-label>

      <q-item v-ripple>
        <q-item-section>
          <GoalCountInput :team="team"/>
        </q-item-section>
      </q-item>

      <q-item v-ripple>
        <q-item-section>
          <GoalKeeperIdInput :team="team"/>
        </q-item-section>
      </q-item>

      <q-item v-ripple>
        <q-item-section>
          <TimeoutsLeftInput :team="team"/>
        </q-item-section>
      </q-item>

      <q-item v-ripple>
        <q-item-section>
          <TimeoutTimeLeftInput :team="team"/>
        </q-item-section>
      </q-item>

      <q-item v-ripple>
        <q-item-section>
          <PlacementFailuresInput :team="team"/>
        </q-item-section>
      </q-item>

      <q-item v-ripple>
        <q-item-section>
          <ChallengeFlagsInput :team="team"/>
        </q-item-section>
      </q-item>

      <q-item v-ripple clickable @click="() => $router.push(`/team-settings/${team}/details`)">
        <q-item-section class="text-center">
          <q-item-label>{{ fouls(team) }}</q-item-label>
          <q-item-label caption>
            Fouls
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item v-ripple clickable @click="() => $router.push(`/team-settings/${team}/details`)">
        <q-item-section class="text-center">
          <q-item-label>{{ yellowCards(team) }}</q-item-label>
          <q-item-label caption>
            Yellow cards
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item v-ripple clickable @click="() => $router.push(`/team-settings/${team}/details`)">
        <q-item-section class="text-center">
          <q-item-label>{{ redCards(team) }}</q-item-label>
          <q-item-label caption>
            Red cards
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item v-ripple>
        <q-item-section class="text-center">
          <q-item-label>
            <q-checkbox
              disable
              :model-value="remoteConnected(team)"
            />
          </q-item-label>
          <q-item-label caption>
            Remote connected
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item v-ripple>
        <q-item-section class="text-center">
          <q-item-label>
            <q-checkbox
              disable
              :model-value="teamConnected(team)"
            />
          </q-item-label>
          <q-item-label caption>
            Team connected
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item v-ripple>
        <q-item-section class="text-center">
          <q-item-label>{{ advantageChoice(team) }}</q-item-label>
          <q-item-label caption>
            Advantage choice
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>
