<script setup lang="ts">
import {ref} from "vue";
import GameEventBallLeftFieldInput from "@/components/game-events/GameEventBallLeftFieldInput.vue";
import GameEventGoalInput from "@/components/game-events/GameEventGoalInput.vue";
import {GameEvent} from "@/proto/ssl_gc_game_event";

const childRef = ref<InstanceType<typeof GameEventBallLeftFieldInput>>()

const updateGameEvent = (gameEvent: GameEvent) => {
  console.log(JSON.stringify(GameEvent.toJSON(gameEvent)))
}
</script>


<template>
  <div class="q-ma-xl row q-gutter-md">
    <GameEventBallLeftFieldInput @create-game-event="updateGameEvent" ref="childRef"/>
    <GameEventGoalInput @create-game-event="updateGameEvent"/>
  </div>
</template>
