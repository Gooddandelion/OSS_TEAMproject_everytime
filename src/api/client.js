import axios from 'axios';

const client = axios.create({
  baseURL: 'https://68ddd354d7b591b4b78d973a.mockapi.io',
});

export default client;