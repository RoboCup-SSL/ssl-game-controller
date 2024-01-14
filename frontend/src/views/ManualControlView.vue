<script setup lang="ts">
import YellowCardButton from "@/components/control/YellowCardButton.vue";
import RedCardButton from "@/components/control/RedCardButton.vue";
import GoalButton from "@/components/control/GoalButton.vue";
import {teams} from "@/helpers";
import {Command_Type} from "@/proto/ssl_gc_state";
import CommandButton from "@/components/control/CommandButton.vue";
</script>

<template>
  <q-separator spaced/>

  <div class="row">
    <div class="col-grow column">
      <CommandButton :type="Command_Type.HALT"/>
      <CommandButton :type="Command_Type.FORCE_START"/>
    </div>
    <div class="col-grow column">
      <CommandButton :type="Command_Type.NORMAL_START"/>
      <CommandButton :type="Command_Type.STOP"/>
    </div>
  </div>

  <q-separator spaced/>

  <div class="row">
    <div class="col-grow column" v-for="team in teams" :key="team">
      <CommandButton :type="Command_Type.DIRECT" :team="team"/>
      <CommandButton :type="Command_Type.KICKOFF" :team="team"/>
      <CommandButton :type="Command_Type.PENALTY" :team="team"/>
      <q-separator spaced/>
      <YellowCardButton :team="team"/>
      <RedCardButton :team="team"/>
      <GoalButton :team="team"/>
      <CommandButton :type="Command_Type.TIMEOUT" :team="team"/>

      <q-separator spaced/>
    </div>
  </div>
</template>
