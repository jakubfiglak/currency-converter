import { generateOptions } from './currencies';
import { displayConversion, rateSelect, displayRates } from './displayData';
import chartInit from './chartInit';

const fromSelect = document.querySelector('#from-currency');
const toSelect = document.querySelector('#to-currency');
const ratesSelect = document.querySelector('#currency');

const form = document.querySelector('.converter');

chartInit();
const html = generateOptions();
fromSelect.innerHTML = html;
toSelect.innerHTML = html;
ratesSelect.innerHTML = html;

form.addEventListener('input', displayConversion);
rateSelect.addEventListener('change', displayRates);
