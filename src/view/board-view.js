import AbstractView from '../framework/view/abstract-view.js';

const createBoardViewTemplate = () => `
  <section class="trip-events">
    <h2 class="visually-hidden">Trip events</h2>

    <!-- Сортировка -->

    <!-- Контент -->
  </section>
`;

export default class BoardView extends AbstractView {

  get template() {
    return createBoardViewTemplate();
  }
}
