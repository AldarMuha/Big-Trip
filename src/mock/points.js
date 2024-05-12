import { getRandomValue, getRandomInteger, getRandomArray } from '../util.js';
import { nanoid } from 'nanoid';
import { Destinations } from './destination.js';
import { OffersByType } from './offers.js';

const TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const dateTimes = [
  ['2023-11-18T14:30:45.123Z', '2023-11-18T16:30:45.123Z'],
  ['2024-02-03T08:12:30.987Z', '2024-02-03T11:12:30.987Z'],
  ['2023-10-25T19:45:21.654Z', '2023-10-25T20:30:21.654Z'],
  ['2024-03-12T03:27:15.789Z', '2024-03-12T08:50:15.789Z'],
  ['2023-11-01T12:50:10.234Z', '2023-11-01T18:00:10.234Z'],
  ['2024-04-20T22:05:36.543Z', '2024-04-20T23:30:36.543Z'],
  ['2023-09-15T17:40:59.876Z', '2023-09-15T20:05:59.876Z'],
  ['2024-04-02T06:18:42.321Z', '2024-04-02T12:00:42.321Z'],
  ['2023-12-07T10:55:28.465Z', '2023-12-07T13:25:28.465Z'],
  ['2024-01-28T01:33:54.210Z', '2024-01-28T02:33:54.210Z'],
];

const generatePoint = () => {
  const dateTime = getRandomValue(dateTimes);
  const dateStart = dateTime[0];
  const dateFinish = dateTime[1];

  return {
    id: nanoid(),
    type: getRandomValue(TYPES),
    dateFrom: dateStart,
    dateTo: dateFinish,
    basePrice: getRandomInteger(100, 1500),
    isFavorite: false,
  };
};

export const generatePoints = () => {
  const points = Array.from({ length: 5 }, generatePoint);

  return points.map((point) => ({
    id: nanoid(),
    offers: Array.from(new Set(getRandomArray(OffersByType.find((offers) => offers.type === point.type).offers.map((offer) => offer.id)))),
    destination: getRandomValue(Destinations),
    ...point,
  }));
};
