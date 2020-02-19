export const getFormattedDate = (date) => {
  const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
  ]
  const dateObj = new Date(date)
  return `${
    months[dateObj.getMonth()]
  } ${dateObj.getDate() + 1}, ${dateObj.getFullYear()}`
}