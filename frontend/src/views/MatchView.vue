<script setup lang="ts">
import ContinueActions from "@/components/ContinueActions.vue";
import AutoContinue from "@/components/AutoContinue.vue";
import GameEventProposalGroups from "@/components/GameEventProposalGroups.vue";
import GameEvents from "@/components/GameEvents.vue";</script>

<template>
  <div class="q-my-md">
    <div class="row">
      <div class="col q-mx-md" style="min-width: 300px">
        <AutoContinue/>
        <q-separator spaced/>
        <ContinueActions/>
        <q-separator spaced/>
      </div>
      <div class="col q-mx-md" style="min-width: 300px">
        <GameEventProposalGroups/>
        <q-separator spaced/>
        <GameEvents/>
      </div>
    </div>
  </div>
</template>
