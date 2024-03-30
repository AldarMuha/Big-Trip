import { getRandomValue, getArr } from '../util.js';

import { CITYS, DESCRIPTIONS, PHOTOS } from './const.js';

const generateDestination = () => ({
  description: getArr(DESCRIPTIONS).join('. '),
  name: getRandomValue(CITYS),
  pictures: getArr(PHOTOS)
});

export const generateDestinations = () => Array.from({ length: 10 }, (_, index) => {
  const destinationItem = generateDestination();

  return {
    id: String(index + 1),
    ...destinationItem,
  };
});
