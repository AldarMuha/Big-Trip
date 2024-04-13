import AbstractView from '../framework/view/abstract-view.js';


const createFilterItemTemplate = (filterItem, isChecked) => {
  const { name, count } = filterItem;

  return (`
    <div class="trip-filters__filter">
      <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden"
        type="radio" name="trip-filter"
        ${isChecked ? 'checked' : ''}
        ${count === 0 ? 'disabled' : ''}
        value=${name}
      >
      <label class="trip-filters__filter-label" for="filter-everything">${name}</label>
    </div>
  `);
};

const createFilterTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems.map((filterItem, index) => createFilterItemTemplate(filterItem, index === 0)).join('');

  return `
    <form class="trip-filters" action="#" method="get">
      ${filterItemsTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  `;
};

export default class FilterView extends AbstractView {
  #filters = null;

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFilterTemplate(this.#filters);
  }
}
