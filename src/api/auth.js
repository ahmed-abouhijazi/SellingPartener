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
        client_secret:'amzn1.oa2-cs.v1.c41a7bb734c4c73bd758ebd14476f489f82f51d37df48d9e901cfd552f90505c',
        refresh_token:'Atzr|IwEBIL-9QlGtBwfkiQ_cS47iSHpDPMrFvZZsgjG_AZG-tD8ef7CCeCSAlqixGsE8gJQbvDYB6k4ExleLXiWMGXstg4XqXDgZMeNiJrcQJgyN_1Elifud9FJf-yXoYa7RhougDr0dwXt-WZyerfWq4bP2yK6rpbmUHRTnhfmNFOKx2UQlNJGkCxp1BxTzmmH26mLD-BKrt2GgLuKoRYh6ERii0zEE5Jxo2MN-sHmN7EMNDlNnQCb-s16dFOHcdXorzsPkgj9Maxl6Cn3HFaAFbClrYhXwzEuvzBwnf8KzukCNkOvGRIw69cG2vmIhiZ1rh6cXBJldSQkzHnJu--hE5IP3kijwOhEzxv6nh0y8tdS42grOaA'
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
