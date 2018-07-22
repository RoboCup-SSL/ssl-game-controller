<template>
    <div class="team-score">
        <p>Score: {{score}}
            <button style="width: 2em; margin-right: 0.5em">-</button>
            <button style="width: 5em">+</button>
        </p>
    </div>
</template>

<script>
    export default {
        name: "TeamScore",
        props: ["score"]
    }
</script>

<style scoped>

</style>