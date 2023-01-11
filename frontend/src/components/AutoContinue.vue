<script setup lang="ts">
import {computed, inject} from "vue";
import {ControlApi} from "@/providers/controlApi/ControlApi";
import {useGcStateStore} from "@/store/gcState";
import ToggleInput from "@/components/common/ToggleInput.vue";

const store = useGcStateStore()
const control = inject<ControlApi>('control-api')

const autoContinue = computed(() => {
  return store.config.autoContinue
})

const onChange = () => {
  control?.ChangeConfig({autoContinue: !autoContinue.value})
}
</script>

<template>
  <ToggleInput :model="autoContinue" label="Continue automatically" @onUpdate="onChange"/>
</template>
