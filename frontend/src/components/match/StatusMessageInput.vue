<script setup lang="ts">
import {computed, inject, ref} from 'vue'
import {useMatchStateStore} from "@/store/matchState";
import type {ControlApi} from "@/providers/controlApi";
import TextInput from "@/components/common/TextInput.vue";

const store = useMatchStateStore()
const control = inject<ControlApi>('control-api')!

const statusMessage = computed(() => store.matchState.statusMessage)
const currentStatusMessage = ref(statusMessage.value)
const setCurrentStatusMessage = (value?: string) => {
  currentStatusMessage.value = value
}
const applyCurrentStatusMessage = () => {
  if (currentStatusMessage.value) {
    sendStatusMessage(currentStatusMessage.value)
  }
}

const sendStatusMessage = (value: string) => {
  if (value === statusMessage.value) {
    return
  }
  control.SubmitChange({
    origin: "UI",
    revertible: true,
    change: {
      $case: "setStatusMessageChange",
      setStatusMessageChange: {
        statusMessage: value,
      }
    }
  })
}

const dialogOpen = ref(false)

</script>

<template>
  <q-btn
      label="Status Message"
      color="primary"
      @click="dialogOpen = true"
  />
  <q-dialog v-model="dialogOpen">
    <q-card class="q-px-sm q-pb-md">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Status Message</div>
        <q-space/>
        <q-btn icon="close" flat round dense v-close-popup/>
      </q-card-section>

      <q-card-section>
        The status message will be broadcast and displayed on the status-board.
      </q-card-section>

      <q-separator/>

      <q-card-actions vertical>
        <q-btn
            flat
            label="Vision Problems"
            @click="sendStatusMessage('Vision Problems')"
        />
        <q-btn
            flat
            label="Rule Discussions"
            @click="sendStatusMessage('Rule Discussions')"
        />
        <TextInput
            label="Custom Status Message"
            :modelValue="statusMessage"
            @update:model-value="setCurrentStatusMessage"
            @focusout="applyCurrentStatusMessage"
            :clearable="false"
        />
      </q-card-actions>

      <q-card-actions>
        <q-btn
            v-close-popup
            label="Close"
            color="primary"
        />
        <q-btn
            label="Clear"
            color="primary"
            @click="sendStatusMessage('')"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>

</style>