<script setup lang="ts">
import {ref} from "vue";
import {GameEvent, GameEvent_Type} from "@/proto/ssl_gc_game_event";
import {Team} from "@/proto/ssl_gc_common";
import type {Vector2} from "@/proto/ssl_gc_geometry";
import TeamItem from "@/components/game-events/common/TeamItem.vue";
import LocationItem from "@/components/game-events/common/LocationItem.vue";
import NumberItem from "@/components/game-events/common/NumberItem.vue";

const gameEventType = ref<GameEvent_Type>(GameEvent_Type.BALL_LEFT_FIELD_TOUCH_LINE)
const byTeam = ref<Team>(Team.YELLOW)
const byBot = ref<number | undefined>()
const location = ref<Vector2>()

const gameEventTypeOptions = [
  {label: 'touch line', value: GameEvent_Type.BALL_LEFT_FIELD_TOUCH_LINE},
  {label: 'goal line', value: GameEvent_Type.BALL_LEFT_FIELD_GOAL_LINE},
  {label: 'aimless kick', value: GameEvent_Type.AIMLESS_KICK},
]

const createGameEvent = (): GameEvent | undefined => {
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
const updateGameEvent = () => {
  const gameEvent = createGameEvent()
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

    <q-separator/>
    <q-item-label header>By team</q-item-label>

    <TeamItem v-model="byTeam"/>

    <q-separator/>

    <NumberItem v-model="byBot" label="by bot"/>
    <LocationItem v-model="location"/>

    <q-item>
      <q-item-section>
        <q-btn
          dense
          label="Create"
          color="primary"
          @click="updateGameEvent"
        />
      </q-item-section>
    </q-item>
  </q-list>
</template>
