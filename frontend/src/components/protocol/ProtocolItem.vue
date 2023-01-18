<script setup lang="ts">
import {computed} from "vue";
import TeamBadge from "@/components/common/TeamBadge.vue";
import type {ProtocolEntry} from "@/proto/ssl_gc_api";
import formatDuration from "format-duration";
import {originIcon} from "@/helpers";
import {changeDetails} from "@/helpers/ChangeDetails";

const props = defineProps<{
  protocolEntry: ProtocolEntry,
}>()

const matchTime = computed(() => {
  return formatDuration((props.protocolEntry.matchTimeElapsed?.seconds || 0) * 1000)
})

const origin = computed(() => {
  return props.protocolEntry.change?.origin || ""
})

const revertible = computed(() => {
  return props.protocolEntry.change?.revertible
})
const details = computed(() => {
  return changeDetails(props.protocolEntry.change!)
})

</script>

<template>
  <q-item>
    <q-item-section avatar top>
      <q-icon :name="details.icon" color="black" size="34px"/>
    </q-item-section>

    <q-item-section top class="col-2 gt-sm">
      <q-item-label class="q-mt-sm">{{ details.typeName }}</q-item-label>
    </q-item-section>

    <q-item-section top>
      <q-item-label lines="1">
        <TeamBadge :team="details.forTeam"/>
        <span class="text-weight-medium">{{ details.title }}</span>
        <span class="text-grey-8"> - {{ origin }}</span>
        <q-icon class="q-mx-xs" :name="originIcon(origin)" color="primary" :alt="origin"/>
      </q-item-label>
      <q-item-label caption lines="1">
        <span>{{ matchTime }}</span>
      </q-item-label>
    </q-item-section>

    <q-item-section top side>
      <div class="text-grey-8 q-gutter-xs">
        <q-btn size="12px" flat dense round icon="history" v-if="revertible"/>
      </div>
      <q-badge color="orange" text-color="black" :label="props.protocolEntry.id" floating/>
    </q-item-section>
  </q-item>
</template>
