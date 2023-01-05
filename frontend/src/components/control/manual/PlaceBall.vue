<script setup lang="ts">
import {useMatchStateStore} from "@/store/matchState";
import {ref} from "vue";

const store = useMatchStateStore()
const ballX = ref(0.0)
const ballY = ref(0.0)
</script>

<template>
  <div class="q-pa-md q-pb-lg">
    <q-list dense>
      <q-item>
        <q-item-section avatar>
          X
        </q-item-section>
        <q-item-section>
          <q-slider
            v-model="ballX"
            :min="-5"
            :max="5"
            :step="0.1"
            label
            :label-value="ballX + ' m'"
            label-always
          />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section avatar>
          Y
        </q-item-section>
        <q-item-section>
          <q-slider
            v-model="ballY"
            :min="-3"
            :max="3"
            :step="0.1"
            label
            :label-value="ballY + ' m'"
            label-always
            switch-label-side
          />
        </q-item-section>
      </q-item>
    </q-list>

    <q-btn color="primary" label="Place ball"/>
  </div>
</template>

<style scoped>
</style>
