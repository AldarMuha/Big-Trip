import { OFFERS_BY_TYPE } from './const.js';
import { getRandomValue } from '../util.js';

const generateOffer = () => ({
  title: 'Upgrade to a business class',
  price: 120
});

export const generateOffers = () =>
  Array.from({ length: 10 }, (_, index) => {
    const offerItem = generateOffer();

    return {
      type: getRandomValue(OFFERS_BY_TYPE),
      id: String(index + 1),
      ...offerItem,
    };
  });
