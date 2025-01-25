<script setup lang="ts">
import {ref} from "vue";
import TeamItem from "@/components/game-events/common/TeamItem.vue";
import LocationItem from "@/components/game-events/common/LocationItem.vue";
import ButtonItem from "@/components/game-events/common/ButtonItem.vue";
import {type GameEvent_BoundaryCrossingJson, type GameEventJson} from "@/proto/state/ssl_gc_game_event_pb";
import {gameEventName} from "@/helpers/texts";

const gameEvent = ref<GameEventJson>({
  type: 'BOUNDARY_CROSSING',
  boundaryCrossing: {
    byTeam: 'YELLOW',
  }
})
const details = ref<GameEvent_BoundaryCrossingJson>(gameEvent.value.boundaryCrossing!)

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
    <LocationItem v-model="details.location"/>

    <ButtonItem label="Create" @click="createGameEvent"/>
  </q-list>
</template>
