import SortView from '../view/sort-view.js';
import PointsListView from '../view/points-list-view.js';
import PointView from '../view/point-view.js';
import FormView from '../view/form-view.js';


import { render, RenderPosition } from '../framework/render.js';

export default class TripPresenter {
  #container = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationModel = null;
  #sortComponent = new SortView();
  #pointsListComponent = new PointsListView();
  #buttonComponent = document.querySelector('.trip-main__event-add-btn');
  #points = [];

  init = (container, pointsModel, offersModel, destinationModel) => {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationModel = destinationModel;

    this.#points = [...this.#pointsModel.points];

    render(this.#sortComponent, this.#container);
    render(this.#pointsListComponent, this.#container);

    this.#renderNewForm();

    for (let i = 0; i < 5; i++) {
      this.#renderPoint(this.#points[i]);
    }
  };

  #renderPoint = (point) => {
    const offers = this.#offersModel.get(point);
    const destination = this.#destinationModel.get(point);
    const pointComponent = new PointView(point, offers, destination);
    const formComponent = new FormView(point, offers, destination);

    const replacePointToForm = () => {
      this.#pointsListComponent.element.replaceChild(formComponent.element, pointComponent.element);
    };

    const replaceFormToPoint = () => {
      this.#pointsListComponent.element.replaceChild(pointComponent.element, formComponent.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.setEditClickHandler(() => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    // const openEditButton = pointComponent.element.querySelector('.event__rollup-btn');


    //const saveButton = formComponent.element.querySelector('.event__save-btn');
    formComponent.setFormSubmitHandler(() => {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(pointComponent, this.#pointsListComponent.element);
  };

  #renderNewForm = () => {
    const formComponent = new FormView();
    this.#buttonComponent.addEventListener('click', () =>
      render(formComponent, this.#pointsListComponent.element, RenderPosition.AFTERBEGIN));

    const saveButton = formComponent.element.querySelector('.event__save-btn');
    saveButton.addEventListener('click', () => formComponent.element.remove());
  };
}
