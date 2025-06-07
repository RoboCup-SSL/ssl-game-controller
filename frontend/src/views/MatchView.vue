<script setup lang="ts">
import {computed} from "vue";
import ContinueActionButtonList from "@/components/match/ContinueActionButtonList.vue";
import AutoContinueInput from "@/components/match/AutoContinueInput.vue";
import MatchTeamTable from "@/components/match/MatchTeamTable.vue";
import {useGcStateStore} from "@/store/gcState";
import {useUiStateStore} from "@/store/uiState";
import SwitchColorButton from "@/components/start/SwitchColorButton.vue";
import {useMatchStateStore} from "@/store/matchState";
import SwitchSidesButton from "@/components/start/SwitchSidesButton.vue";
import GameEvents from "@/components/match/GameEvents.vue";
import CommandButton from "@/components/control/CommandButton.vue";

const store = useMatchStateStore()
const gcStore = useGcStateStore()
const uiStore = useUiStateStore()

const continueHints = computed(() => {
  return gcStore.gcState.continueHints || []
})

const halftime = computed(() => {
  return store.matchState.stage === 'NORMAL_HALF_TIME' ||
    store.matchState.stage === 'EXTRA_HALF_TIME'
})

</script>

<template>
  <div class="row q-gutter-md">
    <div class="col q-gutter-md q-mr-md" style="min-width: 500px">
      <q-expansion-item
          dense
          switch-toggle-side
          v-model="uiStore.matchTeamSettingsExpanded"
          icon="perm_identity"
          label="Team Settings"
      >
        <q-card>
          <q-card-section>
            <MatchTeamTable/>
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <div class="row">
        <AutoContinueInput/>
      </div>
      <div class="row justify-evenly">
        <div class="q-my-auto">
          Press
          <em>
            <q-badge label="id" color="orange"/>
          </em>
          or
          <em>NumpadEnter</em>
          to continue
        </div>
        <div class="q-my-auto">
          <em>Esc</em> to Halt
        </div>
      </div>
      <template v-if="halftime">
        <div class="row justify-evenly">
          <SwitchColorButton/>
          <SwitchSidesButton/>
        </div>
      </template>
      <template v-for="(hint, index) in continueHints" :key="index">
        <div class="row justify-center items-center">
          <q-icon name="warning" class="q-mx-sm"></q-icon>
          {{ hint.message }}
        </div>
      </template>
      <div class="column">
        <CommandButton class="col" :type="'HALT'"/>
      </div>
      <ContinueActionButtonList/>
    </div>
    <div class="col q-gutter-md q-mr-md" style="min-width: 300px">
      <GameEvents/>
    </div>
  </div>
</template>
