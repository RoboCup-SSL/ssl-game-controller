<script setup lang="ts">
import {computed} from "vue";
import {Team} from "@/proto/ssl_gc_common";

const props = defineProps<{
  team?: Team,
  floating?: boolean,
}>()

const color = computed(() => {
  switch (props.team) {
    case Team.YELLOW:
      return "team-yellow"
    case Team.BLUE:
      return "team-blue"
    default:
      return ""
  }
})
const label = computed(() => {
  switch (props.team) {
    case Team.YELLOW:
      return "Yellow"
    case Team.BLUE:
      return "Blue"
    default:
      return ""
  }
})
const shown = computed(() => {
  return props.team === Team.YELLOW || props.team === Team.BLUE
})
</script>

<template>
  <q-badge :class="{'q-mx-xs': !floating}"
           v-if="shown"
           :color="color"
           :text-color="color"
           :floating="floating"
           :label="label"/>
</template>
