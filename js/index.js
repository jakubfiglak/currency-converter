import { generateOptions, formatCurrency } from './currencies';
import { getRatesByBase, getRatesToCalculate } from './api';
import convert from './convert';
import calculate from './calculateRates';
import { convertPercent } from './helpers';

const fromSelect = document.querySelector('#from-currency');
const toSelect = document.querySelector('#to-currency');
const ratesSelect = document.querySelector('#currency');
const amountInput = document.querySelector('#amount-input');
const amountOutput = document.querySelector('#amount-output');
const form = document.querySelector('.converter');

// getRatesByBase('PLN');
// getRatesToCalculate('PLN', 1);
calculate('PLN');
const percent = convertPercent(0.007576);
console.log(percent);
const html = generateOptions();
fromSelect.innerHTML = html;
toSelect.innerHTML = html;
ratesSelect.innerHTML = html;

const displayData = async () => {
  const value = await convert(
    amountInput.value,
    fromSelect.value,
    toSelect.value
  );
  const formatted = formatCurrency(value, toSelect.value);
  console.log(formatted);
  amountOutput.textContent = `${formatted}`;
};

form.addEventListener('input', displayData);
