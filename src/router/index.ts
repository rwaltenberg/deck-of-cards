import VueRouter, { RouteConfig } from 'vue-router'

import Create from '../views/Create.vue'
import Vue from 'vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: { name: 'Create' }
  },
  {
    path: '/deck/new',
    name: 'Create',
    meta: {
      title: 'CARDS'
    },
    component: Create
  },
  {
    path: '/deck/:id',
    name: 'Deck',
    meta: {
      title: 'Ordered Pile'
    },
    component: () => import(/* webpackChunkName: "deck" */ '../views/Deck.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
