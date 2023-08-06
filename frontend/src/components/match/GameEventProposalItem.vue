<script setup lang="ts">
import {computed} from "vue";
import GameEventItem from "@/components/match/GameEventItem.vue";
import type {Proposal} from "@/proto/ssl_gc_state";

const props = defineProps<{
  proposal: Proposal,
}>()

const gameEvent = computed(() => {
  return props.proposal.gameEvent!
})
</script>

<template>
  <GameEventItem :game-event="gameEvent"/>
</template>
