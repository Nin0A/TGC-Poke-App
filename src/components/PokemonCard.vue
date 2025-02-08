<script>
import '../assets/css/STYLE_PokemonCard.css';
import { useCartStore } from '@/stores/cartStore';

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      pokemon: null,
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
    async fetchPokemon() {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + this.id);
      if (!response.ok) {
        const message = `An error has occurred: ${response.status}`;
        throw new Error(message);
      }
      this.pokemon = await response.json();
      this.updateMainColor(this.pokemon.types[0].type.name);
    },

    updateMainColor(typeName) {
      const color = this.typeColors[typeName];
      if (color) {
        document.documentElement.style.setProperty('--main-color', color);
      } else {
        console.warn(`Type ${typeName} not found in typeColors`);
      }
    },

    // Fonction pour ajouter un Pokémon au panier
    addToCart() {
      const cartStore = useCartStore();
      const existingItem = cartStore.cart.find(item => item.id === this.pokemon.id);

      if (existingItem) {
        cartStore.incrementQuantity(this.pokemon.id);
      } else {
        cartStore.addToCart({
          id: this.pokemon.id,
          name: this.pokemon.name,
          price: this.pokemon.base_experience,
          image: this.pokemon.sprites.other.dream_world.front_default,
          quantity: 1,
        });
      }
    },

    // Fonction pour retirer un Pokémon du panier
    removeFromCart() {
      const cartStore = useCartStore();
      cartStore.removeFromCart(this.pokemon.id);
    },

    incrementQuantity() {
      const cartStore = useCartStore();
      cartStore.incrementQuantity(this.pokemon.id);
    },

    decrementQuantity() {
      const cartStore = useCartStore();
      cartStore.decrementQuantity(this.pokemon.id);
    },
    getWeightAndHeight(w) {
      return w / 10;
    },
  },

  computed: {
    cartItem() {
      const cartStore = useCartStore();
      return cartStore.cart.find(item => item.id === this.pokemon?.id);
    },
  },
  mounted() {
    this.fetchPokemon();
  },
};
</script>

<template>
  <div class="pokemon-item-container">
    <div class="pokemon-item">
      <h1 class="pokemon-name">{{ this.pokemon?.name }}</h1>
      <h2 class="pokemon-id">#{{ this.pokemon?.id }}</h2>

      <img v-if="this.pokemon?.sprites" class="pokemon-img" :src="pokemon.sprites.other.dream_world.front_default"
        :alt="this.pokemon.name" />

      <div class="bottom-side">
        <div class="types">
          <p v-for="type in this.pokemon?.types" :key="type.slot" :class="`type-${type.type.name}`">
            {{ type.type.name }}
          </p>
        </div>
        <h1>About</h1>

        <div class="infos">
          <div>
            <p>{{ this.getWeightAndHeight(this.pokemon?.weight) }}kg</p>
            <p class="desc">Weight</p>
          </div>

          <div>
            <p>{{ this.getWeightAndHeight(this.pokemon?.height) }}m</p>
            <p class="desc">Height</p>
          </div>

          <div class="abilities">
            <p v-for="ability in this.pokemon?.abilities" :key="ability.slot">
              {{ ability.ability.name }}
            </p>
            <p class="desc">Moves</p>
          </div>
        </div>

        <h1>Base Stats</h1>

        <div class="stats">
          <div v-for="stat in this.pokemon?.stats" :key="stat.stat.name">
            <div class="stat-item">
              <p class="stat-name">{{ stat.stat.name }}</p>
              <p>{{ stat.base_stat }}</p>
              <progress class="custom-progress" :value="stat.base_stat" max="100"></progress>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Section d'achat -->
    <div class="pokemon-purchase">
      <h1 class="price">Price: {{ this.pokemon?.base_experience }}$</h1>

      <!-- Si le Pokémon est dans le panier, afficher la gestion de la quantité et le bouton "Remove" -->
      <div v-if="cartItem">
        <div class="quantity-controls">
          <button @click="decrementQuantity" :disabled="cartItem.quantity <= 0">-</button>
          <span class="display-qty">Quantity: {{ cartItem.quantity }}</span>
          <button @click="incrementQuantity">+</button>
        </div>
        <!-- Bouton pour retirer le Pokémon du panier -->
        <button class="remove-button" @click="removeFromCart">Remove from cart</button>
        <router-link :to="{ name: 'shop' }">

        <div class="cart-container-link">
          <p>Go to Cart</p>
        </div>

        </router-link>
      </div>

      <!-- Si le Pokémon n'est pas dans le panier, afficher le bouton "Buy" -->
      <div v-else>
        <button class="buy-button-card" @click="addToCart">Buy</button>
      </div>
    </div>

  </div>
</template>
