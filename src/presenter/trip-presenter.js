import SortView from '../view/sort-view.js';
import PointsListView from '../view/points-list-view.js';
//import PointView from '../view/point-view.js';
import FormView from '../view/form-view.js';
import NoPointsView from '../view/no-points-view.js';
import BoardView from '../view/board-view.js';
import PointPresenter from './point-presenter.js';


import { render, RenderPosition } from '../framework/render.js';
import { updateItem } from '../util.js';


export default class TripPresenter {
  #container = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationModel = null;

  #sortComponent = new SortView();
  #pointsListComponent = new PointsListView();
  #buttonComponent = document.querySelector('.trip-main__event-add-btn');
  #noPointsComponent = new NoPointsView();
  #boardComponent = new BoardView();
  #pointPresenter = new Map();

  #points = [];

  init = (container, pointsModel, offersModel, destinationModel) => {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationModel = destinationModel;

    this.#points = [...this.#pointsModel.points];

    this.#renderBoard();
    this.#renderNewForm();
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) =>
      presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#boardComponent.element, RenderPosition.AFTERBEGIN);
  };

  #renderPoints = () => {
    this.#points.slice().forEach((point) => this.#renderPoint(point));
  };

  #renderNoPoints = () => {
    render(this.#noPointsComponent, this.#boardComponent.element, RenderPosition.AFTERBEGIN);
  };

  #clearPointsList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };

  #renderPointsList = () => {
    render(this.#pointsListComponent, this.#boardComponent.element);
    this.#renderPoints();
  };

  #renderBoard = () => {
    render(this.#boardComponent, this.#container);
    if (!this.#points) {
      this.#renderNoPoints();
    }
    this.#renderSort();
    this.#renderPointsList();
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#pointsListComponent.element, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point, this.#offersModel.get(point), this.#destinationModel.get(point));
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderNewForm = () => {
    const formComponent = new FormView();
    this.#buttonComponent.addEventListener('click', () =>
      render(formComponent, this.#pointsListComponent.element, RenderPosition.AFTERBEGIN));

    const saveButton = formComponent.element.querySelector('.event__save-btn');
    saveButton.addEventListener('click', () => formComponent.element.remove());
  };
}
