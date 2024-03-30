import { generateOffers } from '../mock/offers.js';

export default class OffersModel {
  #allOffers = generateOffers();
  #offers = [];

  get = (point) => {
    const pointOffers = point.offers;
    this.#offers = pointOffers.map((pointOffer) => this.#allOffers.find((offer) => offer.type === pointOffer.type));

    return this.#offers;
  };
}
