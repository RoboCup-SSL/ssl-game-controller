<script setup lang="ts">
import {ref} from "vue";
import {GameEvent, GameEvent_Type, gameEvent_TypeFromJSON} from "@/proto/ssl_gc_game_event";
import {gameEventNames} from "@/helpers/texts";
import GameEventBotPushedBotInput from "@/components/game-events/GameEventBotPushedBotInput.vue";
import GameEventBotTippedOverInput from "@/components/game-events/GameEventBotTippedOverInput.vue";
import GameEventBotHeldBallDeliberatelyInput from "@/components/game-events/GameEventBotHeldBallDeliberatelyInput.vue";
import GameEventKeeperHeldBallInput from "@/components/game-events/GameEventKeeperHeldBallInput.vue";
import GameEventBotCrashUniqueInput from "@/components/game-events/GameEventBotCrashUniqueInput.vue";
import GameEventBotCrashDrawnInput from "@/components/game-events/GameEventBotCrashDrawnInput.vue";
import GameEventBoundaryCrossingInput from "@/components/game-events/GameEventBoundaryCrossingInput.vue";
import GameEventBotDribbledBallTooFarInput from "@/components/game-events/GameEventBotDribbledBallTooFarInput.vue";
import GameEventBotKickedBallTooFastInput from "@/components/game-events/GameEventBotKickedBallTooFastInput.vue";
import GameEventAttackerTouchedBallInDefenseAreaInput
  from "@/components/game-events/GameEventAttackerTouchedBallInDefenseAreaInput.vue";
import GameEventAttackerTooCloseToDefenseAreaInput
  from "@/components/game-events/GameEventAttackerTooCloseToDefenseAreaInput.vue";
import GameEventDefenderInDefenseAreaInput from "@/components/game-events/GameEventDefenderInDefenseAreaInput.vue";
import GameEventBotTooFastInStopInput from "@/components/game-events/GameEventBotTooFastInStopInput.vue";
import GameEventDefenderTooCloseToKickPointInput
  from "@/components/game-events/GameEventDefenderTooCloseToKickPointInput.vue";
import GameEventBotInterferedPlacementInput from "@/components/game-events/GameEventBotInterferedPlacementInput.vue";
import GameEventBotDroppedPartsInput from "@/components/game-events/GameEventBotDroppedPartsInput.vue";

const components = new Map<GameEvent_Type, any>([
  [GameEvent_Type.BOT_PUSHED_BOT, GameEventBotPushedBotInput],
  [GameEvent_Type.BOT_TIPPED_OVER, GameEventBotTippedOverInput],
  [GameEvent_Type.BOT_DROPPED_PARTS, GameEventBotDroppedPartsInput],
  [GameEvent_Type.BOT_HELD_BALL_DELIBERATELY, GameEventBotHeldBallDeliberatelyInput],
  [GameEvent_Type.KEEPER_HELD_BALL, GameEventKeeperHeldBallInput],
  [GameEvent_Type.BOT_CRASH_UNIQUE, GameEventBotCrashUniqueInput],
  [GameEvent_Type.BOT_CRASH_DRAWN, GameEventBotCrashDrawnInput],
  [GameEvent_Type.BOUNDARY_CROSSING, GameEventBoundaryCrossingInput],
  [GameEvent_Type.BOT_DRIBBLED_BALL_TOO_FAR, GameEventBotDribbledBallTooFarInput],
  [GameEvent_Type.BOT_KICKED_BALL_TOO_FAST, GameEventBotKickedBallTooFastInput],
  [GameEvent_Type.ATTACKER_TOUCHED_BALL_IN_DEFENSE_AREA, GameEventAttackerTouchedBallInDefenseAreaInput],
  [GameEvent_Type.ATTACKER_TOO_CLOSE_TO_DEFENSE_AREA, GameEventAttackerTooCloseToDefenseAreaInput],
  [GameEvent_Type.DEFENDER_IN_DEFENSE_AREA, GameEventDefenderInDefenseAreaInput],
  [GameEvent_Type.BOT_TOO_FAST_IN_STOP, GameEventBotTooFastInStopInput],
  [GameEvent_Type.DEFENDER_TOO_CLOSE_TO_KICK_POINT, GameEventDefenderTooCloseToKickPointInput],
  [GameEvent_Type.BOT_INTERFERED_PLACEMENT, GameEventBotInterferedPlacementInput],
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
