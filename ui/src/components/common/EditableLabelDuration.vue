<template>
    <div class="editable-label">
        <span v-show="g.edit === false"
              @dblclick="edit"
              ref="span-id"
              v-format-ns-duration="value"></span>
        <input v-show="g.edit === true"
               v-model="g.value"
               title=""
               v-on:blur="updateValue"
               @keyup.enter="updateValue"
               size="5"
        />
    </div>
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
            }
        }
    }
</script>

<style scoped>

</style>