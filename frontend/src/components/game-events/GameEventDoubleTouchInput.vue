<script setup lang="ts">
import {ref} from "vue";
import LocationItem from "@/components/game-events/common/LocationItem.vue";
import NumberItem from "@/components/game-events/common/NumberItem.vue";
import TeamItem from "@/components/game-events/common/TeamItem.vue";
import ButtonItem from "@/components/game-events/common/ButtonItem.vue";
import {GameEvent_AttackerDoubleTouchedBall, GameEvent_Type} from "@/proto/ssl_gc_game_event";
import {gameEventNames} from "@/helpers/texts";
import {Team} from "@/proto/ssl_gc_common";

const gameEvent = ref({
  type: GameEvent_Type.ATTACKER_DOUBLE_TOUCHED_BALL,
  event: {
    $case: 'attackerDoubleTouchedBall',
    attackerDoubleTouchedBall: {
      byTeam: Team.YELLOW,
    }
  }
})
const details = ref<GameEvent_AttackerDoubleTouchedBall>(gameEvent.value.event.attackerDoubleTouchedBall)

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
    <NumberItem v-model="details.byBot" label="by bot"/>
    <LocationItem v-model="details.location"/>

    <ButtonItem label="Create" @click="createGameEvent"/>
  </q-list>
</template>
