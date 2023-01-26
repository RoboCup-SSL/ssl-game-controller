<script setup lang="ts">
import {ref} from "vue";
import {GameEvent, GameEvent_Type, gameEvent_TypeFromJSON} from "@/proto/ssl_gc_game_event";
import {gameEventNames} from "@/helpers/texts";
import GameEventBallLeftFieldInput from "@/components/game-events/GameEventBallLeftFieldInput.vue";
import GameEventBotPushedBotInput from "@/components/game-events/GameEventBotPushedBotInput.vue";

const components = new Map<GameEvent_Type, any>([
  [GameEvent_Type.BOT_PUSHED_BOT, GameEventBotPushedBotInput],
  [GameEvent_Type.BOT_TIPPED_OVER, GameEventBallLeftFieldInput],
  [GameEvent_Type.BOT_HELD_BALL_DELIBERATELY, GameEventBallLeftFieldInput],
  [GameEvent_Type.KEEPER_HELD_BALL, GameEventBallLeftFieldInput],
  [GameEvent_Type.BOT_CRASH_UNIQUE, GameEventBallLeftFieldInput],
  [GameEvent_Type.BOT_CRASH_DRAWN, GameEventBallLeftFieldInput],
  [GameEvent_Type.BOUNDARY_CROSSING, GameEventBallLeftFieldInput],
  [GameEvent_Type.BOT_DRIBBLED_BALL_TOO_FAR, GameEventBallLeftFieldInput],
  [GameEvent_Type.BOT_KICKED_BALL_TOO_FAST, GameEventBallLeftFieldInput],
  [GameEvent_Type.ATTACKER_TOUCHED_BALL_IN_DEFENSE_AREA, GameEventBallLeftFieldInput],
  [GameEvent_Type.ATTACKER_TOO_CLOSE_TO_DEFENSE_AREA, GameEventBallLeftFieldInput],
  [GameEvent_Type.DEFENDER_IN_DEFENSE_AREA, GameEventBallLeftFieldInput],
  [GameEvent_Type.BOT_TOO_FAST_IN_STOP, GameEventBallLeftFieldInput],
  [GameEvent_Type.DEFENDER_TOO_CLOSE_TO_KICK_POINT, GameEventBallLeftFieldInput],
  [GameEvent_Type.BOT_INTERFERED_PLACEMENT, GameEventBallLeftFieldInput],
])
const fouls = Array.from(components.keys()).map(k => gameEvent_TypeFromJSON(k))
const tab = ref(fouls[0])

function component(eventType: GameEvent_Type) {
  return components.get(eventType)
}

function foulName(eventType: GameEvent_Type) {
  return gameEventNames.get(eventType) || "Unknown event"
}

const emit = defineEmits(['create-game-event'])
const updateGameEvent = (gameEvent: GameEvent) => {
  emit('create-game-event', gameEvent)
}
</script>

<template>
  <div class="row no-wrap">
    <q-tabs
      v-model="tab"
      active-color="primary"
      indicator-color="primary"
      vertical
      no-caps
    >
      <q-tab
        class="foul-tab"
        v-for="foul in fouls"
        :key="foul"
        :name="foul"
        :label="foulName(foul)"
      />
    </q-tabs>

    <q-tab-panels v-model="tab">
      <q-tab-panel
        v-for="foul in fouls"
        :key="foul"
        :name="foul"
      >
        <component :is="component(foul)" @create-game-event="updateGameEvent"/>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<style scoped>
.foul-tab {
  justify-content: initial;
  text-align: left;
}

</style>
