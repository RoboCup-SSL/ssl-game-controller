<script setup lang="ts">
import {computed} from "vue";
import {gameEventName} from "@/helpers/texts";
import type {ProposalGroupJson} from "@/proto/state/ssl_gc_state_pb";
import type {GameEventJson} from "@/proto/state/ssl_gc_game_event_pb";
import TeamBadge from "@/components/common/TeamBadge.vue";
import {formatTimestamp, gameEventForTeam, usToTimestampJson} from "@/helpers";
import OriginIcon from "@/components/common/OriginIcon.vue";

const props = defineProps<{
  proposalGroup: ProposalGroupJson,
  groupId: string,
  acceptedGameEvent?: GameEventJson,
}>()

const proposals = computed(() => {
  return props.proposalGroup.proposals
})

const gameEventLabel = (gameEvent: GameEventJson) => {
  return gameEventName(gameEvent.type!)
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

const createdTimestamp = computed(() => {
  if (props.acceptedGameEvent) {
    return usToTimestampJson(props.acceptedGameEvent.createdTimestamp!)
  }
  return proposals.value?.flatMap(p => usToTimestampJson(p.gameEvent?.createdTimestamp || 0)).sort()[0]
})

const time = computed(() => {
  if (createdTimestamp.value) {
    return formatTimestamp(createdTimestamp.value)
  }
  return undefined
})

const groupIcon = computed(() => {
  if (props.proposalGroup.accepted) {
    return 'check_circle'
  }
  return 'pending'
})
</script>

<template>
  <q-item dense>
    <q-item-section side>
      <q-icon :name="groupIcon"/>
    </q-item-section>
    <q-item-section>
      <q-item-label>
        <TeamBadge v-for="team in teams" :team="team" :key="team"/>
        {{ label }}
      </q-item-label>
      <q-item-label caption v-if="time">{{ time }}</q-item-label>
    </q-item-section>
    <q-item-section side>
      <div class="row">
        <OriginIcon
            v-for="(gameEventOrigin, key) in origins"
            :key="key"
            :origin="gameEventOrigin"
            tooltip
        />
      </div>
    </q-item-section>
  </q-item>
</template>
