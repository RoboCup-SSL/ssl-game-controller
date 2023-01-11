<script setup lang="ts">
import {useMatchStateStore} from "@/store/matchState";
import {computed} from "vue";
import GameEventProposalGroup from "@/components/GameEventProposalGroup.vue";

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
    <GameEventProposalGroup
      :proposal-group="group"
      :group-id="groupId"
      v-for="(group, groupId) in proposalGroups"
    />
  </q-list>
</template>
