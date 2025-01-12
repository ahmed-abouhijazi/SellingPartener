import axios from 'axios';
import { getAccessToken } from '../api/auth';

const API_BASE_URL = 'https://sellingpartnerapi-eu.amazon.com';

export const fetchOrders = async () => {
  const token = await getAccessToken();
  try {
    const response = await axios.get(`${API_BASE_URL}/orders/v0/orders`, {
      headers: {
        'x-amz-access-token': token,
      },
    });
    return response.data.orders;
  } catch (error) {
    console.error('Error fetching orders:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const updateOrderStatus = async (orderId) => {
  const token = await getAccessToken();
  try {
    const response = await axios.patch(`${API_BASE_URL}/orders/v0/orders/${orderId}/status`, {
      status: 'Sended',
    }, {
      headers: {
        'x-amz-access-token': token,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating order status:', error.response ? error.response.data : error.message);
    throw error;
  }
};
