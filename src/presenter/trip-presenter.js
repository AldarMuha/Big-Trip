import SortView from '../view/sort-view.js';
import PointsListView from '../view/points-list-view.js';
import PointView from '../view/point-view.js';
import FormView from '../view/form-view.js';

import { render, RenderPosition } from '../render.js';

export default class TripPresenter {
  #container = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationModel = null;
  #sortComponent = new SortView();
  #pointsListComponent = new PointsListView();
  #points = [];

  init = (container, pointsModel, offersModel, destinationModel) => {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationModel = destinationModel;

    this.#points = [...this.#pointsModel.points];

    render(this.#sortComponent, this.#container);
    render(this.#pointsListComponent, this.#container);

    for (let i = 0; i < 3; i++) {
      this.#renderPoint(this.#points[i]);
    }
  };

  #renderPoint = (point) => {
    const pointComponent = new PointView(point);

    const replacePointToForm = () => {
      pointComponent.element.remove();
      this.#renderForm(point);
    };
    const openEditButton = pointComponent.element.querySelector('.event__rollup-btn');
    openEditButton.addEventListener('click', replacePointToForm);

    render(pointComponent, this.#pointsListComponent.element);
  };

  #renderForm = (point) => {
    const offers = this.#offersModel.get(point);
    const destination = this.#destinationModel.get(point);
    const formComponent = new FormView(point, offers, destination);

    const saveButton = formComponent.element.querySelector('.event__save-btn');
    saveButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      formComponent.element.remove();
      this.#renderPoint(point);
    });

    render(formComponent, this.#pointsListComponent.element);
  };
}
