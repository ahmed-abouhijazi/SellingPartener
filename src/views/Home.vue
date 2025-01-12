<template>
  <div class="home">
    <h1>Welcome to the Home Page</h1>
    <p>This is the main page of our application.</p>
    <button @click="loadOrders">Load Orders</button>
    <div v-if="orders.length">
      <h2>Orders</h2>
      <ul>
        <li v-for="order in orders" :key="order.AmazonOrderId">
          <p>Order ID: {{ order.AmazonOrderId }}</p>
          <p>Buyer Email: {{ order.BuyerInfo.BuyerEmail }}</p>
          <p>Order Total: {{ order.OrderTotal.Amount }} {{ order.OrderTotal.CurrencyCode }}</p>
          <p>Order Status: {{ order.OrderStatus }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { fetchOrders } from '@/services/amazonService';

export default {
  name: 'Home',
  data() {
    return {
      orders: [],
    };
  },
  methods: {
    async loadOrders() {
      try {
        const response = await fetchOrders();
        this.orders = response.payload.Orders;
      } catch (error) {
        console.error('Error loading orders:', error);
      }
    },
  },
};
</script>

<style scoped>
.home {
  text-align: center;
  margin-top: 20px;
}
</style>
