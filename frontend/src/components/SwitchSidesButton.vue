<script setup lang="ts">
import {inject} from "vue";
import {useMatchStateStore} from "@/store/matchState";
import {Team} from "@/proto/ssl_gc_common";
import type {ControlApi} from "@/providers/controlApi/ControlApi";

const store = useMatchStateStore()
const control = inject<ControlApi>('control-api')

const update = () => {
  control?.UpdateTeamState({
    forTeam: Team.YELLOW,
    onPositiveHalf: store.matchState.teamState![Team.BLUE].onPositiveHalf,
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
