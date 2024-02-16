<script setup lang="ts">
import ProtocolList from "@/components/protocol/ProtocolList.vue";
import {useProtocolStore} from "@/store/protocolState";
import {computed, ref} from "vue";
import {changeDetails, type ChangeDetails} from "@/helpers/ChangeDetails";

const protocolStore = useProtocolStore()

const command = ref(true)
const gameEvent = ref(true)
const other = ref(true)

const showChange = (change: ChangeDetails) => {
  if (change.typeName === 'Command') {
    return command.value
  }
  if (change.typeName === 'Game Event') {
    return gameEvent.value
  }
  return other.value
}

const protocolEntries = computed(() => {
  return protocolStore.protocolEntries.filter(entry => showChange(changeDetails(entry.change!)))
})
</script>

<template>
  <div class="q-ma-sm">
    <q-checkbox v-model="command" label="Command"/>
    <q-checkbox v-model="gameEvent" label="Game Event"/>
    <q-checkbox v-model="other" label="Other"/>
  </div>
  <ProtocolList :protocol-entries="protocolEntries"/>
</template>
