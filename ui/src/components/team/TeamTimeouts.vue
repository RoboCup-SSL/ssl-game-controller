<template>
    <div class="team-timeouts">
        <p>Timeouts left: {{timeoutsLeft}}</p>
        <p>Timeout time left: <span v-format-ns-duration="timeoutTimeLeft"></span></p>
    </div>
</template>

<script>
    export default {
        name: "TeamTimeouts",
        props: ["timeoutsLeft", "timeoutTimeLeft"]
    }
</script>

<style scoped>

</style>