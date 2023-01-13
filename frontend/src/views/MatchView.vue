<script setup lang="ts">
import {inject, onMounted, onUnmounted} from "vue";
import ContinueActions from "@/components/ContinueActions.vue";
import AutoContinue from "@/components/AutoContinue.vue";
import GameEventProposalGroups from "@/components/GameEventProposalGroups.vue";
import GameEvents from "@/components/GameEvents.vue";
import MatchTeamTable from "@/components/MatchTeamTable.vue";
import {useGcStateStore} from "@/store/gcState";
import type {ControlApi} from "@/providers/controlApi/ControlApi";

const store = useGcStateStore()
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
