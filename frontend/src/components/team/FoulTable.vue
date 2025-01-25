<script setup lang="ts">
import {computed, inject} from "vue";
import {useMatchStateStore} from "@/store/matchState";
import {gameEventName} from "@/helpers/texts";
import type {TeamJson} from "@/proto/state/ssl_gc_common_pb";
import type {ControlApi} from "@/providers/controlApi";
import type {GameEventJson} from "@/proto/state/ssl_gc_game_event_pb";
import {formatTimestamp} from "@/helpers";

const props = defineProps<{
  team: TeamJson,
}>()

const store = useMatchStateStore()
const control = inject<ControlApi>('control-api')

const fouls = computed(() => {
  return store.matchState.teamState![props.team].fouls
})
const hasData = computed(() => {
  return fouls.value?.length! > 0
})

const causeText = (cause?: GameEventJson) => {
  if (cause) {
    return gameEventName(cause.type!)
  }
  return "-"
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
      <td class="text-left">{{ formatTimestamp(foul.timestamp!) }}</td>
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
