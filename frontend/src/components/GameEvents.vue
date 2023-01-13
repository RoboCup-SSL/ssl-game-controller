<script setup lang="ts">
import {computed} from "vue";
import GameEvent from "@/components/GameEvent.vue";
import {useMatchStateStore} from "@/store/matchState";

const store = useMatchStateStore()

const gameEvents = computed(() => {
  return store.matchState.gameEvents
})
</script>

<template>
  <q-list bordered class="rounded-borders">
    <GameEvent :game-event="gameEvent" v-for="gameEvent in gameEvents"/>
  </q-list>
</template>
