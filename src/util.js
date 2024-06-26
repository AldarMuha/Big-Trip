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
  const stringCount = getRandomInteger(0, 3);
  for (let i = 0; i < stringCount; i++) {
    newArr.push(getRandomValue(arr));
  }
  return newArr;
};

const getDayMonth = (dueDate) => dayjs(dueDate).format('MMM D');

const getTimeDueDate = (dueDate) => dayjs(dueDate).format('HH:mm');

const differenceDate = (date1, date2) => {
  const dateFrom = dayjs(date1);
  const dateTo = dayjs(date2);
  let dayDiff = 0;
  let hourDiff = 0;
  let minuteDiff = 0;
  if (dateTo.diff(dateFrom, 'day') >= 1) {
    dayDiff = dateTo.diff(dateFrom, 'day');
    hourDiff = dateTo.diff(dateFrom, 'hour');
    minuteDiff = dateTo.diff(dateFrom, 'minute');
    return `${dayDiff}D ${hourDiff - dayDiff * 24}H ${minuteDiff - hourDiff * 60}M`;
  } if (dateTo.diff(dateFrom, 'hour') >= 1) {
    hourDiff = dateTo.diff(dateFrom, 'hour');
    minuteDiff = dateTo.diff(dateFrom, 'minute');
    return `${hourDiff}H ${minuteDiff - hourDiff * 60}M`;
  } else {
    minuteDiff = dateTo.diff(dateFrom, 'minute');
    return `${minuteDiff}M`;
  }
};

const getDueDate = (dueDate) => dayjs.utc(dueDate).utcOffset(3, true).format('YY/MM/DD HH:mm');

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

export { getRandomInteger, getRandomValue, getDayMonth, getTimeDueDate, differenceDate, getDueDate, getRandomArray, sortDay, sortTime, sortPrice };
