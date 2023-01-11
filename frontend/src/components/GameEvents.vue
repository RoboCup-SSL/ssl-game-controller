<script setup lang="ts">
import {useMatchStateStore} from "@/store/matchState";
import {computed} from "vue";
import GameEvent from "@/components/GameEvent.vue";

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
