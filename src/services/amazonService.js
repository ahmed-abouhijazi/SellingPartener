import axios from 'axios';
import { getAccessToken } from '../api/auth';

const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
const API_BASE_URL = 'https://sellingpartnerapi-eu.amazon.com';

export const fetchOrders = async (marketplaceId, createdAfter, createdBefore) => {
  const token = await getAccessToken();
  try {
    const response = await axios.get(`${PROXY_URL}${API_BASE_URL}/orders/v0/orders`, {
      params: {
        MarketplaceIds: marketplaceId,
        CreatedAfter: createdAfter,
        CreatedBefore: createdBefore,
      },
      headers: {
        'x-amz-access-token': token,
      },
    });
    return response.data.payload.Orders; // Return the Orders array from the payload
  } catch (error) {
    console.error('Error fetching orders:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const updateOrderStatus = async (orderId, marketplaceId) => {
  const token = await getAccessToken();
  try {
    const response = await axios.patch(`${PROXY_URL}${API_BASE_URL}/orders/v0/orders/${orderId}/shipment`, {
      marketplaceId: marketplaceId,
      shipmentStatus: 'Sended',
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
