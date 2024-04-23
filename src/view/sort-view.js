import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../const.js';

const createSortViewTemplate = () => `
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    <div class="trip-sort__item  trip-sort__item--day">
      <input id="sort-${SortType.DAY}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day">
      <label class="trip-sort__btn" for="sort-${SortType.DAY}" data-sort-type = "${SortType.DAY}">Day</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--event">
      <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
      <label class="trip-sort__btn" for="sort-event">Event</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--time">
      <input id="sort-${SortType.TIME}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">
      <label class="trip-sort__btn" for="sort-${SortType.TIME}" data-sort-type = "${SortType.TIME}">Time</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--price">
      <input id="sort-${SortType.PRICE}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">
      <label class="trip-sort__btn" for="sort-${SortType.PRICE}" data-sort-type = "${SortType.PRICE}">Price</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--offer">
      <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
      <label class="trip-sort__btn" for="sort-offer">Offers</label>
    </div>
  </form>
`;

export default class SortView extends AbstractView {

  _currentSortType = SortType.DAY;

  get template() {
    return createSortViewTemplate();
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    evt.preventDefault();
    const sortType = evt.target.dataset.sortType;

    if (this._currentSortType === sortType) {
      return;
    }

    //console.log(sortType);
    this._currentSortType = sortType;
    this._callback.sortTypeChange(sortType);
  };
}
