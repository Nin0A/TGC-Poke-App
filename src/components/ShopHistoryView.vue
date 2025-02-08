<script>
import { useRoute } from 'vue-router';
import { computed, watchEffect, ref } from 'vue';
import { useCartStore } from '@/stores/cartStore';
import '../assets/css/STYLE_ShopHistoryView.css';

export default {
  setup() {
    const cartStore = useCartStore();
    const route = useRoute(); // Récupérer la route actuelle pour obtenir le paramètre de l'URL
    const purchaseSuccess = ref(false); // Variable pour contrôler l'affichage de la pop-up

    // Assurer la synchronisation avec localStorage au chargement
    watchEffect(() => {
      if (cartStore.orderHistory.length === 0) {
        const storedHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
        cartStore.orderHistory = storedHistory;
      }
    });

    // Vérifier si le statut est 'success' dans l'URL
    const orderStatus = computed(() => route.query.status === 'success' ? 'Commande réussie !' : '');

    // Vérifier si un achat a été effectué juste avant cette page (utilisation de localStorage)
    if (localStorage.getItem('purchaseSuccess') === 'true') {
      purchaseSuccess.value = true;
      localStorage.removeItem('purchaseSuccess'); // Supprimer l'indicateur après avoir affiché
    }

    return {
      orderHistory: computed(() => cartStore.orderHistory),
      orderStatus,
      purchaseSuccess,
    };
  },

  methods: {
    closePopup() {
      this.purchaseSuccess = false;
    },
  },
};
</script>

<template>
  <div class="order-history">
    <!-- Afficher la notification si le statut de la commande est 'success' -->
    <div v-if="orderStatus" class="notification success">
      {{ orderStatus }}
    </div>

    <!-- Pop-up de confirmation d'achat -->
    <div v-if="purchaseSuccess" class="popup">
      <div class="popup-content">
        <p>Your purchase has been confirmed!</p>
        <button @click="closePopup">Close</button>
      </div>
    </div>

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

<style scoped>
.order-history {
  font-family: "Montserrat", serif;
  font-optical-sizing: auto;
  font-weight: normal;
  font-style: normal;
  background-color: white;
  border-radius: 32px;
  text-align: center;
  padding: 20px;
}

/* Style pour la notification */
.notification {
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 8px;
  font-weight: bold;
  color: white;
  background-color: #28a745; /* Vert pour le succès */
}

.success {
  background-color: #28a745;
}

/* Style de la pop-up de confirmation */
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  font-size: 18px;
}

.popup button {
  background-color: #28a745;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  margin-top: 10px;
}
</style>
