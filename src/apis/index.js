import axios from 'axios';
import { isObject, map, flatten } from 'underscore';
import { getAccessToken } from 'modules/auth/saga/authSaga';
import qs from 'qs';
import { API_VERSION_1, API_VERSION_2, API_VERSION_NONE, BASE_URL } from './const';
import accountAPI from './auth/auth';
import bookingAPI from './bookings/bookings';
import categoriesAPI from './categories/categories';
import feedbackAPI from './feedback/feedback';

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

axios.create({
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' })
});
axios.interceptors.request.use((_config) => {
  //   if (loggedIn() && !checkAuthenticate()) {
  //     return handleLogout()
  //   }

  const config = { ..._config };
  const accessToken = getAccessToken() || null;

  config.headers.Authorization = `Bearer ${accessToken}`;

  let endPoint = '';

  switch (config.apiVersion) {
    case API_VERSION_2:
    case API_VERSION_NONE:
      endPoint = BASE_URL.slice(0, BASE_URL.lastIndexOf('/'));
      break;
    default:
      endPoint = BASE_URL + API_VERSION_1;
      break;
  }

  if (!config.absoluteUrl) {
    config.url = endPoint + config.url;
    config.absoluteUrl = true;
  }

  return config;
});

export function getErrorMessage(error) {
  const { response } = error;
  let message = 'Error! Please try again later';

  if (response && response.status && response.status === 403) {
    message = "Access Denied. You don't have permission";
  } else if (response && response.data) {
    if (isObject(response.data)) {
      if (response.data.userMessage) {
        message = response.data.userMessage;
      } else {
        message = flatten(map(response.data, (_message) => _message));
      }
    } else {
      message = response.data;
    }
  } else if (error.message) {
    message = error.message;
  }

  return message;
}

export const API = { accountAPI, bookingAPI, categoriesAPI, feedbackAPI };
