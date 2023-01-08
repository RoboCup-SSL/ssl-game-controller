<script setup lang="ts">
import HaltButton from "@/components/control/buttons/HaltButton.vue";
import {Team} from "@/proto/ssl_gc_common";
import StopButton from "@/components/control/buttons/StopButton.vue";
import ForceStartButton from "@/components/control/buttons/ForceStartButton.vue";
import NormalStartButton from "@/components/control/buttons/NormalStartButton.vue";
import FreeKickButton from "@/components/control/buttons/FreeKickButton.vue";
import KickoffButton from "@/components/control/buttons/KickoffButton.vue";
import PenaltyButton from "@/components/control/buttons/PenaltyButton.vue";
import YellowCardButton from "@/components/control/buttons/YellowCardButton.vue";
import RedCardButton from "@/components/control/buttons/RedCardButton.vue";
import GoalButton from "@/components/control/buttons/GoalButton.vue";
import TimeoutButton from "@/components/control/buttons/TimeoutButton.vue";

const teams = [Team.YELLOW, Team.BLUE]
</script>

<template>
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
    <div class="col-grow column" v-for="team in teams">
      <FreeKickButton :team="team"/>
      <KickoffButton :team="team"/>
      <PenaltyButton :team="team"/>
      <q-separator spaced/>
      <YellowCardButton :team="team"/>
      <RedCardButton :team="team"/>
      <GoalButton :team="team"/>
      <TimeoutButton :team="team"/>
    </div>
  </div>
</template>
