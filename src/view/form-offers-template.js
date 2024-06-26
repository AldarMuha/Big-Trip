export const createFormOfferTemplate = (pointOffers, offer) => `
  <div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${offer.id}" type="checkbox"
      name="event-offer-luggage" data-id="${offer.id}" ${pointOffers.find((pointOffer) => pointOffer === offer.id) ? 'checked' : ''}>
    <label class="event__offer-label" for="event-offer-luggage-${offer.id}">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}}</span>
    </label>
  </div>
`;

export const createFormOffersTemplate = (point, offers) =>
  `
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
      ${offers.find((offer) => offer.type === point.type).offers.map((offer) => createFormOfferTemplate(point.offers, offer)).join('')}
    </div>
`;
