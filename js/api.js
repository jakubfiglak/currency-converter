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

export async function getRatesToCalculate(base, currencies, date) {
  const symbolsString = currencies.join(',');

  if (!date) {
    try {
      const res = await fetch(
        `${endpoint}/latest?base=${base}&symbols=${symbolsString}`
      );
      const rates = await res.json();
      return rates;
    } catch (err) {
      alert(err.message);
    }
  } else {
    try {
      const res = await fetch(
        `${endpoint}/${date}?base=${base}&symbols=${symbolsString}`
      );
      const rates = await res.json();
      return rates;
    } catch (err) {
      alert(err.message);
    }
  }
}
