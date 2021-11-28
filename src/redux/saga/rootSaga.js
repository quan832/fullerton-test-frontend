import { all } from 'redux-saga/effects';
import authSaga from 'modules/auth/saga/authSaga';
import dashboardSaga from 'modules/dashboard/saga/dashboardSaga';

export default function* rootSaga() {
  yield all([authSaga(), dashboardSaga()]);
}
