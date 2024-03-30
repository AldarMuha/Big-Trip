import { generateOffers } from '../mock/offers.js';

export default class OffersModel {
  offers = generateOffers();

  get = () =>
    this.offers;
}
