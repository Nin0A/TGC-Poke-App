<script>

import '../assets/css/STYLE_PokemonListView.css';

export default {
  data() {
    return {
      pokemon_list : [],
      pokemon_to_fetch : []

    }
  },
  methods: {
    async fetchPokemons(url) {


      console.log(url);
      const response = await fetch(url);

      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
      }

      const pokemons = await response.json();

      this.pokemon_to_fetch = [];
      this.pokemon_list = [];
      this.pokemon_to_fetch = pokemons || [];
      this.pokemon_to_fetch.results.forEach((element) =>       this.fetchSinglePokemon(element.url)      );
    },

    async fetchSinglePokemon(url) {
      const response = await fetch(url);

      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
      }

      const pokemon = await response.json();
      console.log(pokemon);
     return this.pokemon_list.push(pokemon);
    },
     getWeightAndHeight(w) {
    return w/10;

  },
},
computed() {



},
mounted() {
    this.fetchPokemons('https://pokeapi.co/api/v2/pokemon?limit=40');
  },
}

</script>

<template>
  <div class="card-container">

    <div v-for="pokemon in this.pokemon_list" :key="pokemon">
      <router-link :to="{ name: 'pokemon-item', params: { id: pokemon.id }}">

      <div class="pokemon-card">
        <img class="pokemon-img" :src="pokemon.sprites.other.dream_world.front_default" :alt="pokemon.name">
        <h2 class="pokemon-id"> #{{ pokemon.id }} </h2>
        <div class="types">
          <p
          v-for="type in pokemon.types"
          :key="type.slot"
          :class="`type-${type.type.name}`"
        >
        {{ type.type.name }}</p>
        </div>




        <div class="pokemon-name">

          <h1 > {{ pokemon.name }} </h1>

        </div>


      </div>
    </router-link>

    </div>

      <div class="pagination">
        <button @click=fetchPokemons(this.pokemon_to_fetch.previous) >Previous</button>
        <button @click=fetchPokemons(this.pokemon_to_fetch.next) >Next</button>
      </div>
  </div>
</template>
