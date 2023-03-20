<script setup lang="ts">
import {computed, inject} from "vue";
import SelectInput from "@/components/common/SelectInput.vue";
import {useMatchStateStore} from "@/store/matchState";
import {stageName} from "@/helpers/texts";
import {getRemainingStages} from "@/helpers";
import type {Referee_Stage} from "@/proto/ssl_gc_referee_message";
import type {ControlApi} from "@/providers/controlApi/ControlApi";

const store = useMatchStateStore()
const control = inject<ControlApi>('control-api')

const model = computed(() => {
  return store.matchState.stage
})

const options = computed(() => getRemainingStages(store.matchState.stage!))
const optionsLabel = (v: Referee_Stage) => stageName(v) || "-"

const onChange = (newStage: Referee_Stage) => {
  control?.SubmitChange({
    change: {
      $case: 'changeStageChange',
      changeStageChange: {
        newStage
      }
    }
  })
}
</script>

<template>
  <SelectInput
    label="Stage"
    style="min-width: 130px"
    :modelValue="model"
    :options="options"
    :option-label="optionsLabel"
    @update:model-value="onChange"
  />
</template>
