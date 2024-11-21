export const getLast20Years = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = 0; i < 20; i++) {
    years.push({ name: currentYear - i });
  }
  return years;
};
