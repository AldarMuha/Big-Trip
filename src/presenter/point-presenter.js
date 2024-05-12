import { render, replace, remove } from '../framework/render.js';
import PointView from '../view/point-view.js';
import FormView from '../view/form-view.js';
import { UserAction, UpdateType } from '../const.js';

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
  #destinations = null;
  #mode = Mode.DEFAULT;

  constructor(pointListContainer, changeData, changeMode) {
    this.#pointListContainer = pointListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (point, offers, destinations) => {
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;

    const prevPointComponent = this.#pointComponent;
    const prevFormComponent = this.#formComponent;

    this.#pointComponent = new PointView(this.#point, this.#offers, this.#destinations);
    this.#formComponent = new FormView(this.#offers, this.#destinations, this.#point);

    this.#pointComponent.setEditClickHandler(this.#editClickHandler);
    this.#pointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#formComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#formComponent.setDeleteClickHandler(this.#handleDeleteClick);

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
    this.#changeData(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      { ...this.#point, isFavorite: !this.#point.isFavorite },
    );
  };

  #handleFormSubmit = (update) => {
    this.#changeData(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      update,
    );
    this.#replaceFormToPoint();
  };

  #handleDeleteClick = (point) => {
    this.#changeData(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  };
}

