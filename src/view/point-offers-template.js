const createPointOfferTemplate = ({ title, price }) => `
    <li class="event__offer">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </li>
`;

export const creatPointOffersTemplate = (offers) => `
  <ul class="event__selected-offers">
    ${offers.map((offer) => createPointOfferTemplate(offer)).join('')}
  </ul>
`;
