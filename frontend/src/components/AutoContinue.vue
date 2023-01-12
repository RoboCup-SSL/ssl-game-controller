<script setup lang="ts">
import {computed, inject} from "vue";
import {ControlApi} from "@/providers/controlApi/ControlApi";
import {useGcStateStore} from "@/store/gcState";
import ToggleInput from "@/components/common/ToggleInput.vue";

const store = useGcStateStore()
const control = inject<ControlApi>('control-api')

const model = computed(() => {
  return store.config.autoContinue
})

const onChange = () => {
  control?.ChangeConfig({autoContinue: !model.value})
}
</script>

<template>
  <ToggleInput :model="model" label="Continue automatically" @onUpdate="onChange"/>
</template>
