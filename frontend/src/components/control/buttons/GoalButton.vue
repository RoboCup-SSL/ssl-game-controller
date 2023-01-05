<script setup lang="ts">
import {inject} from "vue";
import {ControlApi} from "@/providers/controlApi/ControlApi";
import ControlButton from "@/components/control/buttons/ControlButton.vue";
import {useMatchStateStore} from "@/store/matchState";
import {Team} from "@/proto/ssl_gc_common";
import {GameEvent} from "@/proto/ssl_gc_game_event";
import Type = GameEvent.Type;

const props = defineProps<{
  team: Team,
}>()

const store = useMatchStateStore()
const control = inject<ControlApi>('control-api')

const submit = () => {
  control?.AddGameEvent(GameEvent.fromObject({
    type: Type.GOAL,
    origin: [],
    goal: {
      byTeam: props.team,
    }
  }))
}

</script>

<template>
  <ControlButton label="Goal" :disable="false" :action="submit"/>
</template>
