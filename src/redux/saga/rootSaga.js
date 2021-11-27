import { all } from 'redux-saga/effects';
import authSaga from 'modules/auth/saga/authSaga';

export default function* rootSaga() {
  yield all([authSaga()]);
}
