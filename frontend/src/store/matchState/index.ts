import {defineStore} from "pinia";
import {State} from "@/proto/ssl_gc_state";

export const useMatchStateStore = defineStore('matchState', {
    state: () => (State.fromJSON({})),
    getters: {
    },
    actions: {
        update(newState: State) {
            this.$state = newState
        },
    },
})
