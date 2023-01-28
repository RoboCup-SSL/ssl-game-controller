<script setup lang="ts">

import {originIcon} from "@/helpers";

const props = defineProps<{
  origin: string,
  tooltip?: boolean,
}>()
</script>

<template>
  <q-icon
    class="q-mx-xs"
    color="primary"
    :name="originIcon(origin)"
    :alt="origin"
  >
    <q-tooltip v-if="props.tooltip === true">
      {{ origin }}
    </q-tooltip>
  </q-icon>
</template>
