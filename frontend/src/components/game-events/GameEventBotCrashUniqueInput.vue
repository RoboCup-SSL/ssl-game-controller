<script setup lang="ts">
import {ref} from "vue";
import TeamItem from "@/components/game-events/common/TeamItem.vue";
import LocationItem from "@/components/game-events/common/LocationItem.vue";
import NumberItem from "@/components/game-events/common/NumberItem.vue";
import ButtonItem from "@/components/game-events/common/ButtonItem.vue";
import {GameEvent_BotCrashUnique, GameEvent_Type} from "@/proto/ssl_gc_game_event";
import {gameEventNames} from "@/helpers/texts";
import {Team} from "@/proto/ssl_gc_common";

const gameEvent = ref({
  type: GameEvent_Type.BOT_CRASH_UNIQUE,
  event: {
    $case: 'botCrashUnique',
    botCrashUnique: {
      byTeam: Team.YELLOW,
    }
  }
})
const details = ref<GameEvent_BotCrashUnique>(gameEvent.value.event.botCrashUnique)

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
    <NumberItem v-model="details.violator" label="violator"/>
    <NumberItem v-model="details.victim" label="victim"/>
    <NumberItem v-model="details.crashSpeed" label="crash speed"/>
    <NumberItem v-model="details.speedDiff" label="speed diff"/>
    <NumberItem v-model="details.crashAngle" label="crash angle"/>
    <LocationItem v-model="details.location"/>

    <ButtonItem label="Create" @click="createGameEvent"/>
  </q-list>
</template>
