import { getRatesToCalculate } from './api';

const ratesToCalculate = {};

export default async function calculate(from) {
  if (!ratesToCalculate[from]) {
    ratesToCalculate[from] = {};

    const latestData = await getRatesToCalculate(from);

    const date = new Date(latestData.date);
    const dayBeforeDate = new Date(date.setDate(date.getDate() - 1));
    const dateFormatted = Array.from(dayBeforeDate.toISOString())
      .splice(0, 10)
      .join('');
    const dayBeforeData = await getRatesToCalculate(from, dateFormatted);

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
