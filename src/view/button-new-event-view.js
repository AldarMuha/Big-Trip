import AbstractView from '../framework/view/abstract-view.js';

const createButtonNewEventViewTemplate = () => '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';

export default class ButtonNewEventView extends AbstractView {
  #handleClick = null;

  constructor() {
    super();
  }

  setClickHandler = (onClick) => {
    this.#handleClick = onClick;
    this.element.addEventListener('click', this.#clickHandler);
  };

  get template() {
    return createButtonNewEventViewTemplate();
  }

  #clickHandler = (evt) => {
    console.log(this.#handleClick);
    evt.preventDefault();
    this.#handleClick();
  };
}
