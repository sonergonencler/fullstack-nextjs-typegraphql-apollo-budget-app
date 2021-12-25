export const toMoney = (amount?: number) => {
  if (!amount) {
    return '$' + 0;
  }

  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export const toDate = (timestamp?: number) => {
  return timestamp ? new Date(timestamp).toLocaleDateString('en-GB') : '';
};

export const getFormattedDate = (timestamp?: number) => {
  const time = timestamp || Date.now();
  const date = new Date(time);

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
    'December',
  ];

  return `${months[date.getMonth()]} ${date.getFullYear()}`;
};
