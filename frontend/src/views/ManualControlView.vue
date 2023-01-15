<script setup lang="ts">
import HaltButton from "@/components/control/HaltButton.vue";
import StopButton from "@/components/control/StopButton.vue";
import ForceStartButton from "@/components/control/ForceStartButton.vue";
import NormalStartButton from "@/components/control/NormalStartButton.vue";
import FreeKickButton from "@/components/control/FreeKickButton.vue";
import KickoffButton from "@/components/control/KickoffButton.vue";
import PenaltyButton from "@/components/control/PenaltyButton.vue";
import YellowCardButton from "@/components/control/YellowCardButton.vue";
import RedCardButton from "@/components/control/RedCardButton.vue";
import GoalButton from "@/components/control/GoalButton.vue";
import TimeoutButton from "@/components/control/TimeoutButton.vue";
import {teams} from "@/helpers";</script>

<template>
  <q-separator spaced/>

  <div class="row">
    <div class="col-grow column">
      <HaltButton/>
      <ForceStartButton/>
    </div>
    <div class="col-grow column">
      <StopButton/>
      <NormalStartButton/>
    </div>
  </div>

  <q-separator spaced/>

  <div class="row">
    <div class="col-grow column" v-for="team in teams" :key="team">
      <FreeKickButton :team="team"/>
      <KickoffButton :team="team"/>
      <PenaltyButton :team="team"/>
      <q-separator spaced/>
      <YellowCardButton :team="team"/>
      <RedCardButton :team="team"/>
      <GoalButton :team="team"/>
      <TimeoutButton :team="team"/>

      <q-separator spaced/>
    </div>
  </div>
</template>
