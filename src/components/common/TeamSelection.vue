<template>
    <b-form-group :label="label" label-cols-horizontal>
        <b-form-radio-group id="select-team" v-model="model.team" buttons>
            <b-form-radio value="YELLOW">Yellow</b-form-radio>
            <b-form-radio value="BLUE">Blue</b-form-radio>
        </b-form-radio-group>
    </b-form-group>
</template>

<script>
    export default {
        name: "TeamSelection",
        props: {
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
