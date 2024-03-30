import { generateOffers } from '../mock/offers.js';

export default class OffersModel {
  allOffers = generateOffers();
  offers = [];

  get = (point) => {
    this.allOffers.map((allOffer) => {
      if (allOffer.type === point.type) {
        this.offers.push(allOffer);
      }
      return allOffer;
    });

    return this.offers;
  };
}
