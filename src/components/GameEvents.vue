<template>
    <div>
        <b-table striped hover small
                 responsive="true"
                 :sort-by.sync="sortBy"
                 :sort-desc.sync="sortDesc"
                 :per-page="perPage"
                 :current-page="currentPage"
                 :items="gameEvents"
                 :fields="fields">
            <template slot="timestamp" slot-scope="data">
                {{formatTimestamp(data.item.timestamp)}}
            </template>
            <template slot="stageTime" slot-scope="data">
                <span v-format-ns-duration="data.item.stageTime"></span>
            </template>
        </b-table>
        <b-pagination size="sm"
                      align="center"
                      :total-rows="gameEvents.length"
                      v-model="currentPage"
                      :per-page="perPage">
        </b-pagination>
    </div>
</template>

<script>
    import "../date.format";

    export default {
        name: "GameEvents",
        data() {
            return {
                sortBy: 'timestamp',
                sortDesc: true,
                currentPage: 1,
                perPage: 5,
                fields: [
                    {
                        key: 'timestamp',
                        sortable: true
                    },
                    {
                        key: 'stageTime',
                        sortable: false
                    },
                    {
                        key: 'type',
                        sortable: true
                    },
                    {
                        key: 'command',
                        sortable: false
                    },
                    {
                        key: 'team',
                        sortable: false
                    },
                    {
                        key: 'description',
                        sortable: false
                    },
                ],
            }
        },
        computed: {
            gameEvents() {
                return this.$store.state.gameEvents;
            }
        },
        methods: {
            formatTimestamp(timestamp) {
                let date = new Date(timestamp);
                return date.format("HH:MM:ss,l");
            }
        }
    }
</script>

<style scoped>

</style>