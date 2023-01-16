<script setup lang="ts">
import {computed, ref} from 'vue'
import MatchStateToolbar from "@/components/MatchStateToolbar.vue";
import ExternalConnectionStatus from "@/components/ExternalConnectionStatus.vue";
import StoreUpdateCountStatus from "@/components/StoreUpdateCountStatus.vue";
import ManualControlView from "@/views/ManualControlView.vue";

const leftDrawerOpen = ref(false)
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
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

        <ExternalConnectionStatus/>
        <StoreUpdateCountStatus class="q-ml-md" v-if="dev"/>
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/" label="Start"/>
        <q-route-tab to="/match" label="Match"/>
        <q-route-tab to="/protocol" label="Protocol"/>
        <q-route-tab to="/manual-control" label="Manual Control"/>
        <q-route-tab to="/place-ball" label="Place Ball"/>
        <q-route-tab to="/game-events" label="Game Events"/>
        <q-route-tab to="/team-settings" label="Team Settings"/>
        <q-route-tab to="/match-settings" label="Match Settings"/>
      </q-tabs>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" bordered>
      <ManualControlView/>
    </q-drawer>

    <q-page-container>
      <div class="q-mt-sm">
        <router-view/>
      </div>
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <MatchStateToolbar/>
    </q-footer>

  </q-layout>
</template>
