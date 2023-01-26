<script setup lang="ts">
import {ref} from "vue";
import TeamItem from "@/components/game-events/common/TeamItem.vue";
import ButtonItem from "@/components/game-events/common/ButtonItem.vue";
import TextItem from "@/components/game-events/common/TextItem.vue";
import {GameEvent, GameEvent_Type} from "@/proto/ssl_gc_game_event";
import {Team} from "@/proto/ssl_gc_common";

const gameEventType = ref<GameEvent_Type>(GameEvent_Type.UNSPORTING_BEHAVIOR_MINOR)
const byTeam = ref<Team>(Team.YELLOW)
const reason = ref<string>("")

const gameEventTypeOptions = [
  {label: 'minor', value: GameEvent_Type.UNSPORTING_BEHAVIOR_MINOR},
  {label: 'major', value: GameEvent_Type.UNSPORTING_BEHAVIOR_MAJOR},
]

const constructGameEvent = (): GameEvent | undefined => {
  if (gameEventType.value === GameEvent_Type.UNSPORTING_BEHAVIOR_MINOR) {
    return {
      type: gameEventType.value,
      event: {
        $case: 'unsportingBehaviorMinor',
        unsportingBehaviorMinor: {
          byTeam: byTeam.value,
          reason: reason.value,
        }
      }
    }
  } else if (gameEventType.value === GameEvent_Type.UNSPORTING_BEHAVIOR_MAJOR) {
    return {
      type: gameEventType.value,
      event: {
        $case: 'unsportingBehaviorMajor',
        unsportingBehaviorMajor: {
          byTeam: byTeam.value,
          reason: reason.value,
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
      Unsporting Behavior
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
    <TextItem v-model="reason" label="reason"/>

    <ButtonItem label="Create" @click="createGameEvent"/>
  </q-list>
</template>
