import { getRatesToCalculate } from './api';

export default async function calculate(from) {
  const todayData = await getRatesToCalculate(from);
  const yesterdayData = await getRatesToCalculate(from, 1);

  const rateRatio = {};
  Object.keys(todayData.rates).forEach(
    currency =>
      (rateRatio[currency] =
        (todayData.rates[currency] - yesterdayData.rates[currency]) /
        yesterdayData.rates[currency])
  );

  console.log(rateRatio);
  return rateRatio;
}
