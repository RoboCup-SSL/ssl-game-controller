<template>
    <div>
        <b-btn v-b-toggle.collapse1 variant="primary">Debug Info</b-btn>
        <b-collapse id="collapse1" class="mt-2">
            <b-card>
                <pre class="card-text" style="text-align: left">{{ latestMessage }}</pre>
            </b-card>
        </b-collapse>
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

</style>