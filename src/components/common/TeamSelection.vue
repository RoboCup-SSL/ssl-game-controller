<template>
    <b-form-group :label="label" horizontal>
        <b-form-radio-group id="select-team" v-model="newEvent.team" buttons>
            <b-form-radio value="yellow">Yellow</b-form-radio>
            <b-form-radio value="blue">Blue</b-form-radio>
            <b-form-radio value="unknown" :disable="showUnknown">No team</b-form-radio>
        </b-form-radio-group>
    </b-form-group>
</template>

<script>
    export default {
        name: "TeamSelection",
        props: {
            showUnknown: {
                type: Boolean,
                default: true
            },
            label: {
                type: String,
                default: ''
            },
            newEvent: {
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