<template>
    <span class="editable-label">
        <label v-show="g.edit === false"
               for="edit-input">
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
               :title="title"
               :min="min"
               :max="max"
               id="edit-input"
               type="number"
               ref="input"
        />
        <a class="btn-edit" v-on:click="edit()" v-show="!g.edit"><font-awesome-icon icon="edit"/></a>
    </span>
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
                this.$nextTick(() => this.$refs.input.focus())
            }
        }
    }
</script>

<style scoped>
    input {
        text-align: center;
    }
    .btn-edit {
        margin-left: 0.3em;
        margin-right: 0.3em;
    }
</style>