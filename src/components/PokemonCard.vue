<script>

import '../assets/css/STYLE_PokemonCard.css';

export default {
  props: {
    id: {
      type:String,
      required:true,
    }
  },
  data() {
    return {
      pokemon : Object,
      typeColors: {
        fire: "#F57D31",
        bug: "#A7B723",
        normal: "#AAA67F",
        fighting: "#C12239",
        flying: "#A891EC",
        ground: "#DEC16B",
        poison: "#A43E9E",
        rock: "#B69E31",
        ghost: "#70559B",
        steel: "#B7B9D0",
        water: "#6493EB",
        grass: "#74CB48",
        electric: "#F9CF30",
        psychic: "#FB5584",
        ice: "#9AD6DF",
        dragon: "#7037FF",
        dark: "#75574C",
        fairy: "#E69EAC",
    },

    }
  },
  methods: {

    async fetchPokemon() {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon/'+this.id);

      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
      }

      this.pokemon = await response.json();
      this.updateMainColor(this.pokemon.types[0].type.name);

    },
     getWeightAndHeight(w) {
    return w/10;

  },

  updateMainColor(typeName) {
    // Vérifie si le type existe dans la liste des couleurs
    const color = this.typeColors[typeName];
    if (color) {
      document.documentElement.style.setProperty('--main-color', color); // Met à jour la variable CSS
    } else {
      console.warn(`Type ${typeName} not found in typeColors`);
    }
  },
},

mounted() {
    this.fetchPokemon();
  },
}

</script>

<template>
  <div class="pokemon-item-container">


  <div class="pokemon-item">
    <h1 class="pokemon-name">{{ this.pokemon.name }}</h1>
    <h2 class="pokemon-id">#{{ this.pokemon.id }}</h2>

    <img v-if="this.pokemon.sprites" class="pokemon-img" :src=pokemon.sprites.other.dream_world.front_default :alt=this.pokemon.name>


    <div class="bottom-side">
      <div class="types">
        <p
        v-for="type in this.pokemon.types"
        :key="type.slot"
        :class="`type-${type.type.name}`"
      >
      {{ type.type.name }}</p>
    </div>
    <h1>About</h1>

        <div class="infos">

          <div>
            <p>{{ this.getWeightAndHeight(this.pokemon.weight) }}kg</p>

            <p class="desc">Weight</p>

          </div>

          <div>

            <p>{{ this.getWeightAndHeight(this.pokemon.height) }}m</p>

            <p class="desc">Height</p>

          </div>


          <div class="abilities">
          <p
          v-for="ability in this.pokemon.abilities"
          :key="ability.slot">
        {{ ability.ability.name }}</p>
        <p class="desc">Moves</p>

        </div>
        </div>


        <h1>Base Stats</h1>

        <div class="stats">
          <div
          v-for="stat in this.pokemon.stats"
          :key="stat.slot">
            <div class="stat-item">
              <p>{{ stat.stat.name }}</p><progress class="custom-progress" :value="stat.base_stat" max="100"></progress>
            </div>
          </div>
        </div>
      </div>
      </div>


      <div class="pokemon-purchase">
        <h1>Price: {{ this.pokemon.base_experience }}$</h1>
        <button>Buy</button>

      </div>

  </div>
</template>
