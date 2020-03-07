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

export function getDayBeforeDate(date) {
  return new Date(date.setDate(date.getDate() - 1));
}

export function getDayAfterDate(date) {
  return new Date(date.setDate(date.getDate() + 1));
}

// export function createDatesArray(begin, end) {
//   const dates = [];

//   const dateStop = new Date(end);
//   let date = new Date(begin);

//   while (date <= dateStop) {
//     dates.push(convertDate(date));
//     date = getDayAfterDate(date);
//   }

//   return dates;
// }

// Function to sort the API response object by date (key)

export function sortObject(unordered) {
  const ordered = {};
  Object.keys(unordered)
    .sort()
    .forEach(key => (ordered[key] = unordered[key]));
  return ordered;
}
