import { generateOptions } from './currencies';
import { displayConversion, rateSelect, displayRates } from './displayData';
import chartInit from './chartInit';
import setMaxDate from './setMaxDate';
import { getDataToDraw } from './calculateRates';
import { getDayAfterDate, convertDate, createDatesArray } from './helpers';

const fromSelect = document.querySelector('#from-currency');
const toSelect = document.querySelector('#to-currency');
const ratesSelect = document.querySelector('#currency');

const converterForm = document.querySelector('#converter');
const ratesForm = document.querySelector('#rates');

setMaxDate();
chartInit();

// getDataToDraw('PLN', new Date(), new Date());

const html = generateOptions();

fromSelect.innerHTML = html;
toSelect.innerHTML = html;
ratesSelect.innerHTML = html;

converterForm.addEventListener('input', displayConversion);
rateSelect.addEventListener('change', displayRates);

ratesForm.addEventListener('submit', e => {
  e.preventDefault();
  console.log(e.target.currency.value);
  console.log(e.target.fromDate.value);
  console.log(e.target.toDate.value);

  //   const date = getDayBeforeDate(new Date(e.target.toDate.value));
  //   const dateStr = convertDate(date);
  //   console.log(dateStr);

  //   const dateStop = new Date(e.target.toDate.value);
  //   let date = new Date(e.target.fromDate.value);
  //   const dates = [];

  //   while (date <= dateStop) {
  //     dates.push(convertDate(date));
  //     date = getDayAfterDate(date);
  //   }

  //   console.log(dates);
  const dates = createDatesArray(
    e.target.fromDate.value,
    e.target.toDate.value
  );
  console.log(dates);
});
