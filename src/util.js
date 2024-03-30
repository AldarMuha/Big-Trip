import dayjs from "dayjs";

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomValue = (items) =>
  items[getRandomInteger(0, items.length - 1)];

const getTodayDay = () => dayjs().format('MMM D');

const getTimeDueDate = (dueDate) => dayjs(dueDate).format('HH:mm');

const differenceDate = (d1, d2) => {
  const date1 = dayjs(d1);
  const date2 = dayjs(d2);
  if (date2.diff(date1, 'day') >= 1) {
    return dayjs(date2.diff(date1, 'day', true)).format('DD HHН mmМ');
  } if (date2.diff(date1, 'hour') >= 1) {
    return dayjs(date2.diff(date1, 'hour', true)).format('HHН mmМ');
  } if (date2.diff(date1, 'minute') >= 1) {
    return dayjs(date2.diff(date1, 'minute', true)).format('mmМ');
  }
};

const getDueDate = (dueDate) => dayjs(dueDate).format('YY/MM/DD HH:mm');

export { getRandomInteger, getRandomValue, getTodayDay, getTimeDueDate, differenceDate, getDueDate };
