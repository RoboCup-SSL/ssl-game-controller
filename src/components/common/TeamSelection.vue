<template>
    <b-form-group :label="label" horizontal>
        <b-form-radio-group id="select-team" v-model="model.team" buttons>
            <b-form-radio value="Yellow">Yellow</b-form-radio>
            <b-form-radio value="Blue">Blue</b-form-radio>
            <b-form-radio value="unknown" :disabled="!allowUnknownTeam">No team</b-form-radio>
        </b-form-radio-group>
    </b-form-group>
</template>

<script>
    export default {
        name: "TeamSelection",
        props: {
            allowUnknownTeam: {
                type: Boolean,
                default: true
            },
            label: {
                type: String,
                default: ''
            },
            model: {
                type: Object,
                default: function () {
                    return {
                        team: null
                    }
                }
            }
        },
    }
</script>

<style scoped>
</style>