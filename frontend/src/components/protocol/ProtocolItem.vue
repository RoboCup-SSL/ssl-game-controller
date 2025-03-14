<script setup lang="ts">
import {computed, inject} from "vue";
import TeamBadge from "@/components/common/TeamBadge.vue";
import type {ProtocolEntryJson} from "@/proto/api/ssl_gc_api_pb";
import {changeDetails} from "@/helpers/ChangeDetails";
import type {ControlApi} from "@/providers/controlApi";
import OriginIcon from "@/components/common/OriginIcon.vue";
import GameEventDetailsTree from "@/components/match/GameEventDetailsTree.vue";
import {formatDurationJson} from "@/helpers";

const props = defineProps<{
  protocolEntry: ProtocolEntryJson,
  dense?: boolean,
}>()

const control = inject<ControlApi>('control-api')

const matchTime = computed(() => {
  return formatDurationJson(props.protocolEntry.matchTimeElapsed!, {ms: true})
})
const stageTime = computed(() => {
  return formatDurationJson(props.protocolEntry.stageTimeElapsed!, {ms: true})
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
const gameEventOrigins = computed(() => {
  if (change.value.gameEvent) {
    return change.value.gameEvent.origin!.filter(o => o !== origin.value)
  }
  return []
})
const hasGameEventOrigins = computed(() => {
  return gameEventOrigins.value?.length > 0
})

function revert() {
  control?.Revert(props.protocolEntry.id!)
}
</script>

<template>
  <q-item dense class="q-mr-xs">
    <q-item-section avatar top v-if="!dense">
      <q-icon :name="change.icon" color="primary" size="34px"/>
    </q-item-section>

    <q-item-section top class="col-2" v-if="!dense">
      <q-item-label class="q-mt-sm">{{ change.typeName }}</q-item-label>
    </q-item-section>

    <q-item-section>
      <q-expansion-item hide-expand-icon header-class="q-pl-none">
        <template v-slot:header>
          <q-item-section>
            <q-item-label lines="1">
              <q-icon :name="change.icon" color="primary" size="15px" v-if="dense" class="q-mr-xs"/>
              <TeamBadge :team="change.forTeam"/>
              <span class="text-weight-medium">{{ change.title }}</span>
              <span class="text-secondary"> - {{ origin }}</span>
              <OriginIcon :origin="origin"/>
              <span v-if="hasGameEventOrigins">(</span>
              <OriginIcon
                v-for="(gameEventOrigin, key) in gameEventOrigins"
                :key="key"
                :origin="gameEventOrigin"
              />
              <span v-if="hasGameEventOrigins">)</span>
            </q-item-label>
            <q-item-label caption lines="1">
              {{ stageTime }} ({{ matchTime }})
            </q-item-label>
          </q-item-section>
        </template>

        <GameEventDetailsTree :game-event="change.gameEvent" v-if="change.gameEvent"/>
      </q-expansion-item>
    </q-item-section>

    <div class="tool-button" v-if="revertible">
      <q-btn dense round
             icon="history"
             size="10px"
             color="primary"
             @click="revert"
      />
    </div>

    <q-badge color="orange" text-color="black" :label="props.protocolEntry.id" floating/>
  </q-item>
</template>

<style>
.tool-button {
  position: absolute;
  top: 18px;
  right: 0;
}
</style>
