<script setup lang="ts">
import ContinueActions from "@/components/ContinueActions.vue";
import AutoContinue from "@/components/AutoContinue.vue";
import GameEventProposalGroups from "@/components/GameEventProposalGroups.vue";
import GameEvents from "@/components/GameEvents.vue";
import MatchTeamTable from "@/components/MatchTeamTable.vue";</script>

<template>
  <div class="q-my-md">
    <div class="row">
      <div class="col q-mx-md" style="min-width: 500px">
        <q-expansion-item
          dense
          switch-toggle-side
          expand-separator
          icon="perm_identity"
          label="Team Settings"
        >
          <q-card>
            <q-card-section>
              <MatchTeamTable/>
            </q-card-section>
          </q-card>
        </q-expansion-item>
        <q-separator spaced/>
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
