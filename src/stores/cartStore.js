import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: [], // Le panier contient les objets ajoutés
  }),
  actions: {
    addToCart(pokemon) {
      this.cart.push(pokemon); // Ajoute le Pokémon au panier
    },

    removeFromCart(pokemonId) {
      // Supprime le Pokémon par son ID
      this.cart = this.cart.filter(item => item.id !== pokemonId);
    },

    incrementQuantity(pokemonId) {
      const item = this.cart.find(item => item.id === pokemonId);
      if (item) item.quantity++;
    },

    decrementQuantity(pokemonId) {
      const item = this.cart.find(item => item.id === pokemonId);
      if (item && item.quantity > 1) item.quantity--;
    },

    clearCart() {
      this.cart = []; // Vide le panier
    },

    setOrderHistory(items) {
      // Sauvegarde l'historique des commandes
      this.orderHistory = items;
    },
  },
});
