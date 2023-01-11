<script setup lang="ts">
import {computed} from "vue";
import type {Proposal} from "@/proto/ssl_gc_state";
import dayjs from 'dayjs'
import GameEvent from "@/components/GameEvent.vue";

const props = defineProps<{
  proposal: Proposal,
}>()

const time = computed(() => {
  return dayjs(props.proposal.timestamp).format("MMM, DD YYYY HH:mm:ss,SSS")
})

const gameEvent = computed(() => {
  return props.proposal.gameEvent
})
</script>

<template>
  <GameEvent :game-event="gameEvent" :caption="time"/>
</template>
