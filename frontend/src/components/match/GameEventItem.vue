<script setup lang="ts">
import {computed} from "vue";
import TeamBadge from "@/components/common/TeamBadge.vue";
import {gameEventNames} from "@/helpers/texts";
import type {GameEvent} from "@/proto/ssl_gc_game_event";
import {gameEventForTeam} from "@/helpers";
import dayjs from "dayjs";
import OriginIcon from "@/components/common/OriginIcon.vue";

const props = defineProps<{
  gameEvent: GameEvent,
}>()

const label = computed(() => {
  return gameEventNames.get(props.gameEvent.type!)
})

const team = computed(() => {
  return gameEventForTeam(props.gameEvent)
})

const origins = computed(() => {
  return props.gameEvent.origin
})

const time = computed(() => {
  if (props.gameEvent.createdTimestamp) {
    return dayjs(props.gameEvent.createdTimestamp / 1e3).format("MMM, DD YYYY HH:mm:ss,SSS")
  }
  return undefined
})
</script>

<template>
  <q-item dense>
    <q-item-section side>
      <q-icon name="warning"/>
    </q-item-section>
    <q-item-section>
      <q-item-label>
        <TeamBadge :team="team"/>
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
