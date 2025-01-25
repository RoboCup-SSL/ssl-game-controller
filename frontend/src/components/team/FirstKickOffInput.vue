<script setup lang="ts">
import {computed, inject} from "vue";
import ToggleInput from "@/components/common/ToggleInput.vue";
import {useMatchStateStore} from "@/store/matchState";
import {opponent} from "@/helpers";
import type {ControlApi} from "@/providers/controlApi";
import type {TeamJson} from "@/proto/state/ssl_gc_common_pb";

const props = defineProps<{
  team: TeamJson,
}>()

const store = useMatchStateStore()
const control = inject<ControlApi>('control-api')

const model = computed(() => {
  return store.matchState.firstKickoffTeam === props.team
})

const updateValue = (value: boolean) => {
  control?.UpdateMatchConfig({
    firstKickoffTeam: value ? props.team : opponent(props.team)
  })
}
</script>

<template>
  <ToggleInput
    :modelValue="model"
    label="First kick-off"
    @update:model-value="updateValue"
  />
</template>
