<script setup lang="ts">
import {computed, inject} from "vue";
import GameEventProposalItem from "@/components/match/GameEventProposalItem.vue";
import {gameEventNames} from "@/helpers/texts";
import type {ControlApi} from "@/providers/controlApi/ControlApi";
import type {ProposalGroup} from "@/proto/ssl_gc_state";
import type {GameEvent} from "@/proto/ssl_gc_game_event";

const props = defineProps<{
  proposalGroup: ProposalGroup,
  groupId: string,
}>()

const control = inject<ControlApi>('control-api')

const proposals = computed(() => {
  return props.proposalGroup.proposals
})

const gameEventLabel = (gameEvent: GameEvent) => {
  return gameEventNames.get(gameEvent?.type!)
}

const label = computed(() => {
  return Array.from(new Set(proposals.value?.map(p => gameEventLabel(p.gameEvent!))).values()).join(" / ")
})

const pending = computed(() => {
  return !props.proposalGroup.accepted
})

const groupIcon = computed(() => {
  if (props.proposalGroup.accepted) {
    return 'check_circle'
  }
  return 'pending'
})

const acceptGroup = () => {
  control?.AcceptProposalGroup(props.groupId)
}
</script>

<template>
  <q-expansion-item
    expand-separator
    expand-icon-toggle
    :default-opened="pending"
  >
    <template v-slot:header>
      <q-item-section side>
        <q-icon :name="groupIcon"/>
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ label }}</q-item-label>
      </q-item-section>
      <q-item-section side v-if="pending">
        <q-btn flat dense round icon="done" @click="acceptGroup"/>
      </q-item-section>
    </template>
    <q-list>
      <GameEventProposalItem :proposal="proposal" v-for="(proposal, key) in proposals" :key="key"/>
    </q-list>
  </q-expansion-item>
</template>
