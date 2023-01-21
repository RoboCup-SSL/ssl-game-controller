<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import {useGcStateStore} from "@/store/gcState";
import AutoRefereeBehaviorConfig from "@/components/settings/AutoRefereeBehaviorConfig.vue";

const tab = ref("")
const store = useGcStateStore()

const autoRefConfigs = computed(() => {
  return store.config.autoRefConfigs!
})
const autoRefConfigKeys = computed(() => {
  return Object.keys(autoRefConfigs.value)
})

function connected(autoRef: string) {
  return store.gcState.autoRefState![autoRef]
}

function connectionVerified(autoRef: string) {
  return store.gcState.autoRefState![autoRef]?.connectionVerified
}

onMounted(() => {
  const connectedAutoRefs = Object.keys(store.gcState.autoRefState!)
  if (connectedAutoRefs.length > 0) {
    tab.value = connectedAutoRefs[0]
  }
})

</script>


<template>
  <q-tabs
    v-model="tab"
    active-color="primary"
    indicator-color="primary"
    align="justify"
  >
    <q-tab
      v-for="autoRef of autoRefConfigKeys"
      :key="autoRef"
      :name="autoRef"
    >
      <div class="row items-center no-wrap">
        <div class="text-center q-mr-md">
          {{ autoRef }}
        </div>
        <q-icon v-if="connected(autoRef)" name="link" color="green"/>
        <q-icon v-else name="link_off" color="red"/>
        <q-icon v-if="connectionVerified(autoRef)" name="verified" color="primary"/>
      </div>
    </q-tab>

  </q-tabs>
  <q-separator/>

  <q-tab-panels v-model="tab">
    <q-tab-panel
      v-for="autoRef of autoRefConfigKeys"
      :key="autoRef"
      :name="autoRef"
    >
      <AutoRefereeBehaviorConfig
        :auto-ref-id="autoRef"
        :auto-ref-config="autoRefConfigs[autoRef]"
      />
    </q-tab-panel>
  </q-tab-panels>
</template>
