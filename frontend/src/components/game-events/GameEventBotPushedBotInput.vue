<script setup lang="ts">
import {ref} from "vue";
import {GameEvent_BotPushedBot, GameEvent_Type} from "@/proto/ssl_gc_game_event";
import TeamItem from "@/components/game-events/common/TeamItem.vue";
import LocationItem from "@/components/game-events/common/LocationItem.vue";
import NumberItem from "@/components/game-events/common/NumberItem.vue";
import {gameEventNames} from "@/helpers/texts";

const gameEvent = ref({
  type: GameEvent_Type.BOT_PUSHED_BOT,
  event: {
    $case: 'botPushedBot',
    botPushedBot: {}
  }
})
const botPushedBot = ref<GameEvent_BotPushedBot>(gameEvent.value.event.botPushedBot)

const emit = defineEmits(['create-game-event'])
const updateGameEvent = () => {
  console.log(JSON.stringify(gameEvent.value))
  emit('create-game-event', gameEvent.value)
}

</script>

<template>
  <q-list bordered>
    <q-item-label header>
      {{ gameEventNames.get(gameEvent.type) }}
    </q-item-label>

    <q-separator/>
    <q-item-label header>By team</q-item-label>
    <TeamItem v-model="botPushedBot.by_team"/>

    <q-separator/>
    <NumberItem v-model="botPushedBot.victim" label="victim"/>
    <NumberItem v-model="botPushedBot.violator" label="violator"/>
    <LocationItem v-model="botPushedBot.location"/>

    <q-item>
      <q-item-section>
        <q-btn
          dense
          label="Create"
          color="primary"
          @click="updateGameEvent"
        />
      </q-item-section>
    </q-item>
  </q-list>
</template>
