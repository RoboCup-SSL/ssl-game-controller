<script setup lang="ts">
import {inject} from "vue";
import ControlButton from "@/components/control/buttons/ControlButton.vue";
import {useMatchStateStore} from "@/store/matchState";
import {GameEvent_Goal, GameEvent_Type} from "@/proto/ssl_gc_game_event";
import type {ControlApi} from "@/providers/controlApi/ControlApi";
import type {Team} from "@/proto/ssl_gc_common";

const props = defineProps<{
  team: Team,
}>()

const store = useMatchStateStore()
const control = inject<ControlApi>('control-api')

const submit = () => {
  control?.AddGameEvent({
    type: GameEvent_Type.GOAL,
    origin: ["UI"],
    event: {
      $case: "goal",
      goal: GameEvent_Goal.fromJSON({
        byTeam: props.team,
      })
    }
  })
}

</script>

<template>
  <ControlButton label="Goal" :disable="false" :action="submit" :team="team"/>
</template>
