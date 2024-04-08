import { AbstractView } from '../framework/view/abstract-view.js';
import { filter } from '../utils/filter.js';

const createFilterItemTemplate = (filterItem, isChecked) => {
  const { name } = filterItem;

  return (`
    <div class="trip-filters__filter">
      <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden"
        type="radio" name="trip-filter" value=${name}
        ${isChecked ? 'checked' : ''}
      >
      <label class="trip-filters__filter-label" for="filter-everything">${name}</label>
    </div>
  `);
};

const createFilterTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems.map((filterItem) => createFilterItemTemplate(filterItem)).join('');

  return `
    <form class="trip-filters" action="#" method="get">
      ${filterItemsTemplate(filter)}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  `;
};

export default class FilterView extends AbstractView {
  //#filters = null;
  get template() {
    return createFilterTemplate();
  }
}
