import { all } from 'redux-saga/effects';
import authSaga from 'modules/auth/saga/authSaga';
import dashboardSaga from 'modules/dashboard/saga/dashboardSaga';
import adminSaga from 'modules/admin/saga/adminSaga';

export default function* rootSaga() {
  yield all([authSaga(), dashboardSaga(), adminSaga()]);
}
