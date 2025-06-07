<script setup lang="ts">
import {type Component, ref} from "vue";
import type {GameEvent_TypeJson, GameEventJson} from "@/proto/state/ssl_gc_game_event_pb";
import {gameEventName} from "@/helpers/texts";
import GameEventBotPushedBotInput from "@/components/game-events/GameEventBotPushedBotInput.vue";
import GameEventBotTippedOverInput from "@/components/game-events/GameEventBotTippedOverInput.vue";
import GameEventBotHeldBallDeliberatelyInput from "@/components/game-events/GameEventBotHeldBallDeliberatelyInput.vue";
import GameEventKeeperHeldBallInput from "@/components/game-events/GameEventKeeperHeldBallInput.vue";
import GameEventBotCrashUniqueInput from "@/components/game-events/GameEventBotCrashUniqueInput.vue";
import GameEventBotCrashDrawnInput from "@/components/game-events/GameEventBotCrashDrawnInput.vue";
import GameEventBoundaryCrossingInput from "@/components/game-events/GameEventBoundaryCrossingInput.vue";
import GameEventBotDribbledBallTooFarInput from "@/components/game-events/GameEventBotDribbledBallTooFarInput.vue";
import GameEventBotKickedBallTooFastInput from "@/components/game-events/GameEventBotKickedBallTooFastInput.vue";
import GameEventAttackerTooCloseToDefenseAreaInput
  from "@/components/game-events/GameEventAttackerTooCloseToDefenseAreaInput.vue";
import GameEventDefenderInDefenseAreaInput from "@/components/game-events/GameEventDefenderInDefenseAreaInput.vue";
import GameEventBotTooFastInStopInput from "@/components/game-events/GameEventBotTooFastInStopInput.vue";
import GameEventDefenderTooCloseToKickPointInput
  from "@/components/game-events/GameEventDefenderTooCloseToKickPointInput.vue";
import GameEventBotInterferedPlacementInput from "@/components/game-events/GameEventBotInterferedPlacementInput.vue";
import GameEventBotDroppedPartsInput from "@/components/game-events/GameEventBotDroppedPartsInput.vue";

const components = new Map<GameEvent_TypeJson, Component>([
  ['BOT_PUSHED_BOT', GameEventBotPushedBotInput],
  ['BOT_TIPPED_OVER', GameEventBotTippedOverInput],
  ['BOT_DROPPED_PARTS', GameEventBotDroppedPartsInput],
  ['BOT_HELD_BALL_DELIBERATELY', GameEventBotHeldBallDeliberatelyInput],
  ['KEEPER_HELD_BALL', GameEventKeeperHeldBallInput],
  ['BOT_CRASH_UNIQUE', GameEventBotCrashUniqueInput],
  ['BOT_CRASH_DRAWN', GameEventBotCrashDrawnInput],
  ['BOUNDARY_CROSSING', GameEventBoundaryCrossingInput],
  ['BOT_DRIBBLED_BALL_TOO_FAR', GameEventBotDribbledBallTooFarInput],
  ['BOT_KICKED_BALL_TOO_FAST', GameEventBotKickedBallTooFastInput],
  ['ATTACKER_TOO_CLOSE_TO_DEFENSE_AREA', GameEventAttackerTooCloseToDefenseAreaInput],
  ['DEFENDER_IN_DEFENSE_AREA', GameEventDefenderInDefenseAreaInput],
  ['BOT_TOO_FAST_IN_STOP', GameEventBotTooFastInStopInput],
  ['DEFENDER_TOO_CLOSE_TO_KICK_POINT', GameEventDefenderTooCloseToKickPointInput],
  ['BOT_INTERFERED_PLACEMENT', GameEventBotInterferedPlacementInput],
])
const fouls = Array.from(components.keys())
const tab = ref(fouls[0])

function component(eventType: GameEvent_TypeJson) {
  return components.get(eventType)
}

function foulName(eventType: GameEvent_TypeJson) {
  return gameEventName(eventType) || "Unknown event"
}

const emit = defineEmits(['create-game-event'])
const updateGameEvent = (gameEvent: GameEventJson) => {
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
