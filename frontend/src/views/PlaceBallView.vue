<script setup lang="ts">
import {computed, inject, ref, toRaw} from "vue";
import ControlButton from "@/components/control/ControlButton.vue";
import {useMatchStateStore} from "@/store/matchState";
import {isPausedStage} from "@/helpers";
import {Command_Type} from "@/proto/ssl_gc_state";
import {Team} from "@/proto/ssl_gc_common";
import type {ControlApi} from "@/providers/controlApi/ControlApi";
import type {Vector2} from "@/proto/ssl_gc_geometry";

const store = useMatchStateStore()
const control = inject<ControlApi>('control-api')

const minMaxX = ref(7)
const minMaxY = ref(5)

const newBallPos = ref({x: 0, y: 0} as Vector2)

const curBallPos = computed(() => {
  if (store.matchState.placementPos) {
    return store.matchState.placementPos as Vector2
  }
  return {x: 0, y: 0} as Vector2
})

const resetBallPos = function () {
  newBallPos.value = structuredClone(toRaw(curBallPos.value))
}

const placeBall = (team: Team) => {
  control?.SubmitChange({
    origin: "UI",
    revertible: true,
    change: {
      $case: "setBallPlacementPosChange",
      setBallPlacementPosChange: {
        pos: {
          x: newBallPos.value.x,
          y: newBallPos.value.y,
        }
      }
    }
  })
  control?.NewCommandForTeam(Command_Type.BALL_PLACEMENT, team)
}

const disable = computed(() => {
  return store.matchState.command?.type !== Command_Type.STOP
    || !store.matchState.stage
    || isPausedStage(store.matchState.stage)
})
</script>

<template>
  <div class="row">
    <ControlButton class="col-grow" label="Place ball"
                   v-for="team in [Team.YELLOW, Team.BLUE]"
                   :key="team"
                   :disable="disable"
                   :action="() => placeBall(team)"
                   :team="team"
    />
  </div>

  <div class="q-px-md">
    <div class="q-pt-xl">
      <q-item>
        <q-item-section avatar>
          X
        </q-item-section>
        <q-item-section>
          <q-slider
            v-model="newBallPos.x"
            :min="-minMaxX"
            :max="minMaxX"
            :step="0.1"
            selection-color="transparent"
            label
            :label-value="newBallPos.x + ' m'"
            label-always
          />
          <q-slider class="slider-current"

                    v-model="curBallPos.x"
                    :min="-minMaxX"
                    :max="minMaxX"
                    :step="0.1"
                    selection-color="transparent"
                    color="info"
                    disable
          />
        </q-item-section>
        <q-item-section avatar/>
      </q-item>
    </div>
    <q-separator/>
    <div class="q-pb-lg">
      <q-item>
        <q-item-section avatar>
          Y
        </q-item-section>
        <q-item-section>
          <q-slider
            v-model="curBallPos.y"
            :min="-minMaxY"
            :max="minMaxY"
            :step="0.1"
            selection-color="transparent"
            color="info"
            disable
          />
          <q-slider
            v-model="newBallPos.y"
            :min="-minMaxY"
            :max="minMaxY"
            :step="0.1"
            selection-color="transparent"
            label
            :label-value="newBallPos.y + ' m'"
            label-always
            switch-label-side
          />
        </q-item-section>
        <q-item-section avatar/>
      </q-item>
    </div>

    <div class="row wrap justify-evenly q-mt-md">
      <ControlButton label="Reset placement position"
                     :disable="false"
                     :action="resetBallPos"/>
    </div>
  </div>
</template>
