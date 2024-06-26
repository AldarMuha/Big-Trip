import { FilterType } from '../const.js';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
const currentDate = dayjs();

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault();


const filter = {
  [FilterType.EVERYTHING]: (points) => [...points],
  [FilterType.FUTURE]: (points) => points.filter((point) => dayjs(point.dateFrom).isAfter(currentDate)),
  [FilterType.PAST]: (points) => points.filter((point) => dayjs(point.dateTo).isBefore(currentDate)),
};

export { filter };
