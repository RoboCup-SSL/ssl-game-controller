<script setup lang="ts">
import {ref} from "vue";
import TeamBadge from "@/components/common/TeamBadge.vue";
import {Team} from "@/proto/ssl_gc_common";
import GoalKeeperId from "@/components/team/GoalKeeperId.vue";

const id = ref(0)

</script>

<template>
  <div class="column">
    <div class="row full-width">
      <div class="col"> Team
        <TeamBadge :team="Team.YELLOW"/>
      </div>
      <div class="col"></div>
      <div class="col"> Team
        <TeamBadge :team="Team.BLUE"/>
      </div>
    </div>
    <div class="row full-width">
      <div class="col">
        <GoalKeeperId :team="Team.YELLOW"/>
      </div>
      <div class="col">
        Goal Keeper
      </div>
      <div class="col">
        <GoalKeeperId :team="Team.BLUE"/>
      </div>
    </div>
  </div>
</template>
