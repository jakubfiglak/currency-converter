export function convertPercent(decimal) {
  return Intl.NumberFormat('en-EN', {
    style: 'percent',
    minimumFractionDigits: 2,
  }).format(decimal);
}
