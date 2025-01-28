<script>
import '../src/assets/css/STYLE_PokemonHome.css';


</script>

<template>
  <div class="home">
    <div class="app-title">
      <div class="logo-title">
        <img class="logo" src="../src/assets/svg/pokeball.svg" alt="">
        <router-link :to="{ name: 'pokemon-list'}">
          <h1>TGC POKE APP</h1>
        </router-link>
      </div>

      <div class="seach-bar">
        <img src="../src/assets/svg/search.svg" alt="">
        <input type="search" id="site-search" name="q" placeholder="Search" />
      </div>
    </div>

    <main>
      <RouterView />
    </main>
  </div>
</template>
