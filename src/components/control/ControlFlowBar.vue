<template>
    <div class="control-flaw-bar">
        <div v-help-text="'Continue with next action (' + Object.keys(keymapContinue)[0] + ')'"
             v-hotkey="keymapContinue">
            <ContinueButton v-for="(continueAction, key) in continueActions"
                            :key="key"
                            :value="continueAction"
            />
        </div>
    </div>
</template>

<script>
import ContinueButton from "@/components/control/ContinueButton.vue";
import {submitContinueAction} from "@/submit";

export default {
    name: "ControlFlowBar",
    components: {ContinueButton},
    computed: {
        keymapContinue() {
            return {
                'ctrl+space': () => {
                    if (this.continueActions.length > 0) {
                        submitContinueAction(this.continueActions[0])
                    }
                }
            }
        },
        continueActions() {
            return this.$store.state.gcState.continueActions;
        }
    }
}
</script>

<style scoped>

.control-flaw-bar {
    width: 100%;
    position: fixed;
    bottom: 0;
    text-align: center;
    display: flex;
    justify-content: center;
}

</style>
