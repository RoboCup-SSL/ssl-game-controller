<script setup lang="ts">
import AutoRefereeConfigBehaviorInput from "@/components/settings/AutoRefereeBehaviorConfigInput.vue";
import {computed, inject} from "vue";
import {AutoRefConfig, AutoRefConfig_Behavior} from "@/proto/ssl_gc_engine_config";
import {gameEvent_TypeFromJSON} from "@/proto/ssl_gc_game_event";
import {gameEventNames} from "@/helpers/texts";
import type {ControlApi} from "@/providers/controlApi/ControlApi";

const props = defineProps<{
  autoRefId: string,
  autoRefConfig: AutoRefConfig,
}>()

const control = inject<ControlApi>('control-api')

const behaviors = computed(() => props.autoRefConfig.gameEventBehavior!)
const gameEventTypes = computed(() => Object.keys(behaviors.value))

const commonBehaviorValue = computed(() => {
  const first = behaviors.value[gameEventTypes.value[0]]
  for (const behaviorKey of gameEventTypes.value) {
    if (behaviors.value[behaviorKey] !== first) {
      return AutoRefConfig_Behavior.BEHAVIOR_UNKNOWN
    }
  }
  return first
})

function behaviorName(key: string) {
  const gameEventType = gameEvent_TypeFromJSON(key);
  return gameEventNames.get(gameEventType)
}

function update(key: string, behavior: AutoRefConfig_Behavior) {
  control?.ChangeConfig({
    autoRefConfigs: {
      [props.autoRefId]: {
        gameEventBehavior: {
          [key]: behavior,
        }
      }
    }
  })
}

function changeAll(behavior: AutoRefConfig_Behavior) {
  const gameEventBehavior: { [key: string]: AutoRefConfig_Behavior } = {}
  for (const key of gameEventTypes.value) {
    gameEventBehavior[key] = behavior
  }
  control?.ChangeConfig({
    autoRefConfigs: {
      [props.autoRefId]: {
        gameEventBehavior,
      }
    }
  })
}
</script>

<template>
  <p>
    Game events from this autoRef can be handled in the following ways:
  </p>
  <ul>
    <li>Accept: Process event according to the globally configured behavior (first tab).</li>
    <li>Log: Add passive event to the protocol, but do not process it at all.</li>
    <li>Ignore: Drop event silently.</li>
  </ul>
  <p>
    Note: If majority handling is enabled for a game event, only auto referees are considered that
    have the respective game event configured as 'Accept'.
    If an auto referee is known to not support certain events, the behavior should be set to 'Ignore'.
  </p>
  <q-list bordered class="rounded-borders">
    <q-item>
      <q-item-section>
        <q-item-label><strong>All</strong></q-item-label>
      </q-item-section>

      <q-item-section side>
        <AutoRefereeConfigBehaviorInput
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
        <AutoRefereeConfigBehaviorInput
          :model-value="behaviors[behaviorKey]"
          @update:model-value="v => update(behaviorKey, v)"
        />
      </q-item-section>
    </q-item>
  </q-list>
</template>
