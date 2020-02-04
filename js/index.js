import { generateOptions } from './currencies';
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

// convert(100, 'PLN', 'USD');
// convert(100, 'USD', 'EUR');

form.addEventListener('input', async () => {
  const value = await convert(
    amountInput.value,
    fromSelect.value,
    toSelect.value
  );
  amountOutput.innerHTML = `${toSelect.value} ${value}`;
});
