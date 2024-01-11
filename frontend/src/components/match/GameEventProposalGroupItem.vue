<script setup lang="ts">
import {computed} from "vue";
import {gameEventNames} from "@/helpers/texts";
import type {ProposalGroup} from "@/proto/ssl_gc_state";
import type {GameEvent} from "@/proto/ssl_gc_game_event";
import TeamBadge from "@/components/common/TeamBadge.vue";
import {gameEventForTeam} from "@/helpers";
import OriginIcon from "@/components/common/OriginIcon.vue";
import dayjs from "dayjs";

const props = defineProps<{
  proposalGroup: ProposalGroup,
  groupId: string,
  acceptedGameEvent?: GameEvent,
}>()

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

const createdTimestamp = computed(() => {
  if (props.acceptedGameEvent) {
    return props.acceptedGameEvent.createdTimestamp
  }
  return proposals.value?.flatMap(p => p.gameEvent?.createdTimestamp).sort()[0]
})

const time = computed(() => {
  if (createdTimestamp.value) {
    return dayjs(createdTimestamp.value / 1e3).format("MMM, DD YYYY HH:mm:ss,SSS")
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
