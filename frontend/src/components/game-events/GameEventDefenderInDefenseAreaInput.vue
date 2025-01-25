<script setup lang="ts">
import {ref} from "vue";
import TeamItem from "@/components/game-events/common/TeamItem.vue";
import LocationItem from "@/components/game-events/common/LocationItem.vue";
import NumberItem from "@/components/game-events/common/NumberItem.vue";
import ButtonItem from "@/components/game-events/common/ButtonItem.vue";
import {type GameEvent_DefenderInDefenseAreaJson, type GameEventJson} from "@/proto/state/ssl_gc_game_event_pb";
import {gameEventName} from "@/helpers/texts";

const gameEvent = ref<GameEventJson>({
  type: 'DEFENDER_IN_DEFENSE_AREA',
  defenderInDefenseArea: {
    byTeam: 'YELLOW',
  }
})
const details = ref<GameEvent_DefenderInDefenseAreaJson>(gameEvent.value.defenderInDefenseArea!)

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
    <NumberItem v-model="details.distance" label="distance"/>
    <LocationItem v-model="details.location"/>

    <ButtonItem label="Create" @click="createGameEvent"/>
  </q-list>
</template>
