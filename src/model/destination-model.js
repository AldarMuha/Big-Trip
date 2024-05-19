import Observable from '../framework/observable.js';

export default class DestinationsModel extends Observable {
  #destinationsApiService = null;
  #destinations = null;

  constructor(destinationsApiService) {
    super();
    this.#destinationsApiService = destinationsApiService;
  }

  get = async () => {
    this.#destinations = await this.#destinationsApiService.destinations;
    return this.#destinations;
  };
}
