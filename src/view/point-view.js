import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { creatPointOffersTemplate } from './point-offers-template.js';
import { getDayMonth, getTimeDueDate, differenceDate } from '../util.js';

const createPointViewTemplate = (point, offers) => `
  <li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="2019-03-18">${getDayMonth(point.dateFrom)}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${point.type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${point.type} ${point.destination ? point.destination.name : ''}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="2019-03-18T10:30">${getTimeDueDate(point.dateFrom)}</time>
          &mdash;
          <time class="event__end-time" datetime="2019-03-18T11:00">${getTimeDueDate(point.dateTo)}</time>
        </p>
        <p class="event__duration">${differenceDate(point.dateFrom, point.dateTo)}</p>
      </div>
      <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${point.basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>

      ${offers ? creatPointOffersTemplate(point, offers) : ''}

      <button class="event__favorite-btn ${point.isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path
          d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z" />
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>
`;

export default class PointView extends AbstractStatefulView {
  #point = null;
  #destination = null;
  #offers = null;

  constructor(point, offers = null, destination = null) {
    super();
    this.#point = point;
    this.#destination = destination;
    this.#offers = offers;
  }

  get template() {
    return createPointViewTemplate(this.#point, this.#offers, this.#destination);
  }

  setEditClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.event__favorite-btn')
      .addEventListener('click', this.#favoriteClickHandler);
  };

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };
}
