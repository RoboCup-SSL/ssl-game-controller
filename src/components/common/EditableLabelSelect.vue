<template>
    <span>
        <label v-show="!g.edit">
            {{label}} {{value}}
        </label>
        <label v-show="g.edit">
            {{label}}
        </label>
        <select v-show="g.edit"
                id="edit-input"
                v-model="g.value"
                @blur="updateValue"
                ref="input"
                class="custom-select">
            <option v-for="option in options" :key="option" :value="option">
                {{ option }}
            </option>
        </select>
        <a class="btn-edit" v-on:click="switchToEdit()" v-show="!g.edit"><font-awesome-icon icon="edit"/></a>
    </span>
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
            return {g: {edit: false, value: 0}}
        },
        methods: {
            updateValue: function () {
                this.g.edit = false;
                this.callback(this.g.value)
            },
            switchToEdit: function () {
                this.g.edit = true;
                this.g.value = this.value;
                this.$nextTick(() => this.$refs.input.focus())
            }
        },
    }
</script>

<style scoped>
    .btn-edit {
        margin-left: 0.3em;
        margin-right: 0.3em;
    }
    select {
        width: auto !important;
    }
</style>