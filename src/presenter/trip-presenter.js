import SortView from '../view/sort-view.js';
import PointsListView from '../view/points-list-view.js';
import PointView from '../view/point-view.js';
import FormView from '../view/form-view.js';

import { render, RenderPosition } from '../render.js';

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

    render(this.sortComponent, this.container);
    render(this.pointsListComponent, this.container);

    for (let i = 0; i < 3; i++) {
      render(new PointView(this.points[i]), this.pointsListComponent.getElement());
    }

    const offers = offersModel.get(this.points[0]);
    const destination = destinationModel.get(this.points[0]);
    console.log(destination);
    console.log(this.points[0]);
    render(new FormView(this.points[0], offers, destination), this.pointsListComponent.getElement(), RenderPosition.AFTERBEGIN);
  };
}
