<script setup lang="ts">
import {inject} from "vue";
import type {ControlApi} from "@/providers/controlApi";

const control = inject<ControlApi>('control-api')

const update = () => {
  if (Math.random() < 0.5) {
    control?.SubmitChange({
      change: {
        $case: "switchColorsChange",
        switchColorsChange: {}
      }
    })
  }
}
</script>

<template>
  <q-btn
    label="Random color"
    color="primary"
    icon="casino"
    @click="update"
  />
</template>
