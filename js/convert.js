import { getRatesByBase } from './api';

const ratesByBase = {};

export default async function convert(amount, from, to) {
  if (!ratesByBase[from]) {
    console.log(`we don't have rates for this currency, I have to fetch it!`);
    const rates = await getRatesByBase(from);
    ratesByBase[from] = rates;
    console.log(ratesByBase);
  }

  const rate = ratesByBase[from].rates[to];
  const converted = amount * rate;
  console.log(`${amount} in ${from} is ${converted} in ${to}`);
  return amount * rate;
}
