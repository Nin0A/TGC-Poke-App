import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: [],
    orderHistory: JSON.parse(localStorage.getItem('orderHistory')) || [] // Charger depuis localStorage
  }),
  actions: {
    addToCart(pokemon) {
      this.cart.push(pokemon);
    },

    removeFromCart(pokemonId) {
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
      this.cart = [];
    },

    setOrderHistory(order) {
      this.orderHistory.push(order);
      localStorage.setItem('orderHistory', JSON.stringify(this.orderHistory)); // Sauvegarde dans localStorage
    },

    getTotalQuantity() {
      return this.cart.reduce((total, item) => total + (item.quantity || 1), 0);
    }

  }
});
