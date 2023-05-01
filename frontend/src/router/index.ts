import {createRouter, createWebHashHistory} from 'vue-router'
import StartView from '../views/StartView.vue'
import FullStateView from "@/views/FullStateView.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'start',
      component: StartView
    },
    {
      path: '/match',
      name: 'match',
      component: () => import('../views/MatchView.vue')
    },
    {
      path: '/protocol',
      name: 'protocol',
      component: () => import('../views/ProtocolView.vue')
    },
    {
      path: '/manual-control',
      name: 'manual-control',
      component: () => import('../views/ManualControlView.vue')
    },
    {
      path: '/place-ball',
      name: 'place-ball',
      component: () => import('../views/PlaceBallView.vue')
    },
    {
      path: '/game-events',
      name: 'game-events',
      component: () => import('../views/NewGameEventView.vue')
    },
    {
      path: '/team-settings',
      name: 'team-settings',
      component: () => import('../views/TeamSettingsView.vue')
    },
    {
      path: '/team-settings/:team/details',
      name: 'team-settings-details',
      component: () => import('../views/TeamDetailsView.vue')
    },
    {
      path: '/match-settings',
      name: 'match-settings',
      component: () => import('../views/MatchSettingsView.vue')
    },
    {
      path: '/full-state',
      name: 'full-state',
      component: FullStateView
    },
  ]
})

export default router
