<script setup lang="ts">
import {ref} from "vue";
import TeamItem from "@/components/game-events/common/TeamItem.vue";
import LocationItem from "@/components/game-events/common/LocationItem.vue";
import NumberItem from "@/components/game-events/common/NumberItem.vue";
import ButtonItem from "@/components/game-events/common/ButtonItem.vue";
import ToggleItem from "@/components/game-events/common/ToggleItem.vue";
import {GameEvent_BotKickedBallTooFast, GameEvent_Type} from "@/proto/ssl_gc_game_event";
import {gameEventNames} from "@/helpers/texts";
import {Team} from "@/proto/ssl_gc_common";

const gameEvent = ref({
  type: GameEvent_Type.BOT_KICKED_BALL_TOO_FAST,
  event: {
    $case: 'botKickedBallTooFast',
    botKickedBallTooFast: {
      byTeam: Team.YELLOW,
    }
  }
})
const details = ref<GameEvent_BotKickedBallTooFast>(gameEvent.value.event.botKickedBallTooFast)

const emit = defineEmits(['create-game-event'])
const createGameEvent = () => {
  emit('create-game-event', gameEvent.value)
}
</script>

<template>
  <q-list bordered>
    <q-item-label header>
      {{ gameEventNames.get(gameEvent.type) }}
    </q-item-label>

    <TeamItem v-model="details.byTeam" label="by team"/>
    <NumberItem v-model="details.byBot" label="duration"/>
    <NumberItem v-model="details.initialBallSpeed" label="initial ball speed"/>
    <ToggleItem v-model="details.chipped" label="chipped"/>
    <LocationItem v-model="details.location"/>

    <ButtonItem label="Create" @click="createGameEvent"/>
  </q-list>
</template>
