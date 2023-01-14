<script setup lang="ts">
import {computed, inject} from "vue";
import {useMatchStateStore} from "@/store/matchState";
import {gameEventNames} from "@/helpers/texts";
import type {Team} from "@/proto/ssl_gc_common";
import type {ControlApi} from "@/providers/controlApi/ControlApi";
import type {GameEvent} from "@/proto/ssl_gc_game_event";

const props = defineProps<{
  team: Team,
}>()

const store = useMatchStateStore()
const control = inject<ControlApi>('control-api')

const cards = computed(() => {
  return store.matchState.teamState![props.team].redCards
})
const hasData = computed(() => {
  return cards.value?.length! > 0
})

const causeText = (cause?: GameEvent) => {
  if (cause) {
    return gameEventNames.get(cause.type!)
  }
  return "-"
}

const removeCard = (cardId?: number) => {
  control?.UpdateTeamState({
    forTeam: props.team,
    removeRedCard: cardId,
  })
}
</script>

<template>
  <q-markup-table dense v-if="hasData">
    <thead>
    <tr>
      <th class="text-left" scope="col">Cause</th>
      <th class="text-center" scope="col"></th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="card in cards" :key="card.id">
      <td class="text-left">{{ causeText(card.causedByGameEvent) }}</td>
      <td class="text-right">
        <q-btn round @click="() => removeCard(card.id)" icon="delete"></q-btn>
      </td>
    </tr>
    </tbody>
  </q-markup-table>
  <p v-else>
    No red cards
  </p>
</template>
