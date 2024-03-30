import { createElement } from '../render.js';

const createButtonNewEventViewTemplate = () => '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';

export default class ButtonNewEventView {
  #element = null;
  get template() {
    return createButtonNewEventViewTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
