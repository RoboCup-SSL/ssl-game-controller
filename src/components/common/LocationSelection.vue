<template>
    <b-form-group :label="label" horizontal>
        <input type="number"
               v-model="model.x"
               :min="-99000.0"
               :max="99000.0"/>
        <input type="number"
               v-model="model.y"
               :min="-99000.0"
               :max="99000.0"/>
    </b-form-group>
</template>

<script>
    export default {
        name: "LocationSelection",
        props: {
            label: {
                type: String,
                default: ''
            },
            model: {
                type: Object,
                default: function () {
                    return {
                        x: null,
                        y: null
                    }
                }
            }
        },
    }
</script>

<style scoped>
</style>