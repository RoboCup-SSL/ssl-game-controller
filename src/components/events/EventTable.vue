<template>
    <b-table striped hover small
             responsive="true"
             :sort-by.sync="sortBy"
             :sort-desc.sync="sortDesc"
             :per-page="perPage"
             :current-page="currentPage"
             :items="events"
             :fields="fields">
        <template slot="timestamp" slot-scope="data">
            {{formatTimestamp(data.item.timestamp)}}
        </template>
        <template slot="stageTime" slot-scope="data">
            <span v-format-ns-duration="data.item.stageTime"></span>
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
                sortBy: 'timestamp',
                sortDesc: true,
                fields: [
                    {
                        key: 'timestamp',
                        sortable: true
                    },
                    {
                        key: 'stageTime',
                        sortable: true
                    },
                    {
                        key: 'type',
                        sortable: true
                    },
                    {
                        key: 'name',
                        sortable: true
                    },
                    {
                        key: 'team',
                        sortable: true
                    },
                    {
                        key: 'description',
                        sortable: true
                    },
                ],
            }
        },
        methods: {
            formatTimestamp(timestamp) {
                let date = new Date(timestamp/1000000);
                return date.format("HH:MM:ss,l");
            }
        }
    }
</script>

<style scoped>

</style>