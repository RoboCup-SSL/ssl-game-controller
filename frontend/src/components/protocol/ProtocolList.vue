<script setup lang="ts">
import ProtocolItem from "@/components/protocol/ProtocolItem.vue";
import type {ProtocolEntry} from "@/proto/ssl_gc_api";

defineProps<{
  dense?: boolean,
  protocolEntries: ProtocolEntry[],
}>()

</script>

<template>
  <q-virtual-scroll
    bordered separator
    class="rounded-borders protocol-scroll"
    virtual-scroll-item-size="50"
    virtual-scroll-slice-ratio-before="0.5"
    virtual-scroll-slice-ratio-after="0.5"
    :items="protocolEntries"
  >
    <template v-slot="{ item, index }">
      <ProtocolItem
        :class="{'q-mt-xs': index===0}"
        :dense="dense"
        :key="item.id"
        :protocol-entry="item"
      />
    </template>
  </q-virtual-scroll>
</template>

<style>
.protocol-scroll {
  max-height: calc(100vh - 160px)
}
</style>
