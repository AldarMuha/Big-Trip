import AbstractView from '../framework/view/abstract-view.js';

const createNoPointsViewTemplate = () => `
<p class="trip-events__msg">Click New Event to create your first point</p>

<!--
  Значение отображаемого текста зависит от выбранного фильтра:
    * Everthing – 'Click New Event to create your first point'
    * Past — 'There are no past events now';
    * Future — 'There are no future events now'.
-->
`;

export default class NoPointsView extends AbstractView {

  get template() {
    return createNoPointsViewTemplate();
  }
}
