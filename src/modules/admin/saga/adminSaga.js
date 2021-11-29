import { all, call, fork, put, select, takeLatest } from '@redux-saga/core/effects';
import { Message } from 'utils/Message';
import { errorNotification, getError, successNotification } from 'utils/Notifcation';
import { API } from 'apis/index';
import AdminAction, {
  CREATE_FEEDBACK,
  FETCH_BOOKINGS,
  UPDATE_BOOKING
} from '../actions/adminAction';
import { STATUS } from 'utils/ENUM';

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

function* createFeedback(id, description) {
  try {
    yield put({ type: AdminAction.CREATE_FEEDBACK.REQUEST });

    const {
      data: { message }
    } = yield call(API.feedbackAPI.createFeedback, id, description);

    yield put({
      type: AdminAction.CREATE_FEEDBACK.SUCCESS
    });
  } catch (error) {
    errorNotification(getError(error));
  }
}

function* updateBooking({ payload }) {
  try {
    const { id, status = null, dateId = null, description } = payload;
    yield put({ type: AdminAction.UPDATE_BOOKING.REQUEST });

    const {
      data: { message }
    } = yield call(API.bookingAPI.updateBookingStatus, { id, status, dateId });

    if (status === STATUS.reject) {
      yield fork(createFeedback, id, description);
    }

    yield put({
      type: AdminAction.UPDATE_BOOKING.SUCCESS
    });

    successNotification(message);

    yield fork(fetchListBookings, { payload: { page: 1, perPage: 8 } });
  } catch (error) {
    errorNotification(getError(error));
  }
}

function* watchFetchListBookings() {
  yield takeLatest(FETCH_BOOKINGS, fetchListBookings);
}

function* watchUpdateBooking() {
  yield takeLatest(UPDATE_BOOKING, updateBooking);
}

function* watchCreateFeedback() {
  yield takeLatest(CREATE_FEEDBACK, createFeedback);
}

export default function* adminSaga() {
  yield all([watchFetchListBookings(), watchUpdateBooking(), watchCreateFeedback()]);
}
