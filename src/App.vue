<script>
import '../src/assets/css/STYLE_PokemonHome.css';
import { useCartStore } from '@/stores/cartStore';
export default {
computed: {
    cartItems() {
      const cartStore = useCartStore();
      return cartStore.getTotalQuantity();
    }

  }
}
</script>

<template>
  <div class="home">
    <div class="app-title">
      <div class="logo-title">
        <img class="logo" src="../src/assets/svg/pokeball.svg" alt="">
        <router-link :to="{ name: 'pokemon-list' }">
          <h1>TGC POKE APP</h1>
        </router-link>
      </div>

      <div class="links-section">
      <div class="history-section">
        <router-link :to="{ name: 'shop-history' }">
          <p>Orders history</p>
        </router-link>
      </div>

      <div class="card-section">
        <router-link :to="{ name: 'shop' }">

          <div class="cart-container">
            <p>Cart</p>
            <p class="qty">{{ cartItems }}</p>
          </div>

      </router-link>
      </div>
    </div>
    </div>

    <main>
      <RouterView />
    </main>
  </div>
</template>
