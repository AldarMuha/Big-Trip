import AbstractView from '../framework/view/abstract-view.js';

const createButtonNewEventViewTemplate = () => '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';

export default class ButtonNewEventView extends AbstractView {
  get template() {
    return createButtonNewEventViewTemplate();
  }
}
