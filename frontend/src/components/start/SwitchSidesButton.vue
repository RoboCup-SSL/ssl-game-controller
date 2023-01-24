<script setup lang="ts">
import {inject} from "vue";
import {Team} from "@/proto/ssl_gc_common";
import type {ControlApi} from "@/providers/controlApi/ControlApi";
import {useMatchStateStore} from "@/store/matchState";

const store = useMatchStateStore()
const control = inject<ControlApi>('control-api')

const update = () => {
  const value = !store.matchState.teamState![Team.YELLOW].onPositiveHalf
  control?.UpdateTeamState({
    forTeam: Team.YELLOW,
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
