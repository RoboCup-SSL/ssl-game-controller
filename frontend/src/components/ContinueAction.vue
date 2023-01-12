<script setup lang="ts">
import {computed, inject} from "vue";
import {ContinueAction, ContinueAction_State, ContinueAction_Type} from "@/proto/ssl_gc_engine";
import TeamBadge from "@/components/common/TeamBadge.vue";
import {useMatchStateStore} from "@/store/matchState";
import {commandNames} from "@/helpers/texts";
import {ControlApi} from "@/providers/controlApi/ControlApi";

const props = defineProps<{
  action: ContinueAction,
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
      return 'secondary'
    case ContinueAction_State.BLOCKED:
      return 'negative'
    case ContinueAction_State.WAITING:
      return 'warning'
    default:
      return 'primary'
  }
})

const label = computed(() => {
  switch (props.action.type) {
    case ContinueAction_Type.HALT:
      return 'Halt'
    case ContinueAction_Type.RESUME_FROM_HALT:
      return 'Resume'
    case ContinueAction_Type.STOP_GAME:
      return 'Stop'
    case ContinueAction_Type.RESUME_FROM_STOP:
      return 'Force Start (no next command)'
    case ContinueAction_Type.NEXT_COMMAND:
      return commandNames.get(store.matchState.nextCommand?.type!)
    case ContinueAction_Type.BALL_PLACEMENT_START:
      return 'Start Ball Placement'
    case ContinueAction_Type.BALL_PLACEMENT_CANCEL:
      return 'Cancel Ball Placement'
    case ContinueAction_Type.TIMEOUT_START:
      return 'Start Timeout'
    case ContinueAction_Type.TIMEOUT_STOP:
      return 'Stop Timeout'
    case ContinueAction_Type.BOT_SUBSTITUTION:
      return 'Start Bot Substitution'
    case ContinueAction_Type.NEXT_STAGE:
      return 'Next Stage'
    case ContinueAction_Type.ACCEPT_GOAL:
      return 'Accept Goal'
    case ContinueAction_Type.TYPE_UNKNOWN:
    case ContinueAction_Type.UNRECOGNIZED:
    default:
      console.warn("Unhandled action: ", props.action.type)
      return props.action.type
  }
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
         @click="submitAction"
         :label="label">
    <q-list dense>
      <q-item v-for="issue in issues">
        <q-icon name="warning" color="warning"></q-icon>
        {{ issue }}
      </q-item>
    </q-list>
    <TeamBadge :team="team" floating/>
  </q-btn>
</template>
