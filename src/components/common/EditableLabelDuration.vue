<template>
    <span class="label-duration">
        <span v-show="!g.edit"
              ref="span-id"
              v-format-ns-duration="value"></span>
        <input v-show="g.edit"
               v-model="g.value"
               v-on:blur="updateValue"
               @keyup.enter="updateValue"
               size="5"
               ref="input"
        />
        <a class="btn-edit" v-on:click="edit()" v-show="editMode.active && !g.edit">
            <img alt="pen" src="@/assets/img/icons8-ball-point-pen-16.png">
        </a>
    </span>
</template>

<script>
    export default {
        name: "EditableLabelDuration",
        props: {
            value: String,
            callback: Function,
            editMode: Object,
        },
        data: function () {
            return {g: {edit: false, value: 0}}
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
                this.g.value = this.$refs["span-id"].innerHTML;
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
