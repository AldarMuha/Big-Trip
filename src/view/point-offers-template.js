const createPointOfferTemplate = ({ title, price }) => `
    <li class="event__offer">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </li>
`;

export const creatPointOffersTemplate = (point, offers) => `
  <ul class="event__selected-offers">
    ${offers.find((offer) => offer.type === point.type).offers.filter((offer) => point.offers.find((pointOffer) => pointOffer === offer.id)).map((offer) => createPointOfferTemplate(offer)).join('')}
  </ul>
`;
