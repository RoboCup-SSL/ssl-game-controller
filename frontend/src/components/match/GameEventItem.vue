<script setup lang="ts">
import {computed} from "vue";
import TeamBadge from "@/components/common/TeamBadge.vue";
import {gameEventNames} from "@/helpers/texts";
import type {GameEvent} from "@/proto/ssl_gc_game_event";
import {gameEventForTeam, originIcon} from "@/helpers";
import GameEventDetailsTree from "@/components/match/GameEventDetailsTree.vue";
import dayjs from "dayjs";

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
  <q-expansion-item expand-separator>
    <template v-slot:header>
      <q-item-section>
        <q-item-label>
          <TeamBadge :team="team"/>
          {{ label }}
        </q-item-label>
        <q-item-label caption v-if="time">{{ time }}</q-item-label>
      </q-item-section>
      <q-item-section side>
        <div class="row">
          <q-icon class="q-mx-xs" :name="originIcon(origin)" color="primary" :alt="origin"
                  v-for="(origin, key) in origins" :key="key">
            <q-tooltip>
              {{ origin }}
            </q-tooltip>
          </q-icon>
        </div>
      </q-item-section>
    </template>
    <GameEventDetailsTree :game-event="props.gameEvent"/>
  </q-expansion-item>
</template>
