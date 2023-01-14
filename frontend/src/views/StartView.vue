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
        <DivisionInput/>
      </div>
      <MatchTypeInput/>
    </div>

    <h2>Teams</h2>
    <q-markup-table>
      <thead>
      <tr>
        <th class="text-left" scope="col"></th>
        <th class="text-center" scope="col" v-for="team in teams" :key="team">
          <TeamBadge :team="team"/>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td class="text-left">
          Team Name
        </td>
        <td class="text-center" v-for="team in teams" :key="team">
          <TeamNameInput :team="team"/>
        </td>
      </tr>
      <tr>
        <td class="text-left">
          Ball placement enabled
        </td>
        <td class="text-center" v-for="team in teams" :key="team">
          <BallPlacementEnabledInput :team="team"/>
        </td>
      </tr>
      <tr>
        <td class="text-left">
          Goal keeper id
        </td>
        <td class="text-center" v-for="team in teams" :key="team">
          <GoalKeeperIdInput :team="team"/>
        </td>
      </tr>
      <tr>
        <td class="text-left">
          First kick-off
        </td>
        <td class="text-center" v-for="team in teams" :key="team">
          <FirstKickOffInput :team="team"/>
        </td>
      </tr>
      <tr>
        <td class="text-left">
          Field half
        </td>
        <td class="text-center" v-for="team in teams" :key="team">
          <FieldHalfInput :team="team"/>
        </td>
      </tr>
      </tbody>
    </q-markup-table>

    <div class="q-ma-lg row justify-evenly">
      <SwitchColorButton/>
      <SwitchColorRandomButton/>
      <SwitchSidesButton/>
      <SwitchSidesRandomButton/>
    </div>
  </div>
</template>
