<script setup lang="ts">
import TeamBadge from "@/components/common/TeamBadge.vue";
import type {ManualActions} from "@/providers/manualActions";
import {computed, inject} from "vue";
import type {Command_Type} from "@/proto/ssl_gc_state";
import type {Team} from "@/proto/ssl_gc_common";
import {useUiStateStore} from "@/store/uiState";

const props = defineProps<{
  type: Command_Type,
  team?: Team,
}>()

const manualActions = inject<ManualActions>('command-actions')!
const uiStore = useUiStateStore()
const action = computed(() => manualActions.getCommandAction(props.type, props.team))
const label = computed(() => {
  if (uiStore.showShortcuts && action.value.shortcutLabel) {
    return `${action.value.label} [${action.value.shortcutLabel}]`
  }
  return action.value.label
})

</script>

<template>
  <q-btn class="q-mx-md q-my-xs" color="primary" @click="action.send" :disable="!action.enabled" :label="label">
    <TeamBadge :team="action.team" floating/>
  </q-btn>
</template>
