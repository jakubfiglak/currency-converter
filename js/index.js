import { generateOptions, formatCurrency } from './currencies';
import getRatesByBase from './api';
import convert from './convert';

const fromSelect = document.querySelector('#from-currency');
const toSelect = document.querySelector('#to-currency');
const amountInput = document.querySelector('#amount-input');
const amountOutput = document.querySelector('#amount-output');
const form = document.querySelector('.converter');

getRatesByBase('PLN');
const html = generateOptions();
fromSelect.innerHTML = html;
toSelect.innerHTML = html;

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
