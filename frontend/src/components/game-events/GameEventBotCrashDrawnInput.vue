<script setup lang="ts">
import {ref} from "vue";
import LocationItem from "@/components/game-events/common/LocationItem.vue";
import NumberItem from "@/components/game-events/common/NumberItem.vue";
import ButtonItem from "@/components/game-events/common/ButtonItem.vue";
import {type GameEvent_BotCrashDrawnJson, type GameEventJson} from "@/proto/state/ssl_gc_game_event_pb";
import {gameEventName} from "@/helpers/texts";

const gameEvent = ref<GameEventJson>({
  type: 'BOT_CRASH_DRAWN',
  botCrashDrawn: {}
})
const details = ref<GameEvent_BotCrashDrawnJson>(gameEvent.value.botCrashDrawn!)

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

    <NumberItem v-model="details.botYellow" label="yellow bot"/>
    <NumberItem v-model="details.botBlue" label="blue bot"/>
    <NumberItem v-model="details.crashSpeed" label="crash speed"/>
    <NumberItem v-model="details.speedDiff" label="speed diff"/>
    <NumberItem v-model="details.crashAngle" label="crash angle"/>
    <LocationItem v-model="details.location"/>

    <ButtonItem label="Create" @click="createGameEvent"/>
  </q-list>
</template>
