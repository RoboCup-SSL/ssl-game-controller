<template>
    <b-table striped hover small
             responsive="true"
             :per-page="perPage"
             :current-page="currentPage"
             :items="events"
             :fields="fields">
        <template slot="HEAD_name" slot-scope="data">
            <div style="text-align: left; width: 100%;">Description</div>
        </template>
        <template slot="type" slot-scope="data">
            <span v-b-tooltip.hover :title="data.item.type">
                <font-awesome-icon class="fa-sm" :icon="iconForType(data.item.type)"/>
            </span>
        </template>
        <template slot="stageTime" slot-scope="data">
            <span v-format-ns-duration="data.item.stageTime"></span>
        </template>
        <template slot="name" slot-scope="data">
            <div style="text-align: left; width: 100%;"
                 :class="{'team-blue': data.item.team === 'Blue', 'team-yellow': data.item.team === 'Yellow'}">
                {{data.item.name}}
            </div>
        </template>
        <template slot="details" slot-scope="data">
            <span v-b-tooltip.hover :title="`Time: ${formatTimestamp(data.item.timestamp)}
            Details: ${data.item.description}`">
                <font-awesome-icon class="fa-sm" icon="info-circle"/>
            </span>
        </template>
        <template slot="revert" slot-scope="data">
            <font-awesome-icon class="fa-sm" icon="history"/>
        </template>
    </b-table>
</template>

<script>
    import "../../date.format";

    export default {
        name: "EventTable",
        props: {
            currentPage: {
                type: Number,
                default: 1
            },
            perPage: {
                type: Number,
                default: 5
            },
            events: {
                type: Array
            }
        },
        data() {
            return {
                fields: [
                    {
                        key: 'stageTime',
                    },
                    {
                        key: 'type',
                    },
                    {
                        key: 'name',
                    },
                    {
                        key: 'details',
                    },
                    {
                        key: 'revert',
                    },
                ],
            }
        },
        methods: {
            formatTimestamp(timestamp) {
                let date = new Date(timestamp / 1000000);
                return date.format("HH:MM:ss,l");
            },
            iconForType(type) {
                switch (type) {
                    case 'command':
                        return 'terminal';
                    case 'stage':
                        return 'gavel';
                    case 'card':
                        return 'chess-board';
                    case 'time':
                        return 'clock';
                    case 'gameEvent':
                        return 'exclamation-triangle';
                    case 'ignoredGameEvent':
                        return 'exclamation';
                    case 'modify':
                        return 'edit';
                    case 'teamAction':
                        return 'users';
                    case 'hint':
                        return 'bullhorn';
                    default:
                        return 'question-circle';
                }
            }
        }
    }
</script>

<style scoped>

</style>
