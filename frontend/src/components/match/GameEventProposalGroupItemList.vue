<script setup lang="ts">
import {computed} from "vue";
import GameEventProposalGroupItem from "@/components/match/GameEventProposalGroupItem.vue";
import {useMatchStateStore} from "@/store/matchState";

const store = useMatchStateStore()

const proposalGroups = computed(() => {
  return store.matchState.proposalGroups!
})
</script>

<template>
  <q-list bordered class="rounded-borders" v-if="proposalGroups.length > 0">
    <GameEventProposalGroupItem
      :proposal-group="group"
      :group-id="groupId"
      v-for="(group, groupId) in proposalGroups"
      :key="groupId"
    />
  </q-list>
  <div v-else>
    No recent game event proposals
  </div>
</template>
