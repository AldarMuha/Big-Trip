import { getRandomValue, getRandomInteger } from '../util.js';

import { CITYS, DESCRIPTIONS, PHOTOS } from './const.js';

const getArr = (arr) => {
  const newArr = [];
  const stringCount = getRandomInteger(1, 3);
  for (let i = 0; i < stringCount; i++) {
    newArr.push(getRandomValue(arr));
  }
  return newArr;
};

export const generateDestination = () => ({
  description: getArr(DESCRIPTIONS),
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
