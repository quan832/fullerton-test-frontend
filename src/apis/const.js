import { reduce } from 'underscore';

export const BASE_URL = 'http://localhost:3000/';
export const API_VERSION_NONE = '';
export const API_VERSION_1 = 'v1';
export const API_VERSION_2 = 'v2';

// query params
export const queryParamFromArray = (paramName, values = []) =>
  reduce(values, (acc, id) => `${acc}&${paramName}=${id}`, '');
