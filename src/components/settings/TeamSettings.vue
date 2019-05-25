<template>
    <div>
        <table class="table-layout">
            <tr>
                <th class="team-yellow">Yellow</th>
                <th></th>
                <th class="team-blue">Blue</th>
            </tr>
            <tr>
                <td>
                    <TeamName :edit-mode="{active: true}" team-color="Yellow"/>
                </td>
                <td class="label-column">
                    Team Name
                </td>
                <td>
                    <TeamName :edit-mode="{active: true}" team-color="Blue"/>
                </td>
            </tr>
            <tr>
                <td>
                    <TeamScore :edit-mode="{active: true}" team-color="Yellow"/>
                </td>
                <td class="label-column">Goals</td>
                <td>
                    <TeamScore :edit-mode="{active: true}" team-color="Blue"/>
                </td>
            </tr>
            <tr>
                <td>
                    <TeamBallPlacement team-color="Yellow"/>
                </td>
                <td class="label-column">Ball placement enabled</td>
                <td>
                    <TeamBallPlacement team-color="Blue"/>
                </td>
            </tr>
            <tr>
                <td>
                    <TeamHalf team-color="Yellow"/>
                </td>
                <td class="label-column">Goal Half</td>
                <td>
                    <TeamHalf team-color="Blue"/>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    import TeamName from "../team/TeamName";
    import TeamScore from "../team/TeamScore";
    import TeamBallPlacement from "../team/TeamBallPlacement";
    import TeamHalf from "../team/TeamHalf";

    export default {
        name: "TeamSettings",
        components: {
            TeamHalf,
            TeamBallPlacement,
            TeamScore,
            TeamName,
        }
    }
</script>

<style scoped>
    .table-layout {
        width: 100%;
    }

    .table-layout tr td {
        width: 33%;
    }

    .label-column {
        font-weight: bold;
    }
</style>
