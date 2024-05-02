import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { getDueDate } from '../util.js';

import { createFormOffersTemplate, createFormOfferTemplate } from './form-offers-template.js';
import { createFormDestinationTemplate } from './form-destination-template.js';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const BLANK_POINT = {
  destination: '',
  offers: '',
  basePrice: '',
  dateFrom: '',
  dateTo: '',
  isFavorite: false,
  type: ''
};

const createFormViewTemplate = ({ point, offers, destination }) => `
<li class="trip-events__item">
<form class="event event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        ${(point.type)
    ? `<img class="event__type-icon" width="17" height="17" src="img/icons/${point.type}.png" alt="Event type icon">`
    : ''}
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>

          <div class="event__type-item">
            <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio"
              name="event-type" value="taxi">
            <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio"
              name="event-type" value="bus">
            <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio"
              name="event-type" value="train">
            <label class="event__type-label  event__type-label--train"
              for="event-type-train-1">Train</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio"
              name="event-type" value="ship">
            <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio"
              name="event-type" value="drive">
            <label class="event__type-label  event__type-label--drive"
              for="event-type-drive-1">Drive</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio"
              name="event-type" value="flight">
            <label class="event__type-label  event__type-label--flight"
              for="event-type-flight-1">Flight</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio"
              name="event-type" value="check-in">
            <label class="event__type-label  event__type-label--check-in"
              for="event-type-check-in-1">Check-in</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio"
              name="event-type" value="sightseeing">
            <label class="event__type-label  event__type-label--sightseeing"
              for="event-type-sightseeing-1">Sightseeing</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio"
              name="event-type" value="restaurant">
            <label class="event__type-label  event__type-label--restaurant"
              for="event-type-restaurant-1">Restaurant</label>
          </div>
        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${point.type}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text"
        name="event-destination" value='${point.destination ? point.destination.name : ''}' list="destination-list-1">
      <datalist id="destination-list-1">
        <option value="Amsterdam"></option>
        <option value="Geneva"></option>
        <option value="Chamonix"></option>
      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text"
        name="event-start-time" value='${getDueDate(point.dateFrom)}'>
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text"
        name="event-end-time" value='${getDueDate(point.dateTo)}'>
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price"
        value=${point.basePrice}>
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">Delete</button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
    </header>
      <section class="event__details">
        ${(offers) ? createFormOffersTemplate(point.type, point.offers, offers) : ''}

        ${point.destination ? createFormDestinationTemplate(point.destination) : ''}
      </section >
    </form >
  </li >
  `;

export default class FormView extends AbstractStatefulView {

  #datepickerFrom = null;
  #datepickerTo = null;

  constructor(point = BLANK_POINT, offers = null, destination = null) {
    super();
    this._state = FormView.parsePointToState(point, offers, destination);
    this.#setDatepicker();
  }

  removeElement = () => {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  };

  #dateFromChangeHandler = ([userDate]) => {
    this._state.point.dateFrom = userDate;
  };

  #dateToChangeHandler = ([userDate]) => {
    this._state.point.dateTo = userDate;
  };

  #setDatepicker = () => {
    if (this._state.point.dateFrom) {
      this.#datepickerFrom = flatpickr(
        this.element.querySelector('[name="event-start-time"]'),
        {
          dateFormat: 'y/m/d H:i',
          defaultDate: this._state.point.dateFrom,
          onChange: this.#dateFromChangeHandler, // На событие flatpickr передаём наш колбэк
        },
      );
    }
    if (this._state.point.dateTo) {
      this.#datepickerTo = flatpickr(
        this.element.querySelector('[name="event-end-time"]'),
        {
          dateFormat: 'y/m/d H:i',
          defaultDate: this._state.point.dateTo,
          onChange: this.#dateToChangeHandler,
        },
      );
    }
  };

  static parsePointToState = (point, offers, destination) => ({
    point,
    offers,
    destination,
  });

  static parseStateToPoint = (state) => ({
    ...state.point,
  });

  get template() {
    return createFormViewTemplate(this._state);
  }

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);

    this.element.querySelector('.event__input--price').addEventListener('input', this.#priceInputHandler);
    this.element.querySelector('fieldset.event__type-group').addEventListener('change', this.#handleChangeType);
    this.element.querySelector('.event__available-offers').addEventListener('change', this.#handleChangeOffers);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#handleChangeDestination);
  };

  #handleChangeOffers = (evt) => {
    const checkbox = evt.target;
    const isSelected = checkbox.checked;
    const currentOffers = this._state.point.offers;

    if (isSelected) {
      currentOffers.push(evt.target.dataset.id);
    } else {
      this._state.point.offers = currentOffers.filter((offer) => offer !== evt.target.dataset.id);
    }
  };

  _restoreHandlers = () => {
    this.#formSubmitHandler(this._callback.formSubmit);
  };

  #priceInputHandler = (evt) => {
    evt.preventDefault();
    this._state.point.basePrice = Number(evt.target.value);
    this.#setDatepicker();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(FormView.parseStateToPoint(this._state));
  };

  #handleChangeType = (evt) => {
    this._state.point.type = evt.target.value;
    this.element.querySelector('.event__type-toggle').checked = false;
    this.element.querySelector('.event__label').textContent = this._state.point.type;
    this.element.querySelector('.event__type-icon').src = `img/icons/${this._state.point.type}.png`;

    this.element.querySelector('.event__available-offers').innerHTML = this._state.offers.find((offer) => offer.type === this._state.point.type).offers.map((offer) => createFormOfferTemplate(this._state.point.offers, offer)).join('');
  };

  #handleChangeDestination = (evt) => {
    if (this._state.destination.some((destinationItem) => destinationItem.name === evt.target.value)) {
      this._state.point.destination = this._state.destination.find((destinationItem) => destinationItem.name === evt.target.value);
      this.element.querySelector('.event__section-title--destination').textContent = this._state.point.destination.name;
      this.element.querySelector('.event__destination-description').textContent = this._state.point.destination.description;
      this.element.querySelector('.event__photos-tape').innerHTML = this._state.point.destination.pictures.slice().map((picture) => `<img class="event__photo" src=${picture.src} alt=${picture.description}>`).join('');
    }
  };

}
