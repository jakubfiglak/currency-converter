import { generateOptions } from './currencies';
import calculate from './calculateRates';
import { convertPercent } from './helpers';
import { displayConversion, rateSelect, displayRates } from './displayData';

const fromSelect = document.querySelector('#from-currency');
const toSelect = document.querySelector('#to-currency');
const ratesSelect = document.querySelector('#currency');

const form = document.querySelector('.converter');

// getRatesByBase('PLN');
// getRatesToCalculate('PLN', 1);
// calculate('PLN', 1);
// calculate('PLN', 1);
// calculate('USD', 1);
// const percent = convertPercent(0.007576);
// console.log(percent);
const html = generateOptions();
fromSelect.innerHTML = html;
toSelect.innerHTML = html;
ratesSelect.innerHTML = html;

form.addEventListener('input', displayConversion);
rateSelect.addEventListener('change', displayRates);
