<template>
    <div class="team-timeouts">
        <p>Timeouts left: {{timeoutsLeft}}</p>
        <p>Timeout time left: <span v-format-ns-duration="timeoutTimeLeft"></span></p>
    </div>
</template>

<script>
    export default {
        name: "TeamTimeouts",
        props: {
            timeoutsLeft: Number,
            timeoutTimeLeft: Number
        }
    }
</script>

<style scoped>

</style>