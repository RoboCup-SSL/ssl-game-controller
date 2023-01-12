import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
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
      path: '/team-settings',
      name: 'team-settings',
      component: () => import('../views/TeamSettingsView.vue')
    },
    {
      path: '/match-settings',
      name: 'match-settings',
      component: () => import('../views/MatchSettingsView.vue')
    },
  ]
})

export default router
