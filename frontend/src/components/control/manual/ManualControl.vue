<script setup lang="ts">
import ManualControlTeam from "@/components/control/manual/ManualControlTeam.vue";
import PlaceBall from "@/components/control/manual/PlaceBall.vue";
import HaltButton from "@/components/control/buttons/HaltButton.vue";
import {Team} from "@/proto/ssl_gc_common";
import StopButton from "@/components/control/buttons/StopButton.vue";
import ForceStartButton from "@/components/control/buttons/ForceStartButton.vue";
import NormalStartButton from "@/components/control/buttons/NormalStartButton.vue";

const teams = [Team.YELLOW, Team.BLUE]
</script>

<template>
  <div class="container">
    <div class="row wrap justify-evenly">
      <HaltButton class="item"/>
      <StopButton class="item"/>
      <ForceStartButton class="item"/>
      <NormalStartButton class="item"/>
    </div>

    <q-separator spaced/>

    <div class="row wrap justify-evenly">
      <ManualControlTeam class="item" v-for="team in teams" :team="team"/>
    </div>

    <q-separator spaced/>

    <PlaceBall/>
  </div>
</template>

<style scoped>
.container {
  height: 100%;
}

.item {
  width: 45%;
  margin: 1%;
}
</style>
