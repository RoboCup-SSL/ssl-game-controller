<template>
    <div>
        <label v-show="g.edit === false"
               for="edit-input"
               @dblclick="edit">
            {{label}} {{value}}
        </label>
        <label v-show="g.edit === true"
               for="edit-input">
            {{label}}
        </label>
        <input v-show="g.edit === true"
               v-model="g.value"
               v-on:blur="updateValue"
               @keyup.enter="updateValue"
               id="edit-input"
               size="10"/>
    </div>
</template>

<script>
    export default {
        name: "EditableLabelText",
        props: {
            label: String,
            value: String,
            callback: Function
        },
        data: function () {
            return {g: {edit: false, value: ""}}
        },
        methods: {
            updateValue: function () {
                this.g.edit = false;
                this.callback(this.g.value)
            },
            edit: function () {
                this.g.edit = true;
                this.g.value = this.value;
            }
        }
    }
</script>

<style scoped>

</style>