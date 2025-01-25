<script setup lang="ts">
import {computed, inject} from "vue";
import TeamBadge from "@/components/common/TeamBadge.vue";
import type {ContinueActionJson} from "@/proto/engine/ssl_gc_engine_pb";
import {useMatchStateStore} from "@/store/matchState";
import {continueActionLabel} from "@/helpers/texts";
import type {ControlApi} from "@/providers/controlApi";

const props = defineProps<{
  action: ContinueActionJson,
  id: number,
}>()

const store = useMatchStateStore()
const control = inject<ControlApi>('control-api')

const team = computed(() => {
  return props.action.forTeam
})

const color = computed(() => {
  switch (props.action.state) {
    case 'READY_AUTO':
      return 'positive'
    case 'READY_MANUAL':
      return 'primary'
    case 'BLOCKED':
      return 'negative'
    case 'WAITING':
      return 'warning'
    case 'DISABLED':
      return 'negative'
    default:
      return 'secondary'
  }
})

const label = computed(() => {
  return continueActionLabel(props.action.type!, store.matchState.nextCommand)
})

const issues = computed(() => {
  return props.action.continuationIssues
})

const submitAction = () => {
  control?.Continue(props.action)
}
</script>

<template>
  <q-btn class="q-mx-md q-my-xs"
         :color="color"
         :disable="props.action.state === 'DISABLED'"
         @click="submitAction">
    <TeamBadge :team="team"/>
    {{ label }}
    <q-list dense>
      <q-item v-for="(issue, key) in issues" :key="key">
        <q-icon name="warning"></q-icon>
        {{ issue }}
      </q-item>
    </q-list>

    <q-badge color="orange" :label="props.id+1" floating/>
  </q-btn>
</template>
