<script setup lang="ts">
import {useRoute} from "vue-router";
import RedCards from "@/components/team/RedCards.vue";
import YellowCards from "@/components/team/YellowCards.vue";
import FoulTable from "@/components/team/FoulTable.vue";
import {teamFromJSON} from "@/proto/ssl_gc_common";
import type {Team} from "@/proto/ssl_gc_common";

const route = useRoute()
const team: Team = teamFromJSON(route.params.team.toString().toUpperCase())

</script>

<template>
  <div class="q-ma-xl">
    <h3>Red Cards</h3>
    <RedCards :team="team"/>

    <h3>Yellow Cards</h3>
    <YellowCards :team="team"/>

    <h3>Fouls</h3>
    <FoulTable :team="team"/>
  </div>
</template>
