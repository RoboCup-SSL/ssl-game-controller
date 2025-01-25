<script setup lang="ts">
import {computed, ref} from "vue";
import TeamBadge from "@/components/common/TeamBadge.vue";
import {useMatchStateStore} from "@/store/matchState";
import formatDuration from "format-duration";
import {stageName} from "@/helpers/texts";
import type {TeamJson} from "@/proto/state/ssl_gc_common_pb";
import {durationSeconds, formatDurationJson, timestampJsonMs} from "@/helpers";

const store = useMatchStateStore()
const now = ref(Date.now())
setInterval(() => {
  now.value = Date.now()
}, 1000)

const matchDuration = computed(() => {
  if (store.matchState.matchTimeStart && timestampJsonMs(store.matchState.matchTimeStart) > 0) {
    return formatDuration(now.value - timestampJsonMs(store.matchState.matchTimeStart!))
  }
  return "-"
})
const stageTimeLeft = computed(() => {
  if (store.matchState.stageTimeLeft) {
    return formatDurationJson(store.matchState.stageTimeLeft)
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
    && durationSeconds(store.matchState.currentActionTimeRemaining) > 0) {
    return formatDurationJson(store.matchState.currentActionTimeRemaining)
  }
  return undefined
})
const goals = (team: TeamJson) => {
  return store.matchState.teamState![team].goals!
}
const statusMessage = computed(() => {
  return store.matchState.statusMessage
})
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
        <template v-if="statusMessage">
          ({{ statusMessage }})
        </template>
      </div>

      <div class="col-grow">
        Stage: <strong>{{ stage }}</strong> ({{ stageTimeLeft }} left)
      </div>
      <div class="col-grow">
        Score:
        <TeamBadge :team="'YELLOW'"/>
        {{ goals('YELLOW') }} : {{ goals('BLUE') }}
        <TeamBadge :team="'BLUE'"/>
      </div>
      <div class="col-grow">
        Matching duration: <strong>{{ matchDuration }}</strong>
      </div>
    </div>
  </q-toolbar>
</template>
