import SortView from '../view/sort-view.js';
import PointsListView from '../view/points-list-view.js';
import FormView from '../view/form-view.js';
import NoPointsView from '../view/no-points-view.js';
import BoardView from '../view/board-view.js';
import PointPresenter from './point-presenter.js';
import { SortType } from '../const.js';


import { render, RenderPosition } from '../framework/render.js';
import { updateItem, sortDay, sortPrice, sortTime } from '../util.js';


export default class BoardPresenter {
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
  #currentSortType = SortType.DAY;

  #points = [];
  #sourcedPoints = [];

  init = (container, pointsModel, offersModel, destinationModel) => {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationModel = destinationModel;

    this.#points = [...this.#pointsModel.points];
    this.#sourcedPoints = [...this.#pointsModel.points];

    this.#renderBoard();
    this.#renderNewForm();
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) =>
      presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    //this.#sourcedPoints = updatedPoint(this.#sourcedPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint, this.#offersModel.getOffersByType(updatedPoint.type), this.#destinationModel.getDestinationByName(updatedPoint.destination.name));
  };

  #sortPoints = (sortType) => {
    switch (sortType) {
      case SortType.DAY:
        this.#points.sort(sortDay);
        break;
      case SortType.TIME:
        this.#points.sort(sortTime);
        break;
      case SortType.PRICE:
        this.#points.sort(sortPrice);
        break;
      default:
        this.#points = [...this.#sourcedPoints];
    }
    this.#currentSortType = sortType;
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortPoints(sortType);
    this.#clearPointsList();
    this.#renderPointsList();
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#boardComponent.element, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
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
    if (this.#points.every((point) => !point)) {
      this.#renderNoPoints();
    } else {
      this.#renderSort();
      this.#renderPointsList();
    }
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#pointsListComponent.element, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point, this.#offersModel.getOffersByType(point.type), this.#destinationModel.getDestinationByName(point.destination.name));
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderNewForm = () => {
    const formComponent = new FormView();
    this.#buttonComponent.addEventListener('click', () =>
      render(formComponent, this.#pointsListComponent.element, RenderPosition.AFTERBEGIN));

    const saveButton = document.querySelector('.event__save-btn');
    //saveButton.addEventListener('click', () => console.log(this.#points));
  };
}
