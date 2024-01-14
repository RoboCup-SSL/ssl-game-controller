<script setup lang="ts">
import {inject} from "vue";
import type {ControlApi} from "@/providers/controlApi";

const control = inject<ControlApi>('control-api')

const update = () => {
  control?.SubmitChange({
    change: {
      $case: "switchColorsChange",
      switchColorsChange: {}
    }
  })
}
</script>

<template>
  <q-btn
    label="Switch color"
    color="primary"
    icon="sync_alt"
    @click="update"
  />
</template>
