<script setup lang="ts">
import {computed, inject} from "vue";
import {useMatchStateStore} from "@/store/matchState";
import type {ControlApi} from "@/providers/controlApi/ControlApi";
import {MatchType} from "@/proto/ssl_gc_referee_message";
import SelectInput from "@/components/common/SelectInput.vue";
import {matchTypeNames} from "@/helpers/texts";

const store = useMatchStateStore()
const control = inject<ControlApi>('control-api')

const model = computed(() => {
  return store.matchState.matchType
})

const options = Object.values(MatchType).filter((matchType => matchType !== MatchType.UNRECOGNIZED))
const optionsLabel = (v: MatchType) => matchTypeNames.get(v) || "-"

const onChange = (newValue: MatchType) => {
  control?.UpdateMatchConfig({matchType: newValue})
}
</script>

<template>
  <SelectInput
    label="Match type"
    style="min-width: 130px"
    :model="model"
    :options="options"
    :option-label="optionsLabel"
    @onUpdate="onChange"
  />
</template>
