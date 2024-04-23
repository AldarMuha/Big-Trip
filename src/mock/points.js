import { getRandomValue, getRandomInteger, getRandomArray } from '../util.js';
import { generateOffers } from './offers.js';
import { generateDestinations } from './destination.js';
import { nanoid } from 'nanoid';

const DATES = [
  '2019-07-11T22:55:56.845Z',
  '2019-07-12T22:55:56.845Z',
  '2019-07-13T22:55:56.845Z',
  '2019-07-14T22:55:56.845Z',
  '2019-07-15T22:55:56.845Z',
  '2019-07-16T22:55:56.845Z',
];

import { POINTS_BY_TYPE } from './const.js';

const offers = generateOffers();
const destinations = generateDestinations();

const generatePoint = () => ({
  destination: getRandomValue(generateDestinations()),
  offers: getRandomArray(generateOffers()),
  basePrice: getRandomInteger(1, 99),
  dateFrom: getRandomValue(DATES.slice(0, 3)),
  dateTo: getRandomValue(DATES.slice(4, 5)),
  isFavorite: false,
  type: getRandomValue(POINTS_BY_TYPE)
});

export const generatePoints = () => {
  const points = Array.from({ length: 5 }, generatePoint);

  const totalOffers = Array.from({ length: offers.length }, (_, index) => String(index + 1));
  const totalDestinations = Array.from({ length: destinations.length }, (_, index) => String(index + 1));

  const hasDestination = getRandomInteger(0, 1);

  return points.map((point) => ({
    id: nanoid(),
    offers: getRandomArray(totalOffers),
    destination: (hasDestination) ? getRandomValue(totalDestinations) : '',
    ...point,
  }));
};


