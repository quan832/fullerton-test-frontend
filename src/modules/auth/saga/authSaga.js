import { all, call, put, takeLatest } from '@redux-saga/core/effects';
import { history } from 'App/App';
import { Message } from 'utils/Message';
import jwtDecode from 'jwt-decode';
import { errorNotification, getError, successNotification } from 'utils/Notifcation';
import { LOGIN_USER, LOGOUT_USER } from '../actions/authAction';
import LoginAction from '../actions/authAction';
import { API } from 'apis/index';

export function setAccessToken(accessToken, refreshToken) {
  //   const expiresAt = moment(authResult.expiration).valueOf()
  localStorage.setItem('accessToken', accessToken);
  sessionStorage.setItem('accessToken', accessToken);

  localStorage.setItem('refreshToken', refreshToken);
  sessionStorage.setItem('refreshToken', refreshToken);

  const loggedIn = 'true';
  localStorage.setItem('logged-in', loggedIn);
  sessionStorage.setItem('logged-in', loggedIn);
}

function removeAccessToken() {
  localStorage.removeItem('accessToken');
  sessionStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  sessionStorage.removeItem('refreshToken');

  const loggedIn = 'false';
  localStorage.setItem('logged-in', loggedIn);
  sessionStorage.setItem('logged-in', loggedIn);
}

export function getUserInfo() {
  const token = getAccessToken();
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      if (decodedToken && decodedToken.data) {
        return decodedToken.data;
      }
    } catch (error) {
      removeAccessToken();
      return {};
    }
  }
  return {};
}

export function getAccessToken() {
  const accessToken = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
  return accessToken;
}

export function isLogin() {
  const login = localStorage.getItem('logged-in');
  if (login === 'true') {
    return true;
  }
  return false;
}

export function getExpiration() {
  return localStorage.getItem('expires_at');
}

export function checkAuthenticate() {
  const accessToken = getAccessToken();
  if (accessToken) {
    return true;
  }
  return false;
}

export function changeRoute() {
  history.push('/');
}

function* loginUser({ payload }) {
  try {
    yield put({ type: LoginAction.LOGIN_USER.REQUEST });
    const { data } = yield call(API.accountAPI.loginUser, payload);
    if (data) {
      const { accessToken, refreshToken } = data;
      setAccessToken(accessToken, refreshToken);
    }

    yield put({ type: LoginAction.LOGIN_USER.SUCCESS });

    successNotification(Message.loginSuccess);

    changeRoute();
  } catch (error) {
    errorNotification(getError(error));
  }
}

function* logoutUser() {
  try {
    removeAccessToken();
    history.push('/login');
    successNotification(Message.logoutSuccess);
  } catch (error) {
    errorNotification(getError(error));
  }
}

function* watchLoginUser() {
  yield takeLatest(LOGIN_USER, loginUser);
}

function* watchLogoutUser() {
  yield takeLatest(LOGOUT_USER, logoutUser);
}

export default function* authSaga() {
  yield all([watchLoginUser(), watchLogoutUser()]);
}
