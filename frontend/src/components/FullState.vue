<script setup lang="ts">
import {useMatchStateStore} from "@/store/matchState";

const store = useMatchStateStore()
</script>

<template>
    <div>
        {{ JSON.stringify(store) }}
    </div>
</template>

<style scoped>

</style>
