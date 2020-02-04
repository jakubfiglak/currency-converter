import axios from 'axios';

const endpoint = 'https://api.exchangeratesapi.io/latest';

export default async function getRates() {
  const res = await axios.get(endpoint);
  console.log(res);
}
