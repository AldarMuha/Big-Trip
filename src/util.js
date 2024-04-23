import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault();
dayjs().utcOffset(120);

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomValue = (items) =>
  items[getRandomInteger(0, items.length - 1)];


const getRandomArray = (arr) => {
  const newArr = [];
  const stringCount = getRandomInteger(0, 6);
  for (let i = 0; i < stringCount; i++) {
    newArr.push(getRandomValue(arr));
  }
  return newArr;
};

const getCurrentDate = () => dayjs().format('MMM D');

const getTimeDueDate = (dueDate) => dayjs(dueDate).format('HH:mm');

const differenceDate = (date1, date2) => {
  const dateFrom = dayjs(date1);
  const dateTo = dayjs(date2);
  if (dateTo.diff(dateFrom, 'day') >= 1) {
    return dayjs(dateTo.diff(dateFrom, 'day', true)).format('DD HHН mmМ');
  } if (dateTo.diff(dateFrom, 'hour') >= 1) {
    return dayjs(dateTo.diff(dateFrom, 'hour', true)).format('HHН mmМ');
  } if (dateTo.diff(dateFrom, 'minute') >= 1) {
    return dayjs(dateTo.diff(dateFrom, 'minute', true)).format('mmМ');
  }
};

const getDueDate = (dueDate) => dayjs.utc(dueDate).utcOffset(3, true).format('YY/MM/DD HH:mm');

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

function sortTime(a, b) {
  const duration1 = dayjs(a.dateTo).diff(dayjs(a.dateFrom));
  const duration2 = dayjs(b.dateTo).diff(dayjs(b.dateFrom));
  if (duration1 > duration2) {
    return 1;
  }
  if (duration1 < duration2) {
    return -1;
  }
  return 0;
}

function sortPrice(a, b) {
  if (a.basePrice > b.basePrice) {
    return 1;
  }
  if (a.basePrice < b.basePrice) {
    return -1;
  }
  return 0;
}

export { getRandomInteger, getRandomValue, getCurrentDate, getTimeDueDate, differenceDate, getDueDate, getRandomArray, updateItem, sortDay, sortTime, sortPrice };
