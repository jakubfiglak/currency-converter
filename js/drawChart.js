import { currenciesToCompare } from './currencies';
import { getRatesTimePeriod } from './api';
import { sortObject } from './helpers';
import chartInit from './chartInit';

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

  return chartData;
}

export async function drawChart() {
  const myChart = chartInit();
  const data = await prepareDataToDraw();

  const colors = ['#30363d', '#f27a54', '#a154f2', '#6fcf97'];

  // Set chart labels (X axis)

  myChart.data.labels = Object.keys(data.USD);

  currenciesToCompare.forEach((currency, idx) => {
    myChart.data.datasets[idx] = {
      data: Object.values(data[currency]),
      label: currency,
      borderColor: colors[idx],
    };
  });

  myChart.update({
    duration: 800,
    easing: 'easeOutBounce',
  });
}
