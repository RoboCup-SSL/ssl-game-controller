<script setup lang="ts">
import {computed, inject} from 'vue'
import type {GamepadController} from "@/providers/gamepadController";
import {GAMEPAD_BUTTON_ACTIONS, GAMEPAD_BUTTON_LABELS} from "@/providers/gamepadController";

const gamepadController = inject<GamepadController>('gamepad-controller')!

const connected = computed(() => gamepadController.state.connected)
const gamepadId = computed(() => {
  // Shorten the raw gamepad id for display
  const id = gamepadController.state.gamepadId
  if (!id) return ''
  // Try to extract a human-friendly name from strings like:
  // "DualSense Wireless Controller (STANDARD GAMEPAD Vendor: 054c Product: 0ce6)"
  const parenIdx = id.indexOf('(')
  return parenIdx > 0 ? id.slice(0, parenIdx).trim() : id
})

const activeButton = computed(() => gamepadController.state.activeButton)
const activeButtonLabel = computed(() => {
  const b = activeButton.value
  if (b === null) return null
  return GAMEPAD_BUTTON_LABELS[b] ?? `Button ${b}`
})
const activeActionLabel = computed(() => {
  const b = activeButton.value
  if (b === null) return null
  return GAMEPAD_BUTTON_ACTIONS[b] ?? null
})

// Gamepad reference button layout for the tooltip
const buttonMap = Object.entries(GAMEPAD_BUTTON_LABELS)
  .filter(([idx]) => GAMEPAD_BUTTON_ACTIONS[Number(idx)] !== undefined)
  .map(([idx, label]) => ({
    button: label,
    action: GAMEPAD_BUTTON_ACTIONS[Number(idx)],
  }))
</script>

<template>
  <!-- Gamepad icon shown in the toolbar -->
  <q-btn
    dense flat round
    :icon="connected ? 'sports_esports' : 'videogame_asset_off'"
    :color="connected ? 'white' : 'grey-5'"
  >
    <!-- Active button flash badge -->
    <q-badge v-if="activeButton !== null" floating color="amber" text-color="black">
      {{ activeButtonLabel }}
    </q-badge>

    <!-- Clickable menu with full button map (stays open until click outside) -->
    <q-menu anchor="bottom right" self="top right" :offset="[0, 8]" max-width="360px" class="bg-dark text-white q-pa-sm">
      <div class="text-subtitle2 q-mb-xs">
        <q-icon name="sports_esports" class="q-mr-xs"/>
        Gamepad Controls
      </div>

      <div v-if="!connected" class="text-caption text-grey-4">
        Connect a PS5 DualSense or compatible gamepad to use physical controls.
      </div>

      <template v-else>
        <div class="text-caption text-grey-3 q-mb-sm">{{ gamepadId }}</div>

        <q-markup-table dense flat dark class="gamepad-table">
          <thead>
          <tr>
            <th class="text-left">Button</th>
            <th class="text-left">Action</th>
          </tr>
          </thead>
          <tbody>
          <tr
            v-for="entry in buttonMap"
            :key="entry.button"
            :class="{'text-amber': activeButtonLabel === entry.button}"
          >
            <td>
              <q-chip dense size="sm" color="grey-8" text-color="white">{{ entry.button }}</q-chip>
            </td>
            <td class="text-caption">{{ entry.action }}</td>
          </tr>
          </tbody>
        </q-markup-table>
      </template>
    </q-menu>
  </q-btn>

  <!-- Live action indicator when a button is pressed -->
  <transition name="fade">
    <q-chip
      v-if="activeButton !== null && activeActionLabel"
      dense
      color="amber"
      text-color="black"
      icon="sports_esports"
      class="q-mx-xs"
    >
      {{ activeActionLabel }}
    </q-chip>
  </transition>
</template>

<style scoped>
.gamepad-table {
  min-width: 280px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
