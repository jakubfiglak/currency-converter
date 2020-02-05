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

export async function getRatesToCalculate(base, daysFromNow) {
  if (!daysFromNow) {
    try {
      const res = await fetch(
        `${endpoint}/latest?base=${base}&symbols=USD,GBP,EUR,CHF`
      );
      const rates = await res.json();
      // console.log(rates);
      return rates;
    } catch (err) {
      alert(err.message);
    }
  } else if (daysFromNow > 0) {
    const today = new Date();
    const dayInThePast = new Date(today.setDate(today.getDate() - daysFromNow));
    const queryString = Array.from(dayInThePast.toISOString())
      .splice(0, 10)
      .join('');

    try {
      const res = await fetch(
        `${endpoint}/${queryString}?base=${base}&symbols=USD,GBP,EUR,CHF`
      );
      const rates = await res.json();
      // console.log(rates);
      return rates;
    } catch (err) {
      alert(err.message);
    }
  }
}
