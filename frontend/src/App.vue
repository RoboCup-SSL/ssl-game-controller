<script setup lang="ts">
import {computed, ref} from 'vue'
import MatchStateToolbar from "@/components/MatchStateToolbar.vue";
import ExternalConnectionStatus from "@/components/ExternalConnectionStatus.vue";
import StoreUpdateCountStatus from "@/components/StoreUpdateCountStatus.vue";
import ManualControlView from "@/views/ManualControlView.vue";
import ProtocolList from "@/components/protocol/ProtocolList.vue";
import {useQuasar} from "quasar";
import {useUiStateStore} from "@/store/uiState";

const uiStore = useUiStateStore()

const leftDrawerOpen = ref(false)
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
const rightDrawerOpen = ref(false)
const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value
}
const $q = useQuasar()
const darkMode = computed(() => $q.dark.isActive)
const toggleDarkMode = () => {
  $q.dark.toggle()
  uiStore.darkMode = $q.dark.isActive
}

if (uiStore.darkMode !== undefined) {
  $q.dark.set(uiStore.darkMode)
}

let initialDrawerWidth = 0
const resizeDrawer = (ev: any) => {
  if (ev.isFirst === true) {
    initialDrawerWidth = uiStore.rightDrawerWidth
  }
  uiStore.rightDrawerWidth = initialDrawerWidth - ev.offset.x
}

const dev = computed(() => {
  return import.meta.env.DEV
})
</script>

<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer"/>

        <q-toolbar-title>
          <q-avatar>
            <img alt="SSL Logo" class="logo" src="@/assets/logo.jpeg"/>
          </q-avatar>
          SSL-Game-Controller
        </q-toolbar-title>

        <StoreUpdateCountStatus class="q-mx-auto" v-if="dev"/>
        <div class="q-mx-md">
          <ExternalConnectionStatus/>
        </div>
        <q-toggle dense flat round @click="toggleDarkMode" :model-value="darkMode" color="black">Dark</q-toggle>
        <q-btn dense flat round icon="menu" @click="toggleRightDrawer"/>
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/" label="Start"/>
        <q-route-tab to="/match" label="Match"/>
        <q-route-tab to="/protocol" label="Protocol"/>
        <q-route-tab to="/manual-control" label="Commands"/>
        <q-route-tab to="/place-ball" label="Place Ball"/>
        <q-route-tab to="/game-events" label="Game Events"/>
        <q-route-tab to="/team-settings" label="Teams"/>
        <q-route-tab to="/match-settings" label="Settings"/>
      </q-tabs>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" bordered>
      <ManualControlView/>
    </q-drawer>

    <q-drawer v-model="rightDrawerOpen" side="right" bordered :width="uiStore.rightDrawerWidth">
      <div v-touch-pan.preserveCursor.prevent.mouse.horizontal="resizeDrawer" class="q-drawer__resizer"></div>
      <ProtocolList dense/>
    </q-drawer>

    <q-page-container>
      <div class="max-content-width q-mx-auto q-mt-sm">
        <router-view/>
      </div>
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <MatchStateToolbar/>
    </q-footer>

  </q-layout>
</template>

<style>
.q-drawer__resizer {
  position: absolute;
  top: 0;
  bottom: 0;
  left: -2px;
  width: 4px;
  cursor: ew-resize;
}
</style>
