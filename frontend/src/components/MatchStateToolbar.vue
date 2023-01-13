<script setup lang="ts">
import {computed, ref} from "vue";
import TeamBadge from "@/components/common/TeamBadge.vue";
import {useMatchStateStore} from "@/store/matchState";
import formatDuration from "format-duration";
import {stageNames} from "@/helpers/texts";

const store = useMatchStateStore()
const now = ref(Date.now())
setInterval(() => {
  now.value = Date.now()
}, 1000)

const matchDuration = computed(() => {
  if (store.matchState.matchTimeStart) {
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
const stageName = computed(() => {
  if (store.matchState.stage) {
    return stageNames.get(store.matchState.stage)
  }
  return "unknown"
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
        Stage: <strong>{{ stageName }}</strong> ({{ stageTimeLeft }} left)
      </div>
      <div class="col-grow">
        Matching duration: <strong>{{ matchDuration }}</strong>
      </div>
    </div>
  </q-toolbar>
</template>
