import getRates from './api';
import { generateOptions } from './currencies';

const fromSelect = document.querySelector('#from-currency');
const toSelect = document.querySelector('#to-currency');

getRates('PLN');
const html = generateOptions();
console.log(html);
fromSelect.innerHTML = html;
toSelect.innerHTML = html;
