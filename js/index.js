import { generateOptions } from './currencies';
import { displayConversion, rateSelect, displayRates } from './displayData';
import chartInit from './chartInit';
import setMaxDate from './setMaxDate';
import { prepareDataToDraw, drawChart } from './drawChart';

const fromSelect = document.querySelector('#from-currency');
const toSelect = document.querySelector('#to-currency');
const ratesSelect = document.querySelector('#currency');

const converterForm = document.querySelector('#converter');
const ratesForm = document.querySelector('#rates');

setMaxDate();
chartInit();

const html = generateOptions();

fromSelect.innerHTML = html;
toSelect.innerHTML = html;
ratesSelect.innerHTML = html;

converterForm.addEventListener('input', displayConversion);
rateSelect.addEventListener('submit', displayRates);

ratesForm.addEventListener('submit', e => {
  e.preventDefault();
  drawChart();
});
