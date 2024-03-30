import { generateDestinations } from '../mock/destination.js';

export default class DestinationModel {
  destinations = generateDestinations();

  get = () =>
    this.destinations;
}
