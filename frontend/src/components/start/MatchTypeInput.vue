<script setup lang="ts">
import {computed, inject} from "vue";
import SelectInput from "@/components/common/SelectInput.vue";
import {useMatchStateStore} from "@/store/matchState";
import {matchTypeName} from "@/helpers/texts";
import {type MatchTypeJson, MatchTypeSchema} from "@/proto/state/ssl_gc_referee_message_pb";
import type {ControlApi} from "@/providers/controlApi";

const store = useMatchStateStore()
const control = inject<ControlApi>('control-api')

const model = computed(() => {
  return store.matchState.matchType || 'UNKNOWN_MATCH'
})

const options = Object.values(MatchTypeSchema.values).map((v) => v.name as MatchTypeJson)
const optionsLabel = (v: MatchTypeJson) => matchTypeName(v) || "-"

const onChange = (newValue: MatchTypeJson) => {
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
