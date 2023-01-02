<script setup lang="ts">
import {useMatchStateStore} from "@/store/matchState";
import {Team} from "@/proto/ssl_gc_common";
import TeamControlButton from "@/components/control/buttons/TeamControlButton.vue";
import {ref} from "vue";

const store = useMatchStateStore()
const teams = [Team.YELLOW, Team.BLUE]
const ballX = ref(0.0)
const ballY = ref(0.0)
</script>

<template>
  <div class="container">
    <div class="row wrap justify-evenly">
      <q-btn color="primary" label="Halt"/>
      <q-btn color="primary" label="Stop"/>
      <q-btn color="primary" label="Force Start"/>
      <q-btn color="primary" label="Normal Start"/>
    </div>

    <q-separator spaced/>

    <div class="row wrap justify-evenly">
      <TeamControlButton v-for="team in teams" :team="team" text="Free kick"/>
      <TeamControlButton v-for="team in teams" :team="team" text="Kick-off"/>
      <TeamControlButton v-for="team in teams" :team="team" text="Penalty kick"/>
    </div>

    <q-separator spaced/>

    <div class="row wrap justify-evenly">
      <TeamControlButton v-for="team in teams" :team="team" text="Yellow card"/>
      <TeamControlButton v-for="team in teams" :team="team" text="Red card"/>
      <TeamControlButton v-for="team in teams" :team="team" text="Goal"/>
      <TeamControlButton v-for="team in teams" :team="team" text="Timeout"/>
    </div>

    <q-separator spaced/>

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
  </div>
</template>

<style scoped>
.container {
  height: 100%;
}

button {
  width: 45%;
  margin: 1%;
}
</style>
