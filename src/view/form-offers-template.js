const createFormOfferTemplate = (id, offer) => `
  <div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox"
      name="event-offer-luggage" ${(offer.id === id) ? 'checked' : ''}>
    <label class="event__offer-label" for="event-offer-luggage-1">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}}</span>
    </label>
  </div>
`;


export const createFormOffersTemplate = (id, offers) =>
  `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

    <div class="event__available-offers">
      ${offers.map((offer) => createFormOfferTemplate(id, offer)).join('')}
    </div>
</section>`;
