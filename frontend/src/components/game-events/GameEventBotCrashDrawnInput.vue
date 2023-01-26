<script setup lang="ts">
import {ref} from "vue";
import LocationItem from "@/components/game-events/common/LocationItem.vue";
import NumberItem from "@/components/game-events/common/NumberItem.vue";
import ButtonItem from "@/components/game-events/common/ButtonItem.vue";
import {GameEvent_BotCrashDrawn, GameEvent_Type} from "@/proto/ssl_gc_game_event";
import {gameEventNames} from "@/helpers/texts";

const gameEvent = ref({
  type: GameEvent_Type.BOT_CRASH_DRAWN,
  event: {
    $case: 'botCrashDrawn',
    botCrashDrawn: {}
  }
})
const details = ref<GameEvent_BotCrashDrawn>(gameEvent.value.event.botCrashDrawn)

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

    <NumberItem v-model="details.botYellow" label="yellow bot"/>
    <NumberItem v-model="details.botBlue" label="blue bot"/>
    <NumberItem v-model="details.crashSpeed" label="crash speed"/>
    <NumberItem v-model="details.speedDiff" label="speed diff"/>
    <NumberItem v-model="details.crashAngle" label="crash angle"/>
    <LocationItem v-model="details.location"/>

    <ButtonItem label="Create" @click="createGameEvent"/>
  </q-list>
</template>
