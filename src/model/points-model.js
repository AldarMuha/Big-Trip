import { generatePoints } from '../mock/points.js';

export default class PointsModel {
  points = generatePoints();

  get = () => this.points;
}
