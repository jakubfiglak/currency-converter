import { getRatesToCalculate } from './api';
import { convertDate, getDayBeforeDate } from './helpers';

const ratesToCalculate = {};
const currenciesToCompare = ['USD', 'GBP', 'EUR', 'CHF'];

export async function calculate(from) {
  if (!ratesToCalculate[from]) {
    ratesToCalculate[from] = {};

    const latestData = await getRatesToCalculate(from, currenciesToCompare);

    const date = new Date(latestData.date);
    const dayBeforeDate = getDayBeforeDate(date);
    const dateFormatted = convertDate(dayBeforeDate);
    const dayBeforeData = await getRatesToCalculate(
      from,
      currenciesToCompare,
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

export async function getDataToDraw(from, startDate, endDate) {
  const dates = [];
  console.log(convertDate(startDate));
  console.log(convertDate(endDate));
}
