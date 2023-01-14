<script setup lang="ts">
import {computed, inject} from "vue";
import {useMatchStateStore} from "@/store/matchState";
import {gameEventNames} from "@/helpers/texts";
import dayjs from "dayjs";
import type {Team} from "@/proto/ssl_gc_common";
import type {ControlApi} from "@/providers/controlApi/ControlApi";
import type {GameEvent} from "@/proto/ssl_gc_game_event";

const props = defineProps<{
  team: Team,
}>()

const store = useMatchStateStore()
const control = inject<ControlApi>('control-api')

const fouls = computed(() => {
  return store.matchState.teamState![props.team].fouls
})
const hasData = computed(() => {
  return fouls.value?.length! > 0
})

const causeText = (cause?: GameEvent) => {
  if (cause) {
    return gameEventNames.get(cause.type!)
  }
  return "-"
}
const formatTime = (timestamp?: Date) => {
  return dayjs(timestamp).format("MMM, DD YYYY HH:mm:ss,SSS")
}

const removeFoul = (foulId?: number) => {
  control?.UpdateTeamState({
    forTeam: props.team,
    removeFoul: foulId,
  })
}
</script>

<template>
  <q-markup-table dense v-if="hasData">
    <thead>
    <tr>
      <th class="text-left" scope="col">Cause</th>
      <th class="text-left" scope="col">Time</th>
      <th class="text-right" scope="col"></th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="foul in fouls" :key="foul.id">
      <td class="text-left">{{ causeText(foul.causedByGameEvent) }}</td>
      <td class="text-left">{{ formatTime(foul.timestamp) }}</td>
      <td class="text-right">
        <q-btn round @click="() => removeFoul(foul.id)" icon="delete"></q-btn>
      </td>
    </tr>
    </tbody>
  </q-markup-table>
  <p v-else>
    No fouls
  </p>
</template>
