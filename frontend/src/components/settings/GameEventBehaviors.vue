<script setup lang="ts">
import {computed, inject} from "vue";
import GameEventBehaviorInput from "@/components/settings/GameEventBehaviorInput.vue";
import {useGcStateStore} from "@/store/gcState";
import {type Config_BehaviorJson} from "@/proto/engine/ssl_gc_engine_config_pb";
import {gameEventName} from "@/helpers/texts";
import type {ControlApi} from "@/providers/controlApi";
import {type GameEvent_TypeJson} from "@/proto/state/ssl_gc_game_event_pb";

const store = useGcStateStore()
const control = inject<ControlApi>('control-api')

const behaviors = computed(() => store.config.gameEventBehavior!)
const gameEventTypes = computed(() => Object.keys(behaviors.value))

const commonBehaviorValue = computed(() => {
  const first = behaviors.value[gameEventTypes.value[0]]
  for (const behaviorKey of gameEventTypes.value) {
    if (behaviors.value[behaviorKey] !== first) {
      return 'UNKNOWN' as Config_BehaviorJson
    }
  }
  return first
})

function behaviorName(key: string) {
  const gameEventType = key as GameEvent_TypeJson;
  return gameEventName(gameEventType)
}

function update(key: string, behavior: Config_BehaviorJson) {
  control?.ChangeConfig({
    gameEventBehavior: {
      [key]: behavior,
    }
  })
}

function changeAll(behavior: Config_BehaviorJson) {
  const gameEventBehavior: { [key: string]: Config_BehaviorJson } = {}
  for (const key of gameEventTypes.value) {
    gameEventBehavior[key] = behavior
  }
  control?.ChangeConfig({
    gameEventBehavior
  })
}
</script>

<template>
  <p>
    Game events can be handled in the following ways:
  </p>
  <ul>
    <li>Accept: Apply event immediately.</li>
    <li>Majority: Add event to proposals and accept it when majority reported same event.</li>
    <li>Propose only: Add event to proposals, but only accept it manually through UI.</li>
    <li>Log: Add passive event to the protocol, but do not process it at all.</li>
    <li>Ignore: Drop event silently.</li>
  </ul>
  <q-list bordered class="rounded-borders">
    <q-item>
      <q-item-section>
        <q-item-label><strong>All</strong></q-item-label>
      </q-item-section>

      <q-item-section side>
        <GameEventBehaviorInput
          :model-value="commonBehaviorValue"
          @update:model-value="changeAll"
        />
      </q-item-section>
    </q-item>

    <q-separator spaced/>

    <q-item
      bordered dense
      v-for="behaviorKey of gameEventTypes"
      :key="behaviorKey"
    >
      <q-item-section>
        {{ behaviorName(behaviorKey) }}
      </q-item-section>

      <q-item-section side>
        <GameEventBehaviorInput
          :model-value="behaviors[behaviorKey]"
          @update:model-value="v => update(behaviorKey, v)"
        />
      </q-item-section>
    </q-item>
  </q-list>
</template>
