<template>
    <div class="bottom-right">
        <span v-if="activeTracker">
            Tracker source: {{ activeTracker }}
        </span>
        <span v-else class="no-tracker-source">
            No tracker source connected
        </span>
    </div>
</template>

<script>
    export default {
        name: "ActiveTrackerSource",
        computed: {
            activeTracker() {
                if(this.activeTrackerSource) {
                    return this.$store.state.gcState.trackers[this.activeTrackerSource];
                }
                return null;
            },
            activeTrackerSource() {
                return this.$store.state.config.activeTrackerSource;
            }
        },
    }
</script>

<style scoped>

    .bottom-right {
        position: fixed;
        bottom: 0.2em;
        right: 0.5em;
        text-align: right;
        display: flex;
        justify-content: right;
    }

    .no-tracker-source {
        color: red;
    }

</style>
