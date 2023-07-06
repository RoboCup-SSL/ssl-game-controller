<script setup lang="ts">
import TeamBadge from "@/components/common/TeamBadge.vue";
import TimeoutRequestInput from "@/components/team/TimeoutRequestInput.vue";
import SubstitutionRequestInput from "@/components/team/SubstitutionRequestInput.vue";
import EmergencyRequestInput from "@/components/team/EmergencyRequestInput.vue";
import {useMatchStateStore} from "@/store/matchState";
import formatDuration from "format-duration";
import {teams} from "@/helpers";
import type {Team} from "@/proto/ssl_gc_common";
import {Referee_Stage} from "@/proto/ssl_gc_referee_message";
import {computed} from "vue";

const store = useMatchStateStore()

const teamName = (team: Team) => {
  return store.matchState.teamState?.[team].name!
}
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
const isShootout = computed(() => {
  return store.matchState.stage === Referee_Stage.PENALTY_SHOOTOUT
})
const penaltyAttempts = (team: Team) => {
  return store.matchState.shootoutState?.numberOfAttempts?.[team] || 0
}
</script>

<template>
  <div class="row justify-center q-gutter-sm">
    <q-list bordered dense v-for="team in teams" :key="team">
      <q-item-label header>
        <TeamBadge :team="team"/>
        {{ teamName(team) }}
      </q-item-label>

      <q-item v-ripple>
        <q-item-section>
          <TimeoutRequestInput :team="team"/>
        </q-item-section>
      </q-item>

      <q-item v-ripple>
        <q-item-section>
          <SubstitutionRequestInput :team="team"/>
        </q-item-section>
      </q-item>

      <q-item v-ripple>
        <q-item-section>
          <EmergencyRequestInput :team="team"/>
        </q-item-section>
      </q-item>

      <q-item v-ripple clickable @click="() => $router.push(`/team-settings/${team}/details`)">
        <q-item-section class="text-center">
          <q-item-label>
            {{ activeCards(team) }} &rArr; {{ maxBots(team) }}
          </q-item-label>
          <q-item-label caption>
            Active cards &rArr; max bots
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item v-ripple clickable @click="() => $router.push(`/team-settings/${team}/details`)">
        <q-item-section class="text-center">
          <q-item-label>
            {{ formatDuration(nextYellowCardDue(team) * 1000) }}
          </q-item-label>
          <q-item-label caption>
            Next yellow card due
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item v-ripple v-if="isShootout">
        <q-item-section class="text-center">
          <q-item-label>
            {{ penaltyAttempts(team) }}
          </q-item-label>
          <q-item-label caption>
            Number of penalty attempts
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>
