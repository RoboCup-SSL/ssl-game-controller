<script setup lang="ts">
import {computed, inject} from "vue";
import TeamBadge from "@/components/common/TeamBadge.vue";
import type {ContinueAction} from "@/proto/ssl_gc_engine";
import {ContinueAction_State} from "@/proto/ssl_gc_engine";
import {useMatchStateStore} from "@/store/matchState";
import {continueActionLabel} from "@/helpers/texts";
import type {ControlApi} from "@/providers/controlApi";

const props = defineProps<{
  action: ContinueAction,
  id: number,
}>()

const store = useMatchStateStore()
const control = inject<ControlApi>('control-api')

const team = computed(() => {
  return props.action.forTeam
})

const color = computed(() => {
  switch (props.action.state) {
    case ContinueAction_State.READY_AUTO:
      return 'positive'
    case ContinueAction_State.READY_MANUAL:
      return 'primary'
    case ContinueAction_State.BLOCKED:
      return 'negative'
    case ContinueAction_State.WAITING:
      return 'warning'
    case ContinueAction_State.DISABLED:
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
         :disable="props.action.state === ContinueAction_State.DISABLED"
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
