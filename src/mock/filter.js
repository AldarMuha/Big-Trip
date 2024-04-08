import { filter } from '../utils/filter';

export const generateFilter = () => Object.keys(filter).map((filterName) => ({ name: filterName }));
