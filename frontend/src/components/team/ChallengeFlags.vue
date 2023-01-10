<script setup lang="ts">
import {computed, inject} from "vue";
import type {Team} from "@/proto/ssl_gc_common";
import {useMatchStateStore} from "@/store/matchState";
import type {ControlApi} from "@/providers/controlApi/ControlApi";
import NumberInput from "@/components/common/NumberInput.vue";

const props = defineProps<{
  team: Team,
}>()

const store = useMatchStateStore()
const control = inject<ControlApi>('control-api')

const model = computed(() => {
  return store.matchState.teamState![props.team].challengeFlags
})

const onUpdate = (value: number) => {
  control?.UpdateTeamState({
    forTeam: props.team,
    challengeFlagsLeft: value,
  })
}

</script>

<template>
  <NumberInput :model="model" @onUpdate="onUpdate"/>
</template>
