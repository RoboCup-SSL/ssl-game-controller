import {defineStore} from "pinia";
import {GcState} from "@/proto/ssl_gc_engine";

export const useGcStateStore = defineStore('gcState', {
    state: () => (GcState.fromJSON({})),
    getters: {
    },
    actions: {
        update(newState: GcState) {
            this.$state = newState
        },
    },
})
