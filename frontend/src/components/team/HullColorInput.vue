<script setup lang="ts">
import {computed, inject} from "vue";
import ButtonToggleInput from "@/components/common/ButtonToggleInput.vue";
import {useMatchStateStore} from "@/store/matchState";
import {type TeamJson} from "@/proto/state/ssl_gc_common_pb";
import type {ControlApi} from "@/providers/controlApi";
import {type HullColorJson} from "@/proto/state/ssl_gc_referee_message_pb";

const props = defineProps<{
  team: TeamJson,
}>()

const store = useMatchStateStore()
const control = inject<ControlApi>('control-api')

const model = computed(() => {
  return store.matchState.teamState?.[props.team]?.hullColor || 'HULL_COLOR_DARK'
})
const options: { label: string, value: HullColorJson }[] = [
  {label: 'Dark', value: 'HULL_COLOR_DARK'},
  {label: 'Light', value: 'HULL_COLOR_LIGHT'},
]

const onChange = (value: HullColorJson) => {
  control?.UpdateTeamState({
    forTeam: props.team,
    hullColor: value,
  })
}
</script>

<template>
  <ButtonToggleInput
    :modelValue="model"
    :options="options"
    @update:model-value="onChange"
  />
</template>
