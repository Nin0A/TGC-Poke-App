<script>
import { useCartStore } from '@/stores/cartStore';
import { computed, watchEffect } from 'vue';
import '../assets/css/STYLE_ShopHistoryView.css';


export default {
  setup() {
    const cartStore = useCartStore();

    // Assurer la synchronisation avec localStorage au chargement
    watchEffect(() => {
      if (cartStore.orderHistory.length === 0) {
        const storedHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
        cartStore.orderHistory = storedHistory;
      }
    });

    return {
      orderHistory: computed(() => cartStore.orderHistory)
    };
  }
};
</script>


<template>
  <div class="order-history">
    <h1>Order History</h1>
    <div v-if="orderHistory.length > 0">
      <ul class="order-container">
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
