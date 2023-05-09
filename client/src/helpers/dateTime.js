export const toDate = (date) => {
  const newDate = new Date(Date.parse(date));
  return newDate.toLocaleDateString("en-GB");
};

export const toTime = (date) => {
  const newTime = new Date(Date.parse(date));
  return newTime.toLocaleTimeString("en-US");
};

export const toISOS = (date, time) => {
  const newDate = new Date(toDate(date) + " " + toTime(time));
  return newDate.toISOString();
};
