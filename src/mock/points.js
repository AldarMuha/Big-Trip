import { getRandomValue, getRandomInteger } from '../util.js';
import { generateOffer } from './offers.js';
import { generateDestinations } from './destination.js';

import { POINTS_BY_TYPE } from './const.js';

const generatePoint = () => ({
  destination: getRandomValue(generateDestinations()),
  offers: Array.from({ length: 2 }, generateOffer),
  basePrice: getRandomInteger(1, 99),
  dateFrom: '2019-07-10T22:55:56.845Z',
  dateTo: '2019-07-11T11:22:13.375Z',
  isFavorite: false,
  type: getRandomValue(POINTS_BY_TYPE)
});

export const generatePoints = () =>
  Array.from({ length: 4 }, (_, index) => {
    const pointItem = generatePoint();

    return {
      id: String(index + 1),
      ...pointItem,
    };
  });

