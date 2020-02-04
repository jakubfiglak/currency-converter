const endpoint = 'https://api.exchangeratesapi.io/latest';

export default async function getRatesByBase(base) {
  const res = await fetch(`${endpoint}?base=${base}`);
  const rates = await res.json();
  return rates;
}
