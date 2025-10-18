import axios from 'axios';

const QUOTE_API_URL = 'https://api.quotable.io/random';

export const getRandomQuote = () => axios.get(QUOTE_API_URL);