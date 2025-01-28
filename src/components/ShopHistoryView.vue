<template>
  <div class="order-history">
    <h1>Order History</h1>
    <div v-if="orderHistory.length > 0">
      <ul>
        <li v-for="(order, index) in orderHistory" :key="index" class="order-item">
          <div>
            <h3>Order #{{ index + 1 }}</h3>
            <ul>
              <li v-for="(item, i) in order.items" :key="i">
                <p>{{ item.name }} (x{{ item.quantity }}) - ${{ item.price * item.quantity }}</p>
              </li>
            </ul>
            <p>Total: ${{ order.totalPrice }}</p>
          </div>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>No orders yet!</p>
    </div>
  </div>
</template>

<script>
import { useCartStore } from '@/stores/cartStore'; // Store Pinia

export default {
  computed: {
    orderHistory() {
      const cartStore = useCartStore();
      // Vérification de l'historique dans le store
      console.log("Order History in Store:", cartStore.orderHistory);

      // Si l'historique est vide, tenter de récupérer à partir du localStorage
      if (cartStore.orderHistory.length === 0) {
        const storedHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
        console.log("Order History from localStorage:", storedHistory);
        return storedHistory;
      }

      return cartStore.orderHistory;
    }
  }
};
</script>
