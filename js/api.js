const endpoint = 'https://api.exchangeratesapi.io/latest';

export default async function getRatesByBase(base) {
  const res = await fetch(`${endpoint}?base=${base}`);
  const data = await res.json();
  console.log(Object.keys(data.rates).sort());
}
