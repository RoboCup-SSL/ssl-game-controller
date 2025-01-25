<script setup lang="ts">
import {ref} from "vue";
import TeamItem from "@/components/game-events/common/TeamItem.vue";
import LocationItem from "@/components/game-events/common/LocationItem.vue";
import NumberItem from "@/components/game-events/common/NumberItem.vue";
import ButtonItem from "@/components/game-events/common/ButtonItem.vue";
import {type GameEvent_BotHeldBallDeliberatelyJson, type GameEventJson} from "@/proto/state/ssl_gc_game_event_pb";
import {gameEventName} from "@/helpers/texts";

const gameEvent = ref<GameEventJson>({
  type: 'BOT_HELD_BALL_DELIBERATELY',
  botHeldBallDeliberately: {
    byTeam: 'YELLOW',
  }
})
const details = ref<GameEvent_BotHeldBallDeliberatelyJson>(gameEvent.value.botHeldBallDeliberately!)

const emit = defineEmits(['create-game-event'])
const createGameEvent = () => {
  emit('create-game-event', gameEvent.value)
}
</script>

<template>
  <q-list bordered>
    <q-item-label header>
      {{ gameEventName(gameEvent.type) }}
    </q-item-label>

    <TeamItem v-model="details.byTeam" label="by team"/>
    <NumberItem v-model="details.byBot" label="by bot"/>
    <LocationItem v-model="details.location"/>
    <NumberItem v-model="details.duration" label="duration"/>

    <ButtonItem label="Create" @click="createGameEvent"/>
  </q-list>
</template>
