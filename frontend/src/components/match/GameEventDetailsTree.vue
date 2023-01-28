<script setup lang="ts">
import {computed} from "vue";
import type {GameEvent} from "@/proto/ssl_gc_game_event";
import {gameEventDetails} from "@/helpers";

const props = defineProps<{
  gameEvent: GameEvent,
}>()

const details = computed(() => {
  return gameEventDetails(props.gameEvent)
})

interface QTreeNode {
  label: string,
  children?: QTreeNode[]
}

function treeChildren(object: { [key: string]: any }): QTreeNode[] {
  const nodes = []
  const keys = Object.keys(object)
  for (const key of keys) {
    const detail = object[key];
    if (detail !== undefined) {
      if (typeof detail === 'object') {
        nodes.push({
          label: key,
          children: treeChildren(detail)
        })
      } else {
        nodes.push({
          label: `${key}: ${detail}`
        })
      }
    }
  }
  return nodes
}

const nodes = treeChildren(details.value)

</script>

<template>
  <q-card v-if="nodes.length > 0">
    <q-card-section>
      <q-tree
        :nodes="nodes"
        node-key="label"
        no-connectors
        default-expand-all
        dense
      />
    </q-card-section>
  </q-card>
</template>
