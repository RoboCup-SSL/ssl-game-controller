<script setup lang="ts">
import {computed} from "vue";
import TeamBadge from "@/components/common/TeamBadge.vue";
import {Team} from "@/proto/ssl_gc_common";
import GoalKeeperId from "@/components/team/GoalKeeperId.vue";
import {useMatchStateStore} from "@/store/matchState";

const store = useMatchStateStore()

const teamNameYellow = computed(() => {
  return store.matchState.teamState?.[Team.YELLOW].name!
})
const teamNameBlue = computed(() => {
  return store.matchState.teamState?.[Team.BLUE].name!
})
</script>

<template>
  <div class="column">
    <div class="row full-width">
      <div class="col cell">
        {{teamNameYellow}}
        <TeamBadge :team="Team.YELLOW"/>
      </div>
      <div class="col"></div>
      <div class="col cell">
        {{teamNameBlue}}
        <TeamBadge :team="Team.BLUE"/>
      </div>
    </div>
    <div class="row full-width">
      <div class="col">
        <GoalKeeperId :team="Team.YELLOW"/>
      </div>
      <div class="col cell">
        Goal Keeper
      </div>
      <div class="col">
        <GoalKeeperId :team="Team.BLUE"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cell {
  text-align: center;
  margin: auto;
  font-size: large;
}
</style>
