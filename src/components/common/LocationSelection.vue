<template>
    <b-form-group :label="label" horizontal>
        <input type="number"
               v-model="model.x"
               :min="-99000"
               :max="99000"/>
        <input type="number"
               v-model="model.y"
               :min="-99000"
               :max="99000"/>
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