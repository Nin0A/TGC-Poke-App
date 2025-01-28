<script>
import '../assets/css/STYLE_PokemonListView.css';

export default {
  data() {
    return {
      pokemon_list: [],  // Liste des Pokémon filtrés pour affichage
      all_pokemons: [],  // Liste complète des Pokémons récupérés de l'API
      next_url: null,    // URL de la page suivante
      previous_url: null, // URL de la page précédente
      totalPages: 0,      // Nombre total de pages
      currentPage: 1,     // Page actuelle
      limit: 40,          // Nombre de Pokémon par page
      searchQuery: '',    // Requête de recherche
      selectedType: '',   // Type sélectionné pour le filtre
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
        this.next_url = pokemons.next;  // URL de la page suivante
        this.previous_url = pokemons.previous;  // URL de la page précédente

        // Calculer le nombre total de pages
        this.totalPages = Math.ceil(pokemons.count / this.limit);

        // Mettre à jour la liste complète des Pokémons
        const fetchPromises = pokemons.results.map((pokemon) =>
          this.fetchSinglePokemon(pokemon.url)
        );
        const fetchedPokemons = await Promise.all(fetchPromises);
        this.all_pokemons = fetchedPokemons;  // Sauvegarder tous les Pokémons
        this.pokemon_list = this.all_pokemons;  // Initialiser avec tous les Pokémons
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
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
        const pokemons = data.pokemon.map(p => p.pokemon);  // Récupérer uniquement les Pokémon
        this.pokemon_list = await Promise.all(pokemons.map(pokemon => this.fetchSinglePokemon(pokemon.url)));  // Récupérer les informations complètes des Pokémon
      } catch (error) {
        console.error("Error fetching Pokémon by type:", error);
      }
    },

    // Fonction pour appliquer la recherche et le filtre par type
    searchPokemons() {
      let filteredPokemons = this.all_pokemons;  // Filtrage sur la liste complète

      // Filtrer par nom
      if (this.searchQuery.trim() !== '') {
        filteredPokemons = filteredPokemons.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      // Filtrer par type
      if (this.selectedType) {
        filteredPokemons = filteredPokemons.filter((pokemon) =>
          pokemon.types.some(type => type.type.name === this.selectedType)
        );
      }

      this.pokemon_list = filteredPokemons;  // Mettre à jour la liste affichée
    },

    // Fonction de changement de type
    filterByType() {
      if (this.selectedType) {
        this.fetchPokemonsByType(this.selectedType);  // Si un type est sélectionné, récupérer les Pokémon de ce type
      } else {
        this.fetchPokemons('https://pokeapi.co/api/v2/pokemon?limit=40');  // Si aucun type n'est sélectionné, récupérer tous les Pokémon
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
    <!-- Barre de recherche et sélecteur de type -->
    <div class="search-bar">
      <img src="../assets/svg/search.svg" alt="search-icon">
      <input type="search" id="site-search" name="q" placeholder="Search Pokémon" v-model="searchQuery"
        @input="searchPokemons" />

      <select v-model="selectedType" @change="filterByType">
        <option value="">All Types</option>
        <option v-for="(color, type) in typeColors" :key="type" :value="type">{{ type }}</option>
      </select>
    </div>

    <!-- Affichage des cartes Pokémon -->
    <div class="card-container">
      <div v-for="pokemon in pokemon_list" :key="pokemon.id">
        <router-link :to="{ name: 'pokemon-item', params: { id: pokemon.id } }">
          <div class="pokemon-card">
            <img class="pokemon-img" :src="pokemon.sprites.other.dream_world.front_default" :alt="pokemon.name">
            <h2 class="pokemon-id"> #{{ pokemon.id }} </h2>
            <div class="types">
              <p v-for="type in pokemon.types" :key="type.slot" :class="`type-${type.type.name}`">
                {{ type.type.name }}
              </p>
            </div>
            <div class="pokemon-name">
              <h1>{{ pokemon.name }}</h1>
            </div>
          </div>
        </router-link>
      </div>

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
