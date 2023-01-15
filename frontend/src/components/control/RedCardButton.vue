<script setup lang="ts">
import {inject} from "vue";
import ControlButton from "@/components/control/ControlButton.vue";
import type {ControlApi} from "@/providers/controlApi/ControlApi";
import type {Team} from "@/proto/ssl_gc_common";

const props = defineProps<{
  team: Team,
}>()

const control = inject<ControlApi>('control-api')

const submit = () => {
  control?.SubmitChange({
    origin: "UI",
    revertible: true,
    change: {
      $case: "addRedCardChange",
      addRedCardChange: {
        forTeam: props.team,
        causedByGameEvent: undefined,
      }
    }
  })
}

</script>

<template>
  <ControlButton label="Red Card" :disable="false" :action="submit" :team="team"/>
</template>
