<script setup lang="ts">
import {useRoute} from "vue-router";
import RedCardsInput from "@/components/team/RedCardsInput.vue";
import YellowCardsInput from "@/components/team/YellowCardsInput.vue";
import FoulTable from "@/components/team/FoulTable.vue";
import {teamFromJSON} from "@/proto/ssl_gc_common";
import type {Team} from "@/proto/ssl_gc_common";

const route = useRoute()
const team: Team = teamFromJSON(route.params.team.toString().toUpperCase())

</script>

<template>
  <div class="q-ma-xl">
    <h3>Red Cards</h3>
    <RedCardsInput :team="team"/>

    <h3>Yellow Cards</h3>
    <YellowCardsInput :team="team"/>

    <h3>Fouls</h3>
    <FoulTable :team="team"/>
  </div>
</template>
