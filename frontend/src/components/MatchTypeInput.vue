<script setup lang="ts">
import {computed, inject} from "vue";
import SelectInput from "@/components/common/SelectInput.vue";
import {useMatchStateStore} from "@/store/matchState";
import {matchTypeName} from "@/helpers/texts";
import {MatchType} from "@/proto/ssl_gc_referee_message";
import type {ControlApi} from "@/providers/controlApi/ControlApi";

const store = useMatchStateStore()
const control = inject<ControlApi>('control-api')

const model = computed(() => {
  return store.matchState.matchType
})

const options = Object.values(MatchType).filter((matchType => matchType !== MatchType.UNRECOGNIZED))
const optionsLabel = (v: MatchType) => matchTypeName(v) || "-"

const onChange = (newValue: MatchType) => {
  control?.UpdateMatchConfig({matchType: newValue})
}
</script>

<template>
  <SelectInput
    label="Match type"
    style="min-width: 130px"
    :modelValue="model"
    :options="options"
    :option-label="optionsLabel"
    @update:model-value="onChange"
  />
</template>
