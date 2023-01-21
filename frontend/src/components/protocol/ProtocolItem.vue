<script setup lang="ts">
import {computed, inject, ref} from "vue";
import TeamBadge from "@/components/common/TeamBadge.vue";
import type {ProtocolEntry} from "@/proto/ssl_gc_api";
import formatDuration from "format-duration";
import {gameEventDetails, gameEventDetailsKeys, originIcon} from "@/helpers";
import {changeDetails} from "@/helpers/ChangeDetails";
import type {QExpansionItem} from "quasar";
import type {ControlApi} from "@/providers/controlApi/ControlApi";

const props = defineProps<{
  protocolEntry: ProtocolEntry,
}>()
const item = ref<QExpansionItem>()

const control = inject<ControlApi>('control-api')

const matchTime = computed(() => {
  return formatDuration((props.protocolEntry.matchTimeElapsed?.seconds || 0) * 1000)
})

const origin = computed(() => {
  return props.protocolEntry.change?.origin || ""
})

const revertible = computed(() => {
  return props.protocolEntry.change?.revertible
})
const change = computed(() => {
  return changeDetails(props.protocolEntry.change!)
})
const details = computed(() => {
  if (change.value.gameEvent) {
    return gameEventDetails(change.value.gameEvent)
  }
  return undefined
})
const detailsKeys = computed(() => {
  if (details.value) {
    return gameEventDetailsKeys(details.value)
  }
  return []
})
const gameEventOrigins = computed(() => {
  if (change.value.gameEvent) {
    return change.value.gameEvent.origin!.filter(o => o !== origin.value)
  }
  return []
})
const hasGameEventOrigins = computed(() => {
  return gameEventOrigins.value?.length > 0
})

function toggleExpandItem() {
  item.value?.toggle()
}

function revert() {
  control?.Revert(props.protocolEntry.id!)
}
</script>

<template>
  <q-expansion-item
    hide-expand-icon
    expand-icon-toggle
    ref="item"
  >
    <template v-slot:header>
      <q-item-section avatar top>
        <q-icon :name="change.icon" color="black" size="34px"/>
      </q-item-section>

      <q-item-section top class="col-2 gt-sm">
        <q-item-label class="q-mt-sm">{{ change.typeName }}</q-item-label>
      </q-item-section>

      <q-item-section top>
        <q-item-label lines="1">
          <TeamBadge :team="change.forTeam"/>
          <span class="text-weight-medium">{{ change.title }}</span>
          <span class="text-grey-8"> - {{ origin }}</span>
          <q-icon class="q-mx-xs" :name="originIcon(origin)" color="primary" :alt="origin"/>
          <span v-if="hasGameEventOrigins">
            (
          <q-icon class="q-mx-xs" :name="originIcon(origin)" color="primary" :alt="origin"
                  v-for="(origin, key) in gameEventOrigins" :key="key">
            <q-tooltip>
              {{ origin }}
            </q-tooltip>
          </q-icon>
            )
          </span>
        </q-item-label>
        <q-item-label caption lines="1">
          <span>{{ matchTime }}</span>
        </q-item-label>
      </q-item-section>

      <q-item-section side>
        <div class="text-grey-8">
          <q-btn size="12px" flat round icon="loupe"
                 :class="{ invisible: details === undefined }"
                 @click="toggleExpandItem"
          />
          <q-btn size="12px" flat round icon="history"
                 :class="{ invisible: !revertible }"
                 @click="revert"
          />
        </div>
        <q-badge color="orange" text-color="black" :label="props.protocolEntry.id" floating/>
      </q-item-section>
    </template>
    <q-list v-if="details">
      <q-item
        dense
        v-for="key in detailsKeys"
        :key="key"
      >
        <q-item-section>
          {{ key }}: {{ details[key] }}
        </q-item-section>
      </q-item>
    </q-list>
  </q-expansion-item>
</template>

<style>
.invisible {
  visibility: hidden;
}
</style>
