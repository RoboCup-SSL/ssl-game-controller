<script setup lang="ts">
import YellowCardButton from "@/components/control/YellowCardButton.vue";
import RedCardButton from "@/components/control/RedCardButton.vue";
import GoalButton from "@/components/control/GoalButton.vue";
import {teams} from "@/helpers";
import CommandButton from "@/components/control/CommandButton.vue";
</script>

<template>
  <q-separator spaced/>

  <div class="row">
    <div class="col-grow column">
      <CommandButton :type="'HALT'"/>
      <CommandButton :type="'FORCE_START'"/>
    </div>
    <div class="col-grow column">
      <CommandButton :type="'NORMAL_START'"/>
      <CommandButton :type="'STOP'"/>
    </div>
  </div>

  <q-separator spaced/>

  <div class="row">
    <div class="col-grow column" v-for="team in teams" :key="team">
      <CommandButton :type="'DIRECT'" :team="team"/>
      <CommandButton :type="'KICKOFF'" :team="team"/>
      <CommandButton :type="'PENALTY'" :team="team"/>
      <q-separator spaced/>
      <YellowCardButton :team="team"/>
      <RedCardButton :team="team"/>
      <GoalButton :team="team"/>
      <CommandButton :type="'TIMEOUT'" :team="team"/>

      <q-separator spaced/>
    </div>
  </div>
</template>
