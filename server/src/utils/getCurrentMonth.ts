export const getCurrentMonth = () => {
  const date = new Date();

  const start = new Date(date.getFullYear(), date.getMonth());
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  end.setHours(23, 59, 59);

  return {
    startOfMonth: start.getTime(),
    endOfMonth: end.getTime(),
  };
};