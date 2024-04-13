import { generateOffers } from '../mock/offers.js';

export default class OffersModel {
  #allOffers = generateOffers();

  get = (point) =>
    this.#allOffers.filter((offer) => offer.type === point.type);
}
