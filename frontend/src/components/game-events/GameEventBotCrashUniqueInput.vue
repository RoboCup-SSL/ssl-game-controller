<script setup lang="ts">
import {ref} from "vue";
import TeamItem from "@/components/game-events/common/TeamItem.vue";
import LocationItem from "@/components/game-events/common/LocationItem.vue";
import NumberItem from "@/components/game-events/common/NumberItem.vue";
import ButtonItem from "@/components/game-events/common/ButtonItem.vue";
import {type GameEvent_BotCrashUniqueJson, type GameEventJson} from "@/proto/state/ssl_gc_game_event_pb";
import {gameEventName} from "@/helpers/texts";

const gameEvent = ref<GameEventJson>({
  type: 'BOT_CRASH_UNIQUE',
  botCrashUnique: {
    byTeam: 'YELLOW',
  }
})
const details = ref<GameEvent_BotCrashUniqueJson>(gameEvent.value.botCrashUnique!)

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
    <NumberItem v-model="details.violator" label="violator"/>
    <NumberItem v-model="details.victim" label="victim"/>
    <NumberItem v-model="details.crashSpeed" label="crash speed"/>
    <NumberItem v-model="details.speedDiff" label="speed diff"/>
    <NumberItem v-model="details.crashAngle" label="crash angle"/>
    <LocationItem v-model="details.location"/>

    <ButtonItem label="Create" @click="createGameEvent"/>
  </q-list>
</template>
