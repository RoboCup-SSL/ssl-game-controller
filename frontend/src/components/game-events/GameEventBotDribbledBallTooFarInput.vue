<script setup lang="ts">
import {ref} from "vue";
import TeamItem from "@/components/game-events/common/TeamItem.vue";
import LocationItem from "@/components/game-events/common/LocationItem.vue";
import NumberItem from "@/components/game-events/common/NumberItem.vue";
import ButtonItem from "@/components/game-events/common/ButtonItem.vue";
import {GameEvent_BotDribbledBallTooFar, GameEvent_Type} from "@/proto/ssl_gc_game_event";
import {gameEventNames} from "@/helpers/texts";
import {Team} from "@/proto/ssl_gc_common";

const gameEvent = ref({
  type: GameEvent_Type.BOT_DRIBBLED_BALL_TOO_FAR,
  event: {
    $case: 'botDribbledBallTooFar',
    botDribbledBallTooFar: {
      byTeam: Team.YELLOW,
    }
  }
})
const details = ref<GameEvent_BotDribbledBallTooFar>(gameEvent.value.event.botDribbledBallTooFar)

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
    <LocationItem v-model="details.start" label="start"/>
    <LocationItem v-model="details.end" label="end"/>

    <ButtonItem label="Create" @click="createGameEvent"/>
  </q-list>
</template>
