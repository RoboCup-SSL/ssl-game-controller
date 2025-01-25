<script setup lang="ts">
import {inject} from "vue";
import type {ControlApi} from "@/providers/controlApi";
import {useMatchStateStore} from "@/store/matchState";

const store = useMatchStateStore()
const control = inject<ControlApi>('control-api')

const update = () => {
  const value = !store.matchState.teamState!['YELLOW'].onPositiveHalf
  control?.UpdateTeamState({
    forTeam: 'YELLOW',
    onPositiveHalf: value,
  })
}
</script>

<template>
  <q-btn
    label="Switch sides"
    color="primary"
    icon="sync_alt"
    @click="update"
  />
</template>
