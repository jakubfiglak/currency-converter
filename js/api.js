const endpoint = 'https://api.exchangeratesapi.io';

// Fetch latest rates by base currency

export async function getRatesByBase(base) {
  try {
    const res = await fetch(`${endpoint}/latest?base=${base}`);
    const rates = await res.json();
    return rates;
  } catch (err) {
    alert(err.message);
  }
}

// Fetch rates in comparison with certain currencies at certain date

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

// Fetch historical rates in comparison with certain currencies for a time period

export async function getRatesTimePeriod(base, currencies, startDate, endDate) {
  const symbolsString = currencies.join(',');

  try {
    const res = await fetch(
      `${endpoint}/history?start_at=${startDate}&end_at=${endDate}&base=${base}&symbols=${symbolsString}`
    );
    const rates = await res.json();
    return rates;
  } catch (err) {
    alert(err.message);
  }
}
