import getRates from './api';
import currencies from './currencies';

getRates('PLN');
console.log(Object.keys(currencies).sort());
