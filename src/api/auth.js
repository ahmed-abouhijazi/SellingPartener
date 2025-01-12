import axios from 'axios';

const client_id = process.env.VUE_APP_AH;
const client_secret = process.env.VUE_APP_ET;
const refresh_token = process.env.VUE_APP_REFRESH_TOKEN;

export async function getAccessToken() {
    console.log('Getting access token...', client_id, client_secret, refresh_token);
    const url = 'https://api.amazon.com/auth/o2/token';
    const data = new URLSearchParams({
        grant_type: 'refresh_token',
        client_id:'amzn1.application-oa2-client.e5d13cdca3744bfe93b49885bdff85b2',
        client_secret:'amzn1.oa2-cs.v1.6009e15710548ab40c615da192ed7c2a0fdeba7088ecaafec25333caa78514b5',
        refresh_token:'Atzr|IwEBIBkf-8K5x1f617uW8ow-4f9tRXcAM__iuRUXADI6qVbtIJ3SjzoJBWuNenfjCAaWucQ_dZiyW8rZORW4dkVkA-jFvRckCZDC-ynXcrAKm7xWU2qrOIYWHnC-aUwV12srxoCnQqYHLlBUBRzqWsE4JEy1zU-cO_dEgWCMqt2w3LwbBVl6-4LonR7WCCxAPZAXTcgAhFfS7Fk7PiUYF7fPojFCIJ3dco2z1AQs61Y11dFbOTckw3n_DPd3PCFEExgwdyFeh314ox3LlD7jpvJb_zHiW1h58G9TItLUdvoH60v2UKhekQiQ6ITTswRqZy5fG33KEpq3aRxRBStpVrxlIL0yLLGh5Fg6t5XJKLi-krdEdQ'
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
