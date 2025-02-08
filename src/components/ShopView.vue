<script>
import { useCartStore } from '@/stores/cartStore';
import '../assets/css/STYLE_ShopView.css';

export default {
  data() {
    return {
      pokemon_list: [],
      next_url: null,
      previous_url: null,
    };
  },
  methods: {
    getWeightAndHeight(w) {
      return w / 10;
    },
    clearCart() {
      const cartStore = useCartStore();
      cartStore.clearCart();
    },
    proceedToCheckout() {
  const cartStore = useCartStore();
  const cartItems = cartStore.cart;

  if (cartItems.length > 0) {
    const order = {
      items: [...cartItems],
      totalPrice: cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
      date: new Date().toLocaleString()
    };

    cartStore.setOrderHistory(order);

    cartStore.clearCart();

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
      cartStore.removeFromCart(itemId);
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
    <!-- Affichage du panier -->
    <div v-if="cartItems.length > 0" class="cart">
      <h2>Your Cart</h2>
      <table class="cart-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Product</th>
            <th>Unit</th>
            <th>Total</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <!-- Liste des articles dans le panier -->
          <tr v-for="item in cartItems" :key="item.id">
            <td>
              <img :src="item.image" :alt="item.name" class="pokemon-img" />
            </td>
            <td>{{ item.name }}</td>
            <td>{{ item.price }}$</td>
            <td>{{ item.price * item.quantity }}$</td>
            <td>
              <span>{{ item.quantity }}</span>
            </td>
            <td>
              <div class="controls">
                <button @click="decrementQuantity(item.id)" :disabled="item.quantity <= 1">
                  <img src="../assets/svg/chevron_left.svg" alt="decrement" />
                </button>
                <button @click="incrementQuantity(item.id)">
                  <img src="../assets/svg/chevron_right.svg" alt="increment" />
                </button>
                <button class="delete-button" @click="removeFromCart(item.id)">
                  <img src="../assets/svg/close.svg" alt="delete" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Affichage du total -->
      <div class="cart-total">

         <!-- Bouton pour procéder à l'achat -->
         <button class="checkout-button" @click="$router.push('/shop-confirmation')">Proceed to Checkout</button>
         <h3>Total: {{ totalPrice }}$</h3>



    </div>
    </div>

    <!-- Si le panier est vide -->
    <div v-else>
      <p>Your cart is empty</p>
    </div>
  </div>
</template>

