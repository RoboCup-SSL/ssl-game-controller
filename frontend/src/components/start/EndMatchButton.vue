<script setup lang="ts">
import {computed, inject} from "vue";
import type {ControlApi} from "@/providers/controlApi";
import {useMatchStateStore} from "@/store/matchState";

const store = useMatchStateStore()
const control = inject<ControlApi>('control-api')

const disable = computed(() => {
  return store.matchState.stage === 'POST_GAME'
})

const endGame = () => {
  control?.SubmitChange({
    changeStageChange: {
      newStage: 'POST_GAME',
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
