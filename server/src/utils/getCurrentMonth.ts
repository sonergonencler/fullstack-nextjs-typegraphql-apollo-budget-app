export const getCurrentMonth = () => {
  const date = new Date();

  const startOfMonth = new Date(date.getFullYear(), date.getMonth()).getTime();
  const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getTime();

  return {
    startOfMonth,
    endOfMonth,
  };
};
