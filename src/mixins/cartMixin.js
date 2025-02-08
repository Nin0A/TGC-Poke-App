// src/mixins/cartMixin.js
import { useCartStore } from '@/stores/cartStore';

export default {
  computed: {
    cartItems() {
      const cartStore = useCartStore();
      return cartStore.cart;
    },
    totalPrice() {
      const cartStore = useCartStore();
      return cartStore.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
  },
  methods: {
    confirmPurchase() {
      const cartStore = useCartStore();
      const cartItems = cartStore.cart;

      if (cartItems.length > 0) {
        const order = {
          items: [...cartItems],
          totalPrice: this.totalPrice,
          date: new Date().toLocaleString()
        };

        cartStore.setOrderHistory(order);
        cartStore.clearCart();

        localStorage.setItem('purchaseSuccess', 'true');

        this.$router.push('/shop-history');
      }
    },
    cancelPurchase() {
      this.$router.push('/shop');
    }
  }
};
