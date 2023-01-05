<script setup lang="ts">
import {inject} from "vue";
import {ControlApi} from "@/providers/controlApi/ControlApi";
import ControlButton from "@/components/control/buttons/ControlButton.vue";
import {useMatchStateStore} from "@/store/matchState";
import {Team} from "@/proto/ssl_gc_common";
import {Change} from "@/proto/ssl_gc_change";

const props = defineProps<{
  team: Team,
}>()

const store = useMatchStateStore()
const control = inject<ControlApi>('control-api')

const submit = () => {
  control?.SubmitChange(Change.fromObject({
    addRedCardChange: {
      forTeam: props.team,
    }
  }))
}

</script>

<template>
  <ControlButton label="Red Card" :disable="false" :action="submit"/>
</template>
