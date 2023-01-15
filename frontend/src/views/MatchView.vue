<script setup lang="ts">
import {inject, onMounted, onUnmounted} from "vue";
import ContinueActionButtonList from "@/components/ContinueActionButtonList.vue";
import AutoContinueInput from "@/components/AutoContinueInput.vue";
import GameEventProposalGroupItemList from "@/components/GameEventProposalGroupItemList.vue";
import GameEventList from "@/components/GameEventList.vue";
import MatchTeamTable from "@/components/MatchTeamTable.vue";
import {useGcStateStore} from "@/store/gcState";
import type {ControlApi} from "@/providers/controlApi/ControlApi";
import {useUiStateStore} from "@/store/uiState";

const store = useGcStateStore()
const uiStore = useUiStateStore()
const control = inject<ControlApi>('control-api')

const continueWithAction = (id: number) => {
  if (store.gcState.continueActions!.length > id) {
    control?.Continue(store.gcState.continueActions![id])
  }
}

const toggleAutoContinue = () => {
  control?.ChangeConfig({autoContinue: !store.config.autoContinue})
}

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
