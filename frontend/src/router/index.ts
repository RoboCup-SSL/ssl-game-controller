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
      path: '/team-overview',
      name: 'team-overview',
      component: () => import('../views/TeamOverviewView.vue')
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
      path: '/settings',
      name: 'settings',
      component: () => import('../views/SettingsView.vue')
    },
  ]
})

export default router
