import { filterCurrencies } from './helpers';

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

// Fetch rates in comparison with certain currencies for a certain date

export async function getRatesToCalculate(base, currencies, date) {
  const filteredCurrencies = filterCurrencies(base, currencies);

  const symbolsString = filteredCurrencies.join(',');

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

// Fetch historical rates in comparison to certain currencies for a time period

export async function getRatesTimePeriod(base, currencies, startDate, endDate) {
  const filteredCurrencies = filterCurrencies(base, currencies);

  const symbolsString = filteredCurrencies.join(',');

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
