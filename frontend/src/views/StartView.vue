<script setup lang="ts">
import TeamBadge from "@/components/common/TeamBadge.vue";
import DivisionInput from "@/components/start/DivisionInput.vue";
import MatchTypeInput from "@/components/start/MatchTypeInput.vue";
import ResetMatchButton from "@/components/start/ResetMatchButton.vue";
import SwitchColorButton from "@/components/start/SwitchColorButton.vue";
import SwitchSidesRandomButton from "@/components/start/SwitchSidesRandomButton.vue";
import SwitchColorRandomButton from "@/components/start/SwitchColorRandomButton.vue";
import EndMatchButton from "@/components/start/EndMatchButton.vue";
import TeamNameInput from "@/components/team/TeamNameInput.vue";
import GoalKeeperIdInput from "@/components/team/GoalKeeperIdInput.vue";
import BallPlacementEnabledInput from "@/components/team/BallPlacementEnabledInput.vue";
import FirstKickOffInput from "@/components/team/FirstKickOffInput.vue";
import FieldHalfInput from "@/components/team/FieldHalfInput.vue";
import StageInput from "@/components/start/StageInput.vue";
import {teams} from "@/helpers";
</script>

<template>
  <div class="q-ma-md">
    <div class="row justify-evenly">
      <div class="q-pa-md">
        <ResetMatchButton/>
      </div>
      <div class="q-pa-md">
        <DivisionInput/>
      </div>
      <MatchTypeInput/>
    </div>

    <div class="q-ma-lg row justify-evenly">
      <q-list bordered padding v-for="team in teams" :key="team">
        <q-item-label header>
          <TeamBadge :team="team"/>
        </q-item-label>

        <q-item v-ripple>
          <q-item-section>
            <TeamNameInput :team="team"/>
          </q-item-section>
        </q-item>

        <q-item v-ripple>
          <q-item-section>
            <GoalKeeperIdInput :team="team"/>
          </q-item-section>
        </q-item>

        <q-separator spaced/>

        <q-item v-ripple>
          <q-item-section>
            <BallPlacementEnabledInput :team="team"/>
          </q-item-section>
        </q-item>

        <q-item v-ripple>
          <q-item-section>
            <FirstKickOffInput :team="team"/>
          </q-item-section>
        </q-item>

        <q-item v-ripple>
          <q-item-section>
            <FieldHalfInput :team="team"/>
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <div class="row justify-evenly">
      <SwitchColorButton/>
      <SwitchColorRandomButton/>
      <SwitchSidesRandomButton/>
    </div>

    <q-separator spaced/>

    <div class="row justify-evenly">
      <StageInput/>
      <div class="q-pa-md">
        <EndMatchButton/>
      </div>
    </div>

    <div class="q-ma-md">
      <p>
        To set up a new match, go through this page from top to bottom.
        The full procedure can be found in the
        <q-btn color="primary" target="_blank"
               href="https://robocup-ssl.github.io/ssl-rules/sslrules.html#_match_preparation">
          rule book
        </q-btn>
      </p>
    </div>
  </div>
</template>
