<script setup lang="ts">
import {computed} from "vue";
import GameEventProposalGroupItem from "@/components/GameEventProposalGroupItem.vue";
import {useMatchStateStore} from "@/store/matchState";

const store = useMatchStateStore()

const proposalGroups = computed(() => {
  return store.matchState.proposalGroups
})

const hasGroups = computed(() => {
  return proposalGroups.value!.length > 0
})
</script>

<template>
  <q-list bordered class="rounded-borders" v-if="hasGroups">
    <GameEventProposalGroupItem
      :proposal-group="group"
      :group-id="groupId"
      v-for="(group, groupId) in proposalGroups"
      :key="groupId"
    />
  </q-list>
</template>
