<template>
    <span>
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
               id="edit-input"
               size="10"
               ref="input"
        />
        <a class="btn-edit" v-on:click="edit()" v-show="editMode.active && !g.edit">
            <img alt="pen" src="@/assets/img/icons8-ball-point-pen-16.png">
        </a>
    </span>
</template>

<script>
    export default {
        name: "EditableLabelText",
        props: {
            label: String,
            value: String,
            callback: Function,
            editMode: Object,
        },
        data: function () {
            return {g: {edit: false, value: ""}}
        },
        methods: {
            updateValue: function () {
                if (this.g.edit) {
                    this.g.edit = false;
                    this.callback(this.g.value)
                }
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
</style>
