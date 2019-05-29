<template>
    <div>
        <table>
            <tr>
                <td colspan="2">
                    <ManualControlCommon/>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <hr>
                </td>
            </tr>
            <tr>
                <td class="team-yellow">
                    {{state.teamState['Yellow'].name}}
                </td>
                <td class="team-blue">
                    {{state.teamState['Blue'].name}}
                </td>
            </tr>
            <tr>
                <td>
                    <ManualControlTeamMatchCommands team-color="Yellow"/>
                </td>
                <td>
                    <ManualControlTeamMatchCommands team-color="Blue"/>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <hr>
                </td>
            </tr>
            <tr>
                <td>
                    <ManualControlTeam team-color="Yellow"/>
                </td>
                <td>
                    <ManualControlTeam team-color="Blue"/>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <hr>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <b-btn v-b-modal.place-ball-modal variant="secondary">Place ball</b-btn>
                </td>
            </tr>
        </table>

        <b-modal id="place-ball-modal"
                 title="Place ball"
                 :lazy="true">
            <PlaceBall/>
            <div slot="modal-footer">
                <!-- hide modal buttons -->
            </div>
        </b-modal>
    </div>
</template>

<script>
    import ManualControlCommon from "./ManualControlCommon";
    import ManualControlTeam from "./ManualControlTeam";
    import ManualControlTeamMatchCommands from "./ManualControlTeamMatchCommands";
    import PlaceBall from "./PlaceBall";

    export default {
        name: "ManualControl",
        components: {
            PlaceBall,
            ManualControlTeamMatchCommands,
            ManualControlCommon,
            ManualControlTeam
        },
        computed: {
            state() {
                return this.$store.state.refBoxState
            },
        }
    }
</script>

<style scoped>
</style>
