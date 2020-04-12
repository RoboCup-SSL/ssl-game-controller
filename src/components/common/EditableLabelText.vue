<template>
    <span class="editable-label">
        <label v-show="!g.edit"
               :for="inputId">
            {{label}} {{value}}
        </label>
        <label v-show="g.edit"
               :for="inputId">
            {{label}}
        </label>
        <input v-show="g.edit"
               v-model="g.value"
               v-on:focus="g.focused = true"
               v-on:blur="updateValue"
               @keyup.enter="updateValue"
               :title="title"
               :id="inputId"
               size="10"
               ref="input"
        />
        <a class="btn-edit" v-on:click="edit" v-show="editMode.active && !g.edit">
            <img alt="pen" src="@/assets/img/icons8-ball-point-pen-16.png">
        </a>
    </span>
</template>

<script>
    export default {
        name: "EditableLabelText",
        props: {
            id: String,
            label: String,
            title: String,
            value: String,
            callback: Function,
            editMode: Object,
        },
        data: function () {
            return {g: {edit: false, value: "", focused: false}}
        },
        methods: {
            updateValue: function () {
                if (this.g.edit && this.g.focused) {
                    this.g.edit = false;
                    this.callback(this.g.value)
                }
                // remembering the focus is necessary for Firefox, as it fires the onblur too early
                this.g.focused = false;
            },
            edit: function () {
                this.g.edit = true;
                this.g.value = this.value;
                this.$nextTick(() => {
                    this.$refs.input.focus();
                })
            },
        },
        computed: {
            inputId() {
                if (this.id) {
                    return this.id;
                }
                return 'edit-input';
            },
        }
    }
</script>

<style scoped>
    input {
        text-align: center;
    }

    label {
        margin-bottom: 0;
    }
</style>
