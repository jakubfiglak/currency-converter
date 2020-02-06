import { getRatesByBase } from './api';

const ratesByBase = {};

export default async function convert(amount, from, to) {
  if (!ratesByBase[from]) {
    const rates = await getRatesByBase(from);
    ratesByBase[from] = rates;
  }

  const rate = ratesByBase[from].rates[to];
  return amount * rate;
}
