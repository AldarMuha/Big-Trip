//import ButtonNewEventView from './view/button-new-event-view.js';
import FilterView from './view/filter-view.js';
//import { generateFilter } from './mock/filter.js';
import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import DestinationModel from './model/destination-model.js';
import BoardPresenter from './presenter/board-presenter.js';
import { render } from './framework/render.js';

import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model.js';
const filters = [
  {
    type: 'everything',
    name: 'EVERYTHING',
    count: 0,
  },
];

const filterContainer = document.querySelector('.trip-controls__filters');
const eventsContainer = document.querySelector('main .page-body__container');

const pointsModel = new PointsModel();
const offersModel = new OffersModel();
const destinationModel = new DestinationModel();

const filterModel = new FilterModel();

const tripPresenter = new BoardPresenter(eventsContainer, pointsModel, offersModel, destinationModel, filterModel);
const filterPresenter = new FilterPresenter(filterContainer, filterModel, pointsModel);

//render(new FilterView(filters, 'everything'), filterContainer);
filterPresenter.init();
tripPresenter.init();
