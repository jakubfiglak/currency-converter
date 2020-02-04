import { generateOptions } from './currencies';
import getRatesByBase from './api';
import convert from './convert';

const fromSelect = document.querySelector('#from-currency');
const toSelect = document.querySelector('#to-currency');

getRatesByBase('PLN');
const html = generateOptions();
fromSelect.innerHTML = html;
toSelect.innerHTML = html;

convert(100, 'PLN', 'USD');
convert(100, 'USD', 'EUR');
