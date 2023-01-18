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
        this.replace(entries)
      } else {
        for (const entry of entries) {
          this.protocolEntries.push(entry)
        }
      }
    },
    add(entry: ProtocolEntry) {
      this.protocolEntries.push(entry)
    },
    replace(entries: ProtocolEntry[]) {
      this.protocolEntries = Array.from<ProtocolEntry>(entries).reverse()
    }
  },
})
