<script setup lang="ts">
import {computed} from "vue";
import GameEventItem from "@/components/match/GameEventItem.vue";
import {useMatchStateStore} from "@/store/matchState";

const store = useMatchStateStore()

const gameEvents = computed(() => {
  return store.matchState.gameEvents
})
</script>

<template>
  <q-list bordered class="rounded-borders">
    <GameEventItem :game-event="gameEvent" v-for="(gameEvent, key) in gameEvents" :key="key"/>
  </q-list>
</template>
