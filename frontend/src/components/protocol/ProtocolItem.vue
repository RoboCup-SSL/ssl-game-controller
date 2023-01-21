<script setup lang="ts">
import {computed, inject, ref} from "vue";
import TeamBadge from "@/components/common/TeamBadge.vue";
import type {ProtocolEntry} from "@/proto/ssl_gc_api";
import formatDuration from "format-duration";
import {gameEventDetails, gameEventDetailsKeys, originIcon} from "@/helpers";
import {changeDetails} from "@/helpers/ChangeDetails";
import type {ControlApi} from "@/providers/controlApi/ControlApi";

const props = defineProps<{
  protocolEntry: ProtocolEntry,
  dense?: boolean,
}>()
const showDetails = ref(false)

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
  showDetails.value = !showDetails.value
}

function revert() {
  control?.Revert(props.protocolEntry.id!)
}
</script>

<template>
  <div>
    <q-item
    >
      <q-item-section avatar top v-if="!dense">
        <q-icon :name="change.icon" color="black" size="34px"/>
      </q-item-section>

      <q-item-section top class="col-2" v-if="!dense">
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
          <q-btn flat round icon="loupe" dense
                 v-if="dense"
                 :size="dense ? '8px' : '12px'"
                 :class="{ invisible: details === undefined, 'revert': true }"
                 @click="toggleExpandItem"
          />
          <q-btn flat round icon="history" dense
                 v-if="dense"
                 :size="dense ? '8px' : '12px'"
                 :class="{ invisible: !revertible, 'revert': true }"
                 @click="revert"
          />
        </q-item-label>
        <template v-if="showDetails">
          <q-item-label v-for="key in detailsKeys" :key="key">
            {{ key }}: {{ details[key] }}
          </q-item-label>
        </template>
      </q-item-section>
      <q-btn flat round icon="loupe"
             v-if="!dense"
             :size="dense ? '8px' : '12px'"
             :class="{ invisible: details === undefined, 'revert': true }"
             @click="toggleExpandItem"
      />
      <q-btn flat round icon="history"
             v-if="!dense"
             :size="dense ? '8px' : '12px'"
             :class="{ invisible: !revertible, 'revert': true }"
             @click="revert"
      />
      <q-badge color="orange" text-color="black" :label="props.protocolEntry.id" floating/>
    </q-item>
  </div>
</template>

<style>
.invisible {
  visibility: hidden;
}

.revert {
  bottom: 0;
  right: 0;
}
</style>
