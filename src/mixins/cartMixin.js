// src/mixins/cartMixin.js
import { useCartStore } from '@/stores/cartStore';

export default {
  computed: {
    // Accéder aux éléments du panier depuis le store Pinia
    cartItems() {
      const cartStore = useCartStore();
      return cartStore.cartItems;
    },
    // Calculer le prix total du panier
    totalPrice() {
      const cartStore = useCartStore();
      return cartStore.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
  },
  methods: {
    // Ajouter une commande à l'historique et vider le panier
    confirmPurchase() {
      const cartStore = useCartStore();
      const cartItems = cartStore.cartItems;

      if (cartItems.length > 0) {
        const order = {
          items: [...cartItems],
          totalPrice: this.totalPrice,
          date: new Date().toLocaleString()
        };

        // Ajouter la commande à l'historique et vider le panier
        cartStore.addToOrderHistory(order);
        cartStore.clearCart();

        // Redirection vers la page de l'historique des commandes
        this.$router.push('/shop-history');
      }
    },
    // Annuler la commande et retourner au panier
    cancelPurchase() {
      this.$router.push('/shop');
    }
  }
};
