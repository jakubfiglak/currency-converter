import convert from './convert';
import { formatCurrency } from './currencies';
import { calculate } from './calculateRates';
import { convertPercent } from './helpers';

const amountInput = document.querySelector('#amount-input');
const amountOutput = document.querySelector('#amount-output');
const toSelect = document.querySelector('#to-currency');
const fromSelect = document.querySelector('#from-currency');
const ratesList = document.querySelector('#rates-list');
const ratesForm = document.querySelector('#rates');

export const rateSelect = document.querySelector('#currency');

export const displayConversion = async () => {
  const value = await convert(
    amountInput.value,
    fromSelect.value,
    toSelect.value
  );
  const formatted = formatCurrency(value, toSelect.value);
  amountOutput.textContent = `${formatted}`;
};

export const displayRates = async () => {
  const currency = ratesForm.currency.value;
  const rates = await calculate(currency);

  const { today, yesterday, ratio } = rates[currency];

  const todayFormatted = Object.keys(today.rates).map(curr =>
    formatCurrency(today.rates[curr] * 100, curr)
  );
  const yesterdayFormatted = Object.keys(yesterday.rates).map(curr =>
    formatCurrency(yesterday.rates[curr] * 100, curr)
  );
  const ratioFormatted = Object.keys(ratio).map(rate =>
    convertPercent(ratio[rate])
  );
  const classes = Object.keys(ratio).map(rate =>
    ratio[rate] >= 0 ? 'plus' : 'minus'
  );

  const html = todayFormatted
    .map(
      (el, idx) => `
    <li class="list-item">
      <p class="today">${today.date}: 100 ${today.base} = ${el}</p>
       <p class="diff ${classes[idx]}">${ratioFormatted[idx]}</p>
      <p class="yesterday">${yesterday.date}: 100 ${yesterday.base} = ${
        yesterdayFormatted[idx]
      }</p>
  </li>
    `
    )
    .join('');

  ratesList.innerHTML = html;
};
