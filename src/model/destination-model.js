import { generateDestinations } from '../mock/destination.js';

export default class DestinationModel {
  destinations = generateDestinations();


  get = (point) =>
    this.destinations.find((destination) => destination.id === point.destination.id);
}
