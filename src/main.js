import ButtonNewEventView from './view/button-new-event-view.js';
import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destination-model.js';
import BoardPresenter from './presenter/board-presenter.js';
import { render } from './framework/render.js';

import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model.js';

import PointsApiService from './api/points-api-service.js';
import OffersApiService from './api/offers-api-service.js';
import DestinationsApiService from './api/destinations-api-service.js';
const AUTHORIZATION = 'Basic Oruel1984';
const END_POINT = 'https://17.ecmascript.htmlacademy.pro/big-trip';

const headerContainer = document.querySelector('.page-header__container');
const filterContainer = document.querySelector('.trip-controls__filters');
const eventsContainer = document.querySelector('main .page-body__container');

const pointsModel = new PointsModel(new PointsApiService(END_POINT, AUTHORIZATION));
const offersModel = new OffersModel(new OffersApiService(END_POINT, AUTHORIZATION));
const destinationsModel = new DestinationsModel(new DestinationsApiService(END_POINT, AUTHORIZATION));

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

filterPresenter.init();
tripPresenter.init();
pointsModel.init()
  .finally(() => {
    render(newPointButtonComponent, headerContainer);
    newPointButtonComponent.setClickHandler(handleNewPointButtonClick);
  });
