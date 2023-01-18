<script setup lang="ts">
import {computed} from "vue";
import ProtocolItem from "@/components/protocol/ProtocolItem.vue";
import {useProtocolStore} from "@/store/protocolState";

const store = useProtocolStore()

const protocolEntries = computed(() => {
  return store.protocolEntries
})

</script>

<template>
  <q-list bordered class="rounded-borders">
    <ProtocolItem
      v-for="protocolEntry in protocolEntries"
      :key="protocolEntry.id"
      :protocol-entry="protocolEntry"
    />
  </q-list>
</template>
