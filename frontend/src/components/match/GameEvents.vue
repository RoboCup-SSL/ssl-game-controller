<script setup lang="ts">
import {computed, inject} from "vue";
import GameEventItem from "@/components/match/GameEventItem.vue";
import GameEventProposalGroupItem from "@/components/match/GameEventProposalGroupItem.vue";
import {useMatchStateStore} from "@/store/matchState";
import type {ProposalGroupJson} from "@/proto/state/ssl_gc_state_pb";
import type {GameEventJson} from "@/proto/state/ssl_gc_game_event_pb";
import GameEventDetailsTree from "@/components/match/GameEventDetailsTree.vue";
import type {ControlApi} from "@/providers/controlApi";
import type {TimestampJson} from "@bufbuild/protobuf/wkt";
import {timestampJsonMs, usToTimestampJson} from "@/helpers";

const store = useMatchStateStore()
const control = inject<ControlApi>('control-api')

type GameEventWrappedItem = {
  id: string
  timestamp: TimestampJson
  proposalGroup?: ProposalGroupJson
  gameEvent?: GameEventJson
}

interface GameEventTreeNode {
  id: string
  header: string
  proposalGroup?: ProposalGroupJson
  gameEvent?: GameEventJson
  children?: GameEventTreeNode[]
}

interface Prop {
  node: GameEventTreeNode
}

const gameEventItems = computed(() => {
  const gameEvents = store.matchState.gameEvents ?? []
  const proposalGroups = store.matchState.proposalGroups ?? []
  const items: GameEventWrappedItem[] = []
  for (const proposalGroup of proposalGroups) {
    const item: GameEventWrappedItem = {
      id: proposalGroup.id!,
      timestamp: proposalGroup.proposals![0].timestamp!,
      proposalGroup: proposalGroup,
    }
    items.push(item)
  }
  for (const gameEvent of gameEvents) {
    const gameEventItem = items.find(item => item.id === gameEvent.id);
    if (gameEventItem) {
      gameEventItem.gameEvent = gameEvent
    } else {
      const item: GameEventWrappedItem = {
        id: gameEvent.id!,
        timestamp: usToTimestampJson(gameEvent.createdTimestamp!),
        gameEvent: gameEvent,
      }
      items.push(item)
    }
  }
  // Sort descending by timestamp: most recent first
  // This fits the order of the protocol list and helps when many items are present
  items.sort((a, b) => timestampJsonMs(b.timestamp) - timestampJsonMs(a.timestamp))
  return items
})

function gameEventNode(gameEvent: GameEventJson): GameEventTreeNode {
  return {
    id: gameEvent.id || '',
    header: 'game-event',
    gameEvent: gameEvent,
    children: [
      {
        id: (gameEvent.id || '') + "-details",
        header: 'game-event-details',
        gameEvent: gameEvent,
      }
    ]
  }
}

const nodes = computed(() => {
  const nodeList: GameEventTreeNode[] = []

  for (const gameEventItem of gameEventItems.value) {
    if (gameEventItem.proposalGroup) {
      const children = gameEventItem.proposalGroup.proposals!.map(proposal => {
        return gameEventNode(proposal.gameEvent!)
      });
      if (!gameEventItem.proposalGroup.accepted) {
        children.unshift({
          id: gameEventItem.id + "-accept",
          header: 'accept',
          proposalGroup: gameEventItem.proposalGroup,
          gameEvent: gameEventItem.gameEvent,
        })
      }
      nodeList.push({
        id: gameEventItem.id,
        header: 'proposal',
        gameEvent: gameEventItem.gameEvent,
        proposalGroup: gameEventItem.proposalGroup,
        children: children
      })
    } else if (gameEventItem.gameEvent) {
      nodeList.push(gameEventNode(gameEventItem.gameEvent))
    }
  }
  return nodeList
})

const acceptGroup = (groupId: string) => {
  control?.AcceptProposalGroup(groupId)
}

</script>

<template>
  <q-tree
    v-if="gameEventItems.length > 0"
    :nodes="nodes"
    node-key="id"
    dense
    class="full-width"
  >
    <!--suppress VueUnrecognizedSlot -->
    <template #header-accept="prop: Prop">
      <q-item class="full-width">
        <q-item-section side>
          <q-icon name="done"/>
        </q-item-section>
        <q-item-section>
          <q-btn
            dense
            color="primary"
            label="Accept"
            @click="() => acceptGroup(prop.node.proposalGroup?.id!)"
            v-if="!prop.node.proposalGroup?.accepted"/>
        </q-item-section>
      </q-item>
    </template>

    <!--suppress VueUnrecognizedSlot -->
    <template #header-proposal="prop: Prop">
      <GameEventProposalGroupItem
        class="full-width"
        :proposal-group="prop.node.proposalGroup!"
        :group-id="prop.node.id"
        :accepted-game-event="prop.node.gameEvent!"
      />
    </template>

    <!--suppress VueUnrecognizedSlot -->
    <template #header-game-event="prop: Prop">
      <GameEventItem
        class="full-width"
        :game-event="prop.node.gameEvent!"
      />
    </template>

    <!--suppress VueUnrecognizedSlot -->
    <template v-slot:header-game-event-details="prop: Prop">
      <GameEventDetailsTree
        class="full-width"
        :game-event="prop.node.gameEvent!"
      />
    </template>
  </q-tree>

  <div v-else>
    No recent game event proposals
  </div>
</template>
