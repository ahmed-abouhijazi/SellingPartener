import axios from 'axios';

const client_id = process.env.VUE_APP_AH;
const client_secret = process.env.VUE_APP_ET;
const refresh_token = process.env.VUE_APP_REFRESH_TOKEN;

export async function getAccessToken() {
    console.log('Getting access token...', client_id, client_secret, refresh_token);
    const url = 'https://api.amazon.com/auth/o2/token';
    const data = new URLSearchParams({
        grant_type: 'refresh_token',
        client_id,
        client_secret,
        refresh_token
    });

    try {
        const response = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return response.data.access_token;
    } catch (error) {
        console.error('Error fetching access token:', error.response ? error.response.data : error.message);
        throw error;
    }
}
