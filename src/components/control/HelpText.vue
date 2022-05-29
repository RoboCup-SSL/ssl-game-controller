<template>
    <label class="help-text">
        {{ hoverHelpText }}
    </label>
</template>

<script>
export default {
    name: "HelpText",
    computed: {
        hoverHelpText() {
            return this.$store.state.hoverHelpText;
        }
    }
}
</script>

<style scoped>
.help-text {
    font-size: 1.2em;
    font-weight: bold;
}
</style>
