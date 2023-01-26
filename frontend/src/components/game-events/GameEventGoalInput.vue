<script setup lang="ts">
import {ref} from "vue";
import TeamItem from "@/components/game-events/common/TeamItem.vue";
import LocationItem from "@/components/game-events/common/LocationItem.vue";
import NumberItem from "@/components/game-events/common/NumberItem.vue";
import ToggleItem from "@/components/game-events/common/ToggleItem.vue";
import TextItem from "@/components/game-events/common/TextItem.vue";
import ButtonItem from "@/components/game-events/common/ButtonItem.vue";
import {GameEvent, GameEvent_Goal, GameEvent_Type} from "@/proto/ssl_gc_game_event";
import {Team} from "@/proto/ssl_gc_common";

const possibleGoal = ref(true)
const goal = ref<GameEvent_Goal>({
  byTeam: Team.YELLOW,
})

const constructGameEvent = (): GameEvent => {
  const gameEventType = possibleGoal.value ? GameEvent_Type.POSSIBLE_GOAL : GameEvent_Type.GOAL
  if (possibleGoal.value) {
    return {
      type: gameEventType,
      event: {
        $case: 'possibleGoal',
        possibleGoal: goal.value
      }
    }
  } else {
    return {
      type: gameEventType,
      event: {
        $case: 'goal',
        goal: goal.value
      }
    }
  }
}

const emit = defineEmits(['create-game-event'])
const createGameEvent = () => {
  const gameEvent = constructGameEvent()
  if (gameEvent) {
    emit('create-game-event', gameEvent)
  }
}
</script>

<template>
  <q-list bordered>
    <q-item-label header>Goal</q-item-label>

    <TeamItem v-model="goal.byTeam" label="by team"/>
    <TeamItem v-model="goal.kickingTeam" label="kicking team"/>
    <NumberItem v-model="goal.kickingBot" label="kicking bot"/>
    <LocationItem v-model="goal.location"/>
    <LocationItem v-model="goal.kickLocation" label="kick location"/>
    <NumberItem v-model="goal.maxBallHeight" label="max ball height (m)"/>
    <NumberItem v-model="goal.numRobotsByTeam" label="num robots by team"/>
    <NumberItem v-model="goal.lastTouchByTeam" label="last touch by team (μs)"/>
    <TextItem v-model="goal.message" label="message"/>

    <ToggleItem label="possible goal" v-model="possibleGoal"/>

    <ButtonItem label="Create" @click="createGameEvent"/>
  </q-list>
</template>
