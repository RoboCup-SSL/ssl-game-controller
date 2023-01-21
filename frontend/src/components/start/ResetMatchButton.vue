<script setup lang="ts">
import {inject, ref} from "vue";
import type {ControlApi} from "@/providers/controlApi/ControlApi";

const control = inject<ControlApi>('control-api')

const confirm = ref(false)

const resetMatch = () => {
  control?.ResetMatch()
}
</script>

<template>
  <q-btn
    label="Start new match"
    icon="restart_alt"
    color="primary"
    @click="confirm = true"
  />
  <q-dialog v-model="confirm">
    <q-card>
      <q-card-section class="row no-wrap flex-center">
        <q-avatar icon="warning" color="primary" text-color="white"/>
        <div class="q-mt-md q-ml-md">
          Are sure to start a new match and reset the whole state? A backup file of the current state will be created.
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup/>
        <q-btn flat label="Start new match" color="primary" v-close-popup @click="resetMatch"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
