import axios from 'axios';
import { getAccessToken } from './auth';

// ...existing code...

export async function fetchOrders() {
    const accessToken = await getAccessToken();
    try {
        const response = await axios.get(process.env.API_URL, {
            headers: {
                'x-amz-access-token': accessToken
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching orders:', error.response ? error.response.data : error.message);
        throw error;
    }
}

// ...existing code...
