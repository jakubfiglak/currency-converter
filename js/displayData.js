import convert from './convert';
import { formatCurrency } from './currencies';
import calculate from './calculateRates';
import { convertPercent } from './helpers';

const amountInput = document.querySelector('#amount-input');
const amountOutput = document.querySelector('#amount-output');
const toSelect = document.querySelector('#to-currency');
const fromSelect = document.querySelector('#from-currency');
const ratesList = document.querySelector('#rates-list');
export const rateSelect = document.querySelector('#currency');

export const displayConversion = async () => {
  const value = await convert(
    amountInput.value,
    fromSelect.value,
    toSelect.value
  );
  const formatted = formatCurrency(value, toSelect.value);
  console.log(formatted);
  amountOutput.textContent = `${formatted}`;
};

export const displayRates = async () => {
  const currency = rateSelect.value;
  const rates = await calculate(currency);

  console.log(rates);

  const { today, yesterday, ratio } = rates[currency];
  //   const { yesterday } = rates[currency];
  //   const { ratio } = rates[currency];
  //   console.log(today);
  //   console.log(yesterday);
  console.log(ratio);

  const todayFormatted = Object.keys(today.rates).map(curr =>
    formatCurrency(today.rates[curr], curr)
  );
  const yesterdayFormatted = Object.keys(yesterday.rates).map(curr =>
    formatCurrency(yesterday.rates[curr], curr)
  );
  const ratioFormatted = Object.keys(ratio).map(rate =>
    convertPercent(ratio[rate])
  );

  console.log(todayFormatted);
  console.log(yesterdayFormatted);
  console.log(ratioFormatted);

  //   console.log(today);

  const html = todayFormatted
    .map(
      (el, idx) => `
    <li class="list-item">
      <p class="today">${today.date}: 1 ${today.base} = ${el}</p>
       <p class="diff plus">${ratioFormatted[idx]}</p>
      <p class="yesterday">${yesterday.date}: 1 ${yesterday.base} = ${
        yesterdayFormatted[idx]
      }</p>
  </li>
    `
    )
    .join('');

  console.log(html);
  ratesList.innerHTML = html;
};
