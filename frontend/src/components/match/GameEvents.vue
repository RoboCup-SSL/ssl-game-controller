<script setup lang="ts">
import {computed} from "vue";
import GameEventItem from "@/components/match/GameEventItem.vue";
import GameEventProposalGroupItem from "@/components/match/GameEventProposalGroupItem.vue";
import {useMatchStateStore} from "@/store/matchState";
import type {ProposalGroup} from "@/proto/ssl_gc_state";
import type {GameEvent} from "@/proto/ssl_gc_game_event";

const store = useMatchStateStore()

type GameEventWrappedItem = {
  id: string
  timestamp: number
  proposalGroup?: ProposalGroup
  gameEvent?: GameEvent
}

const gameEventItems = computed(() => {
  const gameEvents = store.matchState.gameEvents!
  const proposalGroups = store.matchState.proposalGroups!
  const items: GameEventWrappedItem[] = []
  for (const proposalGroup of proposalGroups) {
    const item: GameEventWrappedItem = {
      id: proposalGroup.id!,
      timestamp: proposalGroup.proposals![0].timestamp!.getTime(),
      proposalGroup: proposalGroup,
    }
    items.push(item)
  }
  for (const gameEvent of gameEvents) {
    let gameEventItem = items.find(item => item.id === gameEvent.id);
    if (gameEventItem) {
      gameEventItem.gameEvent = gameEvent
    } else {
      const item: GameEventWrappedItem = {
        id: gameEvent.id!,
        timestamp: gameEvent.createdTimestamp! / 1000,
        gameEvent: gameEvent,
      }
      items.push(item)
    }
  }
  items.sort((a, b) => a.timestamp - b.timestamp)
  return items
})

</script>

<template>
  <q-list bordered class="rounded-borders" v-if="gameEventItems.length > 0">
    <template v-for="(item) in gameEventItems">
      <GameEventProposalGroupItem
          v-if="item.proposalGroup"
          :proposal-group="item.proposalGroup"
          :group-id="item.id"
          :accepted-game-event="item.gameEvent"
          :key="item.id"
      />
      <GameEventItem
          v-else-if="item.gameEvent"
          :game-event="item.gameEvent"
          :key="item.id"
      />
    </template>
  </q-list>
  <div v-else>
    No recent game event proposals
  </div>
</template>
