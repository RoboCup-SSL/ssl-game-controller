<script setup lang="ts">
import {inject} from "vue";
import ControlButton from "@/components/control/ControlButton.vue";
import type {ControlApi} from "@/providers/controlApi";
import type {TeamJson} from "@/proto/state/ssl_gc_common_pb";

const props = defineProps<{
  team: TeamJson,
}>()

const control = inject<ControlApi>('control-api')

const submit = () => {
  control?.AddGameEvent({
    type: 'GOAL',
    origin: ["UI"],
    goal: {
      byTeam: props.team,
    }
  })
}

</script>

<template>
  <ControlButton label="Goal" :disable="false" :action="submit" :team="team"/>
</template>
