<script setup lang="ts">
import {computed, inject} from "vue";
import NumberInput from "@/components/common/NumberInput.vue";
import type {TeamJson} from "@/proto/state/ssl_gc_common_pb";
import type {ControlApi} from "@/providers/controlApi";
import type {YellowCardJson} from "@/proto/state/ssl_gc_state_pb";
import {durationSeconds} from "@/helpers";

const props = defineProps<{
  team: TeamJson,
  card: YellowCardJson,
}>()

const control = inject<ControlApi>('control-api')

const model = computed(() => {
  return durationSeconds(props.card.timeRemaining!)
})

const updateValue = (value: number | undefined) => {
  if (value !== undefined) {
    control?.UpdateTeamState({
      forTeam: props.team,
      yellowCard: {
        id: props.card.id,
        timeRemaining: `${value}s`,
      },
    })
  }
}
</script>

<template>
  <NumberInput :modelValue="model" @update:model-value="updateValue"/>
</template>
