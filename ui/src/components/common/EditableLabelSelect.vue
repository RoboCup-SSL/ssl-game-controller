<template>
    <div>
        <label v-show="edit === false"
               @dblclick="switchToEdit">
            {{label}} {{value}}
        </label>
        <label v-show="edit === true">
            {{label}}
        </label>
        <b-form-select v-show="edit === true"
                       id="edit-input"
                       v-model="editValue"
                       :options="options"
                       class="mb-3"></b-form-select>
    </div>
</template>

<script>
    export default {
        name: "EditableLabelSelect",
        props: {
            label: String,
            value: String,
            options: Array,
            callback: Function
        },
        data: function () {
            return {edit: false, editValue: ""}
        },
        methods: {
            updateValue: function () {
                this.g.edit = false;
                this.callback(this.g.value)
            },
            switchToEdit: function () {
                this.edit = true;
                this.editValue = this.value;
            }
        },
        watch: {
            editValue: function (val) {
                this.edit = false;
                this.callback(val);
            }
        }
    }
</script>

<style scoped>

</style>