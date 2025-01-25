<script setup lang="ts">
import {ref} from "vue";
import TeamItem from "@/components/game-events/common/TeamItem.vue";
import LocationItem from "@/components/game-events/common/LocationItem.vue";
import NumberItem from "@/components/game-events/common/NumberItem.vue";
import ButtonItem from "@/components/game-events/common/ButtonItem.vue";
import type {GameEvent_TypeJson, GameEventJson} from "@/proto/state/ssl_gc_game_event_pb";
import type {TeamJson} from "@/proto/state/ssl_gc_common_pb";
import type {Vector2Json} from "@/proto/geom/ssl_gc_geometry_pb";

const gameEventType = ref<GameEvent_TypeJson>('BALL_LEFT_FIELD_TOUCH_LINE')
const byTeam = ref<TeamJson>('YELLOW')
const byBot = ref<number | undefined>()
const location = ref<Vector2Json>()

const gameEventTypeOptions = [
  {label: 'touch line', value: 'BALL_LEFT_FIELD_TOUCH_LINE'},
  {label: 'goal line', value: 'BALL_LEFT_FIELD_GOAL_LINE'},
  {label: 'aimless kick', value: 'AIMLESS_KICK'},
]

const constructGameEvent = (): GameEventJson | undefined => {
  if (gameEventType.value === 'BALL_LEFT_FIELD_TOUCH_LINE') {
    return {
      type: gameEventType.value,
      ballLeftFieldTouchLine: {
        byTeam: byTeam.value,
        byBot: byBot.value,
        location: location.value,
      }
    }
  } else if (gameEventType.value === 'BALL_LEFT_FIELD_GOAL_LINE') {
    return {
      type: gameEventType.value,
      ballLeftFieldGoalLine: {
        byTeam: byTeam.value,
        byBot: byBot.value,
        location: location.value,
      }
    }
  } else if (gameEventType.value === 'AIMLESS_KICK') {
    return {
      type: gameEventType.value,
      aimlessKick: {
        byTeam: byTeam.value,
        byBot: byBot.value,
        location: location.value,
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
