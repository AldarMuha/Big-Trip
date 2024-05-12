import ButtonNewEventView from './view/button-new-event-view.js';
import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destination-model.js';
import BoardPresenter from './presenter/board-presenter.js';
import { render } from './framework/render.js';

import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model.js';

const headerContainer = document.querySelector('.page-header__container');
const filterContainer = document.querySelector('.trip-controls__filters');
const eventsContainer = document.querySelector('main .page-body__container');

const pointsModel = new PointsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();

const filterModel = new FilterModel();

const tripPresenter = new BoardPresenter(eventsContainer, pointsModel, offersModel, destinationsModel, filterModel);
const filterPresenter = new FilterPresenter(filterContainer, filterModel, pointsModel);

const newPointButtonComponent = new ButtonNewEventView();
const handleNewPointFormClose = () => {
  newPointButtonComponent.element.disbled = false;
};
const handleNewPointButtonClick = () => {
  tripPresenter.createPoint(handleNewPointFormClose);
  newPointButtonComponent.element.disbled = true;
};

render(newPointButtonComponent, headerContainer);
newPointButtonComponent.setClickHandler(handleNewPointButtonClick);

filterPresenter.init();
tripPresenter.init();
