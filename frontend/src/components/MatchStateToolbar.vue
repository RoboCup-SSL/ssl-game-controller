<script setup lang="ts">
import {computed, ref} from "vue";
import TeamBadge from "@/components/common/TeamBadge.vue";
import {useMatchStateStore} from "@/store/matchState";
import formatDuration from "format-duration";
import {stageName} from "@/helpers/texts";
import {Team} from "@/proto/ssl_gc_common";

const store = useMatchStateStore()
const now = ref(Date.now())
setInterval(() => {
  now.value = Date.now()
}, 1000)

const matchDuration = computed(() => {
  if (store.matchState.matchTimeStart && store.matchState.matchTimeStart.getTime() > 0) {
    return formatDuration(now.value - store.matchState.matchTimeStart.getTime())
  }
  return "-"
})
const stageTimeLeft = computed(() => {
  if (store.matchState.stageTimeLeft) {
    return formatDuration(store.matchState.stageTimeLeft.seconds * 1000)
  }
  return "-"
})
const stage = computed(() => {
  return stageName(store.matchState.stage!)
})
const gameState = computed(() => {
  return store.matchState.gameState
})
const currentActionTime = computed(() => {
  if (store.matchState.currentActionTimeRemaining
    && store.matchState.currentActionTimeRemaining.seconds > 0) {
    return formatDuration(store.matchState.currentActionTimeRemaining.seconds * 1000)
  }
  return undefined
})
const goals = (team: Team) => {
  return store.matchState.teamState![team].goals!
}
</script>

<template>
  <q-toolbar inset>
    <div class="row justify-evenly full-width">
      <div class="col-grow">
        State: <strong>{{ gameState?.type }}</strong>
        <TeamBadge :team="gameState?.forTeam"/>
        <template v-if="currentActionTime">
          ({{ currentActionTime }} left)
        </template>
      </div>

      <div class="col-grow">
        Stage: <strong>{{ stage }}</strong> ({{ stageTimeLeft }} left)
      </div>
      <div class="col-grow">
        Score:
        <TeamBadge :team="Team.YELLOW"/>
        {{ goals(Team.YELLOW) }} : {{ goals(Team.BLUE) }}
        <TeamBadge :team="Team.BLUE"/>
      </div>
      <div class="col-grow">
        Matching duration: <strong>{{ matchDuration }}</strong>
      </div>
    </div>
  </q-toolbar>
</template>
