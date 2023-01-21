<script setup lang="ts">
import {computed} from "vue";
import GameEventItem from "@/components/match/GameEventItem.vue";
import dayjs from 'dayjs'
import type {Proposal} from "@/proto/ssl_gc_state";

const props = defineProps<{
  proposal: Proposal,
}>()

const time = computed(() => {
  return dayjs(props.proposal.timestamp).format("MMM, DD YYYY HH:mm:ss,SSS")
})

const gameEvent = computed(() => {
  return props.proposal.gameEvent!
})
</script>

<template>
  <GameEventItem :game-event="gameEvent" :caption="time"/>
</template>
