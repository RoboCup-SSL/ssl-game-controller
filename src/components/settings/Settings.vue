<template>
    <div>
        <TeamSettings></TeamSettings>
        <hr>
        <MatchSettings></MatchSettings>
    </div>
</template>

<script>
    import TeamSettings from "./TeamSettings";
    import MatchSettings from "./MatchSettings";

    export default {
        name: "Settings",
        components: {MatchSettings, TeamSettings}
    }
</script>

<style scoped>
</style>
