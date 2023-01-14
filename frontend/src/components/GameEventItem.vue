<script setup lang="ts">
import {computed} from "vue";
import TeamBadge from "@/components/common/TeamBadge.vue";
import {gameEventNames} from "@/helpers/texts";
import {Team} from "@/proto/ssl_gc_common";
import type {GameEvent} from "@/proto/ssl_gc_game_event";

const props = defineProps<{
  gameEvent: GameEvent,
  caption?: string,
}>()

const label = computed(() => {
  return gameEventNames.get(props.gameEvent?.type!)
})

const details = computed(() => {
  const event = props.gameEvent?.event!
  return (event as { [key: string]: any })[event.$case]
})

const team = computed(() => {
  if (Object.prototype.hasOwnProperty.call(details.value, "byTeam")) {
    return details.value["byTeam"] as Team
  }
  return Team.UNKNOWN
})

const originIcon = (origin: string) => {
  switch (origin) {
    case "TIGERs AutoRef":
      return "img:/icons/tigers-autoref.png"
    case "ER-Force":
      return "img:/icons/erforce-autoref.svg"
    case "GC":
      return "developer_board"
    case "UI":
      return "person_outline"
    default:
      return "help_outline"
  }
}

const origins = computed(() => {
  return props.gameEvent?.origin
})
</script>

<template>
  <q-expansion-item expand-separator>
    <template v-slot:header>
      <q-item-section>
        <q-item-label>
          {{ label }}
          <TeamBadge :team="team"/>
        </q-item-label>
        <q-item-label caption v-if="caption">{{ caption }}</q-item-label>
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
    <q-card>
      <q-card-section>
        {{ details }}
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>
