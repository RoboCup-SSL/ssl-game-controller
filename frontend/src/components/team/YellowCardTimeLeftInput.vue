<script setup lang="ts">
import {computed, inject} from "vue";
import NumberInput from "@/components/common/NumberInput.vue";
import type {Team} from "@/proto/ssl_gc_common";
import type {ControlApi} from "@/providers/controlApi/ControlApi";
import type {YellowCard} from "@/proto/ssl_gc_state";

const props = defineProps<{
  team: Team,
  card: YellowCard,
}>()

const control = inject<ControlApi>('control-api')

const model = computed(() => {
  return props.card.timeRemaining!.seconds
})

const onUpdate = (value: number) => {
  control?.UpdateTeamState({
    forTeam: props.team,
    yellowCard: {
      id: props.card.id,
      timeRemaining: {
        seconds: value,
      }
    },
  })
}
</script>

<template>
  <NumberInput :value="model" @onUpdate="onUpdate"/>
</template>
