import axios from 'axios';

const client = axios.create({
  baseURL: 'https://68db331023ebc87faa323b10.mockapi.io',
});

export default client;