import { FilterType } from '../const.js';
import dayjs from 'dayjs';
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const today = dayjs();

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault();


const filter = {
  [FilterType.EVERYTHING]: (points) => [...points],
  [FilterType.FUTURE]: (points) => points.filter((point) => point.type === 'ship'),
  [FilterType.PAST]: (points) => points.filter((point) => point.type === 'drive'),
};

export { filter };
