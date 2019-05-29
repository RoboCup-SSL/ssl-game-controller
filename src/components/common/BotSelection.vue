<template>
    <b-form-group :label="label" label-cols-horizontal>
        <input type="number"
               v-model="model.id"
               :min="0"
               :max="16"/>
    </b-form-group>
</template>

<script>
    export default {
        name: "BotSelection",
        props: {
            label: {
                type: String,
                default: ''
            },
            model: {
                type: Object,
                default: function () {
                    return {
                        id: null
                    }
                }
            }
        },
    }
</script>

<style scoped>
</style>
