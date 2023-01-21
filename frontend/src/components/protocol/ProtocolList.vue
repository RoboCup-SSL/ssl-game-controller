<script setup lang="ts">
import ProtocolItem from "@/components/protocol/ProtocolItem.vue";
import {useProtocolStore} from "@/store/protocolState";

const store = useProtocolStore()

</script>

<template>
  <q-list bordered class="rounded-borders" separator>
    <q-virtual-scroll
      class="protocol-scroll"
      virtual-scroll-item-size="50"
      virtual-scroll-slice-ratio-before="0.5"
      virtual-scroll-slice-ratio-after="0.5"
      :items="store.protocolEntries"
      separator
      v-slot="{ item, index }"
    >
      <ProtocolItem
        class="q-pr-xs q-pt-xs"
        :key="index"
        :protocol-entry="item"
      />
    </q-virtual-scroll>
  </q-list>
</template>

<style>
.protocol-scroll {
  max-height: calc(100vh - 200px)
}
</style>
