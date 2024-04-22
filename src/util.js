import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault();

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomValue = (items) =>
  items[getRandomInteger(0, items.length - 1)];


const getArr = (arr) => {
  const newArr = [];
  const stringCount = getRandomInteger(0, 6);
  for (let i = 0; i < stringCount; i++) {
    newArr.push(getRandomValue(arr));
  }
  return newArr;
};

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

const getDueDate = (dueDate) => dayjs.tz(dueDate).format('YY/MM/DD HH:mm');

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};


const sortDay = (pointA, pointB) =>
  dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));

const sortTime = (pointA, pointB) =>
  dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom)) - dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));

const sortPrice = (pointA, pointB) =>
  pointA.price - pointB.price;

export { getRandomInteger, getRandomValue, getTodayDay, getTimeDueDate, differenceDate, getDueDate, getArr, updateItem, sortDay, sortTime, sortPrice };
