<script>
import '../assets/css/STYLE_PokemonListView.css';
import PokemonCardComponent from './PokemonCardComponent.vue';

export default {
  components: {
    PokemonCardComponent,
  },
  data() {
    return {
      pokemon_list: [],
      all_pokemons: [],
      current_pokemons:[],
      next_url: null,
      previous_url: null,
      totalPages: 0,
      currentPage: 1,
      limit: 40,
      searchQuery: '',
      selectedType: '',
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
    };
  },
  methods: {
    // Fonction pour récupérer tous les Pokémons depuis l'API
    async fetchPokemons(url) {
      console.log("Fetching pokemons from:", url);

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`An error occurred: ${response.status}`);
        }

        const pokemons = await response.json();
        this.next_url = pokemons.next;
        this.previous_url = pokemons.previous;

        // Calculer le nombre total de pages
        this.totalPages = Math.ceil(pokemons.count / this.limit);

        // Mettre à jour la liste complète des Pokémons
        const fetchPromises = pokemons.results.map((pokemon) =>
          this.fetchSinglePokemon(pokemon.url)
        );
        const fetchedPokemons = await Promise.all(fetchPromises);
        this.all_pokemons = fetchedPokemons;
        this.pokemon_list = this.all_pokemons;
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    },

    goToNextPage() {
  if (this.next_url) {
    this.currentPage++;
    this.fetchPokemons(this.next_url);
  }
},

goToPreviousPage() {
  if (this.previous_url) {
    this.currentPage--;
    this.fetchPokemons(this.previous_url);
  }
},

    // Fonction pour récupérer un Pokémon spécifique avec son URL
    async fetchSinglePokemon(url) {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`An error occurred: ${response.status}`);
        }

        const pokemon = await response.json();
        return pokemon;  // Retourne l'objet Pokémon
      } catch (error) {
        console.error("Error fetching single Pokémon:", error);
      }
    },

    // Fonction pour récupérer les Pokémon par type
    async fetchPokemonsByType(type) {
      console.log("Fetching pokemons of type:", type);

      try {
        const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
        if (!response.ok) {
          throw new Error(`An error occurred: ${response.status}`);
        }

        const data = await response.json();
        const pokemons = data.pokemon.map(p => p.pokemon);
        this.pokemon_list = await Promise.all(pokemons.map(pokemon => this.fetchSinglePokemon(pokemon.url)));
      } catch (error) {
        console.error("Error fetching Pokémon by type:", error);
      }
    },

    // Fonction pour appliquer la recherche et le filtre par type
    searchPokemons() {
      console.log('searchpokemon');
      let filteredPokemons = this.all_pokemons;

      console.log(filteredPokemons);
      if (this.searchQuery.trim() !== '') {
        console.log(this.searchQuery);
        filteredPokemons = filteredPokemons.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      if (this.selectedType) {
      console.log(this.selectedType);
        filteredPokemons = filteredPokemons.filter((pokemon) =>
          pokemon.types.some(type => type.type.name === this.selectedType)
        );

      }

      this.pokemon_list = filteredPokemons;

      console.log(this.pokemon_list);
    },

    // Fonction de changement de type
    filterByType() {
      if (this.selectedType) {
        this.fetchPokemonsByType(this.selectedType);
      } else {
        this.fetchPokemons('https://pokeapi.co/api/v2/pokemon?limit=40');
      }
    },
  },
  mounted() {
    // Initialisation avec la première page de Pokémons
    this.fetchPokemons('https://pokeapi.co/api/v2/pokemon?limit=40');
  },
};
</script>




<template>
  <div>

    <div class="search-options">
    <!-- Barre de recherche et sélecteur de type -->
    <div class="search-bar">
      <img src="../assets/svg/search.svg" alt="search-icon">
      <input type="search" id="site-search" name="q" placeholder="Search Pokemon" v-model="searchQuery"
        @input="searchPokemons" />
    </div>

    <select v-model="selectedType" @change="filterByType">
        <option value="">All Types</option>
        <option v-for="(color, type) in typeColors" :key="type" :value="type">{{ type }}</option>
      </select>

    </div>

    <!-- Affichage des cartes Pokémon -->
    <div class="card-container">

      <PokemonCardComponent
        v-for="pokemon in pokemon_list"
        :key="pokemon.id"
        :pokemon="pokemon"
      />


      <!-- Pagination -->
      <div class="pagination">
        <button @click="goToPreviousPage" :disabled="!previous_url">
          Précédent
        </button>
        <span>Page {{ currentPage }} sur {{ totalPages }}</span>
        <button @click="goToNextPage" :disabled="!next_url">
          Suivant
        </button>
      </div>
    </div>
  </div>
</template>
