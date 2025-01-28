<script>
import '../src/assets/css/STYLE_PokemonHome.css';


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

      <div class="card-section">
        <router-link :to="{ name: 'shop' }">

          <img class="logo" src="../src/assets/svg/Basket_alt_3_light.svg" alt="">
        </router-link>
      </div>
    </div>

    <main>
      <RouterView />
    </main>
  </div>
</template>
