import SortView from '../view/sort-view.js';
import PointsListView from '../view/points-list-view.js';
import PointView from '../view/point-view.js';
import FormView from '../view/form-view.js';

import { render } from '../render.js';

export default class TripPresenter {
  sortComponent = new SortView();
  pointsListComponent = new PointsListView();
  formComponent = new FormView();

  init = (container, pointsModel, offersModel, destinationModel) => {
    this.container = container;
    this.pointsModel = pointsModel;
    this.offersModel = offersModel;
    this.destinationModel = destinationModel;

    this.points = [...pointsModel.get()];
    this.offers = [...offersModel.get()];
    this.destination = [...destinationModel.get()];

    render(this.sortComponent, this.container);
    render(this.pointsListComponent, this.container);

    for (let i = 1; i < 4; i++) {
      render(new PointView(this.points[i - 1]), this.pointsListComponent.getElement());
    }

    render(new FormView(this.points[0], this.offers[0], this.destination[0]), this.pointsListComponent.getElement());
  };
}
