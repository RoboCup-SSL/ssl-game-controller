<script setup lang="ts">
import {computed, inject} from "vue";
import SelectInput from "@/components/common/SelectInput.vue";
import {useMatchStateStore} from "@/store/matchState";
import {stageName} from "@/helpers/texts";
import {getRemainingStages} from "@/helpers";
import type {Referee_StageJson} from "@/proto/state/ssl_gc_referee_message_pb";
import type {ControlApi} from "@/providers/controlApi";

const store = useMatchStateStore()
const control = inject<ControlApi>('control-api')

const model = computed(() => {
  return store.matchState.stage
})

const options = computed(() => getRemainingStages(store.matchState.stage!))
const optionsLabel = (v: Referee_StageJson) => stageName(v) || "-"

const onChange = (newStage: Referee_StageJson) => {
  control?.SubmitChange({
    changeStageChange: {
        newStage
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
