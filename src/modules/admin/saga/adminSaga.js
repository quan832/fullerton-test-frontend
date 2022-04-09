import { all, call, fork, put, select, takeLatest, delay } from '@redux-saga/core/effects';
import { Message } from 'utils/Message';
import { errorNotification, getError, successNotification } from 'utils/Notifcation';
import { API } from 'apis/index';
import AdminAction, {
  CREATE_FEEDBACK,
  FETCH_BOOKINGS,
  GET_USERS,
  UPDATE_BOOKING
} from '../actions/adminAction';
import { STATUS } from 'utils/ENUM';

const getListBookingAdmin = (state) => state.admin.data;

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


function* fetchAllUsers({ payload }) {
  try {
    // const { page = 1, perPage = 8 } = payload;
    yield put({ type: AdminAction.GET_USERS.REQUEST });

    const {
      data: { data }
    } = yield call(API.accountManagementAPI.getUsers);

    yield delay(500)
    yield put({
      type: AdminAction.GET_USERS.SUCCESS,
      payload: {
        data,
        total: data?.length
      }
    });

  } catch (error) {
    errorNotification(getError(error));
  }
}


function* createFeedback(id, description) {
  try {
    yield put({ type: AdminAction.CREATE_FEEDBACK.REQUEST });
    const data = yield select(getListBookingAdmin);
    const {
      data: { message }
    } = yield call(API.feedbackAPI.createFeedback, id, description);

    let newData = [...data];
    newData = newData.map((item) => {
      if (item.id === id) {
        console.log(description);
        return { ...item, feedback: description, status: STATUS.reject };
      }
      return { ...item };
    });

    newData = newData.sort((a, b) => a.status.localeCompare(b.status));

    yield put({
      type: AdminAction.CREATE_FEEDBACK.SUCCESS,
      payload: { data: newData }
    });
  } catch (error) {
    errorNotification(getError(error));
  }
}

function* updateBooking({ payload }) {
  try {
    const { id, status = null, dateId = null, description } = payload;
    yield put({ type: AdminAction.UPDATE_BOOKING.REQUEST });
    console.log(id)
    const {
      data: { message }
    } = yield call(API.bookingAPI.updateBookingStatus, { id, status, dateId });

    if (status === STATUS.reject) {
      yield fork(createFeedback, id, description);
      return;
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

function* watchGetAllUsers() {
  yield takeLatest(GET_USERS, fetchAllUsers);
}

export default function* adminSaga() {
  yield all([watchFetchListBookings(), watchUpdateBooking(), watchCreateFeedback(), watchGetAllUsers()]);
}
