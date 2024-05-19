import Observable from '../framework/observable.js';

export default class OffersModel extends Observable {
  #offersApiService = null;
  #offers = null;

  constructor(offersApiService) {
    super();
    this.#offersApiService = offersApiService;
  }

  get = async () => {
    this.#offers = await this.#offersApiService.offers;
    return this.#offers;
  };

  init = async () => {
    try {
      const offers = await this.#offersApiService.offers;
      this.#offers = offers;
    } catch (err) {
      this.#offers = [];
    }
  };
}
