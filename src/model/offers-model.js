import { OffersByType } from '../mock/offers.js';

export default class OffersModel {
  allOffers = OffersByType;

  get = () =>
    this.allOffers;

  getOffersByType = (pointType) =>
    this.allOffers.find((offer) => offer.type === pointType).offers;

  getOffersById = (pointType, pointOffers) => {
    const offersByType = this.getOffersByType(pointType).offers;
    return offersByType.filter((offer) => pointOffers.some((pointOffer) => pointOffer === offer.id));
  };
}
