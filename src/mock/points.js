import { getRandomValue, getRandomInteger, getArr } from '../util.js';
import { generateOffers } from './offers.js';
import { generateDestinations } from './destination.js';

import { POINTS_BY_TYPE } from './const.js';

const offers = generateOffers();
const destinations = generateDestinations();

const generatePoint = () => ({
  destination: getRandomValue(generateDestinations()),
  offers: getArr(generateOffers()),
  basePrice: getRandomInteger(1, 99),
  dateFrom: '2019-07-10T22:55:56.845Z',
  dateTo: '2019-07-11T11:22:13.375Z',
  isFavorite: false,
  type: getRandomValue(POINTS_BY_TYPE)
});

export const generatePoints = () => {
  const points = Array.from({ length: 5 }, generatePoint);

  const totalOffers = Array.from({ length: offers.length }, (_, index) => String(index + 1));
  const totalDestinations = Array.from({ length: destinations.length }, (_, index) => String(index + 1));

  const hasDestination = getRandomInteger(0, 1);

  return points.map((point, index) => ({
    id: String(index + 1),
    offers: getArr(totalOffers),
    destination: (hasDestination) ? getRandomValue(totalDestinations) : '',
    ...point,
  }));
};


