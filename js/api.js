const endpoint = 'https://api.exchangeratesapi.io';

export async function getRatesByBase(base) {
  try {
    const res = await fetch(`${endpoint}/latest?base=${base}`);
    const rates = await res.json();
    return rates;
  } catch (err) {
    alert(err.message);
  }
}

export async function getRatesToCalculate(base, date) {
  if (!date) {
    try {
      const res = await fetch(
        `${endpoint}/latest?base=${base}&symbols=USD,GBP,EUR,CHF`
      );
      const rates = await res.json();
      return rates;
    } catch (err) {
      alert(err.message);
    }
  } else {
    try {
      const res = await fetch(
        `${endpoint}/${date}?base=${base}&symbols=USD,GBP,EUR,CHF`
      );
      const rates = await res.json();
      return rates;
    } catch (err) {
      alert(err.message);
    }
  }
}
