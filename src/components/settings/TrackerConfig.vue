<template>
    <div class="container">
        <p>
            Connected tracker sources:
        </p>
        <ul>
            <li v-for="(state, sourceId) in trackerState"
                :key="sourceId">
                {{sourceId}} ({{state.sourceName}})
                <b-button variant="primary"
                          @click="setActiveTrackerSource(sourceId)"
                          :disabled="sourceId === activeTrackerSource">
                    Set active
                </b-button>
            </li>
        </ul>
    </div>
</template>

<script>
    import {submitConfigUpdate} from "@/submit";

    export default {
        name: "TrackerConfig",
        computed: {
            trackerState() {
                return this.$store.state.gcState.trackerState;
            },
            activeTrackerSource() {
                return this.$store.state.config.activeTrackerSource;
            }
        },
        methods: {
            setActiveTrackerSource(sourceId) {
                submitConfigUpdate({
                    activeTrackerSource: sourceId
                });
            },
        }
    }
</script>

<style scoped>
    .container {
        text-align: left;
    }
</style>
