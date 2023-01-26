<script setup lang="ts">
import {ref} from "vue";
import TeamItem from "@/components/game-events/common/TeamItem.vue";
import LocationItem from "@/components/game-events/common/LocationItem.vue";
import NumberItem from "@/components/game-events/common/NumberItem.vue";
import ButtonItem from "@/components/game-events/common/ButtonItem.vue";
import {GameEvent, GameEvent_Type} from "@/proto/ssl_gc_game_event";
import {Team} from "@/proto/ssl_gc_common";
import type {Vector2} from "@/proto/ssl_gc_geometry";

const gameEventType = ref<GameEvent_Type>(GameEvent_Type.BALL_LEFT_FIELD_TOUCH_LINE)
const byTeam = ref<Team>(Team.YELLOW)
const byBot = ref<number | undefined>()
const location = ref<Vector2>()

const gameEventTypeOptions = [
  {label: 'touch line', value: GameEvent_Type.BALL_LEFT_FIELD_TOUCH_LINE},
  {label: 'goal line', value: GameEvent_Type.BALL_LEFT_FIELD_GOAL_LINE},
  {label: 'aimless kick', value: GameEvent_Type.AIMLESS_KICK},
]

const constructGameEvent = (): GameEvent | undefined => {
  if (gameEventType.value === GameEvent_Type.BALL_LEFT_FIELD_TOUCH_LINE) {
    return {
      type: gameEventType.value,
      event: {
        $case: 'ballLeftFieldTouchLine',
        ballLeftFieldTouchLine: {
          byTeam: byTeam.value,
          byBot: byBot.value,
          location: location.value,
        }
      }
    }
  } else if (gameEventType.value === GameEvent_Type.BALL_LEFT_FIELD_GOAL_LINE) {
    return {
      type: gameEventType.value,
      event: {
        $case: 'ballLeftFieldGoalLine',
        ballLeftFieldGoalLine: {
          byTeam: byTeam.value,
          byBot: byBot.value,
          location: location.value,
        }
      }
    }
  } else if (gameEventType.value === GameEvent_Type.AIMLESS_KICK) {
    return {
      type: gameEventType.value,
      event: {
        $case: 'aimlessKick',
        aimlessKick: {
          byTeam: byTeam.value,
          byBot: byBot.value,
          location: location.value,
        }
      }
    }
  }
  return undefined
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
    <q-item-label header>
      Ball left field
    </q-item-label>

    <q-item>
      <q-item-section>
        <q-btn-toggle
          spread no-wrap
          :options="gameEventTypeOptions"
          v-model="gameEventType"
        />
      </q-item-section>
    </q-item>

    <TeamItem v-model="byTeam" label="by team"/>
    <NumberItem v-model="byBot" label="by bot"/>
    <LocationItem v-model="location"/>

    <ButtonItem label="Create" @click="createGameEvent"/>
  </q-list>
</template>
