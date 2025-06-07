<script setup lang="ts">
import {computed, inject, ref, toRaw} from "vue";
import ControlButton from "@/components/control/ControlButton.vue";
import {useMatchStateStore} from "@/store/matchState";
import {isPausedStage} from "@/helpers";
import type {TeamJson} from "@/proto/state/ssl_gc_common_pb";
import type {ControlApi} from "@/providers/controlApi";
import type {Vector2} from "@/proto/geom/ssl_gc_geometry_pb";
import NumberInput from "@/components/common/NumberInput.vue";

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

const placeBall = (team: TeamJson) => {
  control?.SubmitChange({
    origin: "UI",
    revertible: true,
    setBallPlacementPosChange: {
      pos: {
        x: newBallPos.value.x,
        y: newBallPos.value.y,
      }
    }
  })
  control?.NewCommandForTeam('BALL_PLACEMENT', team)
}

const disable = computed(() => {
  return store.matchState.command?.type !== 'STOP'
    || !store.matchState.stage
    || isPausedStage(store.matchState.stage)
})
</script>

<template>
  <div class="row justify-evenly q-mt-md">
    <ControlButton label="Reset sliders to current ball position"
                   :disable="false"
                   :action="resetBallPos"/>
  </div>

  <div class="row justify-evenly q-mt-md">
    <NumberInput
      label="X-Coordinate"
      v-model="newBallPos.x"
    />
    <NumberInput
      label="Y-Coordinate"
      v-model="newBallPos.y"
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
  </div>

  <div class="row justify-evenly q-mt-md">
    <ControlButton class="col-grow" label="Place ball"
                   v-for="team in (['YELLOW', 'BLUE']) as TeamJson[]"
                   :key="team"
                   :disable="disable"
                   :action="() => placeBall(team)"
                   :team="team"
    />
  </div>
</template>
