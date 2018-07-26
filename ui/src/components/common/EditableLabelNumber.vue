<template>
    <div class="editable-label">
        <label v-show="g.edit === false"
               for="edit-input"
               @dblclick="edit">{{label}} {{value}}</label>
        <input v-show="g.edit === true"
               v-model="g.value"
               v-on:blur="updateValue"
               id="edit-input"
               type="number"
               :title="title"
               :min="min"
               :max="max"/>
    </div>
</template>

<script>
    export default {
        name: "EditableLabelNumber",
        props: {
            label: String,
            title: String,
            value: Number,
            min: Number,
            max: Number,
            callback: Function
        },
        data: function () {
            return {g: {edit: false, value: 0}}
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