import { createWebHistory, createRouter } from 'vue-router'

import PokemonListView from '@/components/PokemonListView.vue'
import PokemonCard from '@/components/PokemonCard.vue'
import ShopView from '@/components/ShopView.vue'
import ShopHistoryView from '@/components/ShopHistoryView.vue'
import ShopConfirmationView from '@/components/ShopConfirmationView.vue'


const routes = [
  {
    path: '/',
    component: PokemonListView,
    name: 'pokemon-list',
  },
  {
    path: '/pokemon-item/:id',
    component: PokemonCard,
    name: 'pokemon-item',
    props: true
  },
  {
    path: '/shop',
    component: ShopView,
    name: 'shop',
  },
  {
    path: '/shop-history',
    component: ShopHistoryView,
    name: 'shop-history',

  },

  {
    path: '/shop-confirmation',
    component: ShopConfirmationView,
    name: 'shop-confirmation',

  }

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
