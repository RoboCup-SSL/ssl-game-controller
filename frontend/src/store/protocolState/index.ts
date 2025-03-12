import {defineStore} from "pinia";
import type {ProtocolEntryJson, ProtocolJson} from "@/proto/api/ssl_gc_api_pb";

export const useProtocolStore = defineStore('protocol', {
  state: () => {
    return {
      protocolEntries: new Array<ProtocolEntryJson>(),
    }
  },
  actions: {
    updateProtocol(protocol: ProtocolJson) {
      const entries = protocol.entry || []
      if (protocol.delta) {
        entries.reverse()
        for (const entry of entries) {
          this.protocolEntries.unshift(entry)
        }
      } else {
        this.protocolEntries = Array.from<ProtocolEntryJson>(entries)
      }
    },
  },
})
