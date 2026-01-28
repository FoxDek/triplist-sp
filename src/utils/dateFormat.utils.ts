export const dateAdaptation = (date: Date) => {
  const day = date.getDate();
  const month = date.toLocaleString('ru-RU', { month: 'long' });
  const year = date.getFullYear();

  return {
    day,
    month,
    year
  }
}