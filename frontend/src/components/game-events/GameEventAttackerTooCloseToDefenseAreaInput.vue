<script setup lang="ts">
import {ref} from "vue";
import TeamItem from "@/components/game-events/common/TeamItem.vue";
import LocationItem from "@/components/game-events/common/LocationItem.vue";
import NumberItem from "@/components/game-events/common/NumberItem.vue";
import ButtonItem from "@/components/game-events/common/ButtonItem.vue";
import {GameEvent_AttackerTooCloseToDefenseArea, GameEvent_Type} from "@/proto/ssl_gc_game_event";
import {gameEventNames} from "@/helpers/texts";
import {Team} from "@/proto/ssl_gc_common";

const gameEvent = ref({
  type: GameEvent_Type.ATTACKER_TOO_CLOSE_TO_DEFENSE_AREA,
  event: {
    $case: 'attackerTooCloseToDefenseArea',
    attackerTooCloseToDefenseArea: {
      byTeam: Team.YELLOW,
    }
  }
})
const details = ref<GameEvent_AttackerTooCloseToDefenseArea>(gameEvent.value.event.attackerTooCloseToDefenseArea)

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
    <NumberItem v-model="details.distance" label="distance"/>
    <LocationItem v-model="details.ballLocation" label="ball location"/>
    <LocationItem v-model="details.location"/>

    <ButtonItem label="Create" @click="createGameEvent"/>
  </q-list>
</template>
