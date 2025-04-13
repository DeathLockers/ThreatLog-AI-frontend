const getRangeDates = (differenceDays: number = 7): [string, string] => {
  const today = new Date();

  const dateDifferenceDays = new Date(today);
  dateDifferenceDays.setDate(today.getDate() - differenceDays);

  return [formatDate(dateDifferenceDays), formatDate(today)];
};

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default getRangeDates;
