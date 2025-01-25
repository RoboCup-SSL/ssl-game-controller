<script setup lang="ts">
import TeamBadge from "@/components/common/TeamBadge.vue";
import TimeoutRequestInput from "@/components/team/TimeoutRequestInput.vue";
import SubstitutionRequestInput from "@/components/team/SubstitutionRequestInput.vue";
import EmergencyRequestInput from "@/components/team/EmergencyRequestInput.vue";
import {useMatchStateStore} from "@/store/matchState";
import formatDuration from "format-duration";
import {durationSeconds, teams} from "@/helpers";
import type {TeamJson} from "@/proto/state/ssl_gc_common_pb";
import {computed} from "vue";

const store = useMatchStateStore()

const teamName = (team: TeamJson) => {
  return store.matchState.teamState?.[team].name!
}
const activeCards = (team: TeamJson) => {
  const numYellow = store.matchState.teamState?.[team].yellowCards?.filter(c => c.timeRemaining && durationSeconds(c.timeRemaining) > 0).length || 0
  const numRed = store.matchState.teamState?.[team].redCards?.length || 0
  return numYellow + numRed
}
const maxBots = (team: TeamJson) => {
  return store.matchState.teamState?.[team].maxAllowedBots || 0
}
const nextYellowCardDue = (team: TeamJson) => {
  const activeYellowCards = store.matchState.teamState?.[team].yellowCards
    ?.filter(c => c.timeRemaining && durationSeconds(c.timeRemaining) > 0)
    ?.sort((a, b) => durationSeconds(a.timeRemaining!) - durationSeconds(b.timeRemaining!))
  if ((activeYellowCards?.length || 0) > 0) {
    return durationSeconds(activeYellowCards![0].timeRemaining!)
  }
  return 0
}
const isShootout = computed(() => {
  return store.matchState.stage === 'PENALTY_SHOOTOUT'
})
const penaltyAttempts = (team: TeamJson) => {
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
