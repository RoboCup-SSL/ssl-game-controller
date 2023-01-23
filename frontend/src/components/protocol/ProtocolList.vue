<script setup lang="ts">
import ProtocolItem from "@/components/protocol/ProtocolItem.vue";
import {useProtocolStore} from "@/store/protocolState";

defineProps<{
  dense?: boolean,
}>()

const store = useProtocolStore()

</script>

<template>
  <q-virtual-scroll
    bordered separator
    class="rounded-borders protocol-scroll"
    virtual-scroll-item-size="50"
    virtual-scroll-slice-ratio-before="0.5"
    virtual-scroll-slice-ratio-after="0.5"
    :items="store.protocolEntries"
    v-slot="{ item, index }"
  >
    <ProtocolItem
      class="q-pr-sm q-pt-sm"
      :dense="dense"
      :key="index"
      :protocol-entry="item"
    />
  </q-virtual-scroll>
</template>

<style>
.protocol-scroll {
  max-height: calc(100vh - 160px)
}
</style>
