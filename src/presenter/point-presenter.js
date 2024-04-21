import { render, replace, remove } from '../framework/render.js';
import PointView from '../view/point-view.js';
import FormView from '../view/form-view.js';

const Mode = {
  DEFAULT: 'default',
  EDITING: 'editing',
};

export default class PointPresenter {
  #pointListContainer = null;
  #pointComponent = null;
  #formComponent = null;
  #changeData = null;
  #changeMode = null;

  #point = null;
  #offers = null;
  #destination = null;
  #mode = Mode.DEFAULT;

  constructor(pointListContainer, changeData, changeMode) {
    this.#pointListContainer = pointListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (point, offers, destination) => {
    this.#point = point;
    this.#offers = offers;
    this.#destination = destination;

    const prevPointComponent = this.#pointComponent;
    const prevFormComponent = this.#formComponent;

    this.#pointComponent = new PointView(this.#point, this.#offers, this.#destination);
    this.#formComponent = new FormView(this.#point, this.#offers, this.#destination);

    this.#pointComponent.setEditClickHandler(this.#editClickHandler);
    this.#pointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#formComponent.setFormSubmitHandler(this.#formSubmitHandler);

    if (prevPointComponent === null || prevFormComponent === null) {
      render(this.#pointComponent, this.#pointListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#formComponent, prevFormComponent);
    }

    remove(prevPointComponent);
    remove(prevFormComponent);
  };

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#formComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToPoint();
    }
  };

  #replacePointToForm = () => {
    replace(this.#formComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#formComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
  };

  #editClickHandler = () => {
    this.#replacePointToForm();
  };

  #handleFavoriteClick = () => {
    this.#changeData({ ...this.#point, isFavorite: !this.#point.isFavorite });
  };

  #formSubmitHandler = (point) => {
    this.#changeData(point);
    this.#replaceFormToPoint();
  };
}
