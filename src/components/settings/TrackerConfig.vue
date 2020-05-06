<template>
    <div class="container">
        <p>
            Connected tracker sources:
        </p>
        <ul>
            <li v-for="(state, sourceId) in trackerState"
                :key="sourceId">
                {{sourceId}} ({{state.sourceName}})
            </li>
        </ul>
        <p>
            Tracker source priority:
        </p>
        <ul>
            <li v-for="sourceName in trackerSourcePriority"
                :key="sourceName">
                {{sourceName}}
            </li>
        </ul>
    </div>
</template>

<script>
    import {submitConfigUpdate} from "../../submit";

    export default {
        name: "TrackerConfig",
        computed: {
            trackerState() {
                return this.$store.state.gcState.trackerState;
            },
            trackerSourcePriority() {
                return this.$store.state.config.trackerSourcePriority
            },
        },
        methods: {
            changeBehavior(eventType, value) {
                submitConfigUpdate({
                    gameEventBehavior: {
                        [eventType]: value
                    }
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
