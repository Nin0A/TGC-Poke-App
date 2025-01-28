<script>
import { useCartStore } from '@/stores/cartStore';

export default {
  data() {
    return {
      pokemon_list: [], // Liste des pokémons
      next_url: null,
      previous_url: null,
    };
  },
  methods: {
    getWeightAndHeight(w) {
      return w / 10; // Conversion du poids en kilogrammes
    },
    clearCart() {
      const cartStore = useCartStore();
      cartStore.clearCart();
    },
    proceedToCheckout() {
      const cartStore = useCartStore();
      const cartItems = cartStore.cart;

      if (cartItems.length > 0) {
        // Enregistrer l'historique des achats dans le store
        cartStore.setOrderHistory(cartItems);

        // Vider le panier
        cartStore.clearCart();

        // Rediriger vers la page de l'historique des commandes
        this.$router.push('/shop-history');
      }
    },
    // Méthodes pour augmenter et diminuer la quantité
    incrementQuantity(itemId) {
      const cartStore = useCartStore();
      cartStore.incrementQuantity(itemId);
    },
    decrementQuantity(itemId) {
      const cartStore = useCartStore();
      cartStore.decrementQuantity(itemId);
    },
    // Méthode pour supprimer un article du panier
    removeFromCart(itemId) {
      const cartStore = useCartStore();
      cartStore.removeFromCart(itemId); // Cette fonction devra être dans ton cartStore
    }
  },

  computed: {
    cartItems() {
      const cartStore = useCartStore();
      return cartStore.cart;
    },
    totalPrice() {
      const cartStore = useCartStore();
      return cartStore.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
  }
};
</script>
<template>
  <div class="shop-container">
    <h1>Shop</h1>

    <!-- Affichage du panier -->
    <div v-if="cartItems.length > 0" class="cart">
      <h2>Your Cart</h2>
      <ul>
        <!-- Liste des articles dans le panier -->
        <li v-for="item in cartItems" :key="item.id" class="cart-item">
          <img :src="item.image" :alt="item.name" class="pokemon-img" />
          <div>
            <h3>{{ item.name }} (x{{ item.quantity }})</h3>
            <p>Price: {{ item.price }}$</p>
            <p>Total: {{ item.price * item.quantity }}$</p>

            <!-- Boutons pour modifier la quantité -->
            <div class="quantity-controls">
              <button @click="decrementQuantity(item.id)" :disabled="item.quantity <= 1">-</button>
              <span>{{ item.quantity }}</span>
              <button @click="incrementQuantity(item.id)">+</button>
            </div>

            <!-- Bouton pour supprimer l'article du panier -->
            <button @click="removeFromCart(item.id)">Remove</button>
          </div>
        </li>
      </ul>

      <!-- Affichage du total -->
      <div class="cart-total">
        <h3>Total: {{ totalPrice }}$</h3>
      </div>

      <!-- Bouton pour procéder à l'achat -->
      <button @click="proceedToCheckout">Proceed to Checkout</button>
    </div>

    <!-- Si le panier est vide -->
    <div v-else>
      <p>Your cart is empty</p>
    </div>

    <!-- Affichage de la liste des Pokémons -->
    <div class="pokemon-list">
      <h2>Pokémon List</h2>
      <ul>
        <li v-for="pokemon in pokemon_list" :key="pokemon.id">
          <h3>{{ pokemon.name }}</h3>
          <img :src="pokemon.sprites?.other?.dream_world?.front_default" alt="pokemon.name" />
          <p>{{ pokemon.base_experience }}$</p>
        </li>
      </ul>
    </div>
  </div>
</template>
