<script setup lang="ts">
import {computed, inject} from "vue";
import GameEventProposalItem from "@/components/match/GameEventProposalItem.vue";
import {gameEventNames} from "@/helpers/texts";
import type {ControlApi} from "@/providers/controlApi/ControlApi";
import type {ProposalGroup} from "@/proto/ssl_gc_state";
import type {GameEvent} from "@/proto/ssl_gc_game_event";
import TeamBadge from "@/components/common/TeamBadge.vue";
import {gameEventForTeam, originIcon} from "@/helpers";
import GameEventItem from "@/components/match/GameEventItem.vue";

const props = defineProps<{
  proposalGroup: ProposalGroup,
  groupId: string,
  acceptedGameEvent?: GameEvent,
}>()

const control = inject<ControlApi>('control-api')

const proposals = computed(() => {
  return props.proposalGroup.proposals
})

const gameEventLabel = (gameEvent: GameEvent) => {
  return gameEventNames.get(gameEvent?.type!)
}

const label = computed(() => {
  if (props.acceptedGameEvent) {
    return gameEventLabel(props.acceptedGameEvent)
  }
  return Array.from(new Set(proposals.value?.map(p => gameEventLabel(p.gameEvent!))).values()).join(" / ")
})

const teams = computed(() => {
  if (props.acceptedGameEvent) {
    return Array.of(gameEventForTeam(props.acceptedGameEvent))
  }
  return Array.from(new Set(proposals.value?.map(p => gameEventForTeam(p.gameEvent!))).values())
})

const origins = computed(() => {
  if (props.acceptedGameEvent) {
    return props.acceptedGameEvent.origin
  }
  return Array.from(new Set(proposals.value?.flatMap(p => p.gameEvent?.origin || []).values()))
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
      <q-item-section side v-if="pending">
        <q-icon :name="groupIcon"/>
      </q-item-section>
      <q-item-section>
        <q-item-label>
          <TeamBadge v-for="team in teams" :team="team" :key="team"/>
          {{ label }}
        </q-item-label>
      </q-item-section>
      <q-item-section side>
        <div class="row">
          <q-icon class="q-mx-xs" :name="originIcon(origin)" color="primary" :alt="origin"
                  v-for="(origin, key) in origins" :key="key">
            <q-tooltip>
              {{ origin }}
            </q-tooltip>
          </q-icon>
        </div>
        <q-btn flat dense round icon="done" @click="acceptGroup" v-if="pending"/>
      </q-item-section>
    </template>
    <q-list>
      <GameEventItem :game-event="acceptedGameEvent" v-if="acceptedGameEvent"/>
      <GameEventProposalItem :proposal="proposal" v-for="(proposal, key) in proposals" :key="key"/>
    </q-list>
  </q-expansion-item>
</template>
