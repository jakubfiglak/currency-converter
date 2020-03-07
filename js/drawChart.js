import { currenciesToCompare } from './currencies';
import { getRatesTimePeriod } from './api';
import { sortObject } from './helpers';

const ratesForm = document.querySelector('#rates');

export async function prepareDataToDraw() {
  const startDate = ratesForm.fromDate.value;
  const endDate = ratesForm.toDate.value;
  const base = ratesForm.currency.value;

  // Prepare data structure

  const chartData = {};
  currenciesToCompare.forEach(currency => (chartData[currency] = {}));

  // Fetch data from an API based on users input

  const dayByDayData = await getRatesTimePeriod(
    base,
    currenciesToCompare,
    startDate,
    endDate
  );

  // Sort the data by date

  const orderedDayByDayData = sortObject(dayByDayData.rates);

  // Create a seperate object for each currency

  Object.keys(orderedDayByDayData).forEach(key => {
    currenciesToCompare.forEach(currency => {
      chartData[currency][key] = orderedDayByDayData[key][currency];
    });
  });

  console.log(chartData);
}
