<script setup lang="ts">
import {computed} from "vue";
import TeamBadge from "@/components/common/TeamBadge.vue";
import {Team} from "@/proto/ssl_gc_common";
import GoalKeeperId from "@/components/team/GoalKeeperId.vue";
import {useMatchStateStore} from "@/store/matchState";
import TimeoutsLeft from "@/components/team/TimeoutsLeft.vue";
import TimeoutTimeLeft from "@/components/team/TimeoutTimeLeft.vue";
import PlacementFailures from "@/components/team/PlacementFailures.vue";
import ChallengeFlags from "@/components/team/ChallengeFlags.vue";

const store = useMatchStateStore()

const teamNameYellow = computed(() => {
  return store.matchState.teamState?.[Team.YELLOW].name!
})
const teamNameBlue = computed(() => {
  return store.matchState.teamState?.[Team.BLUE].name!
})
</script>

<template>
  <div class="q-mx-xl">
    <div class="column">
      <div class="row">
        <div class="col label">
          {{ teamNameYellow }}
          <TeamBadge :team="Team.YELLOW"/>
        </div>
        <div class="col"></div>
        <div class="col label">
          {{ teamNameBlue }}
          <TeamBadge :team="Team.BLUE"/>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <GoalKeeperId :team="Team.YELLOW"/>
        </div>
        <div class="col label">
          goal keeper
        </div>
        <div class="col">
          <GoalKeeperId :team="Team.BLUE"/>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <TimeoutsLeft :team="Team.YELLOW"/>
        </div>
        <div class="col label">
          timeouts left
        </div>
        <div class="col">
          <TimeoutsLeft :team="Team.BLUE"/>
        </div>
      </div>
      <div class="row full-width">
        <div class="col">
          <TimeoutTimeLeft :team="Team.YELLOW"/>
        </div>
        <div class="col label">
          timeout seconds left
        </div>
        <div class="col">
          <TimeoutTimeLeft :team="Team.BLUE"/>
        </div>
      </div>
      <div class="row full-width">
        <div class="col">
          <PlacementFailures :team="Team.YELLOW"/>
        </div>
        <div class="col label">
          placement failures
        </div>
        <div class="col">
          <PlacementFailures :team="Team.BLUE"/>
        </div>
      </div>
      <div class="row full-width">
        <div class="col">
          <ChallengeFlags :team="Team.YELLOW"/>
        </div>
        <div class="col label">
          challenge flags left
        </div>
        <div class="col">
          <ChallengeFlags :team="Team.BLUE"/>
        </div>
      </div>
      <div class="row full-width">
        <div class="col">
          <q-separator spaced/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.label {
  text-align: center;
  margin: auto;
  font-size: large;
  text-transform: uppercase;
}
</style>
