import { all, call, fork, put, select, takeLatest } from '@redux-saga/core/effects';
import { Message } from 'utils/Message';
import { errorNotification, getError, successNotification } from 'utils/Notifcation';
import { API } from 'apis/index';
import AdminAction, { FETCH_BOOKINGS } from '../actions/adminAction';

function* fetchListBookings({ payload }) {
  try {
    const { page = 1, perPage = 8 } = payload;
    yield put({ type: AdminAction.FETCH_BOOKINGS.REQUEST });

    const {
      data: { data, total }
    } = yield call(API.bookingAPI.fetchBookings, page, perPage);

    yield put({
      type: AdminAction.FETCH_BOOKINGS.SUCCESS,
      payload: {
        data,
        page,
        total
      }
    });
  } catch (error) {
    errorNotification(getError(error));
  }
}

function* watchFetchListBookings() {
  yield takeLatest(FETCH_BOOKINGS, fetchListBookings);
}

export default function* adminSaga() {
  yield all([watchFetchListBookings()]);
}
