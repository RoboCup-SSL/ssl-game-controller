<script setup lang="ts">
import {ref} from "vue";
import GameEventBehaviors from "@/components/settings/GameEventBehaviors.vue";
import AutoRefereeConfigs from "@/components/settings/AutoRefereeConfigs.vue";
import TrackerSources from "@/components/settings/TrackerSources.vue";

const tab = ref("gameEventBehavior")

</script>


<template>
  <q-tabs
    v-model="tab"
    active-color="primary"
    indicator-color="primary"
    align="justify"
  >
    <q-tab name="gameEventBehavior" label="Game Event Behavior"/>
    <q-tab name="autoRefs" label="Auto Referees"/>
    <q-tab name="trackerSources" label="Tracker Sources"/>

  </q-tabs>
  <q-separator/>

  <q-tab-panels v-model="tab" animated swipeable>
    <q-tab-panel name="gameEventBehavior">
      <GameEventBehaviors/>
    </q-tab-panel>
    <q-tab-panel name="autoRefs">
      <AutoRefereeConfigs/>
    </q-tab-panel>
    <q-tab-panel name="trackerSources">
      <TrackerSources/>
    </q-tab-panel>
  </q-tab-panels>
</template>
