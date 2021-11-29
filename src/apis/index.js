import axios from 'axios';
import { isObject, map, flatten } from 'underscore';
import { getAccessToken, setAccessToken } from 'modules/auth/saga/authSaga';
import qs from 'qs';
import { API_VERSION_1, API_VERSION_2, API_VERSION_NONE, BASE_URL } from './const';
import accountAPI from './auth/auth';
import bookingAPI from './bookings/bookings';
import categoriesAPI from './categories/categories';
import feedbackAPI from './feedback/feedback';
import { handleLogout } from 'routes/routes';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

axios.create({
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' })
});

// set url
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

// for multiple requests
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });

  failedQueue = [];
};

// refresh token
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const UNAUTHORIZED = 401;

    if (error && error.response && error.response.status === UNAUTHORIZED) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            // return axios.create().request(originalRequest);
            const instance = axios.create();
            return instance.request(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      isRefreshing = true;
      const refresh = localStorage.getItem('refreshToken');
      const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');

      return new Promise((resolve, reject) => {
        accountAPI
          .refreshToken(token, refresh)
          .then(({ data }) => {
            const instance = axios.create();
            setAccessToken(data.accessToken, data.refreshToken);
            instance.defaults.headers.common.Authorization = `Bearer ${data.token}`;
            originalRequest.headers.Authorization = `Bearer ${data.token}`;
            processQueue(null, data.accessToken);
            resolve(instance.request(originalRequest));
          })
          .catch((err) => {
            processQueue(err, null);
            reject(err);
            handleLogout();
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    return Promise.reject(error);
  }
);

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
