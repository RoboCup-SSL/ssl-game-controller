<script setup lang="ts">
import {computed, inject} from "vue";
import {useGcStateStore} from "@/store/gcState";
import type {ControlApi} from "@/providers/controlApi/ControlApi";

const store = useGcStateStore()
const control = inject<ControlApi>('control-api')

const trackerSources = computed(() => store.gcState.trackers!)
const trackerSourceKeys = computed(() => Object.keys(trackerSources.value))
const trackerSourceActive = computed(() => store.config.activeTrackerSource)

function setActive(activeTrackerSource: string) {
  control?.ChangeConfig({
    activeTrackerSource,
  })
}
</script>

<template>
  <q-list bordered class="rounded-borders">
    <q-item
      bordered dense
      v-for="trackerSourceKey of trackerSourceKeys"
      :key="trackerSourceKey"
    >
      <q-item-section>
        <div :class="{'text-weight-bold': trackerSourceKey === trackerSourceActive}">
          {{ trackerSources[trackerSourceKey] }} ({{ trackerSourceKey }})
        </div>
      </q-item-section>

      <q-item-section side>
        <q-btn
          :disable="trackerSourceKey === trackerSourceActive"
          @click="setActive(trackerSourceKey)"
          label="Set active"
          color="primary"
        />
      </q-item-section>
    </q-item>
  </q-list>
</template>
