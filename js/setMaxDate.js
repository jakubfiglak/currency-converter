import { convertDate } from './helpers';

const fromDateInput = document.querySelector('#from-date');
const toDateInput = document.querySelector('#to-date');

export default function setMaxDate() {
  const date = convertDate(new Date());
  fromDateInput.setAttribute('max', `${date}`);
  toDateInput.setAttribute('max', `${date}`);
}
