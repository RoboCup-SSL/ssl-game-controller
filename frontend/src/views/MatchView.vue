<script setup lang="ts">
import {computed, inject, onMounted, onUnmounted} from "vue";
import ContinueActionButtonList from "@/components/match/ContinueActionButtonList.vue";
import AutoContinueInput from "@/components/match/AutoContinueInput.vue";
import GameEventProposalGroupItemList from "@/components/match/GameEventProposalGroupItemList.vue";
import GameEventList from "@/components/match/GameEventList.vue";
import MatchTeamTable from "@/components/match/MatchTeamTable.vue";
import type {ControlApi} from "@/providers/controlApi/ControlApi";
import {useGcStateStore} from "@/store/gcState";
import {useUiStateStore} from "@/store/uiState";
import SwitchColorButton from "@/components/start/SwitchColorButton.vue";
import {useMatchStateStore} from "@/store/matchState";
import {Referee_Stage} from "@/proto/ssl_gc_referee_message";
import SwitchSidesButton from "@/components/start/SwitchSidesButton.vue";

const store = useMatchStateStore()
const gcStore = useGcStateStore()
const uiStore = useUiStateStore()
const control = inject<ControlApi>('control-api')

const continueWithAction = (id: number) => {
  if (gcStore.gcState.continueActions!.length > id) {
    control?.Continue(gcStore.gcState.continueActions![id])
  }
}

const toggleAutoContinue = () => {
  control?.ChangeConfig({autoContinue: !gcStore.config.autoContinue})
}

const halftime = computed(() => {
  return store.matchState.stage === Referee_Stage.NORMAL_HALF_TIME ||
    store.matchState.stage === Referee_Stage.EXTRA_HALF_TIME
})

const keyListenerContinue = function (e: KeyboardEvent) {
  if (!e.ctrlKey) {
    return
  }
  if (e.key === " ") {
    toggleAutoContinue()
  } else {
    const id = Number(e.key)
    if (!isNaN(id)) {
      continueWithAction(id - 1)
    }
  }
};

onMounted(() => {
  document.addEventListener('keydown', keyListenerContinue)
})

onUnmounted(() => {
  document.removeEventListener('keydown', keyListenerContinue)
})

</script>

<template>
  <div class="q-my-md">
    <div class="row">
      <div class="col q-mx-md" style="min-width: 500px">
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
        <AutoContinueInput/>
        <template v-if="halftime">
          <q-separator spaced/>
          <div v-if="!halftime" class="row justify-evenly">
            <SwitchColorButton/>
            <SwitchSidesButton/>
          </div>
        </template>
        <q-separator spaced/>
        <ContinueActionButtonList/>
        <q-separator spaced/>
      </div>
      <div class="col q-mx-md" style="min-width: 300px">
        <GameEventProposalGroupItemList/>
        <q-separator spaced/>
        <GameEventList/>
      </div>
    </div>
  </div>
</template>
