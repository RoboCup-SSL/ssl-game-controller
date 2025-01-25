<script setup lang="ts">
import {computed} from "vue";
import {type TeamJson} from "@/proto/state/ssl_gc_common_pb";

const props = defineProps<{
  team?: TeamJson,
  floating?: boolean,
}>()

const color = computed(() => {
  switch (props.team) {
    case 'YELLOW':
      return "team-yellow"
    case 'BLUE':
      return "team-blue"
    default:
      return ""
  }
})
const label = computed(() => {
  switch (props.team) {
    case 'YELLOW':
      return "Yellow"
    case 'BLUE':
      return "Blue"
    default:
      return ""
  }
})
const shown = computed(() => {
  return props.team === 'YELLOW' || props.team === 'BLUE'
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
