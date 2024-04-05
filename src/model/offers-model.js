import { generateOffers } from '../mock/offers.js';

export default class OffersModel {
  #allOffers = generateOffers();
  #offers = [];

  get = (point) => {
    this.#offers = this.#allOffers.filter((offer) => offer.type === point.type);
    return this.#offers;
  };
}
