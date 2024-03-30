import { createElement } from '../render.js';

const createPointsListViewTemplate = () => '<ul class="trip-events__list"></ul>';

export default class PointsListView {
  #element = null;
  get template() {
    return createPointsListViewTemplate();
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
