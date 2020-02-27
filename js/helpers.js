export function convertPercent(decimal) {
  return Intl.NumberFormat('en-EN', {
    style: 'percent',
    minimumFractionDigits: 2,
  }).format(decimal);
}

export function convertDate(date) {
  return Array.from(date.toISOString())
    .splice(0, 10)
    .join('');
}
