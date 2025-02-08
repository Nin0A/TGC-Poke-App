<script>
import cartMixin from '@/mixins/cartMixin';

export default {
  mixins: [cartMixin],
};
</script>

<template>
  <div class="shop-confirmation">
    <div v-if="cartItems.length > 0" class="confirmation-details">
      <ul>
        <li v-for="item in cartItems" :key="item.id">
          <p class="item-info">{{ item.name }} (x{{ item.quantity }}) - ${{ item.price * item.quantity }}</p>
        </li>
      </ul>
      <h3 class="total">Total: ${{ totalPrice }}</h3>
      <div class="buttons">
        <button class="confirm-button" @click="confirmPurchase">Confirm Purchase</button>
        <button class="cancel-button" @click="cancelPurchase">Cancel</button>
      </div>
    </div>
    <div v-else>
      <p>Your cart is empty!</p>
    </div>
  </div>
</template>

<style scoped>
.shop-confirmation {
  font-family: "Montserrat", serif;
  font-optical-sizing: auto;
  font-weight: normal;
  font-style: normal;
  background-color: white;
  border-radius: 32px;
  text-align: center;
  padding: 20px;
}

.confirmation-details {
  padding: 20px;
  border-radius: 8px;
  display: inline-block;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin: 10px 0;
}

.buttons {
  margin-top: 20px;
}

.confirm-button, .cancel-button {
  padding: 10px 15px;
  margin: 5px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 16px;
  font-weight: 600;
}

.confirm-button {
  background-color: #28a745;
  color: white;
}

.cancel-button {
  background-color: #dc3545;
  color: white;
}

.total {
  color: black;
}

.item-info {
  text-transform: uppercase;
  font-weight: 600;
}
</style>
