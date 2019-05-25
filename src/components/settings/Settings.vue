<template>
    <span>
        <a v-b-modal.settings-modal>
            <font-awesome-icon icon="cog" class="fa-lg"></font-awesome-icon>
        </a>
        <b-modal id="settings-modal"
                 title="Settings"
                 size="lg"
                 :lazy="true">
            <TeamSettings></TeamSettings>
            <hr>
            <MatchSettings></MatchSettings>
            <div slot="modal-footer">
                <!-- hide modal buttons -->
            </div>
        </b-modal>
    </span>
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
    button, .btn-group {
        margin-right: 0.5em;
        margin-bottom: 0.5em;
    }
</style>
