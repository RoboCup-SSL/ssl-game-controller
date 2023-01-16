<script setup lang="ts">
import {inject, ref} from "vue";
import GameEventBallLeftFieldInput from "@/components/game-events/GameEventBallLeftFieldInput.vue";
import GameEventGoalInput from "@/components/game-events/GameEventGoalInput.vue";
import TextInput from "@/components/common/TextInput.vue";
import ToggleInput from "@/components/common/ToggleInput.vue";
import type {GameEvent} from "@/proto/ssl_gc_game_event";
import type {ControlApi} from "@/providers/controlApi/ControlApi";
import type {Proposal} from "@/proto/ssl_gc_state";

const tab = ref("ballLeftField")
const propose = ref(false)
const origin = ref<string | undefined>(undefined)

const control = inject<ControlApi>('control-api')

const updateGameEvent = (gameEvent: GameEvent) => {
  if (origin.value) {
    gameEvent.origin = [origin.value]
  }
  if (propose.value) {
    const proposal: Proposal = {
      gameEvent,
      timestamp: new Date(),
    }
    control?.ProposeGameEvent(proposal)
  } else {
    control?.AddGameEvent(gameEvent)
  }
}
</script>


<template>
  <div class="row q-gutter-md">
    <ToggleInput v-model="propose" label="Propose only"/>
    <TextInput v-model="origin" label="Origin"/>
  </div>
  <q-tabs
    v-model="tab"
    dense
    class="text-grey"
    active-color="primary"
    indicator-color="primary"
    align="justify"
    narrow-indicator
  >
    <q-tab name="ballLeftField" label="Ball left field"/>
    <q-tab name="goal" label="Goal"/>
    <q-tab name="fouls" label="Fouls"/>
  </q-tabs>

  <q-separator/>

  <q-tab-panels v-model="tab" animated swipeable>
    <q-tab-panel name="ballLeftField">
      <GameEventBallLeftFieldInput @create-game-event="updateGameEvent"/>
    </q-tab-panel>

    <q-tab-panel name="goal">
      <GameEventGoalInput @create-game-event="updateGameEvent"/>
    </q-tab-panel>

    <q-tab-panel name="fouls">
    </q-tab-panel>
  </q-tab-panels>
</template>
