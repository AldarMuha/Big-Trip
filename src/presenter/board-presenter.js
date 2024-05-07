import SortView from '../view/sort-view.js';
import PointsListView from '../view/points-list-view.js';
import FormView from '../view/form-view.js';
import NoPointsView from '../view/no-points-view.js';
import BoardView from '../view/board-view.js';
import PointPresenter from './point-presenter.js';
import { SortType, UpdateType, UserAction } from '../const.js';
import { filter } from '../utils/filter.js';


import { remove, render, RenderPosition } from '../framework/render.js';
import { sortDay, sortPrice, sortTime } from '../util.js';


export default class BoardPresenter {
  #container = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationModel = null;
  #filterModel = null;

  #sortComponent = null;
  #pointsListComponent = new PointsListView();
  #buttonComponent = document.querySelector('.trip-main__event-add-btn');
  #noPointsComponent = new NoPointsView();
  #boardComponent = new BoardView();
  #pointPresenter = new Map();
  #currentSortType = SortType.DAY;

  constructor(container, pointsModel, offersModel, destinationModel, filterModel) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationModel = destinationModel;
    this.#filterModel = filterModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    const filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[filterType](points);

    switch (this.#currentSortType) {
      case SortType.DAY:
        return filteredPoints.sort(sortDay);
      case SortType.TIME:
        return filteredPoints.sort(sortTime);
      case SortType.PRICE:
        return filteredPoints.sort(sortPrice);
    }
    return filteredPoints;
  }

  init = () => {
    this.#renderBoard();
    this.#renderNewForm();
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) =>
      presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#sortComponent, this.#boardComponent.element, RenderPosition.AFTERBEGIN);
  };

  #renderPoints = (points) => {
    points.forEach((point) => this.#renderPoint(point));
  };

  #renderNoPoints = () => {
    render(this.#noPointsComponent, this.#boardComponent.element, RenderPosition.AFTERBEGIN);
  };

  #clearBoard = (resetSortType = false) => {
    this.#pointPresenter.forEach((presenter) =>
      presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#noPointsComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  };

  #renderBoard = () => {
    const points = this.points;
    const pointCount = points.length;
    render(this.#boardComponent, this.#container);

    if (pointCount === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    render(this.#pointsListComponent, this.#boardComponent.element);
    this.#renderPoints(points);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#pointsListComponent.element, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point, this.#offersModel.get(), this.#destinationModel.get());
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
