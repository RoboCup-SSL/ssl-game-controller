<template>
    <div class="team-goalie">
        <label for="goalie">Goalie: </label>
        <input id="goalie" type="number" title="Goalie" v-bind:value="goalie" min="0" max="15"/>
    </div>
</template>

<script>
    export default {
        name: "TeamGoalie",
        props: ["goalie"]
    }
</script>

<style scoped>

</style>