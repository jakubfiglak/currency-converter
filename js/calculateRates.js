import { getRatesToCalculate } from './api';

const ratesToCalculate = {};

export default async function calculate(from) {
  if (!ratesToCalculate[from]) {
    ratesToCalculate[from] = {};

    const todayData = await getRatesToCalculate(from);
    const yesterdayData = await getRatesToCalculate(from, 1);

    ratesToCalculate[from].today = todayData;
    ratesToCalculate[from].yesterday = yesterdayData;

    const rateRatio = {};
    Object.keys(todayData.rates).forEach(
      currency =>
        (rateRatio[currency] =
          (todayData.rates[currency] - yesterdayData.rates[currency]) /
          yesterdayData.rates[currency])
    );

    ratesToCalculate[from].ratio = rateRatio;
  }
  return ratesToCalculate;
}
