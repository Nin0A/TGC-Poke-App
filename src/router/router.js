import { createWebHistory, createRouter } from 'vue-router'

import PokemonListView from '@/components/PokemonListView.vue'
import PokemonCard from '@/components/PokemonCard.vue'

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
    props:true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
