import { all, call, put, takeLatest } from '@redux-saga/core/effects';
import { history } from 'App/App';
import { Message } from 'utils/Message';
import { errorNotification, getError, successNotification } from 'utils/Notifcation';
import { LOGIN_USER } from '../actions/authAction';
import LoginAction from '../actions/authAction';
import { API } from 'apis/index';

function setAccessToken(accessToken) {
  //   const expiresAt = moment(authResult.expiration).valueOf()
  localStorage.setItem('accessToken', accessToken);
  sessionStorage.setItem('accessToken', accessToken);

  const loggedIn = 'true';
  localStorage.setItem('logged-in', loggedIn);
  sessionStorage.setItem('logged-in', loggedIn);
}

function removeAccessToken() {
  localStorage.removeItem('accessToken');

  sessionStorage.removeItem('accessToken');

  const loggedIn = 'false';
  localStorage.setItem('logged-in', loggedIn);
  sessionStorage.setItem('logged-in', loggedIn);
}

export function getAccessToken() {
  const accessToken = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
  return accessToken;
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
    yield put(LoginAction.LOGIN_USER.REQUEST);
    const { data } = yield call(API.accountAPI.loginUser, payload);
    if (data) {
      const { token } = data;
      setAccessToken(token);
    }

    yield put(LoginAction.LOGIN_USER.SUCCESS);

    successNotification(Message.loginSuccess);

    changeRoute();
  } catch (error) {
    errorNotification(getError(error));
  }
}

function* logoutUser({ payload: goToLogin }) {
  try {
    removeAccessToken();
    goToLogin();
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
