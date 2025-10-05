export const daysFromNow = (dateString) => {
  const inputDate = new Date(dateString);
  const today = new Date();

  inputDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffTime = inputDate - today;

  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));



  return diffDays < 0 ? 0 : diffDays;
}


