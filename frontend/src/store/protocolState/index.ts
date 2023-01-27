import {defineStore} from "pinia";
import type {Protocol, ProtocolEntry} from "@/proto/ssl_gc_api";

export const useProtocolStore = defineStore('protocol', {
  state: () => {
    return {
      protocolEntries: new Array<ProtocolEntry>(),
    }
  },
  actions: {
    updateProtocol(protocol: Protocol) {
      const entries = protocol.entry!
      if (protocol.delta) {
        entries.reverse()
        for (const entry of entries) {
          this.protocolEntries.unshift(entry)
        }
      } else {
        this.protocolEntries = Array.from<ProtocolEntry>(entries)
      }
    },
  },
})
