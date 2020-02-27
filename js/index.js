import { generateOptions } from './currencies';
import { displayConversion, rateSelect, displayRates } from './displayData';
import chartInit from './chartInit';
import setMaxDate from './setMaxDate';

const fromSelect = document.querySelector('#from-currency');
const toSelect = document.querySelector('#to-currency');
const ratesSelect = document.querySelector('#currency');

const form = document.querySelector('.converter');

setMaxDate();
chartInit();

const html = generateOptions();

fromSelect.innerHTML = html;
toSelect.innerHTML = html;
ratesSelect.innerHTML = html;

form.addEventListener('input', displayConversion);
rateSelect.addEventListener('change', displayRates);
