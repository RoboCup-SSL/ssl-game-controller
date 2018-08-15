<template>
    <div class="debug">
        <b-collapse id="collapse1" class="mt-2">
            <b-card>
                <pre class="card-text" style="text-align: left">{{ latestMessage }}</pre>
            </b-card>
        </b-collapse>
        <b-btn v-b-toggle.collapse1 variant="primary">Debug Info</b-btn>
    </div>
</template>

<script>
    export default {
        name: "Debug",
        computed: {
            latestMessage() {
                return JSON.stringify(this.$store.state.latestMessage, null, 4)
            }
        }
    }
</script>

<style scoped>
    #collapse1 {
        overflow-y: scroll;
        max-height: 500px;
    }

    button {
        margin: 0.1em;
    }
</style>