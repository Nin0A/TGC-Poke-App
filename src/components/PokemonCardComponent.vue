
<script>
import '../assets/css/STYLE_PokemonListView.css';

export default {
  props: {
    pokemon: {
      type: Object,
      required: true,
    },
  },
};
</script>

<template>
  <router-link :to="{ name: 'pokemon-item', params: { id: pokemon.id } }">
    <div class="pokemon-card" v-hover-highlight>
      <img
        class="pokemon-img"
        :src="pokemon.sprites.other.dream_world.front_default"
        :alt="pokemon.name"
      />
      <h2 class="pokemon-id">#{{ pokemon.id }}</h2>
      <div class="types">
        <p
          v-for="(type, index) in pokemon.types"
          :key="index"
          :class="`type-${type.type.name}`"
        >
          {{ type.type.name }}
        </p>
      </div>
      <div class="pokemon-name">
        <h1>{{ pokemon.name }}</h1>
      </div>
    </div>
  </router-link>
</template>
