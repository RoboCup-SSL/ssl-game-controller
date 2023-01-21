<script setup lang="ts">
import {inject} from "vue";
import {Team} from "@/proto/ssl_gc_common";
import type {ControlApi} from "@/providers/controlApi/ControlApi";

const control = inject<ControlApi>('control-api')

const update = () => {
  const value = Math.random() < 0.5
  control?.UpdateTeamState({
    forTeam: Team.YELLOW,
    onPositiveHalf: value,
  })
}
</script>

<template>
  <q-btn
    label="Shuffle sides"
    color="primary"
    icon="casino"
    @click="update"
  />
</template>
