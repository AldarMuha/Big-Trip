//import ButtonNewEventView from './view/button-new-event-view.js';
import FilterView from './view/filter-view.js';
//import { generateFilter } from './mock/filter.js';
import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import DestinationModel from './model/destination-model.js';
import TripPresenter from './presenter/trip-presenter.js';
import { render } from './framework/render.js';

const tripPresenter = new TripPresenter();

const filterContainer = document.querySelector('.trip-controls__filters');
const eventsContainer = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
const offersModel = new OffersModel();
const destinationModel = new DestinationModel();

//render(new FilterView(), filterContainer);

tripPresenter.init(eventsContainer, pointsModel, offersModel, destinationModel);
