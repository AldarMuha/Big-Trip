import { generatePoints } from '../mock/points.js';

export default class PointsModel {
  #points = generatePoints();

  get points() {
    return this.#points;
  }
}
