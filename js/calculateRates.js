import { getRatesToCalculate } from './api';
import { convertDate, getDayBeforeDate } from './helpers';
import { baseCurrencies } from './currencies';

const ratesToCalculate = {};

export async function calculate(from) {
  if (!ratesToCalculate[from]) {
    ratesToCalculate[from] = {};

    const latestData = await getRatesToCalculate(from, baseCurrencies);

    const date = new Date(latestData.date);
    const dayBeforeDate = getDayBeforeDate(date);
    const dateFormatted = convertDate(dayBeforeDate);
    const dayBeforeData = await getRatesToCalculate(
      from,
      baseCurrencies,
      dateFormatted
    );

    ratesToCalculate[from].today = latestData;
    ratesToCalculate[from].yesterday = dayBeforeData;

    const rateRatio = {};
    Object.keys(latestData.rates).forEach(
      currency =>
        (rateRatio[currency] =
          (latestData.rates[currency] - dayBeforeData.rates[currency]) /
          dayBeforeData.rates[currency])
    );

    ratesToCalculate[from].ratio = rateRatio;
  }
  return ratesToCalculate;
}
