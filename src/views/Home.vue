<template>
  <div class="home">
    <h1 class="title"></h1>
    <p class="description"></p>
    <div class="filters">
      <div class="filter-item">
        <label for="marketplace">Select Marketplace:</label>
        <select v-model="marketplaceId" id="marketplace" class="select">
          <option value="A28R8C7NBKEWEA">Ireland</option>
          <option value="A1RKKUPIHCS9HS">Spain</option>
          <option value="A1F83G8C2ARO7P">United Kingdom</option>
          <option value="A13V1IB3VIYZZH">France</option>
          <option value="AMEN7PMS3EDWL">Belgium</option>
          <option value="A1805IZSGTT6HS">Netherlands</option>
          <option value="A1PA6795UKMFR9">Germany</option>
          <option value="APJ6JRA9NG5V4">Italy</option>
          <option value="A2NODRKZP88ZB9">Sweden</option>
          <option value="AE08WJ6YKNBMC">South Africa</option>
          <option value="A1C3SOZRARQ6R3">Poland</option>
          <option value="ARBP9OOSHTCHU">Egypt</option>
          <option value="A33AVAJ2PDY3EV">Turkey</option>
          <option value="A17E79C6D8DWNP">Saudi Arabia</option>
          <option value="A2VIGQ35RCS4UG">United Arab Emirates</option>
          <option value="A21TJRUUN4KGV">India</option>
        </select>
      </div>
      <div class="filter-item">
        <label for="createdAfter">Created After:</label>
        <input type="datetime-local" v-model="createdAfter" id="createdAfter" class="input">
      </div>
      <div class="filter-item">
        <label for="createdBefore">Created Before:</label>
        <input type="datetime-local" v-model="createdBefore" id="createdBefore" class="input">
      </div>
      <div class="filter-item">
        <label for="orderStatus">Order Status:</label>
        <select v-model="orderStatus" id="orderStatus" class="select">
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>
      <div class="filter-item">
        <button @click="loadOrders" class="button" :disabled="loading">Load Orders</button>
      </div>
    </div>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="orders.length && !loading" class="orders">
      <h2 class="orders-title"></h2>
      <table class="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Buyer Email</th>
            <th>Order Total</th>
            <th>Order Status</th>
            <th>Purchase Date</th>
            <th>Shipping Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in filteredOrders" :key="order.AmazonOrderId">
            <td>{{ order.AmazonOrderId }}</td>
            <td>{{ order.BuyerInfo.BuyerEmail }}</td>
            <td>{{ order.OrderTotal ? `${order.OrderTotal.Amount} ${order.OrderTotal.CurrencyCode}` : 'N/A' }}</td>
            <td>{{ order.OrderStatus }}</td>
            <td>{{ order.PurchaseDate }}</td>
            <td>
              {{ order.ShippingAddress ? `${order.ShippingAddress.City}, ${order.ShippingAddress.PostalCode}, ${order.ShippingAddress.CountryCode}` : 'N/A' }}
            </td>
            <td><button @click="updateStatus(order.AmazonOrderId)" class="button">Update To Sended</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { fetchOrders, updateOrderStatus } from '@/services/amazonService';
import { useToast } from 'vue-toastification';

export default {
  name: 'Home',
  data() {
    return {
      orders: [],
      marketplaceId: 'A13V1IB3VIYZZH', // Default to France
      createdAfter: '',
      createdBefore: '',
      orderStatus: '',
      loading: false,
      marketplaces: [
        { name: 'Ireland', code: 'A28R8C7NBKEWEA' },
        { name: 'Spain', code: 'A1RKKUPIHCS9HS' },
        { name: 'United Kingdom', code: 'A1F83G8C2ARO7P' },
        { name: 'France', code: 'A13V1IB3VIYZZH' },
        { name: 'Belgium', code: 'AMEN7PMS3EDWL' },
        { name: 'Netherlands', code: 'A1805IZSGTT6HS' },
        { name: 'Germany', code: 'A1PA6795UKMFR9' },
        { name: 'Italy', code: 'APJ6JRA9NG5V4' },
        { name: 'Sweden', code: 'A2NODRKZP88ZB9' },
        { name: 'South Africa', code: 'AE08WJ6YKNBMC' },
        { name: 'Poland', code: 'A1C3SOZRARQ6R3' },
        { name: 'Egypt', code: 'ARBP9OOSHTCHU' },
        { name: 'Turkey', code: 'A33AVAJ2PDY3EV' },
        { name: 'Saudi Arabia', code: 'A17E79C6D8DWNP' },
        { name: 'United Arab Emirates', code: 'A2VIGQ35RCS4UG' },
        { name: 'India', code: 'A21TJRUUN4KGV' }
      ],
      orderStatuses: [
        { name: 'All', code: '' },
        { name: 'Pending', code: 'Pending' },
        { name: 'Shipped', code: 'Shipped' },
        { name: 'Delivered', code: 'Delivered' }
      ]
    };
  },
  computed: {
    sortedOrders() {
      return this.orders.slice().sort((a, b) => new Date(b.PurchaseDate) - new Date(a.PurchaseDate));
    },
    filteredOrders() {
      return this.sortedOrders.filter(order => {
        return this.orderStatus ? order.OrderStatus === this.orderStatus : true;
      });
    },
  },
  methods: {
    async loadOrders() {
      this.loading = true;
      const toast = useToast();
      try {
        const orders = await fetchOrders(this.marketplaceId, this.createdAfter, this.createdBefore);
        console.log('Orders:', JSON.stringify(orders, null, 2));
        this.orders = orders; // Access the Orders array from the payload
        toast.success('Orders loaded successfully');
      } catch (error) {
        console.error('Error loading orders:', error);
        const errorMessage = (error.response && error.response.data && error.response.data.errors && error.response.data.errors[0] && error.response.data.errors[0].message) || 'Error loading orders';
        toast.error(errorMessage);
      } finally {
        this.loading = false;
      }
    },
    async updateStatus(orderId) {
      const toast = useToast();
      try {
        await updateOrderStatus(orderId, this.marketplaceId);
        toast.success('Order status updated successfully');
      } catch (error) {
        console.error('Error updating order status:', error);
        const errorMessage = (error.response && error.response.data && error.response.data.errors && error.response.data.errors[0] && error.response.data.errors[0].message) || 'Error updating order status';
        toast.error(errorMessage);
      }
    },
  },
};
</script>

<style>
.home {
  text-align: center;
  margin-top: 20px;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  margin-bottom: 20px;
}

.filter-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px; /* Add spacing between filter items */
}

.select, .input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-top: 5px;
  width: 100%;
}

.button {
  background-color: #38a169;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
}

.button:disabled {
  background-color: #a5d6a7;
  cursor: not-allowed;
}

.button:hover:enabled {
  background-color: #2f855a;
}

.loading {
  margin-top: 20px;
  font-size: 18px;
  color: #38a169;
}

.orders {
  margin-top: 20px;
}

.orders-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.orders-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.orders-table th, .orders-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

.orders-table th {
  background-color: #f2f2f2;
}

.orders-table td {
  background-color: #fff;
}

.orders-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.orders-table tr:hover {
  background-color: #f1f1f1;
}

.orders-table .button {
  background-color: #3182ce;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.orders-table .button:hover {
  background-color: #2b6cb0;
}
</style>
