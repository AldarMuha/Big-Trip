import { Destinations } from '../mock/destination.js';

export default class DestinationModel {
  #destinations = Destinations;

  get = () => this.#destinations;

  getDestinationById = (pointId) =>
    this.#destinations.find((destination) => destination.id === pointId);

  getDestinationByName = (pointName) =>
    this.#destinations.find((destination) => destination.name === pointName);
}
