<script setup lang="ts">
import {computed, inject} from "vue";
import {Referee_Stage} from "@/proto/ssl_gc_referee_message";
import type {ControlApi} from "@/providers/controlApi/ControlApi";
import {useMatchStateStore} from "@/store/matchState";

const store = useMatchStateStore()
const control = inject<ControlApi>('control-api')

const disable = computed(() => {
  return store.matchState.stage === Referee_Stage.POST_GAME
})

const endGame = () => {
  control?.SubmitChange({
    change: {
      $case: 'changeStageChange',
      changeStageChange: {
        newStage: Referee_Stage.POST_GAME,
      }
    }
  })
}
</script>

<template>
  <q-btn
    label="End match"
    icon="check_circle"
    color="primary"
    :disable="disable"
    @click="endGame"
  />
</template>
