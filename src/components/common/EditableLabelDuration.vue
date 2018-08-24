<template>
    <span class="label-duration">
        <span v-show="g.edit === false"
              ref="span-id"
              v-format-ns-duration="value"></span>
        <input v-show="g.edit === true"
               v-model="g.value"
               title=""
               v-on:blur="updateValue"
               @keyup.enter="updateValue"
               size="5"
               ref="input"
        />
        <a class="btn-edit" v-on:click="edit()" v-show="!g.edit"><font-awesome-icon icon="edit"/></a>
    </span>
</template>

<script>
    export default {
        name: "EditableLabelDuration",
        props: {
            value: Number,
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
    .btn-edit {
        margin-left: 0.3em;
        margin-right: 0.3em;
    }
</style>