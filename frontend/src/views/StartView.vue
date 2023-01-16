<script setup lang="ts">
import TeamBadge from "@/components/common/TeamBadge.vue";
import TeamNameInput from "@/components/team/TeamNameInput.vue";
import GoalKeeperIdInput from "@/components/team/GoalKeeperIdInput.vue";
import BallPlacementEnabledInput from "@/components/team/BallPlacementEnabledInput.vue";
import DivisionInput from "@/components/DivisionInput.vue";
import MatchTypeInput from "@/components/MatchTypeInput.vue";
import ResetMatchButton from "@/components/ResetMatchButton.vue";
import FirstKickOffInput from "@/components/team/FirstKickOffInput.vue";
import SwitchColorButton from "@/components/SwitchColorButton.vue";
import SwitchSidesButton from "@/components/SwitchSidesButton.vue";
import FieldHalfInput from "@/components/team/FieldHalfInput.vue";
import SwitchSidesRandomButton from "@/components/SwitchSidesRandomButton.vue";
import SwitchColorRandomButton from "@/components/SwitchColorRandomButton.vue";
import {teams} from "@/helpers";
import EndMatchButton from "@/components/EndMatchButton.vue";
</script>

<template>
  <div class="q-ma-xl">
    <h2>Match</h2>
    <p>
      To set up a new match, go through this page from top to bottom.
      The full procedure can be found in the
      <a target="_blank" href="https://robocup-ssl.github.io/ssl-rules/sslrules.html#_match_preparation">
        rule book
      </a>.
    </p>
    <p>
      After you have started a new match, select the division and match type.
      The division is important to apply the respective rule set.
      The match type is broadcast in the referee messages. It may for example be used for automatic log file processing.
    </p>
    <div class="row justify-evenly">
      <div class="q-pa-md">
        <ResetMatchButton/>
      </div>
      <div class="q-pa-md">
        <EndMatchButton/>
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

    <div class="row justify-evenly q-gutter-md">
      <SwitchColorButton/>
      <SwitchColorRandomButton/>
      <SwitchSidesButton/>
      <SwitchSidesRandomButton/>
    </div>
  </div>
</template>
