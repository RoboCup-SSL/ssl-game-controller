<script setup lang="ts">
import {inject} from "vue";
import type {ControlApi} from "@/providers/controlApi/ControlApi";
import ControlButton from "@/components/control/buttons/ControlButton.vue";
import {useMatchStateStore} from "@/store/matchState";
import type {Team} from "@/proto/ssl_gc_common";

const props = defineProps<{
  team: Team,
}>()

const store = useMatchStateStore()
const control = inject<ControlApi>('control-api')

const submit = () => {
  control?.SubmitChange({
    origin: "UI",
    revertible: true,
    change: {
      $case: "addYellowCardChange",
      addYellowCardChange: {
        forTeam: props.team,
        causedByGameEvent: undefined,
      }
    }
  })
}

</script>

<template>
  <ControlButton label="Yellow Card" :disable="false" :action="submit" :team="team"/>
</template>
