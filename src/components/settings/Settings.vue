<template>
    <div>
        <a v-b-modal.settings-modal>
            <font-awesome-icon icon="cog" class="fa-lg"></font-awesome-icon>
        </a>
        <b-modal id="settings-modal"
                 title="Settings"
                 size="lg"
                 :lazy="true">
            <TeamSettings/>
            <hr>
            <MatchSettings/>
            <hr>
            <AutonomousSettings/>
            <div slot="modal-footer">
                <!-- hide modal buttons -->
            </div>
        </b-modal>
    </div>
</template>

<script>
    import TeamSettings from "./TeamSettings";
    import MatchSettings from "./MatchSettings";
    import EventBehavior from "../events/EventBehavior";
    import AutonomousSettings from "./AutonomousSettings";

    export default {
        name: "Settings",
        components: {AutonomousSettings, EventBehavior, MatchSettings, TeamSettings}
    }
</script>

<style scoped>
    button, .btn-group {
        margin-right: 0.5em;
        margin-bottom: 0.5em;
    }
</style>
